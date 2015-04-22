define(function(require) {
	var Backbone = require('backbone');

	return Backbone.Model.extend({
		constructor: function () {
			Backbone.Model.apply(this, arguments);
			return this;
		},
	});
})