// Al igual que XMLHttpRequest, la libreria fetch se utiliza para realizar solicitudes http de manera asíncrona. Es una 
// alternativa más moderna y limpia que XMLHttpRequest.
// La función fetch() recibe como parámetro la URL del recurso al que se quiere hacer la solicitud y devuelve una promesa que
// se resuelve con la respuesta del servidor.
// Una vez que la promesa se haya resuelto se puede usar el método .json() para parsear los datos a un objeto json.

let datosJsonFetch;

fetch('persona.json', {method: 'GET'}) // El método de la solicitud se pasa en un segundo parámetro
.then(resp => resp.json()) // Recibe el valor de la promesa resuelta. Retorna otra promesa
.then((salida) => { // Obtiene los datos de la promesa resuelta (lo del then anterior)
    datosJsonFetch = salida;

    let texto = document.getElementById('edad');
    texto.textContent = datosJsonFetch.edad;
});


fetch('https://api.example.com/create', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' }), // Datos a enviar en la solicitud POST (debe ser una cadena JSON)
  headers: {
    'Content-Type': 'application/json' // Cabecera para indicar que se envían datos en formato JSON
  }
})
  .then(response => {
    // Trabajar con la respuesta
  })
  .catch(error => {
    console.log(error);
  });

/*! IMPORTANTE:

Los errores en la solicitud HTTP antes de que se resuelva la promesa, como errores de red o URLs incorrectas, no son manejados directamente por la cadena de promesas en JavaScript. Estos errores son manejados por la lógica interna de la función fetch. Por ejemplo:

 En el caso de un código de estado 404, la solicitud HTTP se considera exitosa desde la perspectiva de fetch. Si deseas que el bloque catch se ejecute en este caso, debes agregar una verificación adicional para el código de estado HTTP dentro del primer .then y lanzar un error si el código de estado indica un problema. Aquí tienes una corrección:

 fetch("https://rickandmortyapi.com/api/character/999999", { method: 'GET' })
  .then(response => {
    if (!response.ok) {
      throw new Error("Error en la solicitud fetch. Código de estado: " + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("Error en la solicitud fetch:", error);
  });


*/

fetch("https://rickandmortyapi.com/api/character/300", { method: 'GET' })
.then(response => response.json()) // Convierte la respuesta en formato JSON
.then(data => {
  let imagen = document.getElementById("imagen");
  imagen.setAttribute("src", data.image); // Accede a la propiedad 'image' del objeto JSON
  imagen.setAttribute("alt", data.name); // Accede a la propiedad 'name' del objeto JSON
})
.catch(error => {
  console.error("Error en la solicitud fetch:", error);
});


async function obtenerObjeto(id) {
  
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  try {

    const responseAPI = await fetch(url, { method: 'GET' });
    
    if (!responseAPI.ok) {
      throw new Error(`No se pudo obtener la imagen para el ID ${id}`);
    }

    /* Sin await:
    
    fecth me retorna la promesa
    Si la promesa se resuelve primero hay que parsearla.
    Si no viene ok (codigo 200) lanzo un error que lo atrapa el catch de la promesa
    Si hay un error de servidor (500) o de bad request (404) no va a ser atrapado por el catch de la promesa, ya que se toma como caso de exito, indistinto si devuelve un dato o no.

    fetch(url, { method: 'GET' }).then(data =>{

        if(!data.ok) throw new Error(`No se pudo obtener la imagen para el ID ${id}`);

        data.json();
    })
    .then(parseData => responseAPI = parseData)
    .catch(error => console.log(error));
    
    */
    return await responseAPI.json(); // Nos ahorramos un then.
    
  } catch (error) {

    throw error;
  }
}

console.log(await obtenerObjeto(15)); // Gracias a await ya se me esta retornando el dato. Esto no se podría hacer porque await solo se coloca en funciones async.

/* Si usara el then, tendría que tratar el dato en esa funcion: */

obtenerObjeto(15).then(data => console.log(data));

document.getElementById("juego").addEventListener("click", (evento) =>{

  const random = Math.round(Math.random() * 826) + 1

  obtenerObjeto(random)
  .then((data) =>{

    
    let imagen = document.getElementById("imagen");
    imagen.setAttribute("src", data.image); // Accede a la propiedad 'image' del objeto JSON

    document.getElementById("name").textContent = data.name;
    document.getElementById("species").innerHTML = data.species;
    document.getElementById("status").innerHTML = data.status;
    document.getElementById("location").innerHTML = data.location.name;
    console.log(data);

  }).catch((error) => console.log("Surgió un " + error));

});
