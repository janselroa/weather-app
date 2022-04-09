const input = document.querySelector("input")
const title = document.querySelector('.title')
const content = document.querySelector('.content')
const btn = document.querySelector('button')
const error = document.querySelector('.error')
const texts = ["Quieres saber que clima habra hoy","Ve el clima de cualquier cuidad","Hoy estara soleado?"]
setInterval(()=>{
    title.classList.toggle('animation-text')
    title.textContent= texts[Math.floor(Math.random() * (3 - 0)) + 0]
},5000)
const url = "https://api.weatherbit.io/v2.0/current"
const api_key = '973a5a5f6ace4a21b2b30ca14dd5ca07'

const background = {
    "Cielo despejado":"sunny.webp",
    "Nubes dispersas":"clouds.webp",
    "Cubierto":"clouds.webp",
    "Claro":"clear.jpg",
    "Cielo claro":"clear.jpg",
    "Despejado":"clear.jpg",
    "Poco nuboso":"clouds.webp",
    "Nuboso":"nuboso.jpg",
    "Poco nuboso":"nuboso.jpg",
    "Lluvia":"lluvia.webp",
    "Lluvia ligera":"rain.jpg",
}
const getClimate = ()=>{
    fetch(`${url}?key=${api_key}&city=${input.value}&lang=es`)
        .then(data=>data.json())
        .then(data=>{
            data=data.data[0]
            error.style.display="none"
            document.body.style.backgroundImage=`url('./assets/${background[data.weather.description]}')`
            document.body.style.backgroundColor = "rgba(17, 17, 17, 0.356)"
            content.innerHTML=`
                <h2>${data.city_name}</h2>
                <div>
                <img src='https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png'>
                <p class="temp">${data.temp}°c</p>
                <p class="time">${data.datetime}</p>
                <p class="description">${data.weather.description}</p>
                <div class="wind">
                <p>Cantidad estimada de nubes: ${data.clouds}</p>
                <p>Direccion del viento: ${data.wind_cdir_full}</p>
                <p>Velocidad del viento: ${data.wind_spd}</p>
                </div>
                </div>
                `
        }).catch(err=>{
            error.style.display="inline"
            error.textContent=`No se a encontrado "${input.value}"`
        })
}
input.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        getClimate()
    }
})
btn.addEventListener('click',()=>{
    getClimate()
})
