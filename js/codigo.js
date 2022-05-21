const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

function pedirDatoNumerico(){
    return parseInt(prompt("Ingrese el primer valor:"));
}

function resultado(a,b,funcion){
    return funcion(a,b);
}

let opcion;

do{
    opcion = prompt("Escoger operacion a hacer entre dos valores: \n1-Suma. \n2-Resta. \n3-Multiplicacion. \n4-Division. \nX-salir");
    
    if (opcion.toUpperCase() != "X"){
        let numero1;
        let numero2;

        if(opcion == "1" || opcion == "2" || opcion == "3" || opcion == "4"){
            numero1 = pedirDatoNumerico();
            numero2 = pedirDatoNumerico();
        }
        let funcionAUsar;
        let mensaje;
        let mensajeDeError = true;

        switch (opcion) {
            case "1":
                funcionAUsar = suma;
                mensaje = "suma"
                break;

            case "2":
                funcionAUsar = resta;
                mensaje = "resta"
                break;

            case "3":
                funcionAUsar = multiplicacion;
                mensaje = "multiplicaion"
                break;

            case "4": 
                mensaje = "division"
                if(numero2 != 0){
                    funcionAUsar = division;
                }else{
                    alert("Resultado Indefinido");
                    mensajeDeError = false;
                }
                break;

        
            default:
                alert("Opcion no valida");
                mensajeDeError = false;
                break;
        }
        if(mensajeDeError){
            alert("el resultado de la "+ mensaje + " es " + resultado(numero1, numero2, funcionAUsar));
            
        }
    }

}while(opcion.toUpperCase() != "X");

