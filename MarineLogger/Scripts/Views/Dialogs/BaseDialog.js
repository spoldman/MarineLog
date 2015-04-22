define(function (require) {
	var _ = require('underscore');
	var Backbone = require('backbone');
	var bootstrap = require('jquery.bootstrap');
	var datepicker = require('datepicker');

	var Model = require('Models/MeasurementModel');
	var viewHtml = require('text!./BaseDialog.html');


	return Backbone.View.extend({

		template: _.template(viewHtml),

		events: {
			'click .btn-primary': 'save'
		},

		initialize: function () {
			this.build();
		},

		build: function () {
			this.$el = $(this.template());

			this.$el.modal();

			this.valueEl = this.$('[name="value"]');
			this.dateEl = this.$('[name="date"]');

			this.dateEl.datepicker({
				format: 'mm/dd/yyyy'
			});
		},

		render: function () {
			return this;
		},

		save: function () {
			this.model = new Model({
				value: this.valueEl.val(),
				date: new Date(this.dateEl.val())
			});
			
			this.collection.add(this.model);

			this.model.save();

			this.close();
		},

		close: function() {
			this.$el.modal('hide').data('bs.modal', null);
			this.trigger('close');
		}
	});


});