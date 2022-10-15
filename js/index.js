var locationInput = '';
var country_name = '';
var finalResult = '';

locationInput = document.getElementById("location-Input");
locationInput.addEventListener('input', function (e) {
 country_name = e.target.value
  console.log(country_name);
  getWeather(country_name)
  displayData()
});

var serachBnt = document.getElementById('submit');
serachBnt.addEventListener('click', function () {
  console.log(country_name);
  getWeather(country_name)
  displaycurrentWeather()
    displayNextDayWeather();

 })



async function getWeather(country) { 

  var apiRespobse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5b284ec46a5946abaaa234004221310&q=${country}&days=3`) 

  finalResult = await apiRespobse.json();
  console.log(finalResult);
  displaycurrentWeather();
  displayNextDayWeather();
  displayAfterNextDayWeather()
}





function getMonth() { 
var today = new Date(finalResult.location.localtime); 
var month = today.toLocaleString('default', { month: 'long' });
  document.getElementById("current_month").innerHTML = month;
}


function getCurrentDay() { 
var today = new Date(finalResult.location.localtime); 
var day = today.toLocaleString('default', { weekday: 'long' });
document.getElementById("current_day").innerHTML = day;
}


function displaycurrentWeather() { 
  document.getElementById("curent-location").innerHTML = finalResult.location.name;
  document.querySelector(".current-degree").innerHTML = `${finalResult.current.temp_c}<sup>o</sup>C`;
  document.querySelector(".custom").innerHTML = `<p>${finalResult.current.condition.text}</p>`;
  document.querySelector(".degree-icon").innerHTML =
    `<img src=http:${finalResult.current.condition.icon} alt="">`;
  getMonth();
  getCurrentDay();

}


function getNextDay() { 
var today = new Date(finalResult.forecast.forecastday[1].date); 
  var day = today.toLocaleString('default', { weekday: 'long' });
  console.log(day);
document.getElementById("next_day").innerHTML = day;
}

function getAfterNextDay() { 
var today = new Date(finalResult.forecast.forecastday[2].date); 
var day = today.toLocaleString('default', { weekday: 'long' });
document.getElementById("after_next_day").innerHTML = day;
}




function displayNextDayWeather() { 
  getNextDay();
  document.getElementById("next-custom").innerHTML = `<p>${finalResult.forecast.forecastday[1].day.condition.text}</p>`;
   document.getElementById("next_degree_icon").innerHTML =
     `<img src=http:${finalResult.forecast.forecastday[1].day.condition.icon} alt="">`;
  document.getElementById("next_max_degree").innerHTML = `${finalResult.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`
  document.getElementById("next_min_degree").innerHTML = `${finalResult.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`


}



function displayAfterNextDayWeather() { 
  getAfterNextDay()
  document.getElementById("next_after-custom").innerHTML = `<p>${finalResult.forecast.forecastday[2].day.condition.text}</p>`;
   document.getElementById("next_after_degree_icon").innerHTML =
     `<img src=http:${finalResult.forecast.forecastday[2].day.condition.icon} alt="">`;
  document.getElementById("next_after_max_degree").innerHTML = `${finalResult.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`
  document.getElementById("next_after_min_degree").innerHTML = `${finalResult.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`


}











getWeather("Egypt");

