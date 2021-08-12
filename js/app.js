class Producto {
    constructor (nombre,precio,stock,categoria,color){
        this.nombre=nombre;
        this.precio=parseFloat(precio);
        this.stock=Number(stock);
        this.categoria=categoria;
        this.color=color;
    }
    cambiarNombre(nombre){
        this.nombre=nombre
    }
    consultarStock(){
        if (this.stock > 0) return true;
    }
}
do {
    switch (Number(prompt('Comprar[1] | Invertir la frase[2] | calcular las cuotas[3] | adivina el numero[4] | salir [5] '))) {
      case 1:
        palabra = prompt('Ingrese una palabra');
        alert(`Su palabra cuenta con: ${contVocal(palabra)} vocales`)
        
        break;
      case 2:
        palabra = prompt('Ingrese una frase para revertirla');
        alert(`LA frase original:${palabra}, nueva frase: ${revertFrase(palabra)}`)
        break;
      case 3:
        let monto = Number(prompt('Ingrese una monto'));
        let cantidad = Number(prompt('Ingrese la cantidad de cutotas a pagar'));
        let interes = Number(prompt('Ingrese el interes de las cuotas'));
        cuota = cuotas(cantidad, monto,interes);
        console.log(cuota);
        alert(`Debe pagar $${Math.ceil(cuota)} cada cuota`)
        break;
      case 4:
        alert('Juego adivina el número')
        do {
          if (adivinaNum(Number(prompt('Ingrese un numero entre el 1 y 5')))) {
            alert('Acertaste!')
            break;
          } else {
            intentos--;
            alert(`Oh no! Ese no era el numero!, cantidad de intestos restantes: ${intentos} `);
          }
        } while (intentos > 0);
        break;
      case 5:
        alert('Gracias por usar nuetro programa');
        salida=true;
        break;
      default:
        alert = confirm('Esa opcion no existe!')
        salida = confirmSalida();
        break;
    }
  } while (salida == false);
producto1= new Producto('');