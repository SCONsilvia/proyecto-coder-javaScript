let botonesCalculadora = document.getElementsByClassName("botonesCalculadora");
let inputCalculadora = document.getElementById("inputDatos");

function mostrar(elemento){
    if(elemento.id == "f6"){
        inputCalculadora.value = inputCalculadora.value.slice(0, -1)/*Copiar desde la pocision 0 del array hasya la penultima*/
    }else if(elemento.id == "f5"){
        mostrarResultado();
    }else{
        inputCalculadora.value += elemento.innerHTML;
    }
}



function miPropioSplit(arrayAPicar, arrayDePicacion){
    let numero = "";
    let array = [];
    numero += arrayAPicar[0];
    for(let elemento in arrayAPicar){
        if(parseInt(elemento) === 0){
            continue;
        }
        let estaElElemento = arrayDePicacion.find((elementoDeArrayDePicacion) => elementoDeArrayDePicacion == arrayAPicar[elemento])
        if(estaElElemento != undefined){
            if(arrayDePicacion.some((elementoDelArray) => elementoDelArray == arrayAPicar[elemento - 1]) ){
                numero += arrayAPicar[elemento];
            }else{
                array.push(numero);
                array.push(arrayAPicar[elemento]);
                numero = "";
            }   
        }else{
            numero += arrayAPicar[elemento];
        }
    }
    array.push(numero);
    return array
}

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

function queOperacionUsar(a,b,funcion){
    return funcion(a,b);
}

function mostrarResultado(){
    let inputOperacion = inputCalculadora.value;
    let arrayDeOperacion = miPropioSplit(inputOperacion, ["+","-","*","/"]);
    let operacion;
    let a;
    let b;
    let resultado
    while(arrayDeOperacion.length > 1){
        if(arrayDeOperacion[1] == "+"){
            operacion = suma;
            a = arrayDeOperacion[0];
            b = arrayDeOperacion[2];
        }else if(arrayDeOperacion[1] == "-"){
            operacion = resta;
            a = arrayDeOperacion[0];
            b = arrayDeOperacion[2];
        }else if(arrayDeOperacion[1] == "*"){
            operacion = multiplicacion;
            a = arrayDeOperacion[0];
            b = arrayDeOperacion[2];
        }else if(arrayDeOperacion[1] == "/"){
            operacion = division;
            a = arrayDeOperacion[0];
            b = arrayDeOperacion[2];
        }
        resultado = queOperacionUsar(parseInt(a),parseInt(b),operacion);
        arrayDeOperacion.shift();
        arrayDeOperacion.shift();
        arrayDeOperacion[0] = resultado;
    }
    inputCalculadora.value = resultado;
}

for(let elemento of botonesCalculadora){
    elemento.addEventListener("click", () => {mostrar(elemento)})
}