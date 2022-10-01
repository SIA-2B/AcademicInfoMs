const express = require('express');

// importaciones
const controllerdatos = require('../controllers/datos');
const controllercredits = require('../controllers/credits');
// const controllercredits = require('../controllers/');


const router = express.Router();

// direcciones
const post_datos = '/datos';
const get_datos = '/datos';
const get1_datos = '/filter';
const put_datos = '/datos';
const delete_datos = '/datos';

// crear datos
router.post(post_datos, controllerdatos.enterdatos);

// get datos todos
router.get(get_datos, controllerdatos.viewdatos);

// get datos un solo
router.get(get1_datos, controllerdatos.viewdatosone);

// update datos
router.put(put_datos, controllerdatos.putdatos);

// delete datos
router.delete(delete_datos, controllerdatos.deletedatos);

module.exports = router;