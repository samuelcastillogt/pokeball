const urlBase = "https://pokeapi.co/api/v2/pokemon/"
const opts = {crossDomain: true}
const tarjeta = document.getElementById("tarjeta")
const pokebolla = document.getElementById("pokebolla")
var synth = window.speechSynthesis;
class personaje {
    constructor (data){
        this.nombre = data.name
        this.experiencia = data.base_experience
        this.id= data.id
        this.imagen = data.sprites.front_default
    } 
}
window.addEventListener("hashchange",()=>{
    const id = String(window.location.hash).replace("#", "")
    
    $.get(urlBase+id, opts, (data)=>{
        pokebolla.innerHTML=""
        pokebolla.innerHTML=`
      <div class="info">
        <div class="side">
            <img src="${data.sprites.front_default}">
            <p>${data.name}</p>
        </div>
        <div class="detalles">
            <ul>
                <li>Altura: ${data.height}</li>
                <li>Peso: ${data.weight}</li>
                <li>Habilidad: ${data.abilities[0].ability.name}</li>
                <li>Experiencia base: ${data.base_experience}</li>
            </ul>
        </div>
      </div>`
      speechSynthesis.speak(new SpeechSynthesisUtterance(data.name))
    })
})
document.addEventListener("DOMContentLoaded", ()=>{
    
    $.get("https://pokeapi.co/api/v2/pokemon?limit=100", opts, (data)=>{
        
        const datos = data.results
        
        datos.forEach(async(item)=>{
            const id= String(item.url).replace("https://pokeapi.co/api/v2/pokemon/", "").substring()
            
              $.get(item.url, opts, (resultado)=>{
                var pokeMonster ={
                    name: resultado.name,
                    imagen: resultado.sprites.front_default,
                    id: id

                }
                var pokemon = new poke(pokeMonster)
                pokemon.card(pokeMonster)
              
              })
             
        })

})
   
})

personaje.prototype.lala= (data)=>{
    tarjeta.innerHTML=+ `
    <img src="${data.imagen}">
    <h1>Nombre: ${data.nombre}</h1>
    <p>ID: ${data.id}</p>
    <p>Experiecnia base: ${data.experiencia}</p>
    `
}
class poke  {
    constructor (data){
        this.nombre = data.name,
        this.url = data.url,
        this.id = data.id
    }
}
poke.prototype.card=async(data)=>{
    const click= data.url
    tarjeta.innerHTML+=`
    <a class="row" href="#${data.id}">
    <div class="col s12 m7">
      <div class="card" id="${data.name}">
        <div class="card-image">
          <img src="${data.imagen}">
          
        </div>
        <div class="card-content">
        <p">${data.name}</p>
        </div>
        
      </div>
    </div>
  </a>
    `
}
