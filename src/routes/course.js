const express = require('express');

// importaciones
const controllerCourse = require('../controllers/course');

const router = express.Router();

// direcciones
const get_filtro = '/filtercourse';
const get_all = '/allcourse';
const post_course = '/course';
const put_course = '/course';
const delete_course = '/course';
const put_nota = '/nota';

// crear material
router.post(post_course, controllerCourse.enterCourse);

// ver material
router.get(post_course, controllerCourse.getCourse);

// ver notas de estudiante;
router.get(get_filtro, controllerCourse.getOne);

// actualizar curso
router.put(put_course, controllerCourse.putCourse);

//actualizar notas
router.put(put_nota, controllerCourse.putNota);

// eliminar curso
router.delete(delete_course, controllerCourse.deleteCourse);

module.exports = router;