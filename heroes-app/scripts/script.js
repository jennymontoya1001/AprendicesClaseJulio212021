/*Importamos la data que tenemos en el archivo data.js que se encuentra en
la carpeta data*/

/*un objeto es la instancia de una clase*/
import {data} from '../data/data.js';

/*creamos unas constantes en donde vamos a capturar los elementos
que creamos en nuestro html
***templateCard en donde definimos la estructura de nuestra tarjeta
***fragment nos va a permitir crear un nodo en el DOM
***items es la división en donde vamos a cargar todos los nodos
que creemos de información*/

const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detail = document.getElementById('detail');
const listaCompra = document.getElementById('listaCompra');
const listaTotal = document.getElementById('listaTotal');
let heroe = { };
let carrito = [];

/*Recordemos que con nuestro evento DOMContentLoaded garantizamos
que nos llame a la función loadImages luego de que cargue el DOM*/
document.addEventListener('DOMContentLoaded', () => {
    //console.log(data);

    /*invocamos a la función loadImage que le enviamos como
    parámetro la data*/
    loadImage(data);
})


/*Función loadImages, la cual nos va a permitir pintar
la información en el documento
esta función recibe la data como parámetro*/
const loadImage = data => {

    /*a nuestra data la necesitamos recorrer y lo hacemos con un ciclo
    en este caso usamos forEach. Cuando ingresamos al ciclo
    dentro de la palabra heroe va a quedar cada uno de nuestros heroes
    que estan en nuestra data, pero recordemos que cada heroe tiene múltiple
    información (objetos) y necesitamos desestructurar dicha objeto*/
   data.forEach(heroe => {
       //desestructuración de objetos
       const {id,superhero,image} = heroe;
       /*cada una de las variables desestructuradas se la asignamos
       a un elemento correspondiente de neustro template del html*/
       templateCard.querySelector('h5').textContent = superhero;
       templateCard.querySelector('img').setAttribute('src',image);
       templateCard.querySelector('img').dataset.id = id;
       /*con el cloneNode podemos clonar los nodos y así clonar el template
       las veces que se requiera, en este caso nuestro límite, es la cantidad
       de objetos que tenemos en nuestro archivo data*/
       const clone = templateCard.cloneNode(true);
       /*adicionamos los clones al fragment*/
       fragment.appendChild(clone)
   } )

   /*adicionamos el fragment a nuestro items (divisón para mostrar los targets)*/
   items.appendChild(fragment);
}


//FORMULARIO
form.addEventListener('submit',function LocalStorage(){
           
    //captura de datos y almacenamiento en variables
    let inputName = document.querySelector('#inputName').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value
    let message = document.querySelector('#msm').value;

    //validación de campos vacíos
    if(inputName=="" || email=="" || gender=="" || message==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(inputName)){
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("Gender", gender);
            localStorage.setItem("Message", message);
            getLocalStorage();
        }else{
             alert("Name most string");
        }
        return false;
    }

    
})

//Obtener la información del local storage//
function getLocalStorage(){
    let nameSave = localStorage.getItem("Name");
    let emailSave = localStorage.getItem("Email");
    let genderSave = localStorage.getItem("Gender");
    let messageSave = localStorage.getItem("Message");
    alert(`The information stored is: ${nameSave} 
    ${emailSave}
    ${genderSave}
    ${messageSave}`);
}




items.addEventListener('click', e => {
   // console.log(e.target.dataset.id);
   let idTarget = e.target.dataset.id;
   
   /*recorremos de nuevo la data*/
   data.forEach(heroe => {
       /*Desestructuramos*/
       const {id,name,superhero,publisher,alter_ego,first_appearance,image,price} = heroe;
       /*validamos si el id capturado de la imagen al hacer clic es igual
       a algún id dentro de la data*/
       if(id == idTarget){
           /*Creamos un objetos al cual a las propiedades le asignamos lo datos
           del heroe selecciones*/
           const objeto = {
               id: id,
               name: name,
               superhero: superhero,
               publisher: publisher,
               alter_ego: alter_ego,
               first_appearance: first_appearance,
               image: image,
               price: price
           }
           
           /*Almacenamos en el local storage el heroe seleccionado*/
           /*si yo envío al local storage el objeto de la siguiente manera
           localStorage.setItem("Heroe",objeto); en el local storage vamos a ver un 
           [object Object], con el JSON.stringify le indicamos que nos almacene
           con una estructura JSON(formato)*/
           localStorage.setItem("Heroe",JSON.stringify(objeto));
           getSuperHero();
           carrito.push(objeto);
           localStorage.setItem('Carrito',JSON.stringify(carrito));
           listarCarrito();
       }   
   })
   e.stopPropagation();
   e.preventDefault();
})


function getSuperHero(){
    detail.innerHTML = '';
    /*JSON.parse tomamos el string(cadena de carateres) que está trayendo
    del local storage y lo convierte en formato json*/
    heroe = JSON.parse(localStorage.getItem("Heroe")); 
    /*desestructuración de objetos*/
    const {superhero,publisher,alter_ego,first_appearance,image,price} = heroe;
    /*pintamos a información desestructurada en una tabla*/
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${superhero}</h2>
         <h4>${publisher}</h4>
         <h5>${alter_ego}</h5>
         <h5>${first_appearance}</h5>
         <h5>${price}</h5>
        </td>
    </tr>
</table>
    `
}


const listarCarrito = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    carrito = JSON.parse(localStorage.getItem('Carrito'));
    carrito === null ? ( carrito = []) : (
        carrito.forEach(element => {
            totalInt += element.price;
            listaCompra.innerHTML += 
            `<br> <br>
         <div width="100" height="100" align="center">
         <span>${element.superhero}</span>
         <span>${element.price}</span>
         <span><button id="${element.id}">x</button></span><br>
         </div>`
         total = totalInt;
        })
    )
    getTotal(total);
}

function getTotal(total){
    listaTotal.innerHTML = '';
    listaTotal.innerHTML = `<h1 align="center">Total a pagar ${total}</h1>`
    localStorage.setItem('Total',total)
}

listaCompra.addEventListener('click', (e) =>{
    e.preventDefault();

   if(e.target.innerHTML == 'x'){
        let id = e.target.id;
        deleteHeroe(id);
   }

})


function deleteHeroe(idI){
    let indexArreglo;

    carrito.forEach((elemento,index) =>{
        if(elemento.id==idI)
        indexArreglo = index;
    })
    
    carrito.splice(indexArreglo,1);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
    listarCarrito();
}
















