//! Llamada asíncrona con setTimeout:

// setTimeout es una función que recibe como parámetro una función y un tiempo expresado en milisegundos.
// Un proceso sincrónico es aquel que se ejecuta en el mismo orden en el que se encuentra en el código. Asíncrono lo contrario.
// Las funciones asincronas nos permiten ejecutar código sin detener la ejecución del programa, es decir, en segundo plano.
// Para ver más detalle de funciones asincronas ver el archivo Promesas.js.

console.log("Ejecución sincrona 1");

setTimeout(() => console.log("Código asíncrono con setTimeout") , 3000);

console.log("Ejecución sincrona 2");

//! Llamada asíncrona con setInterval:

// setInterval es una función que recibe como parámetro una función y un tiempo expresado en milisegundos.
// Ejecuta la función cada cierto tiempo indicado en el segundo parámetro.

let contador = 0;

let reloj = () => {

    let fecha = new Date();

    console.log(`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`);

    contador++;

    if(contador == 5) {

        clearInterval(intervalo); // Detiene la ejecución de la función setInterval.
    }
}

let intervalo = setInterval(reloj, 1000);

