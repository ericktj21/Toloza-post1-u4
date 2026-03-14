// app.js

// --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
const btnAgregar = document.getElementById('btn-agregar');
const inputTitulo = document.getElementById('input-titulo');
const inputDescripcion = document.getElementById('input-descripcion');
const selectCategoria = document.getElementById('select-categoria');
const galeria = document.getElementById('galeria');
const contenedorFiltros = document.getElementById('filtros');

// --- 2. LÓGICA PARA AGREGAR TARJETAS (Arrow Functions y ES6) ---
const agregarTarjeta = () => {
    const titulo = inputTitulo.value.trim();
    const descripcion = inputDescripcion.value.trim();
    const categoria = selectCategoria.value;

    // Validación básica
    if (titulo === '' || descripcion === '') {
        alert('Por favor, completa el título y la descripción.');
        return;
    }

    // Creamos un objeto para aplicar desestructuración más adelante (Requisito ES6)
    const datosTarjeta = {
        tit: titulo,
        desc: descripcion,
        cat: categoria
    };

    renderizarTarjeta(datosTarjeta);

    // Limpiamos los inputs después de agregar
    inputTitulo.value = '';
    inputDescripcion.value = '';
    inputTitulo.focus();
};

// Función para construir el HTML (Desestructuración, createElement y appendChild)
const renderizarTarjeta = ({ tit, desc, cat }) => { 
    // Creamos el elemento article
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('tarjeta'); // classList (Requisito DOM)
    tarjeta.dataset.categoria = cat; // Guardamos la categoría en un data-attribute

    // Uso de Template Literals para el contenido interno (Requisito ES6)
    tarjeta.innerHTML = `
        <span class="badge">${cat}</span>
        <h3>${tit}</h3>
        <p>${desc}</p>
        <button class="btn-eliminar">Eliminar</button>
    `;

    // Agregamos la tarjeta completa a la galería
    galeria.appendChild(tarjeta);
};

// --- 3. DELEGACIÓN DE EVENTOS: ELIMINAR TARJETAS ---
// Escuchamos los clicks en toda la galería, no en cada botón individualmente
galeria.addEventListener('click', (e) => {
    // Si el elemento clickeado (event.target) tiene la clase btn-eliminar...
    if (e.target.classList.contains('btn-eliminar')) {
        // Seleccionamos al padre (la tarjeta completa) y la borramos
        const tarjetaAEliminar = e.target.parentElement;
        tarjetaAEliminar.remove(); // Método remove (Requisito DOM)
    }
});

// --- 4. DELEGACIÓN DE EVENTOS: FILTRAR TARJETAS ---
contenedorFiltros.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filtro')) {
        
        // 1. Cambiar estilos visuales del botón activo
        document.querySelectorAll('.btn-filtro').forEach(btn => btn.classList.remove('activo'));
        e.target.classList.add('activo');

        // 2. Obtener la categoría que queremos ver
        const categoriaSeleccionada = e.target.dataset.categoria;
        const tarjetas = document.querySelectorAll('.tarjeta');

        // 3. Mostrar u ocultar usando classList.add / classList.remove
        tarjetas.forEach(tarjeta => {
            if (categoriaSeleccionada === 'todas' || tarjeta.dataset.categoria === categoriaSeleccionada) {
                tarjeta.classList.remove('oculta');
            } else {
                tarjeta.classList.add('oculta');
            }
        });
    }
});

// --- 5. EVENT LISTENER PRINCIPAL ---
btnAgregar.addEventListener('click', agregarTarjeta);