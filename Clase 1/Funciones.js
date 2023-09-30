// Tipo de dato function. Las funciones son un tipo de dato especial en JavaScript. 
// Se pueden asignar a variables y pasarlas como parámetros a otras funciones.

function miFuncion() { console.log("Hola"); }

miFuncion(); // Imprime "Hola"

// Existen también las funciones anónimas, que no tienen nombre. Se asignan a variables.
// Se utilizan para pasarlas como parámetros a otras funciones.

const miFuncion2 = function() { console.log("Hola de forma anónima"); }

miFuncion2(); 

// También se pueden definir funciones anónimas utilizando arrow functions, utilizando expresiones lambda.
const miFuncion3 = () => console.log("Hola de forma anónima con arrow function");

miFuncion3();

// Arrow function con parámetros. Devuelve la suma de los parámetros. Se pueden dar valores por defecto a los parámetros.
const add = (a = 0, b = 0) => a + b; 

console.log(add(2, 3)); // Imprime 5


// Funciones self-invoking:

// Son funciones que se invocan a sí mismas. Se definen entre paréntesis y se invocan inmediatamente. Los parámetros se 
// pasan entre los paréntesis de la función ubicados al final de esta.

(function(mensaje) {

    console.log(mensaje);

})("Hola desde una función self-invoking");

//! Parámetros REST y SPREAD:

// Parámetros REST:

// Se utilizan para pasar un número indeterminado de parámetros a una función. Se definen con tres puntos antes del nombre 
// del parámetro.

function parametrosRest(a, b, ...c) {

    console.log(a);
    console.log(b);
    console.log(c);
}

parametrosRest(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Parámetros SPREAD:

// Se utilizan para pasar un número indeterminado de parámetros a una función. Se definen con tres puntos antes del nombre
// del parámetro. Se utilizan para pasar un array como parámetro a una función.

function parametrosSpread(a, b, c, d, e) {

    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
}

let numeros = [1, 2, 3, 4, 5];

parametrosSpread(...numeros);

//! Funciones callback:

// Son funciones que se pasan como parámetros a otras funciones. Se utilizan mucho en JavaScript para ejecutar código asíncrono.

function miFuncion4(callback) {

    console.log("Hola desde miFuncion4");

    callback();
}


miFuncion4(function() { console.log("Hola desde la función callback"); }); // Se pasa una función anónima como parámetro.

function mostrarResultado(resultado) {

    console.log(resultado);
}

function sumar(a, b, callback) {

    let resultado = a + b;

    // Se llama a una función definida anteriormente.
    callback(resultado);
}

sumar(numero, 3, mostrarResultado);

sumar(4,4, mostrarResultado);




