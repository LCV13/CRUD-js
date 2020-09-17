//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//Event Listener
cargarEventListeners();
function cargarEventListeners(){
listaCursos.addEventListener('click', agregarCurso);

carrito.addEventListener('click', eliminarCurso);

//vaciar el carrito completamente
vaciarCarritoBtn.addEventListener('click', () =>{
    articulosCarrito = []; 

    limpiarHTML();
});
}


//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
}

function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'), 
        cantidad: 1
    }


    //Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

    carritoHTML();
}

//Mostrar los elementos en el carrito
function carritoHTML(){
//Limpiar html previo en caso de que exista
limpiarHTML();
    //Generar el HTML
    articulosCarrito.forEach(curso =>{
        const { imagen,titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>
                    <img src="${imagen}" width=100>
                </td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
                </td>
        `;

        //Agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

//Elimiar el curso del carrito
function eliminarCurso(e){


    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //Eliminar del arreglo articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML();//Iterar sobre el carrito y mostrar el html
    }
}