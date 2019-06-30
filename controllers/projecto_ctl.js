"use strict"

var Proyecto = require('../models/proyecto'); 
var fs = require('fs');
var path = require('path');
var controller = {
	
	home: function(req, res){
		return res.status(200).send({
			mensaje: "soy la home"
		});
	},
	test: function(req, res){
		return res.status(200).send({
			mensaje: "soy la test"
		})	
	},

	saveProyecto: function(req, res){
		var proyecto = new Proyecto();
		var params = req.body;

		proyecto.nombre = params.nombre;
    	proyecto.descripcion = params.descripcion;
    	proyecto.categoria = params.categoria;
    	proyecto.lenguaje = params.lenguaje;
	    proyecto.anio = params.anio;
	    proyecto.imagen = params.imagen;

	    proyecto.save((err,projectoStored) =>{
	    	if(err) return res.status(500).send({ message: "Error al guardar el documento"});
	    	if(!projectoStored) return res.status(404).send({ message: "No se ha podido guardar el proyecto"});

	    	return res.status(200).send({ proyecto: projectoStored, message: "exito" });
	    });
	},
	getProyectoId: function(req, res){
		var proyectoId = req.params.id;
		
		if(proyectoId == null) return res.status(404).send({ message: "No hay parametro con que buscar"});

		Proyecto.findById(proyectoId, (err, projectoStored)=>{
			if(err) return res.status(500).send({ message: "Error al devolver los datos: "+ proyectoId});
			if(!projectoStored) return res.status(404).send({ message: "El proyecto no existe"});
			return res.status(200).send({ proyecto: projectoStored, message: "exito consutar" });
		});
	},
	getProyectos: function(req, res){
		//Proyecto.find({"nombre":'jose'}).sort('anio').exec((err, projectosStored)=>{
		Proyecto.find().sort('anio').exec((err, projectosStored)=>{
			if(err) return res.status(500).send({ message: "Error al obtener los proyectos "});
			if(!projectosStored) return res.status(404).send({ message: "No hay proyectos"});
			return res.status(200).send({ proyectos: projectosStored,
										  sizelist: projectosStored.length,	
			                              message: "exito consutar" });
		}); 

	},
	updateProyecto: function(req, res){
		var proyectoId = req.params.id;
		var update = req.body;
		Proyecto.findByIdAndUpdate(proyectoId, update, {new: true}, (err, projectoStored)=>{
			if(err) return res.status(500).send({ message: "Error al actualizar el proyecto: " + proyectoId });
			if(!projectoStored) return res.status(404).send({ message: "No existe el proyecto ha actualizar" + proyectoId });
			return res.status(200).send({ proyecto: projectoStored,
			                              message: "exito actualizar" });
		});
	},
	deleteProyecto: function(req, res){
		var proyectoId = req.params.id;
		Proyecto.findByIdAndDelete(proyectoId, (err, projectoStored)=>{
		//Proyecto.findByIdAndRemove(proyectoId, (err, projectoStored)=>{
			if(err) return res.status(500).send({ message: "No se ha podido borrar el proyecot: " + proyectoId });
			if(!projectoStored) return res.status(404).send({ message: "No de puso eliminar ese proyecto: " + proyectoId});
			return res.status(200).send({ proyecto: projectoStored,
			                              message: "exito eliminar" });			

		} );
	},
	uplodaImage: function(req, res){
		var proyectoId = req.params.id;
		var fileName = "Imagen no subida ..";

		if(req.files){
			var filePath = req.files.imagen.path;
			var fileSplit = filePath.split('\\');

			fileName = fileSplit[1];
			
			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];
			debugger;
			console.log("extSplit: " + extSplit);
			console.log("fileExt: " + fileExt);
			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ){
				Proyecto.findByIdAndUpdate(proyectoId,{ imagen: fileName }, {new: true}, (err, projectoStored)=>{
					if(err) return res.status(500).send({ message: "No se ha podido cargar la imagen al proyecot: " + proyectoId });
					if(!projectoStored) return res.status(404).send({ message: "No de puso guardar la imagen en el  proyecto: " + proyectoId});
					return res.status(200).send({ 
						proyecto: projectoStored
					});				
				});
			}else{
				fs.unlink(filePath, (err)=>{
					return res.status(200).send({ 
						message: "la extension del archivo no valido"
					});				
				});
								
			}				
		}else{
			return res.status(200).send({ 
				message: fileName
			});
		}
	},
	getImagFile: function(req, res){
		var image = req.params.image;
		var path_file = "./uploads/"+ image;
		fs.exists(path_file,(exists)=>{
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen"
				});
			}
		});
	}

};

module.exports = controller;