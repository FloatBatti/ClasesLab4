let promesa2 = new Promise((resolve) => {

    console.log("Inicio de la promesa");
    setTimeout(() => resolve("Promesa y timeout"), 3000);
    console.log("Fin de la promesa");
});

promesa2.then(mensaje => console.log(mensaje));
