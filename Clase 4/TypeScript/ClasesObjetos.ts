import { Accion } from "./Interfaces";

class Persona implements Accion{

    // con private se puede acceder a la variable solo dentro de la clase.
    private nombre:string;

    protected apellido: string;


    constructor(nombre:string, apellido:string){        
        this.nombre = nombre;
        this.apellido = apellido;
    }

    // Se implementan los metodos de la interfaz.
    saludar(): void {
        console.log("Hola");
    }
    
    trabajar(): void {
        console.log("Trabajando");
    }

    // El tipo de dato de retorno se define despues de los parentesis.
    public getNombre():string{
        return this.nombre;
    }

    static metodoEstatico():string{
        return "Soy un metodo estático";
    }
}

let persona1 = new Persona("Juan","Perez");

console.log(persona1.getNombre());
console.log(Persona.metodoEstatico());

class Empleado extends Persona{

    private sueldo: number;

    constructor(nombre:string, apellido:string, sueldo:number){        
        super(nombre, apellido);
        this.sueldo = sueldo;
    }

}