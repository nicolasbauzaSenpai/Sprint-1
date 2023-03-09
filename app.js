var formulario = document.getElementById("form");
var inputs = document.querySelectorAll("#form input");
var parrafos = document.querySelectorAll("#form p");

const regExp = {
  name: /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/,
  card: /^\d{16}$/ ,
  month: /^(0?[1-9]|1[0-2])$/,
  year: /^(20[2-9][4-9]|[3-9]\d{3})$/ ,
  cvc: /^\d{3}$/,
};

const campos = {
  name: false,
  card: false,
  month: false,
  year: false,
  cvc: false,
};

const validar = (e) => {
  switch (e.target.name) {
    case "name":
      validarCampos(regExp.name, e.target, "name");
      break;
    case "card":
      validarCampos(regExp.card, e.target, "card");
      break;
    case "month":
      validarCampos(regExp.month, e.target, "month");
      break;
    case "year":
      validarCampos(regExp.year, e.target, "year");
      break;
    case "cvc":
      validarCampos(regExp.cvc, e.target, "cvc");
      break;
  }
};

const validarCampos = (expresion, input, campo) => {
  var elemento = document.getElementById(`${campo}`);
  if (expresion.test(input.value)) {
    elemento.classList.add("green");
    elemento.classList.remove("red");
    document.getElementById(campo + "-error").innerHTML =
          "";
    campos[campo] = true;
  } else {
    elemento.classList.add("red");
    elemento.classList.remove("green");
    document.getElementById(campo + "-error").innerHTML =
          "Check the info";
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("blur", validar);
  input.addEventListener("keyup", validar);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.name && campos.card && campos.cvc && campos.month && campos.year) {
    formulario.reset();

    document.querySelectorAll("#form input").forEach((input) => {
      input.classList.remove("green");
    });

    document.getElementById("card-name").innerHTML = "Name";
    document.getElementById("card-number").innerHTML = "0000000000000000";
    document.getElementById("card-month").innerHTML = "00";
    document.getElementById("card-year").innerHTML = "0000";
    document.getElementById("cvc-card").innerHTML = "123";

    parrafos.forEach((parrafo) => {
      parrafo.innerHTML = "";
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thank you",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        container: "swal-font",
        icon: "custom-icon",
      },
    });
  } else {
    for (var campo in campos) {
      if (!campos[campo] || campos[campo].value === "") {
        document.getElementById(campo).classList.add("red");
        document.getElementById(campo + "-error").innerHTML =
          "Something's wrong";
      } else {
        document.getElementById(campo).classList.remove("red");
        document.getElementById(campo + "-error").innerHTML = "";
      }
    }
  }
});

var inputs_card = [
  { input: "name", target: "card-name" },
  { input: "card", target: "card-number" },
  { input: "month", target: "card-month" },
  { input: "year", target: "card-year" },
  { input: "cvc", target: "cvc-card" },
];

inputs_card.forEach((input) => {
  var inputElement = document.getElementById(input.input);
  var inputText = document.getElementById(input.target);

  inputElement.addEventListener("input", (e) => {
    inputText.textContent = e.target.value;
  });
});

