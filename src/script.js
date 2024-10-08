document.addEventListener('DOMContentLoaded', () => {
    const formIngresar = document.getElementById('form-ingresar');
    const formModificar = document.getElementById('form-modificar');
    const formSolicitar = document.getElementById('form-solicitar');
    const listaMercancia = document.getElementById('lista-mercancia');

    let mercancia = [];

    // Función para ingresar un nuevo producto
    formIngresar.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const cantidad = document.getElementById('cantidad').value;
        const precio = document.getElementById('precio').value;
        const id = mercancia.length + 1;

        const nuevoProducto = { id, nombre, cantidad, precio };
        mercancia.push(nuevoProducto);
        actualizarLista();
        formIngresar.reset();
    });

    // Función para modificar un producto existente
    formModificar.addEventListener('submit', (e) => {
        e.preventDefault();
        const idModificar = parseInt(document.getElementById('id-modificar').value);
        const nuevoNombre = document.getElementById('nuevo-nombre').value;
        const nuevaCantidad = document.getElementById('nueva-cantidad').value;
        const nuevoPrecio = document.getElementById('nuevo-precio').value;

        const producto = mercancia.find(item => item.id === idModificar);
        if (producto) {
            if (nuevoNombre) producto.nombre = nuevoNombre;
            if (nuevaCantidad) producto.cantidad = nuevaCantidad;
            if (nuevoPrecio) producto.precio = nuevoPrecio;
            actualizarLista();
            formModificar.reset();
        } else {
            alert('Producto no encontrado');
        }
    });

    // Función para solicitar más cantidad de un producto
    formSolicitar.addEventListener('submit', (e) => {
        e.preventDefault();
        const idSolicitar = parseInt(document.getElementById('id-solicitar').value);
        const cantidadSolicitar = parseInt(document.getElementById('cantidad-solicitar').value);

        const producto = mercancia.find(item => item.id === idSolicitar);
        if (producto) {
            producto.cantidad = parseInt(producto.cantidad) + cantidadSolicitar;
            actualizarLista();
            formSolicitar.reset();
        } else {
            alert('Producto no encontrado');
        }
    });

    // Función para actualizar la lista de productos mostrada
    function actualizarLista() {
        listaMercancia.innerHTML = '';
        mercancia.forEach(item => {
            const div = document.createElement('div');
            div.innerHTML = `ID: ${item.id} - Nombre: ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio}`;
            listaMercancia.appendChild(div);
        });
    }
});
