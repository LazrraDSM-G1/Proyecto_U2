document.addEventListener("DOMContentLoaded", function () {
    // Animaciones de entrada al aparecer los elementos en pantalla.
    const elementos = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(function (entradas, observer) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.12 });

        elementos.forEach(function (elemento) {
            observador.observe(elemento);
        });
    } else {
        elementos.forEach(function (elemento) {
            elemento.classList.add("visible");
        });
    }

    // Filtro de productos en la página de teléfonos.
    const botonesFiltro = document.querySelectorAll(".filter-btn");
    const productos = document.querySelectorAll(".product-item");

    botonesFiltro.forEach(function (boton) {
        boton.addEventListener("click", function () {
            botonesFiltro.forEach(function (otroBoton) {
                otroBoton.classList.remove("active");
            });
            boton.classList.add("active");

            const filtro = boton.dataset.filter;
            productos.forEach(function (producto) {
                const categoria = producto.dataset.category;
                const mostrar = filtro === "todos" || categoria === filtro;
                producto.classList.toggle("is-hidden", !mostrar);
            });
        });
    });

    // Mensaje emergente para los botones "Ver detalles".
    const botonesDetalles = document.querySelectorAll(".quick-view");
    const toast = document.getElementById("toastMessage");
    let temporizadorToast;

    botonesDetalles.forEach(function (boton) {
        boton.addEventListener("click", function () {
            if (!toast) return;
            toast.textContent = boton.dataset.product + ": consulta disponibilidad y características mediante el formulario de contacto.";
            toast.classList.add("show");
            clearTimeout(temporizadorToast);
            temporizadorToast = setTimeout(function () {
                toast.classList.remove("show");
            }, 3800);
        });
    });

    // Contador de caracteres del mensaje del formulario.
    const mensaje = document.getElementById("mensaje");
    const contador = document.getElementById("contador");

    if (mensaje && contador) {
        mensaje.addEventListener("input", function () {
            contador.textContent = mensaje.value.length + " / 500 caracteres";
        });
    }

    // Validación del formulario con HTML5 y JavaScript.
    const formulario = document.getElementById("contactForm");

    if (formulario) {
        const telefono = document.getElementById("telefono");
        const successBox = document.getElementById("formSuccess");
        const successText = document.getElementById("successText");

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            // El teléfono es opcional, pero si se escribe debe tener 10 dígitos.
            if (telefono.value.trim() === "") {
                telefono.setCustomValidity("");
            } else if (!/^[0-9]{10}$/.test(telefono.value.trim())) {
                telefono.setCustomValidity("Escribe exactamente 10 dígitos.");
            } else {
                telefono.setCustomValidity("");
            }

            formulario.classList.add("was-validated");

            if (!formulario.checkValidity()) {
                const primerInvalido = formulario.querySelector(":invalid");
                if (primerInvalido) primerInvalido.focus();
                if (successBox) successBox.hidden = true;
                return;
            }

            const nombre = document.getElementById("nombre").value.trim();
            const interes = document.getElementById("interes").value;

            if (successText) {
                successText.textContent = "Gracias, " + nombre + ". Tu consulta sobre \"" + interes + "\" quedó validada en esta demostración.";
            }
            if (successBox) {
                successBox.hidden = false;
                successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }

            formulario.reset();
            formulario.classList.remove("was-validated");
            if (contador) contador.textContent = "0 / 500 caracteres";
            telefono.setCustomValidity("");
        });

        telefono.addEventListener("input", function () {
            telefono.setCustomValidity("");
        });
    }
});