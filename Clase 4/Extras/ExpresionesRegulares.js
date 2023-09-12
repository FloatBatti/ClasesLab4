// Las expresiones regulares son patrones utilizados para encontrar una determinada combinación de caracteres dentro de una
// cadena de texto.

let cadena =
  "Dolor quis qui laborum enim dolore fugiat ullamco proident magna qui magna anim nostrud sint ipsum. Sunt adipisicing duis amet est amet ea. Enim velit non qui pariatur veniam sunt velit id qui dolor velit id est. Dolore reprehenderit sit dolore veniam aute enim laborum. Do non consequat fugiat aute labore aliqua non voluptate ut tempor tempor aute duis. Veniam nostrud labore reprehenderit reprehenderit proident pariatur. Aliqua pariatur tempor tempor veniam exercitation.";

let exr = new RegExp("lorem ip", "i"); // i = insensible a mayusculas y minusculas. Se llama bandera.

// Otras banderas:

// g = global, busca todas las coincidencias
// m = multilinea, busca en todas las lineas

let exr2 = /dolor/; // Otra forma de crear una expresion regular

console.log(exr.test(cadena)); // test() devuelve true o false si encuentra o no la expresion regular en la cadena de texto.

console.log(exr.exec(cadena)); // exec() devuelve un array con la informacion de la busqueda. Si no encuentra nada devuelve null.

console.log(exr2.exec(cadena));

let exr4 = /qui{1,2}/gi; // gi = global e insensible a mayusculas y minusculas. Los corchetes indican las veces que se tiene que repetir la coincidencia. En este caso, se tiene que repetir entre 1 y 2 veces.

console.log(exr4.exec(cadena));

let exr5 = /qui{1,2}?/gi; // El signo de interrogacion hace que la busqueda sea no greedy, es decir, que se detenga en la primera coincidencia.

console.log(exr5.exec(cadena));

let exr6 = /qui{3}/gi; // Tiene que aparecer 3 veces seguidas si o si.

console.log(exr6.exec(cadena));

let exr7 = /qui{2,}/gi; // Tiene que aparecer 2 veces seguidas o mas.

console.log(exr7.exec(cadena));
