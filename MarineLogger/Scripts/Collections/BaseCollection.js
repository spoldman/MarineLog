define(function (require) {
	//var Backbone = require('backbone');
	var localstorage = require('localstorage');

	return Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage(this.name)
	});
});