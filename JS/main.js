
document.getElementById("iconoCarrito").addEventListener("click", ()=>{
    document.getElementById("carrito").classList.toggle("active")
})

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const gomasDonic = [
    {
        id: 1,
        nombre: "Donic Blufire M1",
        velocidad: "8/10",
        spin: "10/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluefire-m1.jpg",
        precio: 120000
    },
    {
        id: 2,
        nombre: "Donic Bluestorm Z1",
        velocidad: "10/10",
        spin: "9/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluestorm-z1.jpg",
        precio: 75000
    },
    {
        id: 3,
        nombre: "Donic Barracuda",
        velocidad: "6/10",
        spin: "7/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-baracuda.jpg",
        precio: 50000
    },
    {
        id: 4,
        nombre: "Donic Bluefire JP01",
        velocidad: "8/10",
        spin: "9/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluefire-jp-01.jpg",
        precio: 60000
    },
    {
        id: 5,
        nombre: "Donic Bluestorm Z2",
        velocidad: "8/10",
        spin: "8/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluestorm-z2.jpg",
        precio: 100000
    },
    {
        id: 6,
        nombre: "Donic Vario",
        velocidad: "8/10",
        spin: "6/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-vario.jpg",
        precio: 80000
    },
    {
        id: 7,
        nombre: "Donic Acuda S1",
        velocidad: "8/10",
        spin: "7/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-acuda-s1.jpg",
        precio: 40000
    },
    {
        id: 8,
        nombre: "Desto F3",
        velocidad: "4/10",
        spin: "10/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-destof3.jpg",
        precio: 45000
    },
    {
        id: 9,
        nombre: "Donic Bluefire M2",
        velocidad: "8/10",
        spin: "6/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluefire-ms2.jpg",
        precio: 85000
    },
    {
        id: 10, 
        nombre: "Donic Blufire JP02",
        velocidad: "6/10",
        spin: "8/10",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-bluefire-jp-02.jpg",
        precio: 42000
    }
];

const maderasDonic = [
    {
        id: 101,
        nombre: "Donic Carbospeed",
        dureza: "4/5",
        capas: "4",
        img: "https://cdn.megaspin.net/store/images/products/zoom2_d-ovtcharov-cs.jpg?v=2",
        precio: 40000
    },
    {
        id: 102,
        nombre: "Donic Senso Carbon",
        dureza: "3/5",
        capas: "4",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-original-senso-v1.jpg",
        precio: 40000
    },
    {
        id: 103,
        nombre: "Donic Ultra Carbon",
        dureza: "4/5",
        capas: "5",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-waldner-senso-ultra-c.jpg",
        precio: 45000
    },
    {
        id: 104,
        nombre: "Donic Waldner",
        dureza: "5/5",
        capas: "7",
        img: "https://cdn.megaspin.net/store/images/products/zoom_d-original-1-senso.jpg",
        precio: 75000
    },
    {
        id: 105,
        nombre: "Donic Burn OFF",
        dureza: "4/5",
        capas: "6",
        img: "https://cdn.megaspin.net/store/images/products/zoom2_d-burn-off.jpg",
        precio: 70000
    },
    {
        id: 106,
        nombre: "Donic Allplay",
        dureza: "2/5",
        capas: "3",
        img: "https://cdn.megaspin.net/store/images/products/zoom2_d-app.jpg",
        precio: 20000
    },
];

const pelotas = [
    {
        id: 201,
        nombre: "Butterfly 3 stars - 6 pack",
        img: "https://cdn.megaspin.net/store/images/products/zoom2_b-r40p-3.jpg",
        precio: 10000
    },
    {
        id: 202,
        nombre: "Nittaku 3 stars - 6 pack",
        img: "https://cdn.megaspin.net/store/images/products/zoom_nitt-40p-3-12.jpg",
        precio: 5000
    },
    {
        id: 203,
        nombre: "DHS 3 stars - 6 pack",
        img: "https://cdn.megaspin.net/store/images/products/zoom_dh-40-plus-3-6.jpg",
        precio: 7500
    },
];

const productosGomas = document.getElementById("productosGomas");
const productosMaderas = document.getElementById("productosMaderas");
const productosPelotas = document.getElementById("productosPelotas");
const productosCarrito = document.getElementById("productosCarrito");
const total = document.getElementById("total");

function precioArs(precio) {
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS",maximumFractionDigits:0, });
}

function funcionActualizar(){
    productosCarrito.innerHTML = ""
    carrito.forEach(el =>{
        productosCarrito.innerHTML += `
                <div class="producto">
                    <h3>${el.nombre}</h3>
                    <div class="img">
                        <img src="${el.img}" alt="">
                    </div>
                    <p>Precio: <span>${precioArs(el.precio)}</span></p>
                    <p>Cantidad:<span>${el.cantidad}</span></p>
                    <button class="botonEliminar">Eliminar</button>
                </div>`
    })

    localStorage.setItem("carrito", JSON.stringify(carrito))

    total.innerText = precioArs(carrito.reduce((acc, el) =>{
        return acc + el.precio*el.cantidad
    }, 0))

    quitarProducto()
}

function botonComprar (){
    const botones = document.getElementsByClassName("botonesCompra")
    const ArrayDeBotones = Array.from(botones)

    ArrayDeBotones.forEach(el => {
        el.addEventListener("click", (evento) =>{
            let nombreProducto = evento.target.parentElement.children[0].innerText;
            let precioProducto = Number(evento.target.parentElement.children[2].children[0].innerText.replace(/[$.]/g, '').replace(/\s/g, ''));
            let elementoBuscado = carrito.find(el => el.nombre === nombreProducto);


            if(elementoBuscado){
                elementoBuscado.cantidad++
            }else{
                carrito.push({
                    nombre: evento.target.parentElement.children[0].innerText,
                    img: evento.target.parentElement.children[1].children[0].src,
                    precio: precioProducto,
                    cantidad: 1,
                })    
            }
            funcionActualizar();
        })
    })
}

function quitarProducto (){
    const botones = document.getElementsByClassName("botonEliminar")
    const ArrayDeBotones = Array.from(botones)

    ArrayDeBotones.forEach(el =>{
        el.addEventListener("click", (evento) =>{
            let elementoBuscado = carrito.find(el => el.nombre == evento.target.parentElement.children[0].innerText);
            let arrayNombres = carrito.map(el => {
                return el.nombre 
            })         
            
            if(elementoBuscado.cantidad == 1){
                let index = arrayNombres.indexOf(evento.target.parentElement.children[0].innerText) 
                carrito.splice(index, 1)   
            }else{
                elementoBuscado.cantidad = elementoBuscado.cantidad - 1
            }
            funcionActualizar()
        })
    })
}

function mostrarProductos(productos, contenedor) {
    productos.forEach(el => {
        contenedor.innerHTML += `
            <div class="producto">
                <h3>${el.nombre}</h3>
                <div class="img">
                    <img src="${el.img}" alt="">
                </div>
                <p>Precio: <span>${precioArs(el.precio)}</span></p>
                ${el.velocidad ? `<p>Velocidad: ${el.velocidad}</p>` : ''}
                ${el.spin ? `<p>Spin: ${el.spin}</p>` : ''}
                ${el.dureza ? `<p>Dureza: ${el.dureza}</p>` : ''}
                ${el.capas ? `<p>Capas: ${el.capas}</p>` : ''}
                <button class="botonesCompra">Comprar</button>
            </div>`;
    });
    botonComprar();  
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(gomasDonic, productosGomas);
    mostrarProductos(maderasDonic, productosMaderas);
    mostrarProductos(pelotas, productosPelotas);
    funcionActualizar(); 
});

