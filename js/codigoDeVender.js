let divProductos = document.getElementById("productos");
let carrito = document.getElementsByClassName("carrito__icono");
let carritoDeCompra;
let listaDeProductos;


/*Dibujar los productos en el html*/
function meterProducto(array){
    if(array.length == 0){
        let nuevoProducto = document.createElement("div");
        nuevoProducto.innerHTML = `<p>No existen resultado<p>`;
        divProductos.appendChild(nuevoProducto);
    }else{
        for(let elemento of array){
            let nuevoProducto = document.createElement("div");
            nuevoProducto.className = "producto";
            let {imagen,id,marca,titulo,precio} = elemento;
            nuevoProducto.innerHTML = `
            <div class="contenedorImg">
                <img src=${imagen}>
            </div>
            <div class="linea">
                <a class="botonAnadir" id="${id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p class="letrasAnadirAlCarrito">Anadir al carrito</p>
                </a>
            </div>
            <div class="producto__informacion">
                <p class="producto__informacion__marca">${marca}</p>
                <h2 class="producto__informacion__titulo">${titulo}</h2>
                <p class="producto__informacion__precio">U$S${precio}</p>
            </div>
            `;
            divProductos.appendChild(nuevoProducto);
        }
        //a;adir el addEventListener para agregar al carrito
        let botonAgregarAlCarrito = document.getElementsByClassName("botonAnadir");

        for(let elemento of botonAgregarAlCarrito){
            elemento.addEventListener("click", () => {carritoDeCompra.botonAnadirAlCarrito(elemento.id)});
        }
    }
}

/*Haciendo Funcionar los filtros*/
class Filtro{
    constructor(valor,tipo){
        this.valor = valor;
        this.tipo = tipo;
    }
}

let productosFiltrados = [];
let arrayDeFiltrado = [];
let rangoMin = 0;
let rangoMax = 10000;

function filtraPrecio(array){//filtra por precio
    let nuevoArr = [];
    for(let elemento of array){
        if(elemento.precio >= rangoMin && elemento.precio <= rangoMax){
            nuevoArr.push(elemento);
        }
    }
    return nuevoArr;
}
//obtener id de precios
let hasta50 = document.getElementById("precio1");
let hasta100 = document.getElementById("precio2");
let botonPrecio = document.getElementById("botonPrecio");

hasta50.addEventListener("click", () => {rangoMin = 0; rangoMax = 50; filtradoGeneral();});
hasta100.addEventListener("click", () => {rangoMin = 50; rangoMax = 100; filtradoGeneral();});
botonPrecio.addEventListener("click", ()=>{
    let precioDesde = document.getElementById("precioDesde");
    let precioHasta = document.getElementById("precioHasta");
    precioDesde.value == ""? rangoMin = 0 : rangoMin = parseInt(precioDesde.value); 
    precioHasta.value == ""? rangoMax = 10000 : rangoMax = parseInt(precioHasta.value); 
    filtradoGeneral();
})

function comparacion(a, b) {//ayuda al sort en la comparacion
    //"marca" es menor a "tipo"? "marca" es menor a "marca"? "tipo" es menor a "tipo"? "tipo" es menor a "marca"? string es menor a string
    if (a.tipo < b.tipo) {
      return -1;
    }
    if (a.tipo > b.tipo) {
      return 1;
    }
    // a igual b
    return 0;
}

function verificarPorTipo(arrayDeFiltro){
    let productosFiltradoTipo = [];
    let verSiYaMetioUnProducto = false;//para evitar repetidos
    for(let i = 0; i < listaDeProductos.length; i++){
        for(let j in listaDeProductos[i].tipo){
            for(let h of arrayDeFiltro){
                if(listaDeProductos[i].tipo[j] == h.valor || h.valor == "todotipo"){
                    productosFiltradoTipo.push(listaDeProductos[i]);
                    verSiYaMetioUnProducto = true;
                    break;
                }
            }
            if(verSiYaMetioUnProducto){
                verSiYaMetioUnProducto = false;
                break;
            }
        }
    }
    return productosFiltradoTipo;
}

function verificarPorMarca(arrayDeFiltro, arrayDeProductos){
    let productosFiltradoMarca = [];
    for(let i = 0; i < arrayDeProductos.length; i++){
        for(let j of arrayDeFiltro){
            if(arrayDeProductos[i].marca.toLowerCase() == j.valor || j.valor == "todomarca"){
                productosFiltradoMarca.push(arrayDeProductos[i]);
            }
        }
    }
    return productosFiltradoMarca;
}

function buscandoProductos(arrayDeFiltro){
    productosFiltrados = verificarPorTipo(arrayDeFiltro);
    productosFiltrados = verificarPorMarca(arrayDeFiltro, productosFiltrados);
    productosFiltrados = filtraPrecio(productosFiltrados);

    divProductos.innerHTML = "";
    meterProducto(productosFiltrados);
}

function productosAFitra(arrayDeFiltros){//acomoda el array para luego mandar a buscar 
    let arrayDeFiltrosCopiado = [];
    arrayDeFiltrosCopiado = arrayDeFiltrosCopiado.concat(arrayDeFiltros);
    if(arrayDeFiltrosCopiado.length == 0){//array vacio
        arrayDeFiltrosCopiado.push(new Filtro("todomarca","marca"));
        arrayDeFiltrosCopiado.push(new Filtro("todotipo","tipo"));
    }else if(buscarIndicePorTipo(arrayDeFiltrosCopiado, "marca",0,arrayDeFiltrosCopiado.length) != -1){//existe una marca en el array
        if (buscarIndicePorTipo(arrayDeFiltrosCopiado, "tipo",0,arrayDeFiltrosCopiado.length) == -1) {//no existe tipo
            arrayDeFiltrosCopiado.push(new Filtro("todotipo","tipo"));
        }
    }else{//si no esta vacio y no existe marca entonces ya de por si existe tipo
        arrayDeFiltrosCopiado.push(new Filtro("todomarca","marca"));
    }
    arrayDeFiltrosCopiado.sort(comparacion);//ordenando array
    buscandoProductos(arrayDeFiltrosCopiado);
}


//desmarca todos los check menos el check TODO
function desmarcarTodo(valor){
    for(let i = 1; i < 6; i++){
        let marcado = document.getElementById(`${valor}${i}`);
        marcado.checked = false;
    }
}

//arregla el array de filtros ayuda para cuando tienes marcado algo y marca otra cosa ejemplo tienes marcado TODO entonce desmarcar hp casio y todo lo que este marcado pero si tienes marcado TODO y luego marcas casio entonces desmarca TODO
function revisarArray(array,tipo){
    if(array.some((e) => e.valor == `todo${tipo}`)){//ver si todomarca o todotipo existe
        let indice = buscarIndice(array, `todo${tipo}`);
        let indice2 = buscarIndicePorTipo(array,tipo,indice+1,array.length);//devuelve 1 si encontro algo adelande de TODOM osea otra marca
        if(indice2 != -1){//[,,parado,,algoAdelante,] si parado es un todoTipo/Marca y adelante hay otra cosa con su mismo tipo entonces debo deschekear todo y lo borro del array
            array.splice(indice,1);
            let marcado = document.getElementById(`${tipo}0`);
            marcado.checked = false;
        }else{//borrando y deschekeando lo de atras. Si no entonces tengo algo asi [tipo1,,tipo3,tipo0] tipo 0 es que el chek todo esta marcado asi que debo desmarcar todos lo demas y tambien lo borro del array
            let j = indice;
            let resultado = buscarIndicePorTipo(array, tipo,0,j);
            while(resultado != -1){
                array.splice(resultado,1);//elimina un elemento
                j--;
                resultado = buscarIndicePorTipo(array, tipo,0,j);
            }
            desmarcarTodo(tipo);
        }
    }
}

function buscarIndicePorTipo(array, valorABuscar,indice,hasta){//devuelve el indice del primer tipo a buscar que encuentre, busca "marca" o "tipo"
    for(let i = indice; i < hasta; i++){
        if(array[i].tipo == valorABuscar){
            return i;
        }
    }
    return -1;
}

function buscarIndice(array, valorABuscar){//devuelve el indice del primer valor a buscar que encuentre, busca que si es casio hp sobremesa bolsillo
    for(let e in array){
        if(array[e].valor == valorABuscar){
            return parseInt(e);
        }
    }
    return -1;
}

function filtradoGeneral(){//funcion que hace todo
    revisarArray(arrayDeFiltrado,"marca");
    revisarArray(arrayDeFiltrado,"tipo");
    productosAFitra(arrayDeFiltrado);
}

//pone el onclick a los check de los filtros: marca/tipo
function filtradoLista(tipo){
    for(let i = 0; i < 6; i++){
        let marcado = document.getElementById(`${tipo}${i}`);
        marcado.onclick = () => {
            let valor = marcado.value;
            if (marcado.checked){
                arrayDeFiltrado.push(new Filtro(valor,tipo));
            }else{
                let indice = buscarIndice(arrayDeFiltrado, valor);//buscar indice para eliminar esa pocision en el arr
                arrayDeFiltrado.splice(indice,1);//eliminar el elemento del arreglo
            }
            filtradoGeneral();
        };
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
        this.subTotal += valor;
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
    carritoDeCompra = new CarritoDeCompra(arrayDeProductosSacadoDelStorage,arrayDeCantidadSacadoDelStorage);

    /*GUARDAR EN EL STORAGE CUANDO SALE DE LA PANTALLA */
    window.addEventListener("beforeunload", function (event) {
        localStorage.setItem("productos", JSON.stringify(carritoDeCompra.productos));
        localStorage.setItem("cantidad", JSON.stringify(carritoDeCompra.cantidad));
    });
}

function inicializarTodo(){
    filtradoLista("marca");
    filtradoLista("tipo");
    /* Cuando se cargue el navegador ejecuta esto */
    window.onload = cargarAlCarrito();
    filtradoGeneral();//para pintar en el momento 0

}

async function traerDatos(){
    const buscar = await fetch('https://sconsilvia.github.io/proyecto-coder-javaScript/datos.json');
    return await buscar.json();//retorna una promesa con el array de datos en caso de que lo encuentre SI DA BIEN TRAE[{imagen : "../imagenes/Calculator-bro.png", marca : "Casio", titulo : "Casio FX-991SPX II", precio : 32.89, tipo : ["cientifica"], id : "1"},...]
}

traerDatos().then(function(retorno){//retorno tiene el array de datos
    listaDeProductos = retorno;
    inicializarTodo();
}).catch(function(error){
    alert("fallo la carga del archivo");
});


