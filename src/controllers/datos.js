// importaciones
const datosSchema = require('../models/datos');
const filterSchema = require('../models/filtrar');
const creditSchema = require('../models/credits');
const creditCarrera = require('../helpers/carreras.json');

async function studen(filtros) {
	return await datosSchema	
		.findOne({"student_id": filtros["student_id"],
			"study_plan_name": filtros["study_plan_name"]})
		.exec();
}

module.exports.enterdatos = async function (req, res) {
	const datos = datosSchema(req.body);
	const credito = creditSchema();
	const filtros = filterSchema(req.body);
	console.log(req.body);
	if((await studen(filtros))!=null){
		res.send("Student is registered.");
		return;
	}
	const fac= datos['facultad'];
	const name=datos['study_plan_name'];
	console.log(datos);
	console.log(fac);
	console.log(name);
	const creditos = creditCarrera[fac][name];

	// const creditos = creditCarrera[datos['facultad']][datos['study_plan_name']];
 //    res.send("salida");
	// return;
	credito.dis_op = creditos['dis_op'];
    credito.dis_ob = creditos['dis_ob'];
    credito.fund_op = creditos['fund_op'];
    credito.fund_ob = creditos['fund_ob'];
    credito.libre = creditos['libre'];
    credito.trabajo = creditos['trabajo'];
    credito.nivelacion = creditos['nivelacion'];
    credito.disponible = creditos['disponible'];

 //    res.json(credito);
 //    // res.send("salida");
	// return;
    try {
		credito.save()
			.then((data) => console.log("credit data stored successfully"))
			.catch((error = res.status(200)) => 
				res.send({ message: error.message}));
	} catch(error){
		res.status(500).send({ error: error.message });
	}

	datos.credits_id = credito["_id"];
	datos.study_plan_id = creditos["plan"];
	try {
		datos.save()
			.then((data) => res.send("data stored successfully"))
			.catch((error = res.status(200)) => 
				res.send({ message: error.message}));
	} catch(error){
		res.status(500).send({ error: error.message });
	}
};

module.exports.viewdatos = function (req, res) {
	datosSchema
		.find()
		.then((data) => res.json(data))
		.catch((error) => res.send({ message: error.message}));
}

module.exports.viewdatosone = async function (req, res) {
	console.log("hola mundo");
	const datos = await studen(filterSchema(req.body));

	res.json(datos);
}

module.exports.putdatos = async function (req, res) {
	const datos = await studen(filterSchema(req.body));
}

module.exports.deletedatos = async function (req, res) {
	const datos = await studen(filterSchema(req.body));

	if(datos == null){
		res.send("Student is not registered.");
		return;
	}
	await creditSchema
		.remove({"_id": datos["credits_id"]})
		.then((data) => console.log('Se eliminaron la bolsa de credito'))
		.catch((error) => res.send({ message: error}));

	await datosSchema
		.remove({"_id": datos["_id"]})
		.then((data) => res.send(`Datos eliminados del estudiantes: ${datos["student_id"]}`))
		.catch((error) => res.send({ message: error}));
	;
}