##*Funcionamiento básico de JavasCript y Event Loop*


JavaScript va leyendo de arriba hacia abajo, pero cuando encuentre una función, retrocede a la declaración de dicha función para ejecutarla. Cuando la encuentra lee su contenido. Si una función tiene otra dentro, hace lo mismo.

###Execution Context

Se genera al ejecutar una función **(Function Execution Context - FEC)** y se destruyen al terminarla. En contexto general es el archivo de JavaScript **(Global Execution Context - GEC)**. Primero se crea el contexto y luego se ejecuta (va leyendo leyendo las variables y sus contenidos). Cada context tiene su scope.


###Lexical Enviornment

Es un objeto que contiene toda la información del Execution Context y ***se genera en la Fase de creación del mismo***. La información que contiene es:

- *Variables / arguments* del Execution Context que genera una función. Por ejemplo:
```
GlobalLexicalEnvioronment = {
    caminar : function(){}
    vmiVariable: 'Hola soy una variable'
}
```
- Variables del *Entorno Léxico* que lo rodea o contiene-

Mientras el Execution Context pasa por sus diferentes fases:

1. En la *Fase de creación* del Execution Context los valores son **undefined**. Es decir, se van a guardar los valores de los variables como undefined. Por ejemplo: `caminar : undefined`
2. En la *Fase de ejecución* estos valores, mientras se va leyendo, se van rellenando.
3. En la *Fase de ejecución* se le asigna un valor a *this*.

**¿Qué es el hoisting?** Es cuando, en la fase de creación del Execution Context, los valores por defecto de las variables son indefinidos.

**¿Qué es Binding?** Es cuando, en la fase de ejecución del Exectuion Context, se le asigna un valor a *this*. Este último es un objeto que hace referencia al Execution Context, por ende, sus valores dependen del socope y del contexto creado. 

### Registro

Cuando se genera un *Execution Context* se crea un registro. Este se asocia y guarda varios datos:

- Cuándo y en qué archivo se ha generado ese Execution Context.
- Relaciona el Execution Context actual con el Execution Context que lo rodea.
- Asocia el *Lexical Envioronment* de ese Execution Context.

El registro va a guardar todos los datos del contexto, los nombres de las funciones que lo crean, el nombre del archivo donde se está ejectuando, la próxima linea que tiene que ejecutarse (numericamente) y el contexto al que pertenece (lo asocia al global u otro). **El registro es la unidad minima de la CallStack**. El registro principal es el del contexto global y se llama ***anonymous***.

### CallStack

Para repasar: Al ejecutar un Archivo.js se crea un contexto general **(GEC)** y entorno léxico con las variables indefinidas. Al mismo tiempo se genera un registro. Todo eso se guardar en la ***CallStack***. Luego que se creo el contexto se va ejecutando linea por linea rellenando las variables. Cuando encuentra la invocación de una función se crea su contexto **(FEC)** y entorno léxico. Al mismo tiempo, se crea un registro asociandolo a su contexto externo ( en este caso el global). Este segundo resgistro se añade a la CallStack sobre el anterior. Cuando termina de ejecutar esa función ( si es que no hay otra dentro suyo), se destruye el registro con todo su contexto y entorno léxico.

***Todo lo explicado hasta acá pertenece al Engine de JavaScript***

### Event Loop

Cuando se abre JavaScript en el navegador se despliega un mecanismo nuevo llamado *Event Loop*. Es un mecanismo extra que añade un navegador cuando ejecuta JavaScript haciendo que la aplicación no se bloquea al esperar la respuesta. Lo componen varias partes:

- ***WebAPIs***
- ***Call Stack***
- ***Task Queue***
- ***Render Pipeline***
- ***Event Loop***

Todo se genera en la **CallStack**. Luego los datos van a ir "girando" por cada una de las diferentes partes, hasta que todo vuelva a la CallStack.

**Aclaración importante**: setTimeout y Promise **no** son parte de JavaScript, sino de las **WebAPIs**. Estás últimas son acciones que puede ejecutar un navegador y añadirlas a la CallStack ayudando a optimizar el rendimiento de una web. *Le pertenecen al navegador*. Por ejemplo:

```
console.log("Task 1) -> Es una tarea de JavaScript

setTimeout(()=> console.log("Task 2"), 0) -> Es una tarea de la WebAPI

Promise.resolve().then(()=> console.log("MicroTask 1)) -> Es una microtarea de la WebAPI
```

####Task Queue (Cola de tareas)

Una **tarea** es una acción pesada que debe ejecutar el navegador y se ordenan en la Task Queue. Las cosas que generan una tarea, generalmente, pueden ser:

- Leer código JavaScript.
- WebAPI (setTimeout, setInterval, DOM, fetch)..

Una **microtarea** es una acción de las WebAPIs que son más sensillas, tienen mayor prioridad y se ejecutan entre tareas. Las cosas que generan una microtarea, generalmente, pueden ser:

- Callbacks de promesas.
- Async / Await.
- Mutation Observer.
- Intersection Observer.

***Estas tareas y microtareas se van a ordenar en la Task Queue.***

Las prioridades ordenadas de mayor a menor son:

1. Tareas de JavaScript.
2. Microtareas de la WebAPI.
3. Tareas de la Webapi.

Las tareas de JavaScript se van a alojar en la CallStack desde un inicio. Las tareas y microtareas de la WebAPI se van a alojar en la Task Queue, posicionandose las microtareas en orden más prioritario.

Todo lo anterior, excepto las tareas de JavaScript, se ejecuta a travez del ***Render Pipeline***.

####Render Pipeline

Controla el tiempo cuándo se actualiza y cómo se renderiza el navegador para mostrar los cambios:

1. Recopila la información de los cambios de la página.
2. Construye un modelo de representación de la página (DOM, imágenes, estilos, etc.).
3. Crea un **Frame**, una imagen en pantalla mostrando la web despúes de ese cambio.

***Al proceso de creación de este Frame, se lo llama renderizado*** y debe tardar menos de 16.67ms para poder lograr 60 frames por segundo (60fps).

A la hora de crear estas imagenes pasa lo siguiente:

1. Se determina la forma, tamaño y posición de los elementos (Box-model).
2. Se aplican los estilos CSS.
3. Se asigna un color a cada pixel.
4. Se aplican efectos gráficos extras, como sombreas, bordes redondedos y transform.

Por acá tambien pasan las tareas y microtareas, que no siempre serán cambiar en el DOM, para que pueda calcularse el tiempo de ejecución de dichas funciones.

####Event Loop

Gestiona las tareas generadas por WebAPIs y las añade a la CallStack.

- Comprueba si hay tareas pendientes en la Cola de tareas.
- Si hay una Tarea o Microtarea pendiente la añade a la CallStack.
- El tiempo de ejecución es dictado por la Render Pipeline.
- Si no hay una Tarea pendiente se mantiene en espera.
