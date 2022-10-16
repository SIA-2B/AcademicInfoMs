const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
	dis_op: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	dis_ob: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	fund_op: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	fund_ob: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	libre: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	trabajo: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	nivelacion: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},

	cur_dis_op: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_dis_ob: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_fund_op: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_fund_ob: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_libre: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_trabajo: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	cur_nivelacion: { //Disiplinar optativa
		type: Number,
		required: false,
		default: 0
	},
	excedente: {
		type: Number,
		required: false,
		default: 0	
	},
	cancelados: {
		type: Number,
		required: false,
		default: 0	
	},
	avance: {
		type: Number,
		required: false,
		default: 0	
	},
	disponible: {
		type: Number,
		required: false,
		default: 0
	}
	// ,
	// plan: {
	// 	type: String,
	// 	required: false
	// }
});

module.exports = mongoose.model('credits', creditSchema);