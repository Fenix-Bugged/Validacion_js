const form = document.getElementById("registroForm");
const descripcion = document.getElementById("descripcion");
const btnenviar = document.getElementById("btnEnviar");
const btnborrar = document.getElementById("btnBorrar");
const contador = document.getElementById("contador");

//  Actualiza contador de caracteres
descripcion.addEventListener("input", () => {
  contador.textContent = descripcion.value.length;
});

//  Evento principal: validar y descargar JSON
btnenviar.addEventListener("click", validarydescargar);

//  Limpiar el formulario al presionar “Borrar”
btnborrar.addEventListener("click", () => {
  form.reset();
  contador.textContent = "0";
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
});

//  Función principal de validación y descarga
function validarydescargar(e) {
  e.preventDefault();
  let valido = true;

  // limpiar errores previos
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const edad = document.getElementById("edad").value.trim();
  const fecha = document.getElementById("fecha").value.trim();
  const genero = document.getElementById("genero").value;
  const pais = document.getElementById("pais").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const terminos = document.getElementById("terminos").checked;

  // Validaciones básicas
// Validaciones básicas
if (nombre === "") {
  document.getElementById("error-nombre").textContent = "El nombre es obligatorio.";
  valido = false;
}

if (apellido === "") {
  document.getElementById("error-apellido").textContent = "El apellido es obligatorio.";
  valido = false;
}

if (email === "" || !email.includes("@")) {
  document.getElementById("error-email").textContent = "Ingrese un correo válido.";
  valido = false;
}

if (edad === "" || edad < 1 || edad > 120) {
  document.getElementById("error-edad").textContent = "Ingrese una edad válida.";
  valido = false;
}

if (fecha === "") {
  document.getElementById("error-fecha").textContent = "Debe seleccionar una fecha de nacimiento.";
  valido = false;
}

if (genero === "") {
  document.getElementById("error-genero").textContent = "Debe seleccionar un género.";
  valido = false;
}

if (pais === "") {
  document.getElementById("error-pais").textContent = "Debe ingresar su país.";
  valido = false;
}

if (descripcion === "") {
  document.getElementById("error-descripcion").textContent = "Debe escribir una breve descripción personal.";
  valido = false;
}

if (!terminos) {
  document.getElementById("error-terminos").textContent = "Debe aceptar los términos.";
  valido = false;
}

  // 🧾 Si todo está bien, genera el JSON
  if (valido) {
    const datos = {
      Nombre: nombre,
      Apellido: apellido,
      Email: email,
      Edad: edad,
      FechaNacimiento: fecha,
      Genero: genero,
      País: pais,
      Descripción: descripcion,
    };

    alert("✅ Formulario verificado correctamente. Nosotros lo llamamos");

    // Crear y descargar archivo JSON
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registro_usuario.json";
    a.click();
    URL.revokeObjectURL(url);
  }
}
