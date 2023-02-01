let http = require('http');// Node.js lleva incorporado el módulo llamado HTTP, el cual le permite transferir datos por el protocolo del mismo nombre. Para incluir dicho módulo usaremos la instrucción require(): 
let url = require('url'); // La función pasada a http.createServer() tiene un argumento peticion que representa la petición hecha desde el cliente, un objeto de la clase http.IncomingMessage. bEste objeto tiene una propiedad llamada url la cual contiene la parte de la url que viene tras el nombre del dominio. 
let fs = require('fs'); // El módulo de sistema de ficheros de Node.js permite trabajar con el sistema de archivos o de ficheros del sistema operativo. Las tareas  habituales que se hacen con este módulo son leer ficheros, crear ficheros, actualizarlos, borrarlos o renombrarlos.

http.createServer(function(peticion,respuesta) // creamos el servidor, y dentro de la función del servidor recibe una petición y devuelve uan respuesta
{

    let urlBase = url.parse(peticion.url, true);
    let path = urlBase.pathname;
    let params = urlBase.query;


    if(path == "/"){ // Aquí mostramos el directorio cuando no escribimos nada después del puerto y la ip
        respuesta.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        respuesta.write('Bienvenido al directorio señor Fernando'); // Usamos el metodo write con el objeto respuesta y entre comillas ponemos el contenido de la respuesta
        respuesta.end(); // Aquí finalizamos la respuesta
    
    }else if(path == '/dni' && params.num){ //Compromobamos si después de la dirección dni le pasamos un parámetro numérico
        let letra = calcularDNI(params.num); // Le pasamos el parámetro numérico por la función declarada al final y guardamos el resultado en la variable letra
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });
        respuesta.write(`Tu DNI completo es ${params.num}${letra}`); // Mostramos el contenido del parámetro el cual contiene una sucesión de números y la variable letra 
        respuesta.end();
        
    }else if(path == "/dni"){ // comprobamos en la url si después del puerto y la ip va seguido de barra dni
    fs.readFile('instrucciones.html', function(err, datos)// En el caso que se cumpla la primera condición se leerá el fichero
    {
        if(err)
        {
            console.log('ERROR'); // Sí hay algún error se mostrará por consola
        }

        respuesta.writeHead(200,{'Content-type':'text/html; charset=utf-8'});
        respuesta.write(datos);
        respuesta.end();
    });

}else if(path == "/escribir"){

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
        //Después de crear la carpeta, crearemos el archivo 'holaMundo.txt'
        fs.appendFile('./Copia/holaMundo.txt', 'Francisco Manuel Carballo', function (err) 
            {
                if (err)
                {
                    throw err;
                }
            console.log('Contenido creado!'); // Lo mostramos x consola
            });
    }else{
        respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });                                                                              
        respuesta.write('La carpeta ya existe.'); // Por el contrario si la carpeta ya existe mostramos el mensaje 'ya existe'
        respuesta.end();// Cerramos la respuesta
    }
}else{
    respuesta.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8 ' });// Por el contrario en la url todo lo que no sea lo descrito anteriormente, nos mostrará un mensaje de error
    respuesta.write('Error no se encuentra la página');
    respuesta.end();
}
    
}).listen(8083, "127.0.0.3");// Puerto de escucha y la ip
console.log('Servidor ejecutándose: 8083, "127.0.0.3" '); // Mensaje por consola de que el servidor se está ejecutando


// Declaramos la función para calcular la letra del dni
function calcularDNI(numero){
    let letra;
    let resto = (numero % 23);

    switch (resto) {
        case 0:
            letra = "T";
            break;
        case 1:
            letra = "R";
            break;
        case 2:
            letra = "W";
            break;
        case 3:
            letra = "A";
            break;
        case 4:
            letra = "G";
            break;
        case 5:
            letra = "M";
            break;
        case 6:
            letra = "Y";
            break;
        case 7:
            letra = "F";
            break;
        case 8:
            letra = "P";
            break;
        case 9:
            letra = "D";
            break;
        case 10:
            letra = "X";
            break;
        case 11:
            letra = "B";
            break;
        case 12:
            letra = "N";
            break;
        case 13:
            letra = "J";
            break;
        case 14:
            letra = "Z";
            break;
        case 15:
            letra = "S";
            break;
        case 16:
            letra = "Q";
            break;
        case 17:
            letra = "V";
            break;
        case 18:
            letra = "H";
            break;
        case 19:
            letra = "L";
            break;
        case 20:
            letra = "C";
            break;
        case 21:
            letra = "K";
            break;
        case 22:
            letra = "E";
            break;
    
        default:
            break;
    }

    return letra;
}