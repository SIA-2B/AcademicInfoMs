const mongoose = require('mongoose');

const datosSchema = new mongoose.Schema({
	// datos_id: {
	// 	type: Number,
	// 	required: true
	// },
	student_id: {
		type: String,
		required: true
	},
	credits_id: {
		type: String,
		required: true
	},
	papa: {
		type: Number,
		required: false,
		min: 0,
		max: 5,
		default: 0
	},
	pa: {
		type: Number,
		required: false,
		min: 0,
		max: 5,
		default: 0
	},
	papi: {
		type: Number,
		required: false,
		min: 0,
		max: 5,
		default: 0
	},
	study_plan_id: {
		type: String,
		required: false
	},
	study_plan_name: {
		type: String,
		uppercase: true,
		trim: true,
		required: true
	},
	facultad: {
		type: String,
		uppercase: true,
		trim: true,
		required: true
	},
	active: {
		type: Boolean,
		required: false,
		default: true
	}
});

module.exports = mongoose.model('datos', datosSchema);
