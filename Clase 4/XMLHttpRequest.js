// XMLHttpRequest es un objeto JavaScript que fue diseñado por Microsoft y adoptado por Mozilla, Apple y Google. 
// Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. 
// Una página web puede actualizar sólo una parte de la página sin interrumpir lo que el usuario está haciendo. 
// XMLHttpRequest es ampliamente usado en la programación AJAX. puede ser usado para recibir cualquier tipo de dato,
// no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).

let datosJson;
let xhr = new XMLHttpRequest();

// El método open() inicializa una solicitud recién creada o reinicializa una existente. Llamar a este método para una 
// solicitud ya activa (una para la cual ya se ha llamado a open() ) es el equivalente a llamar a abort().
// El primer parametro indica que método se va a utilizar para la solicitud, el segundo la URL y el tercero si la operación
// es asincrónica o no.
xhr.open('GET', "persona.json", true);

xhr.responseType = 'json'; // Se le indica que tipo de respuesta se espera.

// El evento onload es un evento que se desencadena cuando la solicitud XMLHttpRequest se completa exitosamente. Se le indica
// al código JavaScript que se ha recibido una respuesta exitosa y los datos están listos para ser procesados.
// La función que aloje el evento va a ejecutarse cada vez que se complete la solicitud.
xhr.onload = function(){

    if(xhr.status === 200){
        datosJson = xhr.response;
        let texto = document.getElementById("nombre");
        texto.textContent = datosJson.nombre;
    }
    else{
        console.log("Se maneja el error");
    }
}

xhr.send(); // Se envía la solicitud configurada.