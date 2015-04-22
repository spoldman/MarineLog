define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');

	var calciumView = require('./CalciumDialog');

	var viewHtml = require('text!./Measurement.html');
	

	return Backbone.View.extend({
		
		template: _.template(viewHtml),

		events: {
			'click .calcium': 'add'
		},

		initialize: function () {
			this.build();
		},

		build: function() {
			this.$el.html(this.template());
		},

		render: function() {
			return this;
		},

		add: function() {

			var view = new calciumView({
				collection: this.collection
			});

			view.render();

			//this.$el.html(view.render().$el);


		}
	});


});