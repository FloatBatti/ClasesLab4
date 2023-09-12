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


async function obtenerImagenPorID(id) {

  try {

    const url = `https://rickandmortyapi.com/api/character/${id}`;

    const responseAPI = await fetch(url, { method: 'GET' });

    if (!responseAPI.ok) {
      throw new Error(`No se pudo obtener la imagen para el ID ${id}`);
    }

    const data = await responseAPI.json(); // Nos ahorramos un then.

    return data;

  } catch (error) {

    throw error;
  }
}


document.getElementById("juego").addEventListener("click", (evento) =>{

  const random = Math.round(Math.random() * 826) + 1

  obtenerImagenPorID(random)
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
