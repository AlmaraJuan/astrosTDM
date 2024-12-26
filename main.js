document.getElementById("iconoCarrito").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("active");
});

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosGomas = document.getElementById("productosGomas");
const productosMaderas = document.getElementById("productosMaderas");
const productosPelotas = document.getElementById("productosPelotas");
const productosCarrito = document.getElementById("productosCarrito");
const total = document.getElementById("total");
const finalizarCompra = document.getElementById("finalizarCompra"); // El botón de finalizar compra

function precioArs(precio) {
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

function funcionActualizar() {
    productosCarrito.innerHTML = "";
    carrito.forEach(el => {
        productosCarrito.innerHTML += `
            <div class="producto">
                <h3>${el.nombre}</h3>
                <div class="img">
                    <img src="${el.img}" alt="">
                </div>
                <p>Precio: <span>${precioArs(el.precio)}</span></p>
                <p>Cantidad: <span>${el.cantidad}</span></p>
                <button data-nombre="${el.nombre}" class="botonEliminar">Eliminar</button>
            </div>`;
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    total.innerText = precioArs(carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0));

    // Delegación de eventos para eliminar productos
    document.querySelectorAll(".botonEliminar").forEach(boton => {
        boton.addEventListener("click", (evento) => {
            const nombre = evento.target.getAttribute("data-nombre");
            eliminarProducto(nombre);
        });
    });
}

function agregarProducto(producto) {
    const productoExistente = carrito.find(el => el.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    Swal.fire({
        title: 'Producto agregado!',
        text: `${producto.nombre} ha sido agregado a tu carrito.`,
        icon: 'success',
        confirmButtonText: 'Continuar comprando'
    });

    funcionActualizar();
}

function eliminarProducto(nombre) {
    const index = carrito.findIndex(el => el.nombre === nombre);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }

    funcionActualizar();
}

function mostrarProductos(productos, contenedor) {
    contenedor.innerHTML = ""; 
    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${producto.nombre}</h3>
                <div class="img">
                    <img src="${producto.img}" alt="">
                </div>
                <p>Precio: <span>${precioArs(producto.precio)}</span></p>
                ${producto.velocidad ? `<p>Velocidad: ${producto.velocidad}</p>` : ''}
                ${producto.spin ? `<p>Spin: ${producto.spin}</p>` : ''}
                ${producto.dureza ? `<p>Dureza: ${producto.dureza}</p>` : ''}
                ${producto.capas ? `<p>Capas: ${producto.capas}</p>` : ''}
                <button class="botonesCompra" data-producto='${JSON.stringify(producto)}'>Comprar</button>
            </div>`;
    });

    // Delegación de eventos para los botones de compra
    contenedor.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("botonesCompra")) {
            const producto = JSON.parse(evento.target.getAttribute("data-producto"));
            agregarProducto(producto);
        }
    });
}

function vaciarCarrito() {
    carrito.length = 0; 
    localStorage.removeItem("carrito"); 
    funcionActualizar(); 
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./data.json"); 
        const data = await response.json();

        mostrarProductos(data.gomasDonic, productosGomas);
        mostrarProductos(data.maderasDonic, productosMaderas);
        mostrarProductos(data.pelotas, productosPelotas);

        funcionActualizar();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

finalizarCompra.addEventListener("click", () => {
    vaciarCarrito();

    Swal.fire({
        title: 'Compra finalizada!',
        text: 'Gracias por tu compra. Esperamos que vuelva pronto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
});