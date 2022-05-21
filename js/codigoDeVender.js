class productos{
    constructor(marca,nombre,precio,cantidad){
        this.marca = marca;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const listaDeProductos = [
    new productos("casio","Calculadora 000",15.5,10), 
    new productos("casio2","Calculadora 111",17,6), 
    new productos("casio7","Calculadora 333",155.5,2),
    new productos("casio77","Calculadora 444",2.8,1)
];

let opcion = 0;


function generarMensaje(listaDeProductos){
    let mensaje = "Bienvenido a la tienda que desea comprar:\n";
    listaDeProductos.forEach((elemento,i) =>{
        mensaje += (`${i+1}- Marca ${elemento.marca}\n   Nombre: ${elemento.nombre} \n   Precio: ${elemento.precio}\n   Cantidad: ${elemento.cantidad}\n\n`);
    });
    mensaje += "X- Salir"
    return mensaje;
}


do{
    if(listaDeProductos.some((listaDeProductos)=>listaDeProductos.cantidad != 0)){
        opcion = prompt(generarMensaje(listaDeProductos));
        if(opcion <= listaDeProductos.length && opcion > 0){
            let cantidad = prompt("Ingrese la cantidad que desea comprar de: " + listaDeProductos[opcion-1].nombre)
            if (cantidad <= listaDeProductos[opcion-1].cantidad){
                alert("Compra realizada");
                listaDeProductos[opcion-1].cantidad -= cantidad;
                if(listaDeProductos[opcion-1].cantidad == 0){
                    listaDeProductos.splice(opcion-1,1);
                }
            }else{
                alert("Lo sentimos no tenemos tanto producto");
            }
        }else if(opcion.toUpperCase() != "X"){
            alert("opcion no valida")
        }
    }else{
        opcion = prompt("Existencias agotadas \nX- salir")
    }
}while(opcion.toUpperCase() != "X") 