// importaciones
const courseSchema = require('../models/course');
const datosSchema = require('../models/datos');
const filterSchema = require('../models/filtrar');
const creditSchema = require('../models/credits');
// const filCouSchema = require('../models/filtrocourse');

async function doble(course) {
	return await courseSchema
		.findOne({"datos_id": course["datos_id"],
				"codigo_id": course["codigo_id"],
				"periodo": course["periodo"]})
		.exec();
}

async function allCourse(course) {
	return await courseSchema
		.find({"datos_id": course["datos_id"]})
		.exec();
}

async function studen(filtros) {
	return await datosSchema	
		.findOne({"student_id": filtros["student_id"],
			"study_plan_name": filtros["study_plan_name"]})
		.exec();
}

async function creditos(cre) {
	return await creditSchema	
		.findOne({"_id": cre})
		.exec();
}

module.exports.enterCourse = async function (req, res) {
	const filtros = filterSchema(req.body);
	const course = courseSchema(req.body);
	console.log(req.body);
	const datos = await studen(filtros);
	console.log(datos);
	if(datos == null){
		res.send("Student is not registered.");
		return;
	}
	
	course.datos_id = datos["_id"];
	
	if((await doble(course))!=null){
		res.send("the subject has already been registered")
		return
	}

	const credits = await creditos(datos['credits_id']);
	const cre1 = course["plan"];
	const cre2 = "cur_"+course["plan"];
	var resta = credits[cre1];
	
	if (course["nota"]>=3){ 
		resta = credits[cre1]-course["credit"];
	}
	const suma = credits[cre2]+course["credit"];
	const disponible = credits[""]
	// const e = JSON.parse(`{"${cre1}": ${resta}, "${cre2}": ${suma}}`);
	await creditSchema
		.updateOne({"_id": datos['credits_id']},
			JSON.parse(`{"${cre1}": ${resta}, "${cre2}": ${suma}}`))
		.then((data) => console.log('Actualizar creditos'))
		.catch((error) => res.json({ message: error}));
	
	try {
		course.save()
			.then((data) => res.send("The course has been registered"))
			.catch((error) => res.json({ message: error.message}));
	} catch(error) {
		res.status(500).send({error: error.message});
	}
}

module.exports.getCourse = function (req, res) {
	courseSchema
		.find()
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error}));
}

module.exports.getOne = async function (req, res) {
	const filtros = filterSchema(req.body);

	const datos = await studen(filtros);

	if(datos == null){
		res.send("Student is not registered.");
		return;
	}
	courseSchema
		.find({"datos_id": datos["_id"]})
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error}));
}

module.exports.putCourse = async function (req, res) {
	const datos = await studen(filterSchema(req.body));
	const {codigo_id,periodo,nota,name} = req.body;
	
	if(datos == null){
		res.send("Student is not registered.");
		return;
	}
	const course = await doble({
		datos_id: datos["_id"],
		codigo_id:codigo_id,
		periodo:periodo,
		name: name
	});

	if(course==null){
		res.send("course not found");
		return
	}

	const credits = await creditos(datos['credits_id']);
	const cre1 = course["plan"];

	var resta = credits[cre1];
	console.log(course["nota"] + " | " + nota);
	if (course["nota"]<3 && nota>=3){ 
		resta = credits[cre1]-course["credit"];
	}
	else if (course["nota"]>=3 && nota<3) {
		resta = credits[cre1]+course["credit"];
	}
	// console.log(resta);
	await creditSchema
		.updateOne({"_id": datos['credits_id']},
			JSON.parse(`{"${cre1}": ${resta}}`))
		.then((data) => console.log('Actualizar creditos'))
		.catch((error) => res.send({ message: error}));

	await courseSchema
		.updateOne({"_id": course["_id"]}, 
			{"nota": nota})
		.then((data) => res.send("Actualizacion de la nota"))
		.catch((error) => res.send({ message: error}));
	
}

module.exports.putNota = async function (req, res) {
	const datos = await studen(filterSchema(req.body));

	if(datos == null){
		res.send("Student is not registered.");
		return;
	}

	const periodo = req.body["periodo"];
	const courses = await allCourse({datos_id: datos["_id"]});
	
	var semestre = [[0,0],[0,0],[0,0]];	

	courses.forEach(function(cou){
		const nota = cou['nota'];
		const credit = cou['credit'];
		if(cou["periodo"] == periodo){
			semestre[2][0] = semestre[2][0]+(nota*credit);
			semestre[2][1] = semestre[2][1]+credit;
		}
		if(cou['nota']>=3){
			semestre[1][0] = semestre[1][0]+(nota*credit);
			semestre[1][1] = semestre[1][1]+credit;
		}
		semestre[0][0] = semestre[0][0]+(nota*credit);
		semestre[0][1] = semestre[0][1]+credit;
	});
	const papi = semestre[2][0]/semestre[2][1];
	const papa = semestre[0][0]/semestre[0][1];
	const pa = semestre[1][0]/semestre[1][1];
	console.log({'papa':papa,'papi':papi,'pa':pa});
	await datosSchema
		.updateOne({"_id": datos["_id"]}, 
			{'papa':papa,'papi':papi,'pa':pa})
		.then((data) => res.send("Actualizacion del promedio estudiantil"))
		.catch((error) => res.send({ message: error}));
}

module.exports.deleteCourse = async function (req, res) {
	const datos = await studen(filterSchema(req.body));
	const {codigo_id,periodo,nota,name} = req.body;
	
	if(datos == null){
		res.send("Student is not registered.");
		return;
	}
	const course = await doble({
		datos_id: datos["_id"],
		codigo_id:codigo_id,
		periodo:periodo,
		name: name
	});
	if(course==null){
		res.send("course not found");
		return
	}

	const credits = await creditos(datos['credits_id']);
	const cre1 = course["plan"];
	const cre2 = "cur_"+course["plan"];
	var resta = credits[cre1];
	
	if (course["nota"]>=3){ 
		resta = credits[cre1]+course["credit"];
	}
	const suma = credits[cre2]-course["credit"];
	const disponible = credits[""]

	await creditSchema
		.updateOne({"_id": datos['credits_id']},
			JSON.parse(`{"${cre1}": ${resta}, "${cre2}": ${suma}}`))
		.then((data) => console.log('Actualizar creditos'))
		.catch((error) => res.send({ message: error}));

	await courseSchema
		.remove({"_id": course["_id"]})
		.then((data) => res.send('Curso eliminado'))
		.catch((error) => res.send({ message: error}));
}