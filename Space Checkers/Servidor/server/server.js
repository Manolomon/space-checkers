'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var io = require("socket.io")(5000);

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

io.on("connection", function(cliente) {
  console.log("Usuario conectado a servidor");
  cliente.on("login", function(sesion){
    
  });

  cliente.on("registro", function(datos){
    // registro de usuario
  });

  cliente.on("createGame", function(){
    // creacion de partida
    // room = codigo de la sala. Aqui generar el codigo de sala
  });

  cliente.on("joinGame", function(partida){
    // unirse a partida
    // join = codigo de sala
  });
});

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
