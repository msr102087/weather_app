  
const api = {
    key: "e168043d1a7dd0cba80c5aac6407b14e",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
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

      let city = document.querySelector('.location .city');
      city.innerText = `${weather.name}, ${weather.sys.country}`;

      let now = new Date();
      let date = document.querySelector('.location .date');
      date.innerText = dateBuilder(now);

  }

  function dateBuilder (d) {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate();
    
  }