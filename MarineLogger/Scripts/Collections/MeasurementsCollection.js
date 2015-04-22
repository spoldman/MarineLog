define(function(require) {
	var BaseCollection = require('./BaseCollection');
	var MeasurementModel = require('Models/MeasurementModel');

	return BaseCollection.extend({
		model: MeasurementModel,
		comparator: function (m) {
			return new Date(m.get('date'));
		},

		initialize: function (models, options) {
			this.localStorage = options.localStorage;
		}
	});
});

