// Un prototipo es una propiedad que poseen todos los objetos que les otorga un mecanismo para la herencia y 
// reutilización de código. Es como un objeto que define funciones base al objeto al que pertenece. Recordar que en 
// JS todo es un objeto.

// Aunque actualmente existan las clases en la sintaxis de JS (desde el 2015), los prototipos se siguen utilizando 
// y son muy importantes, por ejemplo, en frameworks como React y Angular.

// Si por ejemplo se llama a un método que no está en el objeto principal, se buscara en el prototype.

//! POO y herencia con prototipos:

// Función constructora:
function Animal(nombre) {
    this.nombre = nombre;
  }

// Agregar métodos:

Animal.prototype.saludar = function() {
    console.log(`Hola, soy ${this.nombre}.`);
  };
  
// Crear instancias:

const perro = new Animal("Scooby");
const gato = new Animal("Bigotes");

console.log(perro);

gato.saludar();

// Implementar herencia:

function Gato(nombre, color) {

    // Llamar al constructor de Animal con los argumentos apropiados. Call llama a un método de otro objeto pero 
    // con los datos del invocante. Se pasa primero el objeto y luego los parámetros. En este caso se llama al 
    // constructor y se pasa el objeto mismo.

    Animal.call(this, nombre);
    this.color = color;
}

// Establecer el prototipo de Gato como una instancia de Animal:

Gato.prototype = Object.create(Animal.prototype);

// Agregar un método específico de Gato:

Gato.prototype.maullar = function() {
    console.log("Miau");
};

const miGato = new Gato("Coco", "Atigrado");
miGato.saludar();
miGato.maullar(); 

console.log(miGato);
