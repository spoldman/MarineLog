define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	var d3 = require('d3');
	
	var viewHtml = require('text!./Chart.html');

	return Backbone.View.extend({

		tagName: "div",

		className: "test",

		defaults: {
			width: 500,
			height: 250,
			margins: {
				top: 0,
				right: 50,
				bottom: 50,
				left: 50
			},
			lineColor: 'green',
			title: 'Title',
			minY: 0
		},

		template: _.template(viewHtml),

		events: {
			'click .add': 'add'
		},

		initialize: function (options) {
			this.options = _.extend({}, this.defaults, options);

			this.listenTo(this.collection, 'add', this.render);

			this.build();
		},

		build: function() {
			this.$el.html(this.template({
				title: this.options.title
			}));

			this.chartEl = this.$el.find('.chart');

		},

		data: function() {
			return this.collection.sort().toJSON();
		},

		render: function() {
			this.renderChart();

			return this;
		},

		add: function() {

			this.dialog = new this.options.dialog({
				collection: this.collection
			});

			this.dialog.render();
		},

		renderChart: function () {
			//console.trace(this.options);
			var data = this.data();
			var options = this.options;
			var margins = this.options.margins;
			var dateFormat = d3.time.format("%d %b");

			this.chartEl.empty();
			var c = d3.select(this.chartEl[0]).append('svg')
				.style('width', this.options.width + margins.left + margins.right)
				.style('height', this.options.height + margins.top + margins.bottom)
			.append("g");

			
			if (data.length === 0) {
				return;
			}

			var getDate = function (d) {
				return new Date(d.date);
			};

			var xScale = d3.time.scale()
				.range([margins.left, options.width - margins.right])
				.domain([d3.min(data, getDate), d3.max(data, getDate)]);
                        
			var yScale = d3.scale.linear()
				.range([options.height - margins.top, margins.bottom])
				.domain([options.minY, d3.max(data, function (d) { return d.value; })]);

			var xAxis = d3.svg.axis()
				.scale(xScale)
				.tickFormat(dateFormat);

			var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                    
			c.append("svg:g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (options.height) + ")")
				.call(xAxis);

			c.append("svg:g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + (margins.left) + ",0)")
				.call(yAxis);

			c.selectAll(".x text")  // select all the text elements for the xaxis
			  .attr("transform", function (d) {
			  	return "translate(-20,15)rotate(-45)";
			  });

			c.append('rect')
				.attr('x', margins.left +1)
				.attr('y', yScale(options.goalMax))
				.attr('width', options.width- margins.left - margins.right - 2)
				.attr('height', yScale(options.goalMin) - yScale(options.goalMax) )
				.attr('fill', '#eee');
				

			var lineGen = d3.svg.line()
				.x(function(d) {
					return xScale(new Date(d.date));
				})
				.y(function(d) {
					return yScale(d.value);
				})
				.interpolate('monotone');

			c.append('svg:path')
				.attr('d', lineGen(data))
				.attr('stroke', options.lineColor)
				.attr('stroke-width', 1.5)
				.attr('fill', 'none');

			c.selectAll("g.dot")
				.data(data)
				.enter()
				.append("circle")
				.attr("r", options.width/1000*4)
				.attr("cx", function(d) { return xScale(new Date(d.date)); })
				.attr("cy", function (d) { return yScale(d.value); });


			this.chart = c;
		},

		
		
	});


});