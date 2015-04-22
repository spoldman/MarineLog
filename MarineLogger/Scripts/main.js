requirejs.config({
	baseUrl: '/Scripts/',

	paths: {
		'text': '_Libs/text',
		'jquery': '_Libs/jquery-1.10.2.min',
		'jquery-ie9fix': '_Libs/jquery-ie9fix',
		'backbone': '_Libs/backbone',
		'underscore': '_Libs/underscore',
		'async': '_Libs/async',
		'localstorage': '_Libs/backbone.localStorage',
		"jquery.bootstrap": "_Libs/bootstrap.min",
		'd3': '_Libs/d3',
		'datepicker': '_Libs/bootstrap-datepicker'
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery', 'jquery-ie9fix'],
			exports: 'Backbone'
		},

		'underscore': {
			exports: '_'
		},

		'jquery': {
			exports: '$'
		},

		'modernizr': {
			exports: 'Modernizr'
		},

		'jquery.bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		},

		'datepicker': {
			deps: ['jquery', 'jquery.bootstrap'],
			exports: 'datepicker'
		}


	}
});

define(function(require) {
	var $ = require('jquery');
	var Backbone = require('backbone');
	var MeasurementCollection = require('Collections/MeasurementsCollection');
	var MeasurementView = require('./Views/Dialogs/Measurement');
	var Measurement = require('./Models/MeasurementModel');
	var ChartView = require('./Views/Chart/Chart');
	var CalciumDialog = require('./Views/Dialogs/CalciumDialog');
	var MagnesiumDialog = require('./Views/Dialogs/MagnesiumDialog');
	var BaseDialog = require('./Views/Dialogs/BaseDialog');

	var mainEl = $('#main');

	// Calcium

	var calciumCollection = new MeasurementCollection(null, {
		localStorage: new Backbone.LocalStorage("calcium"),
	});

	calciumCollection.fetch();

	var calciumView = new ChartView({
		title: 'Calcium',
		collection: calciumCollection,
		dialog: CalciumDialog,
		minY: 300,
		goalMin: 380,
		goalMax: 420
	});

	mainEl.append(calciumView.render().$el);
	

	// Magnesium
	
	var magnesiumCollection = new MeasurementCollection(null, {
		localStorage: new Backbone.LocalStorage("magnesium"),
	});

	magnesiumCollection.fetch();
		
	var magnesiumView = new ChartView({
		title: 'Magnesium',
		collection: magnesiumCollection,
		dialog: MagnesiumDialog,
		minY: 1200,
		lineColor: 'red',
		goalMin: 1350,
		goalMax: 1400
	});

	mainEl.append(magnesiumView.render().$el);
		
	
	// Alkalinity
	var alkalinityCollection = new MeasurementCollection(null, {
		localStorage: new Backbone.LocalStorage("alkalinity"),
	});

	alkalinityCollection.fetch();

	var alkalinityView = new ChartView({
		title: 'Alkalinity',
		collection: alkalinityCollection,
		dialog: BaseDialog,
		minY: 5,
		lineColor: 'blue',
		goalMin: 8.5,
		goalMax: 9.5
	});

	mainEl.append(alkalinityView.render().$el);
	

	// Nitrates
	var nitratesCollection = new MeasurementCollection(null, {
		localStorage: new Backbone.LocalStorage("nitrates"),
	});

	nitratesCollection.fetch();

	var nitrateView = new ChartView({
		title: 'Nitrates',
		collection: nitratesCollection,
		dialog: BaseDialog,
		minY: 0,
		lineColor: 'purple',
		goalMin: 0,
		goalMax: 5
	});

	mainEl.append(nitrateView.render().$el);


	window.seed = function() {
		calciumCollection.add(new Measurement({
			date: new Date(2015, 04, 1),
			value: 380
		}));

		calciumCollection.add(new Measurement({
			date: new Date(2015, 04, 10),
			value: 410
		}));

		calciumCollection.add(new Measurement({
			date: new Date(2015, 04, 30),
			value: 400
		}));

		calciumCollection.add(new Measurement({
			date: new Date(2015, 03, 20),
			value: 350
		}));

		magnesiumCollection.add(new Measurement({
			date: new Date(2015, 04, 1),
			value: 1330
		}));

		magnesiumCollection.add(new Measurement({
			date: new Date(2015, 04, 10),
			value: 1410
		}));

		magnesiumCollection.add(new Measurement({
			date: new Date(2015, 04, 30),
			value: 1300
		}));

		magnesiumCollection.add(new Measurement({
			date: new Date(2015, 03, 20),
			value: 1420
		}));

		alkalinityCollection.add(new Measurement({
			date: new Date(2015, 04, 1),
			value: 8
		}));

		alkalinityCollection.add(new Measurement({
			date: new Date(2015, 04, 10),
			value: 9
		}));

		alkalinityCollection.add(new Measurement({
			date: new Date(2015, 04, 30),
			value: 8.5
		}));

		alkalinityCollection.add(new Measurement({
			date: new Date(2015, 03, 20),
			value: 10
		}));

		nitratesCollection.add(new Measurement({
			date: new Date(2015, 04, 1),
			value: 0
		}));

		nitratesCollection.add(new Measurement({
			date: new Date(2015, 04, 10),
			value: 2
		}));

		nitratesCollection.add(new Measurement({
			date: new Date(2015, 04, 30),
			value: 3
		}));

		nitratesCollection.add(new Measurement({
			date: new Date(2015, 03, 20),
			value: 15
		}));

		calciumCollection.each(function (item) { item.save(); });
		magnesiumCollection.each(function (item) { item.save(); });
		alkalinityCollection.each(function (item) { item.save(); });
		nitratesCollection.each(function (item) { item.save(); });

	};


});