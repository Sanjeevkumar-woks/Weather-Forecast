// URL//
var url="https://api.openweathermap.org/data/2.5/weather?q=belgaum&lang=en&units=metric&appid=78ea530bcb66434fe3d2276971510974";

// Live time 
function date_time(time){
    let unix_timestamp = time;
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime;
}
//Display Time
date_time();
var datetime = new Date();
document.getElementById("time").textContent = datetime; //it will print on html page
function refreshTime() {
    const timeDisplay = document.getElementById("time");
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    timeDisplay.textContent = formattedString;
  }
    setInterval(refreshTime, 1000);

//City Search function
function city(){
    var city_entered=document.getElementById("search-bar").value;
    document.getElementById("search-bar").value="";
    if(city_entered===""){
        document.getElementById("alert").innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Enter City!</strong> Enter a valid City name.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> 
      `;
    }
    else{
       let  customuUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city_entered}&lang=en&units=metric&appid=78ea530bcb66434fe3d2276971510974`;
        weather(customuUrl);   
    } 
}

//Featching Data
function weather(customuUrl){  
    fetch(customuUrl)
    .then((res)=>res.json())
    .then((result)=>{
        display(result);        
    })
    .catch(()=>{
      fetch(url)
      .then((res)=>res.json())
      .then((result)=>{
          display(result);        
      })
        document.getElementById("alert").innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>City not found!</strong> Enter a valid City name.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    })
}

//Displaying The result
function display(data){
    const city_name=document.getElementById("city-name");
    city_name.innerText=`${data.name}`.toUpperCase();  
    document.getElementById("temp").innerHTML=`<h1>${data.main.temp}<sup>o<sub>C</sub></sup></h1>`
    document.getElementById("cloud").innerText=`${data.weather[0].description}`
    document.getElementById("low").innerHTML=`Low <h4>${data.main.temp_min}<sup>o<sub>C</sub></sup></h4>`;
    document.getElementById("high").innerHTML=`High <h4>${data.main.temp_max}<sup>o<sub>C</sub></sup></h4>`;
    document.getElementById("rise").innerHTML=`Sun Rise <h5>${date_time(data.sys.sunrise)}</h5>`;
    document.getElementById("set").innerHTML=`Sun Set <h5>${date_time(data.sys.sunset)}</h5>`;
    document.getElementById("humidity").innerText=data.main.humidity;
    document.getElementById("wind").innerText=data.wind.speed;
    document.getElementById("pressure").innerText=data.main.pressure;
}

//Enter key press eventListner
var input = document.getElementById("search-bar");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search-btn").click();
  }
});



