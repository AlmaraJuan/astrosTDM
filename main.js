const alumnos = [
    { nombre: "Jorge Dominguez", codigo: 1, turnos: ["Lunes", "Jueves"] },
    { nombre: "Camila Mariana", codigo: 2, turnos: ["Jueves"] },
    { nombre: "Norberto Walter", codigo: 3, turnos: ["Miércoles", "Viernes"] },
    { nombre: "Natalio Garcia", codigo: 4, turnos: ["Viernes"] },
    { nombre: "Damian Buzzone", codigo: 10, turnos: ["Lunes"] },

];

const turnosDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

// Crear arrays de nombres o códigos
const creadoraDeArrays = (opcion) => {
    const ArrayAuxiliar = [];

    if (opcion === "codigo") {
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            ArrayAuxiliar.push(alumno.codigo);
        }
        return ArrayAuxiliar;

    } else if (opcion === "nombre") {
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
            ArrayAuxiliar.push(alumno.nombre);
        }
        return ArrayAuxiliar;

    } else {
        alert("No es posible crear ese listado");
    }
};

// Buscar indice de alumno
const buscadoraDeAlumnos = (codigo) => {
    if (alumnos.length < 1) {
        alert("No hay alumnos cargados");
        return -1;
    }

    const alumnosCodigo = creadoraDeArrays("codigo");
    return alumnosCodigo.indexOf(codigo);
};

// Eliminar alumnos
const eliminarAlumno = (codigo) => {
    const indexAlumno = buscadoraDeAlumnos(codigo);
    if (indexAlumno === -1) {
        alert("El alumno no existe");
        return;
    }

    alert("El alumno " + alumnos[indexAlumno].nombre + " fue eliminado");
    alumnos.splice(indexAlumno, 1);
};

// Agregar Turnos
const agregarTurnos = (turno, codigo) => {
    if (!turnosDisponibles.includes(turno)) {
        alert("Ese turno no está disponible");
        return;
    }

    const indexAlumno = buscadoraDeAlumnos(codigo);
    
    if (indexAlumno === -1) {
        alert("El alumno no existe");
        return;
    }

    const alumno = alumnos[indexAlumno];
    if (!alumno.turnos.includes(turno)) {
        alumno.turnos.push(turno);
        alert("Turno agregado correctamente");
    } else {
        alert("El alumno ya tiene asignado ese turno.");
    }
};

// Eliminar Alumnos
const eliminarTurno = (turno, codigo) => {
    const indexAlumno = buscadoraDeAlumnos(codigo);
    if (indexAlumno === -1) {
        alert("El alumno no existe");
        return;
    }

    const alumno = alumnos[indexAlumno];
    const turnoIndex = alumno.turnos.indexOf(turno);

    if (turnoIndex !== -1) {
        alumno.turnos.splice(turnoIndex, 1);
        alert("Turno eliminado correctamente");
    } else {
        alert("El alumno no tiene asignado ese turno.");
    }
};

// Agregar Alumnos
const agregarAlumno = (nombre, codigo) => {
    if (buscadoraDeAlumnos(codigo) !== -1) {
        alert("Ese alumno ya existe");
        return;
    }

    alumnos.push({ nombre, codigo, turnos: [] });
    alert("Alumno agregado correctamente");
};

// Mostrar Alumnos
const mostrarAlumnos = () => {
    const arrayNombre = creadoraDeArrays("nombre");
    const stringNombre = arrayNombre.join(", ");
    alert("Los alumnos actuales son los siguientes: " + stringNombre);
};

// Volver a la selección de usuario
const confirmarInicio = () => {
    const deseaContinuar = confirm("¿Desea volver al inicio? Si no, saldrá del programa.");
    if (deseaContinuar) {
        inicioUsuario();
    } else {
        alert("Gracias por usar Astros TDM. ¡Hasta Pronto!");
    }
};

// Función para profesores
const coreProfesores = () => {
    let bandera = true;

    while (bandera) {
        const opcion = Number(prompt("¿Qué acción desea realizar?\n 1- Agregar alumno\n 2- Eliminar alumno\n 3- Agregar turno\n 4- Eliminar turno\n 5- Mostrar Alumnos"));
        
        switch (opcion) {
            case 1:
                const nombreAlumnoAAgregar = prompt("¿Cómo se llama el alumno?");
                const codigoAlumnoAAgregar = Number(prompt("¿Cuál es el código del alumno?"));
                agregarAlumno(nombreAlumnoAAgregar, codigoAlumnoAAgregar);
                break;
            case 2:
                const codigoAlumnoABorrar = Number(prompt("¿Cuál es el código del alumno?"));
                eliminarAlumno(codigoAlumnoABorrar);
                break;
            case 3:
                const codigoDeAlumnoNuevoTurno = Number(prompt("¿Cuál es el código del alumno?"));
                const turnoAgregar = prompt("Elija un turno disponible: Lunes, Martes, Miércoles, Jueves, Viernes");
                agregarTurnos(turnoAgregar, codigoDeAlumnoNuevoTurno);
                break;
            case 4:
                const codigoDeAlumnoEliminarTurno = Number(prompt("¿Cuál es el código del alumno?"));
                const turnoEliminar = prompt("¿Qué turno desea eliminar? (Lunes, Martes, Miércoles, Jueves, Viernes)");
                eliminarTurno(turnoEliminar, codigoDeAlumnoEliminarTurno);
                break;
            case 5:
                mostrarAlumnos();
                break;
            default:
                alert("Esa opción no existe");
                break;
        }

        bandera = confirm("¿Quiere seguir operando en esta sección?");
        if (!bandera) {
            confirmarInicio();
            return;
        }
    }
};

// Función para alumnos
const coreAlumnos = () => {
    const codigoDeAlumnoTurno = Number(prompt("¿Cuál es tu código?"));
    if (buscadoraDeAlumnos(codigoDeAlumnoTurno) === -1) {
        alert("Ese alumno no existe");
        return;
    }

    let bandera = true;

    while (bandera) {
        const opcion = Number(prompt("¿Qué acción desea realizar?\n 1- Agregar un turno\n 2- Liberar un turno"));
        
        switch (opcion) {
            case 1:
                const turno = prompt("¿Qué turno quiere agregar? (Lunes, Martes, Miércoles, Jueves, Viernes)");
                agregarTurnos(turno, codigoDeAlumnoTurno);
                break;
            case 2:
                const turnoAEliminar = prompt("¿Qué turno quiere eliminar? (Lunes, Martes, Miércoles, Jueves, Viernes)");
                eliminarTurno(turnoAEliminar, codigoDeAlumnoTurno);
                break;
            default:
                alert("Esa opción no existe");
                break;
        }

        bandera = confirm("¿Quiere seguir operando en esta sección?");
        if (!bandera) {
            confirmarInicio();
            return;
        }
    }
};

// Inicio --> elegir profesor o alumno
const inicioUsuario = () => {
    let bandera = true;

    while (bandera) {
        const opcion = Number(prompt("Bienvenido a Astros TDM. ¿Sos Profesor o Alumno?\n 1- Profesor\n 2- Alumno"));

        switch (opcion) {
            case 1:
                coreProfesores();
                return;
            case 2:
                coreAlumnos();
                return;
            default:
                alert("Esa opción no existe");
                break;
        }

        bandera = confirm("¿Quiere seguir operando en esta sección?");
        if (!bandera) {
            alert("Gracias por usar Astros TDM. ¡Hasta Pronto!");
            return;
        }
    }
};

inicioUsuario();