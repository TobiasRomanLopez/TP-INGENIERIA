
let preguntaActual = 1;

document.addEventListener("DOMContentLoaded", function() {
    console.log("codigo.js ya terminó de cargarse");

    async function cargarEncuesta() {
        try {
            const encuestaCargada = await fetch("encuesta/encuesta.html");
            const html = await encuestaCargada.text();
            document.getElementById("contenedorEncuesta").innerHTML = html;
            agregarEventos(); 
        } catch (error) {
            console.error("Error al cargar la encuesta:", error);
        }
    }

    cargarEncuesta();
});


function ocultarDiv() {
    const divInicioEncuesta = document.querySelector(".inicioEncuesta");
    if (divInicioEncuesta) {
        divInicioEncuesta.style.display = "none";
    }
}

/**PARTE DEL CHECKPOINT O ESO*
 */




function siguientePregunta() {
    const preguntaActualDiv = document.getElementById('pregunta' + preguntaActual);
    if (preguntaActualDiv) {
        preguntaActualDiv.classList.remove('activa'); 
    }

    preguntaActual++; 
    const siguientePreguntaDiv = document.getElementById('pregunta' + preguntaActual);
    if (siguientePreguntaDiv) {
        siguientePreguntaDiv.classList.add('activa'); 
    } else {
        console.log("No hay más preguntas.");
    }

}

function seleccionarEstrella(num) {
    let calificacion = num;
    for (let i = 1; i <= 5; i++) {
        const estrella = document.getElementById(`estrella${i}`);
        if (estrella) {
            estrella.style.backgroundColor = i <= num ? "gold" : "white";
        }
    }
}

function agregarEventos() {
    const confirmButton = document.querySelector(".inicioEncuesta input[type='button']");
    confirmButton?.addEventListener("click", function() {
        ocultarDiv();
        const preguntaDiv = document.getElementById('pregunta1');
        preguntaDiv.classList.add('activa');
    });

    const confirmButtons = document.querySelectorAll(".botonConfirmar");
    confirmButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent form submission
        });
    });

    
    for (let i = 1; i <= 5; i++) {
        const estrella = document.getElementById(`estrella${i}`);
        if (estrella) {
            estrella.addEventListener("click", function() {
                seleccionarEstrella(i);
            });
        }
    }

    window.seleccionarSN_Otro = function(opcion) {
        const sibtn = document.getElementById('botonSi');
        const nobtn = document.getElementById('botonNo');  
        const otro = document.getElementById('botonOtro');
        
        sibtn.style.backgroundColor = 'white';
        nobtn.style.backgroundColor = 'white';
        otro.style.backgroundColor = 'white';

        if (opcion == 'si') sibtn.style.backgroundColor = '#A8E6CF';
        if (opcion == 'no') nobtn.style.backgroundColor = '#FF6961';
        if (opcion == 'otro') otro.style.backgroundColor = '#FFFFBA';
    }

    

    window.seleccionarDel1al10 = function(num) {
        for (let i = 1; i <= 10; i++) {
            const otrosNros = document.getElementById(`boton${i}`);
            if (otrosNros) {
                otrosNros.style.backgroundColor = "white";
            }
        }
        const numSeleccionado = document.getElementById(`boton${num}`);
        if (numSeleccionado) {
            numSeleccionado.style.backgroundColor = "#5A8FB2";
            numSeleccionado.style.transform = "scale(0.95)"; 
            numSeleccionado.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        }
    }

    document.querySelectorAll(".pregunta button").forEach(button => {
        if (button.textContent.includes("Siguiente Pregunta") || button.textContent.includes("Confirmar")) {
            button.addEventListener("click", siguientePregunta);
        }
    });
}