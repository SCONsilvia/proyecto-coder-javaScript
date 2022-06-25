/*Codigo repetido de codigoDeVender.js para que el carrito funcione en index */

let carrito = document.getElementsByClassName("carrito__icono");
let listaDeProductos = [];

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
        this.impuesto = 22;
        this.cantidad = [];
        this.mostraProductosEnElCarrito(arrayDelStorage,arrayDelStorageCantidad);
        this.inicializarBotonConfirmar();
    }

    inicializarBotonConfirmar(){
        this.botonConfirmar = document.getElementById("botonConfirmar");
        this.botonConfirmar.addEventListener("click",() => {
            let listaCarrito = document.getElementById("productosCarrito");
            listaCarrito.innerHTML = "";
            this.cantidad = [];
            this.subTotal = 0;
            this.productos = []
            this.calcularYPintarSubtotal(0)
            Swal.fire({
                title: "Compra confirmada",
                icon: "success",
                confirmButtonText: 'Continuar'
              })
        });
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
        let impuesto = document.getElementById("impuesto");
        let total = document.getElementById("total");
        let impuestoTotal = ((this.subTotal *this.impuesto)/100).toFixed(2);//toFixed lo comvierte a string el dato
        impuesto.innerHTML = impuestoTotal;
        total.innerHTML = (this.subTotal+parseFloat(impuestoTotal)).toFixed(2);
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


function inicializarTodo(){
    /* Cuando se cargue el navegador ejecuta esto */
    window.onload = cargarAlCarrito();
}

async function traerDatos(){
    const buscar = await fetch('https://sconsilvia.github.io/proyecto-coder-javaScript/datos.json');
    return await buscar.json();
}

traerDatos().then((retorno) => {//trae el array de prodcutos
    let imagen;//para cambiar la ruta de la imagen pues si no no funciona
    for(let i = 0; i < retorno.length; i++){
        imagen = retorno[i].imagen;
        imagen = imagen.slice(3);//copio la ruta desde la pocision 3 osea borramos ../ copia desde imagen/
        listaDeProductos.push(new productos(imagen,retorno[i].marca,retorno[i].titulo,retorno[i].precio,retorno[i].tipo,retorno[i].id))
    }
    
    inicializarTodo();
}).catch(error => console.log("Error"+error))
