const input = document.querySelector("input")
const title = document.querySelector('.title')
const content = document.querySelector('.content')
const error = document.querySelector('.error')
const texts = ["Quieres saber que clima habra hoy","Ve el clima de cualquier cuidad","Hoy estara soleado?"]
setInterval(()=>{
    title.classList.toggle('animation-text')
    title.textContent= texts[Math.floor(Math.random() * (3 - 0)) + 0]
},5000)
const url = "http://api.weatherstack.com/current"
const api_key = '2bad2d4649e64b34d3416d70d327c255'

const background = {
    "Sunny":"url('./assets/sunny.webp')",
    "Partly cloudy":"url('./assets/clouds.webp')",
    "Clear":"url('./assets/clear.jpg')",
    "Moderate rain":"url('./assets/rain.jpg')",
    "Light Rain":"url('./assets/rain.jpg')",
    "Light rain showe":"url('./assets/rain.jpg')"
}
const weather_descriptions = {
    "Sunny":"Dia soleado",
    "Partly cloudy":"Un parde nubes",
    "Clear":"Cielo claro",
    "Patchy rain possible":"Con posibilidad de lluvia",
    "Moderate rain":"lluvia moderada",
    "Light rain showe":"Lluvia ligera"
}
input.addEventListener('keydown',(e)=>{
    if(e.key==="Enter"){
        fetch(`${url}?access_key=${api_key}&query=${input.value}`)
        .then(data=>data.json())
        .then(data=>{
            document.body.style.backgroundImage=background[data.current.weather_descriptions[0]]
            document.body.style.backgroundColor = "rgba(17, 17, 17, 0.356)"
            content.innerHTML=`
                <h2>${data.request.query}</h2>
                <div>
                <img src=${data.current.weather_icons[0]}>
                <p class="temp">${data.current.temperature}°c</p>
                <p class="description">${weather_descriptions[data.current.weather_descriptions[0]]}</p>
                <p class="time">${data.location.localtime}</p>
                <div class="wind">
                <p>Direccion del viento: ${data.current.wind_dir}</p>
                <p>Grado de viento: ${data.current.wind_degree}</p>
                <p>Velocidad del viento: ${data.current.wind_speed}</p>
                </div>
                </div>
                `
        }).catch(err=>{
            error.textContent=`No se a encontrado "${input.value}"`
        })
    }
})