const timeEl = document.getElementById('timeID');
const dateEl = document.getElementById('daydateID');
const currentWeatherItemsEl = document.getElementById('weatherID');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('todayID');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='ef511482e71ae921fa323b430c2b010b';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="ampm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
           let {latitude, longitude } = success.coords;
           fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
           .then(res => res.json()).then(data => {
                console.log(data)
                showWeatherData(data);
            })
    })
}

function showWeatherData(data){
    let {humidity,pressure, sunrise, sunset, wind_speed}=data.current;
    currentWeatherItemsEl.innerHTML = 
    `<div class="humidity">Humidity
        <span class="value">${humidity}%<span>
    </div>
    <div class="pressure">Pressure
        <span class="value">${pressure}</span>
    </div>
    <div class="windspeed">Wind Speed
        <span class="value">${wind_speed}</span>
    </div>
    <div class="sunrise">sunrise
        <span class="value">${window.moment(sunrise * 1000).format('HH:mm a')}</span>
    </div>
    <div class="sunset">Sunset
        <span class="value">${window.moment(sunset*1000).format('HH:mm a')}</span>
    </div>`;
  let otherDayForcast = ''
     data.daily.forEach((day, idx) => {
         if(idx == 0){
             currentTempEl.innerHTML = ` <div class="image1"></div>
             <div class="data">
                 <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                 <div class="night">Night-<span class="value"> ${day.temp.night}&#176;C</span></div>
                 <div class="dayv">Day-<span class="value">${day.temp.day}&#176;C</span></div>
             </div>`
        }else{
            otherDayForcast += `<div class="next" id="nextID">
            <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="image"></div>
            <div class="night">Night-<span class="value"> ${day.temp.night}&#176;C</span></div>
            <div class="dayv">Day-<span class="value">${day.temp.day}&#176;C</span></div>
    </div>`
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
 }