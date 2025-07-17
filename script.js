document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById('get-weather-btn');
    const WeatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    // const API_KEY = "YOUR_API_KEY_HERE"; // placeholder //use your own API_KEY here

    getWeatherButton.addEventListener('click',async ()=>{
    const city = cityInput.value.trim();
    if(!city) return;
    
    //it may throw an error
    //server/database is always in another continent
    try{
       const weatherData = await fetchWeatherData(city); //have to grab the response and its never immediate, so use await.
        displayWeatherData(weatherData);
    }catch(error){
        showError();
    }

    });
    async function fetchWeatherData(city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response =await fetch(url);
        console.log(typeof response);
        console.log('RESPONSE', response);
        if(!response.ok){
            throw new Error("city not found");
        }
        const data = await response.json();
        return data;
    }
    function displayWeatherData(data){
        //display
        console.log(data);
        const{name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `weather:${weather[0].description}`;
        //unlock the display
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
     
    }
    function showError(){
        WeatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})