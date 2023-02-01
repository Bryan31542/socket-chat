var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name')) { 
    window.location = 'index.html';
    throw new Error('The name is required');
}

var user = { 
    name: params.get('name')
}

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit("joinChat", user, function (resp) { 
        console.log("Users connected: ", resp);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Lost connection to server');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});