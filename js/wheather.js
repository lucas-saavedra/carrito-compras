const getWeather = (url) => {
  $.get(url, cont = (res, estado) => {
    if (estado === "success") {
      console.log(res);
      const weather = {
        name: res.location.name,
        region: res.location.region,
        country: res.location.country,
        img: res.current.weather_icons,
        temp_c: res.current.temperature,
        weather_descriptions: res.current.weather_descriptions
      }
      /*guardo la informacion en el storage porque la api me da muy 
      pocas peticiones para usar, entonces no es necesario 
      hacer tantas llamadas en cada actualizacion de la pagina, entiendo que 
      en un proyecto real no es necesario */
      localStorage.setItem('weather', JSON.stringify(weather))
      printCard(weather)
    }
  });
}

$(document).ready(function () {
  if (localStorage.getItem('weather') == null) {
    getWeather(`http://api.weatherstack.com/current?access_key=71497575b83b388dbf66bc08a7f35816&query=fetch:ip`);
  } else {
    const weather = JSON.parse(localStorage.getItem('weather'))
    printCard(weather)
  }
});


//renderizo la tarjeta del tiempo
const printCard = (weather) => {
  document.getElementById('wImg').setAttribute('src', `${weather.img}`);
  document.getElementById('wName').textContent = `${weather.name}, ${weather.region}, ${weather.country} `;
  document.getElementById('wTemp').textContent = `${weather.temp_c}º`;
  document.getElementById('wDescription').textContent = `${weather.weather_descriptions}`;
}