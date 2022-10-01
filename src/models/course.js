const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	datos_id: {
		type: String,
		required: false
	},
	codigo_id: {
		type: String,
		trim: true,
		required: true
	},
	name: {
		type: String,
		uppercase: true,
		trim: true,
		required: true
	},
	credit: {
		type: Number,
		min: 1,
		max: 10,
		required: false,
		default: 3
	},
	periodo: {
		type: String,
		uppercase: true,
		trim: true,
		required: true
	},
	nota: {
		type: Number,
		required: true,
		min: 0,
		max: 5
	},
	plan: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('course', courseSchema);