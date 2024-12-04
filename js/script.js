// Días inhábiles
const inhabilesDiciembre = [1, 7, 8, 14, 15, 21, 22, 25, 28, 29];

// Tarifas
const TARIFA_NOCTURNA = 1000 * 1.5;
const TARIFA_DIURNA = 1000 * 1.25;

const tipoTurnoExtra = [
    { clase: 'turnoDia', texto: 'Largo' },
    { clase: 'turnoNoche', texto: 'Noche' },
    { clase: 'sinTurno', texto: '' }
];

let indice = 0;
let montosTurno = [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; // Array para almacenar montos de los turnos

// Función para verificar si el día siguiente es inhabil
function encontrarInhabilSiguiente(inhabilesDiciembre, valor) {
    return inhabilesDiciembre.includes(valor + 1);
}

// Función para calcular el monto de las horas extras
function calcularMonto(turno, esInhabil, valor) {
    let monto = 0;
    if (turno === 'Largo') {
        monto = esInhabil ? TARIFA_NOCTURNA * 12 : TARIFA_DIURNA * 12;
    } else if (turno === 'Noche') {
        if (esInhabil) {
            monto = encontrarInhabilSiguiente(inhabilesDiciembre, valor) ? TARIFA_NOCTURNA * 12 : TARIFA_DIURNA + TARIFA_NOCTURNA * 11;
        } else {
            monto = encontrarInhabilSiguiente(inhabilesDiciembre, valor) ? TARIFA_DIURNA + TARIFA_NOCTURNA * 11 : TARIFA_DIURNA * 2 + TARIFA_NOCTURNA * 10;
        }
    }
    return monto;
}

// Función para actualizar los textos en el DOM
function actualizarDOM(monto, index) {
    document.getElementById('valorUltimoTurno').innerText = "El último turno agregado tiene un valor de: $" + monto;
    const sumaTotal = montosTurno.reduce((acc, curr) => acc + curr, 0);
    document.getElementById('valorTotal').innerText = "El total a pagar por los turnos realizados en el mes es de: $" + sumaTotal;
}

// Manejador de eventos para los botones
for (let i = 1; i <= 38; i++) {
    document.getElementById(`b${i}`).addEventListener("click", function() {
        this.className = tipoTurnoExtra[indice].clase;
        document.getElementById(`turnoB${i}`).textContent = tipoTurnoExtra[indice].texto;

        const valor = parseInt(document.getElementById(`casilleroB${i}`).innerText);
        const tipoTurno = tipoTurnoExtra[indice].texto;
        const esInhabil = inhabilesDiciembre.includes(valor);

        // Calcular el monto y actualizar el array
        montosTurno[i - 1] = calcularMonto(tipoTurno, esInhabil, valor);
        
        // Actualizar el DOM con el nuevo monto
        actualizarDOM(montosTurno[i - 1], i - 1);

        // Incrementa el índice y resetea si llega al final
        indice = (indice + 1) % tipoTurnoExtra.length;
    });
}