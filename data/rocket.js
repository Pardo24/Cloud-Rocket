class Rocket { // clase para tener una plantilla
    constructor(x, y, anchura, altura, imagen){
        this.x= x;
        this.y=y;
        this.anchura= anchura;
        this.altura=altura;
        this.imagen= imagen;
    }
    dibujar(){
        ctx.drawImage(this.imagen, this.x, this.y, this.anchura, this.altura);
    }
    borrar(){
        ctx.clearRect(this.x,this.y,this.anchura,this.altura)
    }

    moverRocket(key){
        if(key === "ArrowLeft"){
            if(this.x > 0){
                this.x = this.x - 25;
            }
        }
        if(key=== "ArrowRight"){
            if(this.x < 900){
                this.x = this.x + 25;
            }
        }
    }

}