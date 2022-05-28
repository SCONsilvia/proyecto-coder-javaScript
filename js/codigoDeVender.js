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

const meterArray = (tipoProducto) => tipoProducto.split("/");

const listaDeProductos = [
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FX-991SPX II",32.89,meterArray("cientifica"),1), 
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FX-82MS",16.80,meterArray("cientifica"),2), 
    new productos("../imagenes/Calculator-bro.png","Canon","Canon MP1211-LTSC",76.06,meterArray("impresora integrada"),3),
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FR-2650",50.08,meterArray("impresora integrada"),4),
    new productos("../imagenes/Calculator-bro.png","Canon","Canon TX-220TSII",15.00,meterArray("estandar"),5),
    new productos("../imagenes/Calculator-bro.png","Casio","Casio HL-815",9.37,meterArray("bolsillo"),6),
    new productos("../imagenes/Calculator-bro.png","Olivetti","Olivetti Logos 902",79.00,meterArray("impresora integrada"),7),
    new productos("../imagenes/Calculator-bro.png","Olivetti","Olivetti Summa 60",40.00,meterArray("mesa"),8),
    new productos("../imagenes/Calculator-bro.png","Olivetti","Olivetti Summa 301",15.05,meterArray("impresora integrada/bolsillo"),9),
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FX 260 Solar II",16.80,meterArray("cientifica/solar"),10), 
    new productos("../imagenes/Calculator-bro.png","Casio","CASIO PRIZM FX-CG50",80.99,meterArray("cientifica/grafica"),11), 
    new productos("../imagenes/Calculator-bro.png","Ibico","Ibico 081X",15.99,meterArray("bolsillo/estandar"),12), 
    new productos("../imagenes/Calculator-bro.png","Ibico","Ibico 212X",23.78,meterArray("mesa"),13), 
    new productos("../imagenes/Calculator-bro.png","Ibico","Ibico 1491X",83.78,meterArray("impresora integrada"),14),
    new productos("../imagenes/Calculator-bro.png","Hp","HP 2AP18AA#ABA",129.00,meterArray("cientifica/grafica"),15), 
    new productos("../imagenes/Calculator-bro.png","Hp","HP 50g",321.00,meterArray("cientifica/grafica"),16),
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FX-9750gIII",56.08,meterArray("cientifica/grafica/solar"),17), 
    new productos("../imagenes/Calculator-bro.png","Casio","Casio FX 260 Solar II",56.08,meterArray("cientifica/solar"),18), 
];

let divProductos = document.getElementById("productos");

function meterProducto(array){
    for(let elemento of array){
        let nuevoProducto = document.createElement("div");
        nuevoProducto.className = "producto";
        nuevoProducto.innerHTML = `
        <div class="contenedorImg">
            <img src=${elemento.imagen}>
        </div>
        <div class="linea">
            <a href="#" class="botonAnadir" id="${elemento.id}">
                <i class="fa-solid fa-cart-shopping"></i>
                <p class="letrasAnadirAlCarrito">Anadir al carrito</p>
            </a>
        </div>
        <div class="producto__informacion">
            <p class="producto__informacion__marca">${elemento.marca}</p>
            <h2 class="producto__informacion__titulo">${elemento.titulo}</h2>
            <p class="producto__informacion__precio">U$S${elemento.precio}</p>
            <a href="#" class="corazon">
                <i class="fa-regular fa-heart"></i>
            </a>
            <!-- <span>
                <i class="fa-solid fa-heart"></i>
            </span> -->
        </div>
        `;
        divProductos.appendChild(nuevoProducto);
    }
}

meterProducto(listaDeProductos);

let carrito = document.getElementsByClassName("carrito__icono");

carrito[0].addEventListener("click",()=>{
    let vistaCarrito = document.getElementsByClassName("carrito__vista");
    if(vistaCarrito[0].style.visibility != "visible"){
        vistaCarrito[0].style.visibility = "visible";
    }else{
        vistaCarrito[0].style.visibility = "hidden";
    }
})

let botonAgregarAlCarrito = document.getElementsByClassName("botonAnadir");

function eliminar(elemetoAEliminar){
    /*EL padre es el que debe eliminar a su hijo */
    padre = elemetoAEliminar.parentNode;
	padre.removeChild(elemetoAEliminar);
}

function agregarAlCarrito(id){
    let listaCarrito = document.getElementById("productosCarrito");
    let elementoDeLaListaDeProductos = listaDeProductos[parseInt(id) - 1];
    let productoAgregado = document.createElement("div");
    productoAgregado.className = "productoCarrito";
    productoAgregado.id = id;
    productoAgregado.innerHTML = `
    <a href="#" class="quitarProducto" id="elemento${id}">
        <i class="fa-solid fa-circle-xmark"></i>
    </a>
    <div class="contenedorImagenCarrito">
        <img src="${elementoDeLaListaDeProductos.imagen}">
    </div>
    <div class="productoCarrito__informacion">
        <h2 class="productoCarrito__informacion__titulo">${elementoDeLaListaDeProductos.titulo}</h2>
        <p class="productoCarrito__informacion__precio">${elementoDeLaListaDeProductos.precio}</p>
    </div>`
    listaCarrito.appendChild(productoAgregado);
    let elementoAEliminar = document.getElementById(`elemento${id}`)
    elementoAEliminar.addEventListener("click", () => {eliminar(productoAgregado)});
}

for(let elemento of botonAgregarAlCarrito){
    elemento.addEventListener("click", () => {agregarAlCarrito(elemento.id)});
}
