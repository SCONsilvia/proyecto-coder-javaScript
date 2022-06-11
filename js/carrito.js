/*Codigo repetido de codigoDeVender.js para que el carrito funcione en index */

let carrito = document.getElementsByClassName("carrito__icono");
const meterArray = (tipoProducto) => tipoProducto.split("/");


class productos{
    constructor(imagen,marca,titulo,precio,tipo,id){
        this.imagen = imagen;
        this.marca = marca;
        this.titulo = titulo;
        this.precio = precio;
        this.tipo = tipo;
        this.id = id;
    }
}

const listaDeProductos = [
    new productos("imagenes/Calculator-bro.png","Casio","Casio FX-991SPX II",32.89,meterArray("cientifica"),1), 
    new productos("imagenes/Calculator-bro.png","Casio","Casio FX-82MS",16.80,meterArray("cientifica"),2), 
    new productos("imagenes/Calculator-bro.png","Canon","Canon MP1211-LTSC",76.06,meterArray("impresora integrada"),3),
    new productos("imagenes/Calculator-bro.png","Casio","Casio FR-2650",50.08,meterArray("impresora integrada"),4),
    new productos("imagenes/Calculator-bro.png","Canon","Canon TX-220TSII",15.00,meterArray("estandar"),5),
    new productos("imagenes/Calculator-bro.png","Casio","Casio HL-815",9.37,meterArray("bolsillo"),6),
    new productos("imagenes/Calculator-bro.png","Olivetti","Olivetti Logos 902",79.00,meterArray("impresora integrada"),7),
    new productos("imagenes/Calculator-bro.png","Olivetti","Olivetti Summa 60",40.00,meterArray("mesa"),8),
    new productos("imagenes/Calculator-bro.png","Olivetti","Olivetti Summa 301",15.05,meterArray("impresora integrada/bolsillo"),9),
    new productos("imagenes/Calculator-bro.png","Casio","Casio FX 260 Solar II",16.80,meterArray("cientifica/solar"),10), 
    new productos("imagenes/Calculator-bro.png","Casio","CASIO PRIZM FX-CG50",80.99,meterArray("cientifica/grafica"),11), 
    new productos("imagenes/Calculator-bro.png","Ibico","Ibico 081X",15.99,meterArray("bolsillo/estandar"),12), 
    new productos("imagenes/Calculator-bro.png","Ibico","Ibico 212X",23.78,meterArray("mesa"),13), 
    new productos("imagenes/Calculator-bro.png","Ibico","Ibico 1491X",83.78,meterArray("impresora integrada"),14),
    new productos("imagenes/Calculator-bro.png","Hp","HP 2AP18AA#ABA",129.00,meterArray("cientifica/grafica"),15), 
    new productos("imagenes/Calculator-bro.png","Hp","HP 50g",321.00,meterArray("cientifica/grafica"),16),
    new productos("imagenes/Calculator-bro.png","Casio","Casio FX-9750gIII",56.08,meterArray("cientifica/grafica/solar"),17), 
    new productos("imagenes/Calculator-bro.png","Casio","Casio FX 260 Solar II",56.08,meterArray("cientifica/solar"),18), 
];


/*Ocultar o mostrar el carrito de compra*/
carrito[0].addEventListener("click",()=>{
    let vistaCarrito = document.getElementsByClassName("carrito__vista");
    /* expresion ? si : no */
    vistaCarrito[0].style.visibility = vistaCarrito[0].style.visibility != "visible"? "visible": "hidden";
})

class CarritoDeCompra{
    constructor(arrayDelStorage, arrayDelStorageCantidad){
        this.productos = [];
        this.subTotal = 0;
        this.cantidad = [];
        this.mostraProductosEnElCarrito(arrayDelStorage,arrayDelStorageCantidad);
    }

    mostraProductosEnElCarrito(arrayDelStorage,arrayDelStorageCantidad){
      /*   let i = 0; */
        let j = 0;
        for(let producto of arrayDelStorage){
            for(let i = 0; i < arrayDelStorageCantidad[j]; i++){
                this.agregarAlCarrito(producto);
            }
            j++;
        }
    }

    mensaje(mensaje){
        Toastify({
            text: mensaje,
            duration: 1000,
            gravity: "bottom", 
            position: "right", 
            style: {
              background: "linear-gradient(to right, rgb(138 0 176), rgb(201 61 127))",
            }
          }).showToast();
    }

    aumentarODisminuir(id,index,opcion){
        let cantidad = document.getElementById(`cantidadDeProducto${id}`);
        let precio = listaDeProductos.find((elemento) => elemento.id == id).precio;
        this.cantidad[index] += opcion;
        if(this.cantidad[index] == 0){
            let elementoAEliminar = document.getElementById(`c${id}`);
            this.eliminar(elementoAEliminar);
        }else{
            cantidad.innerHTML = this.cantidad[index];
            /*Ajustando los precios*/
            let productoPrecio = document.getElementById(`cp${id}`);
            let productoNuevoPrecio = parseFloat(productoPrecio.textContent) + (precio * opcion);
            productoPrecio.innerHTML = productoNuevoPrecio.toFixed(2);
        }
        this.calcularYPintarSubtotal(precio * opcion)
    }

    calcularYPintarSubtotal(valor){
        this.subTotal += (valor);
        let subTotal = document.getElementById("subTotal");
        if (this.subTotal < 0){
            this.subTotal = 0
        }
        subTotal.innerHTML = this.subTotal.toFixed(2);
    }

    agregarAlCarrito(id){
        let cantidadBusquedaIndice = this.productos.findIndex((elemento) => elemento == id)
        if(cantidadBusquedaIndice != -1){
            this.aumentarODisminuir(id,cantidadBusquedaIndice,+1);
        }else{

        
            let listaCarrito = document.getElementById("productosCarrito");
            let elementoDeLaListaDeProductos = listaDeProductos[parseInt(id) - 1];
            let productoAgregado = document.createElement("div");
            productoAgregado.className = "productoCarrito";
            productoAgregado.id = `c${id}`;
            productoAgregado.innerHTML = `
            <a class="quitarProducto" id="elemento${id}">
                <i class="fa-solid fa-circle-xmark"></i>
            </a>
            <div class="contenedorImagenCarrito">
                <img src="${elementoDeLaListaDeProductos.imagen}">
            </div>
            <div class="productoCarrito__informacion">
                <h2 class="productoCarrito__informacion__titulo">${elementoDeLaListaDeProductos.titulo}</h2>
                <div class="cantidadPrecio">
                    <div class="cantidad">
                        <a class="disminuirCantida flecha${id}">
                            <i class="fa-solid fa-angle-left"></i>
                        </a>
                        <p id="cantidadDeProducto${elementoDeLaListaDeProductos.id}">1</p>
                        <a class="aumentarCantida flecha${id}">
                            <i class="fa-solid fa-angle-right"></i>
                        </a>
                    </div>
                    <p class="productoCarrito__informacion__precio" id = "cp${id}">${elementoDeLaListaDeProductos.precio}</p>
                </div>
            </div>`
            listaCarrito.appendChild(productoAgregado);
            /*Agregando cantidad en el array*/
            this.cantidad.push(1);
            /*Agregando el escuchado para los botones aumentar cantidad y disminuir */
            let aumentarCantida = document.getElementsByClassName(`flecha${id}`);
            aumentarCantida[1].addEventListener("click", () => {this.flechasDelCarrito(id, this.productos.findIndex((elemento) => elemento == id),+1)});
            aumentarCantida[0].addEventListener("click", () => {this.flechasDelCarrito(id, this.productos.findIndex((elemento) => elemento == id),-1)});
            /*Agregando de una vez el escuchado para el boton eliminar producto del carrito*/
            let elementoAEliminar = document.getElementById(`elemento${id}`)
            elementoAEliminar.addEventListener("click", () => {this.eliminarDelCarrito(productoAgregado)});

            this.calcularYPintarSubtotal(elementoDeLaListaDeProductos.precio);
            this.productos.push(id);


        }
    }

    eliminar(elemetoAEliminar){
        /*EL padre es el que debe eliminar a su hijo */
        let padre = elemetoAEliminar.parentNode;
        padre.removeChild(elemetoAEliminar);  

        /*restar al subtotal */
        let elemento = elemetoAEliminar.id;
        elemento = elemento.slice(1);//te da un segmento del arreglo desde la posicion que tu digas hasta una cantidad de elementos
        let valor = listaDeProductos[parseInt(elemento) - 1].precio;

        let arrayElementoAEliminar = this.productos.indexOf(elemento);/*Me busca el elemento y me devuelve la pocision en el array */
        this.calcularYPintarSubtotal(-valor * this.cantidad[arrayElementoAEliminar])

        this.productos.splice(arrayElementoAEliminar,1)/*borra desde la pocision que yo le de un numero de cantidad de elementos */
        this.cantidad.splice(arrayElementoAEliminar,1)
    }
    eliminarDelCarrito(productoAgregado) {
        let cantidad = productoAgregado.id.slice(1);
        let pocision = this.productos.indexOf(cantidad);
        let mensaje = this.cantidad[pocision] == 1? "Eliminaste un producto": `Eliminaste ${this.cantidad[pocision]} productos`
        this.eliminar(productoAgregado);
        this.mensaje(mensaje);
    }

    flechasDelCarrito(id,index,opcion) {
        this.aumentarODisminuir(id, index, opcion);
        let mensaje = opcion == 1 ? "Agregaste un producto": "Eliminaste un producto";
        this.mensaje(mensaje);
    }

    botonAnadirAlCarrito(id) {
        this.agregarAlCarrito(id);
        this.mensaje("Agregaste un producto");
    }
}

function cargarAlCarrito(){
    let arrayDeProductosSacadoDelStorage
    if(localStorage.getItem("productos")){
        arrayDeProductosSacadoDelStorage = JSON.parse(localStorage.getItem("productos"));
        arrayDeCantidadSacadoDelStorage = JSON.parse(localStorage.getItem("cantidad"));
    }else{
        arrayDeProductosSacadoDelStorage = [];
        arrayDeCantidadSacadoDelStorage = [];
    }
    let carritoDeCompra = new CarritoDeCompra(arrayDeProductosSacadoDelStorage,arrayDeCantidadSacadoDelStorage);

    let botonAgregarAlCarrito = document.getElementsByClassName("botonAnadir");

    for(let elemento of botonAgregarAlCarrito){
        elemento.addEventListener("click", () => {carritoDeCompra.botonAnadirAlCarrito(elemento.id)});
    }

    /*GUARDAR EN EL STORAGE CUANDO SALE DE LA PANTALLA */
    window.addEventListener("beforeunload", function (event) {
        localStorage.setItem("productos", JSON.stringify(carritoDeCompra.productos));
        localStorage.setItem("cantidad", JSON.stringify(carritoDeCompra.cantidad));
    });
}

/* Cuando se cargue el navegador ejecuta esto */
window.onload = cargarAlCarrito();
