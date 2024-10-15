/* Declaro el valor de una hora normal */
const valorHoraNormal = 6000
/* variable de cuanto se debe pagar por horas extras */
let aPagar = 0
let montoTotal = 0
/* variable de si el turno es de día o de noche */
let tipoTurno = prompt("escriba 'dia' o 'noche' de acuerdo al horario en el que realizó el turno extra").toLowerCase()
let festivo
let diaSemana
let festivoSiguiente

function extraNocturna(numero) {
    aPagar = (valorHoraNormal * 1.5 * numero) 
    return aPagar
}

function extraDiurna(numero) {
    aPagar = (valorHoraNormal * 1.25 * numero) 
    return aPagar
}


while (tipoTurno !== "listo") {
    switch(tipoTurno){
        /* para el turno de día hay 2 opciones:
            1.- día sábado o domingo o festivo: se considera valor hora extra nocturna
            2.- día de lunes a viernes: se considera valor hora extra diurna
            */
        case "dia":
            diaSemana=prompt("Escriba el día de la semana en que hizo el turno; ejemplo: 'lunes', 'martes', 'miercoles', etc.").toLowerCase()
            festivo=prompt("Escriba 'si' en el caso que ese día haya sido festivo. Escriba 'no' en el caso que ese día no haya sido festivo").toLowerCase()
            if (festivo == "si" || diaSemana == "sabado" || diaSemana == "domingo"){
                montoTotal += extraNocturna(12)
                alert("El monto a pagar por el turno ingresado es de $" + aPagar)
            } else if (festivo == "no"){
                montoTotal += extraDiurna(12)
                alert("El monto a pagar por el turno ingresado es de $" + aPagar)
            } else {
                alert("Los datos ingresados son erróneos, vuelva a intentar")
            }
            tipoTurno = prompt("escriba 'dia' o 'noche' de acuerdo al horario en el que realizó el siguiente turno extra. Si ya agregó todos sus turnos extras, entonces escriba 'listo' para ver el total").toLowerCase()
            break

        /* para el turno de noche hay 9 opciones:
            1.- noche del sábado: se consideran 12 HHEE nocturnas (listo)
            2.- noche del domingo con feriado al día siguiente: se consideran 12 HHEE nocturnas
            3.- noche del viernes cuando es festivo: se consideran 12 HHEE nocturnas (listo)
            4.- noche de un festivo y día siguiente también festivo: se consideran 12 HHEE nocturnas (listo)
            5.- noche de un festivo y día siguiente hábil: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            6.- noche de un domingo y día siguiente hábil: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            7.- noche de un lunes a jueves y día siguiente festivo: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            8.- noche del viernes si no es festivo: se consideran 11 HHEE nocturnas y 1 HHEE diurna
            9.- noche de lunes a jueves: se consideran 10 HHEE nocturnas y 2 HHEE diurnas (cuando no hay festivos)
            */  
             
        case "noche":
            diaSemana=prompt("Escriba el día de la semana en que hizo el turno; ejemplo: 'lunes', 'martes', 'miercoles', etc.").toLowerCase()
            festivo=prompt("Escriba 'si' en el caso que ese día haya sido festivo. Escriba 'no' en el caso que ese día no haya sido festivo").toLowerCase()
            festivoSiguiente=prompt("Escriba 'si' en el caso el día siguiente a su turno de noche haya sido festivo. Escriba 'no' en el caso que el día siguiente a su turno de noche no haya sido festivo").toLowerCase()
            /* aqui resuelvo el caso 1, 2 y 3*/
            if (diaSemana == "sabado" || (festivo == "si" && festivoSiguiente == "si") || (festivo == "si" && diaSemana == "viernes") || (festivoSiguiente == "si" && diaSemana == "domingo")){
                montoTotal += extraNocturna(12)
                alert("El monto a pagar por el turno ingresado es de $" + aPagar)
                alert("día sábado o festivo mas festivo al saliente")
            /* aqui resuelvo el caso 4, 5, 6, 7 y 8 */
            } else if (diaSemana == "domingo" || diaSemana == "viernes" || (festivo == "si" && festivoSiguiente == "no") || ((diaSemana == "lunes" || diaSemana == "martes" || diaSemana == "miercoles" || diaSemana == "jueves") && (festivo == "no" && festivoSiguiente == "si"))) {
                montoTotal += (extraDiurna(1) + extraNocturna(11))
                alert("El monto a pagar por el turno ingresado es de $" + aPagar)
                alert("noche domingo o de viernes o de habil con feriado al dia siguiente o lunes a jueves con festivo al día siguiente")
            /* aqui resuelvo el caso 9 */
            } else if ((diaSemana == "lunes" || diaSemana == "martes" || diaSemana == "miercoles" || diaSemana == "jueves") && (festivo == "no" && festivoSiguiente == "no")){
                montoTotal += (extraDiurna(2) + extraNocturna(10))
                alert("El monto a pagar por el turno ingresado es de $" + aPagar)
                alert("lunes a jueves habil")
            } else {
                alert("Los datos ingresados son erróneos, vuelva a intentar")
            }
            tipoTurno = prompt("escriba 'dia' o 'noche' de acuerdo al horario en el que realizó el siguiente turno extra. Si ya agregó todos sus turnos extras, entonces escriba 'listo' para ver el total").toLowerCase()
            break
        default:
            alert("Datos mal Ingresados")
            break
    } 
}

alert("El monto total a pagar por horas extraordinarias es de $"+montoTotal)

/* ingrese si al día anterior o siguiente al turno fue festivo

crear
un switch para saber si es dia o noche
luego vienen if 

cuando es día
if ((lunes a viernes)||| sabado ||| domingo) &&& festivo 
funcion (12) horas150
 else if
 (lunes a viernes) &&& habil
funcion (12) horas125
 else
 datos mal ingresados

 */