let http = require('http');// Node.js lleva incorporado el módulo llamado HTTP, el cual le permite transferir datos por el protocolo del mismo nombre. Para incluir dicho módulo usaremos la instrucción require(): 
let url = require('url'); // La función pasada a http.createServer() tiene un argumento peticion que representa la petición hecha desde el cliente, un objeto de la clase http.IncomingMessage. bEste objeto tiene una propiedad llamada url la cual contiene la parte de la url que viene tras el nombre del dominio. 
let fs = require('fs'); // El módulo de sistema de ficheros de Node.js permite trabajar con el sistema de archivos o de ficheros del sistema operativo. Las tareas  habituales que se hacen con este módulo son leer ficheros, crear ficheros, actualizarlos, borrarlos o renombrarlos.

http.createServer(function(peticion,respuesta) // creamos el servidor, y dentro de la función del servidor recibe una petición y devuelve uan respuesta
{

    let urlBase = url.parse(peticion.url, true);
    let path = urlBase.pathname;
    let params = urlBase.query;


    if(path == "/"){ // aqui mostramos el directorio raiz con la barra
        respuesta.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        respuesta.write('Bienvenido al directorio señor Fernando'); // usamos el metodo write con el objeto respuesta y entre comillas ponemos el contenido de la respuesta
        respuesta.end(); // Aquí finalizamos la respuesta
    
    }  


   else  if(path == "/dni"){ // comprobamos en la url si después del puerto y la ip va seguido de barra dni

    fs.readFile('instrucciones.html', function(err, datos)// en el caso q se cumpla la primera condición se leerá el fichero
    {
        if(err)
        {
            console.log('ERROR'); // si hay algún error se mostrará por consola
        }

        respuesta.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        respuesta.write(datos);
        respuesta.end();
    });

}  else if(path == "/escribir"){

    // En este condicional creamos la condición de que si no existe la carpeta la creamos
    if(!fs.existsSync('./Copia')){ // El método fs.existsSync() se utiliza para comprobar sincrónicamente si un archivo ya existe en la ruta dada o no. Devuelve un valor booleano que indica la presencia de un archivo.
        fs.mkdir('./Copia', function (err){
            if(err){
                throw err;// Sí hay un error lo lanzamos
            }
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
        respuesta.write('Se ha creado la carpeta correctamente');
        respuesta.end(); // cerramos la respuesta
        })
        // Posteriormente de crear la carpeta creamos el archivo 'holaMundo.txt'
        fs.appendFile('./Copia/holaMundo.txt', 'Francisco Manuel Carballo', function (err) 
            {
                if (err)
                {
                    throw err;
                }
            console.log('Contenido creado!'); // lo mostramos x consola
            });
    }else{
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });                                                                              
        respuesta.write('La carpeta ya existe.'); // por el contrario si la carpeta ya existe mostramos el mensaje 'ya existe'
        respuesta.end();// cerramos la respuesta
    }
}

else{
    respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });// por el contrario en la url todo lo que no sea lo descrito anteriormente, nos mostrará un mensaje de error
    respuesta.write('Error no se encuentra la página');
    respuesta.end();
}
    
}).listen(8090, "127.0.0.3");// puerto de escucha y la ip
console.log('Servidor ejecutándose: 8090, "127.0.0.3" '); // mensaje por consola de que el servidor se está ejecutando



