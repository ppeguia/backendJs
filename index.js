"use strict"

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://dbUser:nada1234@clusterhl-xeyyb.mongodb.net/portafolio?retryWrites=true&w=majority', { useNewUrlParser: true })
				.then(() =>{
					console.log("conexion a la base de datos establecida con exito ...");
				})
				.catch(err =>{
					console.log(err);	
				});*/



const config = {
  autoIndex: false,
  useNewUrlParser: true,
};
return mongoose.connect('mongodb+srv://dbUser:nada1234@clusterhl-xeyyb.mongodb.net/portafolio?retryWrites=true&w=majority', { useNewUrlParser: true })
				.then(() =>{
					console.log("conexion a la base de datos establecida con exito ...");
					//Creacion del servidor
					app.listen(port,() =>{
						console.log('servidor corriendo correctamente en la url: localhost:3700');
					})

				})
				.catch(err =>{
					console.log(err);	
				});				

/*console.log(mongoose);*/
