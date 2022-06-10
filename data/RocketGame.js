

let rocketImagen= new Image();
rocketImagen.src = "../img/rocket.png";

let rocket = new Rocket(450, 530, 15, 35, rocketImagen)
let nube = new Nube(posicion, -50, 70, 30,  )





const tecla = (x) => { // para que registre las teclas que apretes
    e.preventDefault(); //para que no haga cosas raras por defecto

}

document.addEventListener("keydown", logkey) //event listener que esta atento a las teclas pulsadas
window.addEventListener("load", cargaInicial);