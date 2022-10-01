const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
	student_id: {
		type: String,
		required: true
	},
	study_plan_id: {
		type: String,
		required: false
	},
	study_plan_name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('filter', filterSchema);