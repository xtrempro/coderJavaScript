/* Declaro el valor de una hora normal */
const valorGrado = {
    15: 1000,
    14: 1200,
    13: 1400,
    12: 1600,
    11: 1800,
};

/* variable de cuanto se debe pagar por horas extras */
let aPagar = 0
let montoTotal = 0
let montoTurno = 0
let grado 

//días del mes
const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
//días inhábiles del mes
let inhabiles = [5,6,12,13,19,20,26,27];

//función que calcula el monto de las horas extras nocturnas
function extraNocturna(numero) {
    aPagar = (valorGrado[grado] * 1.5 * numero) 
    return aPagar
}

// función que calcula el monto de las horas extras diurnas
function extraDiurna(numero) {
    aPagar = (valorGrado[grado] * 1.25 * numero) 
    return aPagar
}
// ingrese el grado de la escala de su remuneración

function diaSiguienteFeriado (inhabiles, valor) {
    for(let i=0; i < inhabiles.length; i++){
        if(inhabiles[i] === valor){
            if(i<inhabiles.length - 1) {
                if (inhabiles[i+1] === valor+1){
                    return true;
                }
            }
        }
    }
    return false;
}



while (grado!== 11 && grado !== 12 && grado !== 13 && grado !== 14 && grado !== 15) {
  grado = parseInt(prompt("Ingrese el grado en el que se encuentra (11, 12, 13, 14 o 15):"));
} 

// aquí se ingresa el día del mes en que se realiza el turno
let valor = parseInt(prompt("Ingrese el número del día del mes en que realizó el turno:"))
// aquí se busca si el valor ingresado está dentro del array del mes
const indice = dias.indexOf(valor);
// aquí se busca si el valor ingresado corresponde a un día inhábil
const indiceInhabil = inhabiles.indexOf(valor);
// si el valor ingresado no está en el array muestra mensaje de error, si existe entonces avanza a los cálculos

// siempre que el día ingresado sea distinto de "0" debe aplicar el bucle
while (valor !== 0) {
    if (inhabiles.includes(valor)) {
        alert("el dia es feriado")
    }
    // si el valor ingresado no está dentro del array entonces da una alerta de que el dato no existe
    if (indice === -1) {
    alert("el día ingresado no existe")
    }else{
    //si el día existe, entonces consulta si el turno fue de día o de noche
    let tipoTurno = parseInt(prompt("escriba '1' si el turno fue de día o '2' si el turno fue de noche"))
    //hacemos un switch para analizar por separado el turno de día y el turno de noche
    switch(tipoTurno){
        /*
        el caso 1 es el turno de día en donde hay 2 opciones:
            1.- día sábado o domingo o festivo: se considera valor hora extra nocturna
            2.- día de lunes a viernes: se considera valor hora extra diurna
        */
        case 1:
            if (inhabiles.includes(valor) === false) {
                montoTotal += extraDiurna(12)
                montoTurno = extraDiurna(12) + extraNocturna(0)
                alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                alert("El monto calculado en el ejercicio anterior debería ser de $15.000")
                }else if (inhabiles.includes(valor) === true){
                montoTotal += extraNocturna(12)
                montoTurno = extraNocturna(12)
                alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                alert("El monto calculado en el ejercicio anterior debería ser de $18.000")
                }else{
                    alert("1.- Los datos ingresados son erróneos, vuelva a intentar") 
                }
                valor = parseInt(prompt("Ingrese el número del día del mes en que realizó el turno. Si ya agregó todos sus turnos extras, entonces escriba '0' para ver el total"))
                break
            /*
            Para el turno de noche hay 9 opciones
            1.- noche del sábado: se consideran 12 HHEE nocturnas ($18.000 cuando el valor de hora es de $1000)
            2.- noche del domingo con feriado al día siguiente: se consideran 12 HHEE nocturnas
            3.- noche del viernes cuando es festivo: se consideran 12 HHEE nocturnas (listo)
            4.- noche de un festivo y día siguiente también festivo: se consideran 12 HHEE nocturnas (listo)
            5.- noche de un festivo y día siguiente hábil: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            6.- noche de un domingo y día siguiente hábil: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            7.- noche de un lunes a jueves y día siguiente festivo: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            8.- noche del viernes si no es festivo: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            9.- noche de lunes a jueves: se consideran 10 HHEE nocturnas y 2 HHEE diurnas (cuando no hay festivos)
            */
        case 2:
            //en la primera parte del if se resuelve el caso 1, 2, 3 y 4
            if (inhabiles.includes(valor)===true) {
 
                    if (diaSiguienteFeriado(inhabiles,valor)===true) {
                        montoTotal += extraNocturna(12)
                        montoTurno = extraDiurna(0) + extraNocturna(12)
                        alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                        alert("El monto calculado en el ejercicio anterior debería ser de $18.000")
                        }else if (diaSiguienteFeriado(inhabiles,valor)===false){
                            montoTotal += (extraDiurna(1) + extraNocturna(11))
                            montoTurno = extraDiurna(1) + extraNocturna(11)
                            alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                            alert("El monto calculado en el ejercicio anterior debería ser de $17.750")
                        }
            }

            

            if (inhabiles.includes(valor)===false) {
                    if (diaSiguienteFeriado(inhabiles,valor)===true){
                        montoTotal += (extraDiurna(1) + extraNocturna(11))
                        montoTurno = extraDiurna(1) + extraNocturna(11)
                        alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                        alert("El monto calculado en el ejercicio anterior debería ser de $17.750")
                    }else if (diaSiguienteFeriado(inhabiles,valor)===false) {
                        montoTotal += (extraDiurna(2) + extraNocturna(10))
                        montoTurno = extraDiurna(2) + extraNocturna(10)
                        alert("El monto a pagar por el turno ingresado es de $" + montoTurno)
                        alert("El monto calculado en el ejercicio anterior debería ser de $17.500")
                        // cuando es viernes, osea habil el viernes e inhabil el sábado
                    }
            }
                
            valor = parseInt(prompt("Ingrese el número del día del mes en que realizó el turno. Si ya agregó todos sus turnos extras, entonces escriba '0' para ver el total"))
            break
            default:
            alert("Datos mal Ingresados")   
            valor = parseInt(prompt("Ingrese el número del día del mes en que realizó el turno. Si ya agregó todos sus turnos extras, entonces escriba '0' para ver el total"))         
    }
}

}

alert("El monto total a pagar por horas extraordinarias es de $"+montoTotal)
