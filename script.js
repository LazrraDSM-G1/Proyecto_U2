document.addEventListener("DOMContentLoaded", () => {
    const elementos = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observer.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });
        elementos.forEach((elemento) => observador.observe(elemento));
    } else {
        elementos.forEach((elemento) => {
            elemento.classList.add("is-visible");
        });
    }
    const botonesFiltro = document.querySelectorAll("[data-filter]");
    const productos = document.querySelectorAll("[data-category]");
    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            const filtro = boton.dataset.filter;
            botonesFiltro.forEach((otroBoton) => {
                otroBoton.classList.remove("is-active");
                otroBoton.setAttribute("aria-pressed", "false");
            });
            boton.classList.add("is-active");
            boton.setAttribute("aria-pressed", "true");
            productos.forEach((producto) => {
                const categoria = producto.dataset.category;
                const mostrar = filtro === "todos" || categoria === filtro;
                producto.classList.toggle("is-hidden", !mostrar);
            });
        });
    });
    const botonesVistaRapida = document.querySelectorAll("[data-product]");
    const aviso = document.getElementById("toastMessage");
    botonesVistaRapida.forEach((boton) => {
        boton.addEventListener("click", () => {
            const producto = boton.dataset.product || "este producto";
            if (aviso) {
                aviso.textContent = `Seleccionaste ${producto}. Esta función es una demostración.`;
                aviso.classList.add("is-visible");
                aviso.setAttribute("role", "status");
                window.setTimeout(() => {
                    aviso.classList.remove("is-visible");
                }, 3000);
            } else {
                window.alert(`Seleccionaste ${producto}. Esta función es una demostración.`);
            }
        });
    });
    const campoMensaje = document.getElementById("mensaje");
    const contadorMensaje = document.getElementById("contadorMensaje");
    function actualizarContador() {
        if (!campoMensaje || !contadorMensaje) return;
        contadorMensaje.textContent = `${campoMensaje.value.length}/500 caracteres`;
    }
    if (campoMensaje && contadorMensaje) {
        campoMensaje.addEventListener("input", actualizarContador);
        actualizarContador();
    }
    const formulario = document.getElementById("contactForm");
    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            if (!formulario.checkValidity()) {
                formulario.reportValidity();
                return;
            }
            const telefono = document.getElementById("telefono");
            if (telefono && telefono.value.trim() !== "") {
                const numero = telefono.value.trim();
                if (!/^\d{10}$/.test(numero)) {
                    telefono.setCustomValidity("Escribe un teléfono de exactamente 10 dígitos.");
                    telefono.reportValidity();
                    telefono.setCustomValidity("");
                    return;
                }
            }
            let estado = document.getElementById("formStatus");
            if (!estado) {
                estado = document.createElement("div");
                estado.id = "formStatus";
                estado.className = "alert alert-success mt-3";
                estado.setAttribute("role", "status");
                formulario.appendChild(estado);
            }
            estado.textContent = "¡Gracias! El formulario se validó correctamente. Este proyecto es una demostración y no envía datos a un servidor.";
            formulario.reset();
            actualizarContador();
        });
    }
});
