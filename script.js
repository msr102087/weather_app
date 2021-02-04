  
const api = {
    key: "e168043d1a7dd0cba80c5aac6407b14e",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
    
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      
      getResults(searchbox.value);
      fiveDay(searchbox.value)
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }

  function displayResults (weather) {
      console.log (weather)

      //Pushes search History to Local Storage

      var history = JSON.parse(window.localStorage.getItem('history')) || []
      if (history.indexOf(weather.name) === -1){
        history.push(weather.name)
        localStorage.setItem('history', JSON.stringify(history))
      }
// Creates List Items from Local Storage

      var li = document.createElement('li')
      li.classList.add('searchlist')
      li.textContent = weather.name
      var ulClass = document.querySelector('.history')
      ulClass.appendChild(li)

      let city = document.querySelector('.location .city');

      city.innerText = `${weather.name},${weather.sys.country}`;

      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = dateBuilder(now);

      let temp = document.querySelector('.current .temp');
      temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

      let weather_el = document.querySelector('.current .weather');
      weather_el.innerText = weather.weather[0].main;
      var image = document.createElement('img')
      image.setAttribute('src', `https://api.openweathermap.org/img/w/${weather.weather[0].icon}.png`)
      city.appendChild(image)
      let highLow = document.querySelector('.high-low');
      highLow.innerText = `${Math.round(weather.main.temp_min)}°F low / ${Math.round
      (weather.main.temp_max)}°F high`;

      var lon = weather.coord.lon
      var lat = weather.coord.lat
      uvIndex(lat,lon)

  }

  function dateBuilder (d) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;

  }

  // Five Day Forcast

  function fiveDay(query) {

    fetch(`${api.base}forecast?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(data =>{
      console.log(data)
      var fiveDayDiv = document.querySelector('.fiveDayForecast')

      for (var i=0; i<data.list.length; i++){
        if (data.list[i].dt_txt.indexOf("12:00:00")!== -1){
          var date = document.createElement("p")
          date.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
          var column = document.createElement("div");
          column.classList.add("col-2")
          var card = document.createElement("div");
          card.classList.add("card", "bg-primary", "text-black")
          var cardBody = document.createElement("div");
          cardBody.classList.add("card-body")
          var temperature = document.createElement("p");
          temperature.classList.add("card-text")
          temperature.textContent = "temp: " + data.list[i].main.temp
          var windSpeed = document.createElement("p");
          windSpeed.classList.add("card-text")
          windSpeed.textContent = "wind speed: " + data.list[i].wind.speed
          var humidity = document.createElement("p");
          humidity.classList.add("card-text")
          humidity.textContent = "temp: " + data.list[i].main.humidity
          var image = document.createElement('img')
      image.setAttribute('src', `https://api.openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`)
          cardBody.appendChild(image)
          column.appendChild(card)
          cardBody.appendChild(date)
          cardBody.appendChild(temperature)
          cardBody.appendChild(windSpeed)
          cardBody.appendChild(humidity)
          card.appendChild(cardBody)
          fiveDayDiv.appendChild(card)
        }
      }
    })

  }

  function uvIndex(lat,lon){
    console.log(lat,lon)

    fetch(`${api.base}uvi?lat=${lat}&lon=${lon}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(data => {
      console.log(data)
      var uvIndex = document.querySelector('.uvIndex')
      var uv = document.createElement("p");
      uv.textContent = `UV Index ${data.value}`
      uvIndex.appendChild(uv)
    })
  }


  

  // Need to Do
  // * Put day of the week in the five day    forecast
  // List Local Storage of Cities Searched Display

  // Things to do if all priorty tasks completed

  // *Restructure Layout of Weather Dashboard
