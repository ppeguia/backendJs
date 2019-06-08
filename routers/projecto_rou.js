"use strict"

var express = require('express');
var projectoController = require('../controllers/projecto_ctl');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home',projectoController.home);
router.post('/test',projectoController.test);
router.post('/proyecto',projectoController.saveProyecto);
router.get('/proyecto/:id?',projectoController.getProyectoId);
router.get('/proyectos',projectoController.getProyectos);
router.put('/proyecto/:id?',projectoController.updateProyecto);
router.delete('/proyecto/:id?',projectoController.deleteProyecto);
router.post('/proyecto/img/:id?', multipartMiddleware, projectoController.uplodaImage);

module.exports = router;