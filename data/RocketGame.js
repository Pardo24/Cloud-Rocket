
// Draw gameArea object
// Set the canvas dimensions 
// start, clear, and stop functions


canvas.style.backgroundColor= "lightyellow";

let rocketImagen= new Image();
rocketImagen.src = "../img/rocket.png";

let nube1Imagen= Image();
    nube1Imagen.src = "../img/nube1.png";

let nube2Imagen= Image();
    nube2Imagen.src = "../img/nube2.png";

let nube3Imagen= Image();
    nube3Imagen.src = "../img/nube3.png";

let rocket = new Rocket(450, 530, 15, 35, rocketImagen)
let nube = 






const tecla = (x) => { // para que registre las teclas que apretes
    e.preventDefault(); //para que no haga cosas raras por defecto

}

document.addEventListener("keydown", logkey) //event listener que esta atento a las teclas pulsadas
window.addEventListener("load", cargaInicial);