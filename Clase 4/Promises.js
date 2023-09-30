// Una promesa es un objeto que representa la terminación o el fracaso de una operación asíncrona.
// Se podría decir que representa un valor u operación que puede estar disponible actualemente o en el futuro, por eso promesa.
// Es un código que puede tener varios estados: pendiente (pending), cumplido (resolved) o rechazado (rejected).
// Al ser una operación asíncrona, el código se ejecuta en segundo plano y no bloquea la ejecución del programa.
// El constructor Promise recibe como parámetro una función (callback) con dos parámetros: resolve y reject. 
// Estos parámetros, a su vez, son callbacks. El primero se ejecuta cuando la promesa se cumple y el segundo cuando 
// se rechaza. 

let promesa = new Promise(function(resolve, reject){

    //let condicion = false;
    let condicion = true;

    if(condicion){
            
        resolve("Se resolvió correctamente");

    }else{

        reject("Ocurrió un error");
    }
});

// Then() traduce como entonces o 'una vez que'. Se ejecuta una vez que la promesa se haya resuelto exitosamente.
// El método then() recibe una función como parámetro para el caso resuelto.
// El parametro de la función que recibe el método then() es el valor que esté dentro de la función resolve().
promesa.then(exito => console.log(exito));

// El método catch() recibe una función como parámetro para el caso de error.
// El parametro de la función que recibe el método catch() es el valor que esté dentro de la función reject().
// Si no hay función reject(), el método catch() no se va a ejecutar, por ende, no se escribe.
promesa.catch(error => console.log(error));

// Normalmente se va a encontrar de la siguiente menera:

// Los callbacks que se proporcionan en then() y catch() solo pueden recibir un parámetro.
promesa.then(resolve => console.log(resolve)).catch(error => console.log(error));

//! Utilizando setTimeout con promesas:

let promesa2 = new Promise((resolve) => {

    console.log("Inicio de la promesa");
    setTimeout(() => resolve("Promesa y timeout"), 3000);
    console.log("Fin de la promesa");
});

promesa2.then(mensaje => console.log(mensaje));

//! Otro ejemplo con Promise:

let promesa3 = new Promise((aceptado, rechazado) => {

    let numero = 5;

    if(numero % 2 == 0){

        aceptado("El número es par");

    }else{

        rechazado("El número es impar");
    }

});

promesa3.then(resolve => console.log(resolve)).catch(error => console.log(error));


//! Utilizando async con promesas:

// async indica que se está declarando una función asincrona. async retorna una promesa. 
async function miFuncionConPromesa(){

    // Es como si se estaria usando resolve().
    return "Saludos con promesa y async"; // Va a ser el parametro de la función que recibe el método then().
}

miFuncionConPromesa().then(valor => console.log(valor));

//! Utilizando async y await con promesas:

// await solo se puede usar dentro de una función declarada con async.
// Si hay más de una promesa, se ejecutan en paralelo, es decir, no se espera a que se resuelva una para ejecutar la otra.
// Gracias al await, se puede esperar a que se resuelva una promesa para ejecutar la otra.
// await ESPERA LA PROMESA RESUELTA.

async function funcionConPromesaYAwait(){
    
        let miPromesa = new Promise(resolve => {
    
            resolve("Promesa con await");
        });
    
        // await manda a llamar a la promesa y espera a que se resuelva (por eso no se usa then).
        // El valor retornado es el que está en los parámetros del callback.
        console.log(await miPromesa);

        //miPromesa.then(mensaje => console.log(mensaje)); // Si no se usa await
}

funcionConPromesaYAwait(); //Aqui no uso un await o un then porque la funcion no me retorna ningún dato.

async function funcionConPromesaAwaitTimeout(){

    let miPromesa = new Promise(resolve => {

        setTimeout(() => resolve("Promesa con await y timeout"), 3000);
    });

    console.log(await miPromesa);

    console.log("Fin de la función"); // No se va a ejecutar hasta que se resuelva la promesa.
}

funcionConPromesaAwaitTimeout();

async function returnDaTaAsync(){

    let miPromesa = new Promise(resolve => {

        setTimeout(() => resolve({nombre: "Agustin", ciudad:"Mar del Plata"}), 3000);
    });

    /*
        Si uso el then, voy a indicar una función que trabaje con el objeto en el parámetro de la funcion resolve de arriba.

        Si uso un await, ya me retorna el dato y despúes decido que hacer con el. Lo mismo que en el then, pero me permite manejarlo sin tener que estar dentro de una función then.
    */

    return await miPromesa; // Con await espero que se resuelva la promesa. Si se resuelve me retorna lo que está dentro del resolve. Una vez se retorna, retorno el dato de la función returnDaTaAsync. Es como si hubiese un doble return. Primero se retorna el dato de la promesa y despúes el return de la función.
}

/* A diferencia del método anterior este SI retorna algo. Como quiero el resultado y no estoy dentro de una función async, tengo que usar then. Si estuviera dentro de una función asincrónica podría hacer lo siguiente:

console.log(await funcionConPromesaAwaitTimeout());
*/

returnDaTaAsync().then(data => console.log(data)); // Cuando uso el then estoy diciendo "hace esto cuando la promesa se resuelve". La promesa resuelta indica el retorno de returnDaTaAsync(). Recordar que async siempre me retorna una promesa. En este caso se tuvo que usar then porque estamos fuera de una función asincronica.


//! Uso de async concurrente

async function asyncConcurrente(){


    let promesa1 = new Promise(resolve =>{
        setTimeout(()=>resolve("Hello "),4000);
    });

    let promesa2 = new Promise(resolve =>{
        setTimeout(()=>resolve("World!"),2000);
    });

    // Promise.all() recibe como parámetros promesas que van a iniciar "al mismo tiempo", de manera concurrente.
    // Este método va a esperar que todas las promesas se resuelvan antes de continuar la ejecución.
    const[dato, dato2] = await Promise.all([promesa1, promesa2]);

    console.log(dato + dato2);
}

asyncConcurrente();