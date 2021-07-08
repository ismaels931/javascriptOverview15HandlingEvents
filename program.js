console.log("Los manejadores de eventos modernos, contrarios al polling, consisten en un mecanismo que hace que el sistema notifique");
console.log("activamente nuestro código cuando un eventos ocurre. Los navegadores hacen esto permitiéndonos registrar funciones como");
console.log("controladores para eventos específicos.");

window.addEventListener("click", () => {
	console.log("You knocked?");
});

console.log("El objeto 'window' representa la ventana del navegador que contiene el documento HTML. Su método 'addEventListener'");
console.log("registra el segundo argumento que se llamará siempre que ocurra el evento descrito por su primer argumento. En este");
console.log("caso, el segundo argumento es una función que imprime un mensaje en la consola del navegador cuando el usuario hace");
console.log("'click' derecho con el ratón.");

console.log();

console.log("Cualquier elemento del DOM tiene el método 'addEventListener'");

document.querySelector("button").addEventListener("click", () => {
	console.log("Button clicked.");
});

console.log("El método 'removeEventListener' llamado con argumentos similares, elimina un controlador.");

let boton = document.getElementById("sampleRemove");
function once() {
	console.log("Done");
	boton.removeEventListener("click", once);
}

boton.addEventListener("click", once);

console.log("La función pasada como argumento a 'removeEventListener', tiene que ser la misma que se le pasa a 'addEventListener'");

console.log();

console.log("A las funciones de controlador de eventos se les pasa un argumento: el objeto del evento. Este objeto contiene");
console.log("información adicional sobre el evento e.g. si queremos saber qué botón del mouse presionamos, se puede ver la");
console.log("propiedad del botón del objeto de evento");

let anyWay = document.getElementById("anyWay");
anyWay.addEventListener("mousedown", event => {
	if (event.button == 0) console.log("Left button");
	else if (event.button == 1) console.log("Middle button");
	else if (event.button == 2) console.log("Right button");
});

console.log("La información almacenada en el objeto 'event' difiere según el tipo de evento. La propiedad del tipo del objeto");
console.log("siempre contiene una cadena que identifica el evento (como click o mousedown)");

console.log();

console.log("Para la mayoría de los tipos de eventos, los controladores registrados en nodos con hijos también recibirán");
console.log("eventos que suceden en los hijos. Si se hace click en un botón que se encuentra dentro de un párrafo, los");
console.log("controladores de eventos del párrafo también verán el evento del click.");
console.log("Pero si tanto el párrafo como el botón tienen un controlador, el controlador más específico, el que está en");
console.log("el botón, va primero. Se dice que el evento se propaga hacia afuera, desde el nodo donde sucedió hasta el nodo");
console.log("principal de ese nodo y hasta la raíz del documento. Finalmente, después de que todos los controladores");
console.log("registrados en un nodo específico hayan tenido su turno, los controladores registrados en toda la ventana");
console.log("tienen la oportunidad de responder al evento.");
console.log("En cualquier momento, un controlador de eventos puede llamar al método 'stopPropagation' del objeto 'event'");
console.log("para evitar que los controladores de más arriba reciban el evento. Esto puede resultar útil cuando por");
console.log("ejemplo hay un botón dentro de otro elemento en el que se puede hacer clic y no deseamos que los clics en");
console.log("el botón activen el comportamiento de clic del elemento exterior.");
console.log("El siguiente ejemplo registra controladores 'mousedown' tanto en el botón como en el párrafo que contiene");
console.log("el botón. Cuando se hace clic con el botón derecho del ratón, el controlador del botón llama a");
console.log("'stopPropagation', lo que evitará que se ejecute el controlador del párrafo. Cuando se hace clic con otro");
console.log("botón del ratón, se ejecutarán ambos controladores.");

let para = document.querySelector("p");
let button = document.querySelector("button");
para.addEventListener("mousedown", () => {
	console.log("Handler for paragraph.");
});

button.addEventListener("mousedown", event => {
	console.log("Handler for button.");
	if (event.button == 2) event.stopPropagation();
});

console.log("La mayoría de los objetos 'event' tienen la propiedad 'target' que se refiere al nodo donde se originaron.");
console.log("Podemos usar esta propiedad para controlar la propagación. También se puede usar para aplicar el manejador");
console.log("de eventos a un tipo específico de nodo.");

document.body.addEventListener("click", event => {
	if (event.target.nodeName == "BUTTON") console.log("Clicked event target:", event.target.textContent);
});

console.log("Muchos eventos tienen una acción predeterminada asociada. Si hacemos clic en un enlace, se muestra el");
console.log("destino del enlace. Si presionamos la flecha hacia abajo, el navegador desplazará la página hacia");
console.log("abajo. Si hacemos clic con el botón derecho, obtendremos un menú contextual. Y así sucesivamente.");
console.log("Se puede llamar a los controladores de eventos de JS antes de que tenga lugar el comportamiento");
console.log("predeterminado. El método 'preventDefault' del objeto 'event' anula el comportamiento por defecto.");
console.log("Se puede usar para implementar eventos personalizados e.g. atajos de teclado.");

let link = document.querySelector("a");
link.addEventListener("click", event => {
	console.log("Nope.");
	event.preventDefault();
});

console.log();

console.log("Cuando presiamos una tecla, el navegador lanza un evento: 'keydown'. Cuando la soltamos: 'keyup'");

window.addEventListener("keydown", event => {
	if (event.key == "v") document.body.style.background = "violet";
});

window.addEventListener("keyup", event => {
	if (event.key == "v") document.body.style.background = "";
});

console.log("Ahora implementamos un atajo de teclado:");

window.addEventListener("keydown", event => {
	if (event.key == " " && event.ctrlKey) console.log("Continuing!");
});

console.log("Actualmente tenemos dos tipos de dispositivos para señalar un punto de la pantalla: ratones y pantallas táctiles.");

console.log("Mouse click");

window.addEventListener("click", event => {
	let dot = document.createElement("div");
	dot.className = "dot";
	dot.style.left = (event.pageX - 4) + "px";
	dot.style.top = (event.pageY - 4) + "px";
	console.log(event.pageX);
	console.log(event.pageY);
	document.body.appendChild(dot);
});

console.log("Mouse motion");

let lastX;
let bar = document.querySelector("div");
bar.addEventListener("mousedown", event => {
	if (event.button == 0) {
		lastX = event.clientX;
		window.addEventListener("mousemove", moved);
		//event.preventDefault();
	}
});

function moved(event) {
	if (event.buttons == 0) window.removeEventListener("mousemove", moved);
	else {
		let dist = event.clientX - lastX;
		let newWidth = Math.max(10, bar.offsetWidth + dist);
		bar.style.width = newWidth + "px";
		lastX = event.clientX;
	}
}

console.log("Scroll events");

document.body.appendChild(document.createTextNode(
	"supercalifragilisticoespialidoso ".repeat(1000)));

let scrollBar = document.querySelector("#progress");
window.addEventListener("scroll", () => {
	let max = document.body.scrollHeight - innerHeight;
	scrollBar.style.width = `${(pageYOffset / max) * 100}%`;
});

console.log("Focus events");

let comment = document.querySelector("#comment");
let fields = document.querySelectorAll("input");
for (let field of Array.from(fields)) {
	field.addEventListener("focus", event => {
		let text = event.target.getAttribute("data-help");
		comment.textContent = text;
	});
	//Blur -> Desenfocar (clicar fuera del campo)
	field.addEventListener("blur", event => {
		comment.textContent = "";
	});
}

console.log("Load event");

window.addEventListener("load", () => {
	console.log("La página se ha cargado con éxito");
});

console.log();

console.log("Event loop de JS.");
console.log("Para los casos en los que queremos ejecutar una tarea en segundo plano sin que congele la página principal");
console.log("los navegadores brindan 'Web Workers'. Un 'web worker' es un proceso de JS que se ejecuta junto con el");
console.log("script principal, en su propia línea de tiempo. Imaginemos que elevar un número al cuadrado es un cálculo");
console.log("pesado y de larga duración que queremos realizar en un hilo separado. Podríamos crear un archivo llamado");
console.log("'squareworker.js' que responda a los mensajes calculando un cuadrado y enviando un mensaje.");
console.log("Para evitar el problema de tener varios subprocesos con los mismos datos, los 'webworkers' no comparten");
console.log("su ámbito global ni ningún otro dato con el ámbito del script principal, pero el script principal");
console.log("debe comunicarse con los 'webworkers' enviando mensajes. El siguiente código genera un 'webworker':");

/*let squareWorker = new Worker("squareworker.js");
squareWorker.addEventListener("message", event => {
	console.log("The worker responded: ", event.data);
});

squareWorker.postMessage(10);*/

console.log();

console.log("Timers");

let bombTimer = setTimeout(() => {
	console.log("BOOM!");
}, 1000);

if (Math.random() < 0.5) {
	console.log("Defused");
	clearTimeout(bombTimer);
}

let ticks = 0;
let clock = setInterval(() => {
	console.log("tick", ticks++);
	if (ticks == 10) {
		clearInterval(clock);
		console.log("stop");
	}
}, 500);

console.log();

console.log("Algunos eventos tienen el potencial de activarse rápidamente, muchas veces seguidas. Podemos usar 'setTimeout'");
console.log("para que el evento tarde un lapso de tiempo en activarse.");

let textarea = document.querySelector("textarea");
let timeout;
textarea.addEventListener("input", () => {
	clearTimeout(timeout);
	timeout = setTimeout(() => console.log("Typed!"), 2000);
});

console.log("El siguiente código nos informa de la posición del ratón cada 250 ms.");

let scheduled = null;
window.addEventListener("mousemove", event => {
	if (!scheduled) {
		setTimeout(() => {
			document.body.textContent =
				`Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
			scheduled = null;
		}, 250);
	}
	scheduled = event;
});

