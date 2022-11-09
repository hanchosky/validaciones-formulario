export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHtml = 
        mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismacht",
    "patternMismacht",
    "customError",

];


const mensajesDeError = {
    nombre: {
        valueMissing: "Aquí no puede estar vacio chico listo",
    },
    email:{
        valueMissing: "Tampoco tienes email viejito ?",
        typeMismacht: "No parece valido mijito",
    },
    password:{
        valueMissing: "Y la contraseña chico listo ?",
        patternMismacht: "Al menos 8 caracteres, debe contener una letra minuscula, una letra mayuscula, un número, y no puede contener carácteres especiales papa"
    },
    nacimiento:{
        valueMissing: "No te pases de listo baby",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismacht:" El formato requerido es xxxxxxxxxx 10 números",
    },
    dirección:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismacht:" La dirección debe contener entre 10 a 40 caracteres.",
    },
    ciudad:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismacht:" La ciudad debe contener entre 10 a 40 caracteres.",
    },
    departamento:{
        valueMissing: "Este campo no puede estar vacio",
        patternMismacht:" El departamento debe contener entre 10 a 40 caracteres.",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}
function validarNacimiento(input) {
    const fechaUsuario = new Date (input.value);
    let mensaje = "";
    if (!mayorEdad(fechaUsuario)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje); 

}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date( 
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
   
    return diferenciaFechas <= fechaActual;
}
    
