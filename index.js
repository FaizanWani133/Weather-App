const apiKey = "abaf6702a34236749deba117725e52a9";
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
    let coords = `lat=${crd.latitude}&lon=${crd.longitude}`;
    
    automatic(coords)
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

 


async function automatic (coords){
    try{
        const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?${coords}&appid=${apiKey}&units=metric`)
        const res2 = await res.json();
        displayData(res2);
    }catch(err){

    }
}
async function getWeather(coord) {
  try {
    const city = document.getElementById("city").value;

    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const res2 = await res.json();
    console.log(res2);
    
    displayData(res2);
    // weekly(res2);
  } catch (error) {
    console.log(error, "error");
  }
}

function displayData(result) {
    document.querySelector("iframe").src=`http://maps.google.com/maps?q=${result.city.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    document.querySelector("#desc").innerText=""
  let date = document.createElement("p");
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  
  let day = today.getDay();


  let month = months[today.getMonth()];
  date.innerText = `${month} ${day} , ${time}`;
  let name = document.createElement("p");
  name.innerText=`${result.city.name} , ${result.city.country}`
  let temp = document.createElement("p");
  temp.innerHTML=`<img src="http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png"/> ${parseInt(result.list[0].main.temp)}  °C`
  let feels = document.createElement("p");
  feels.innerText=`Feels like ${parseInt(result.list[0].main.feels_like)}.`
  let desc = document.createElement("p");
  desc.innerText=result.list[0].weather[0].description;
  let humidity = document.createElement("p");
  humidity.innerText=`Humidity : ${result.list[0].main.humidity}`
  
  let pressure = document.createElement("p");
  pressure.innerHTML=`<i class="fa-solid fa-compass"></i> Pressure : ${result.list[0].main.pressure}hPa`
  document.querySelector("#desc").append(date,name,temp,feels,desc,humidity,pressure);
  getWeekly(result.list);
 
  
 
}

  function getWeekly(data){
    document.querySelector("#weekly").innerText="";
    for(let i=0;i<8;i++){
         let day = myDateFormatter(data[i].dt_txt);
         let a = day.split(",")
         
         
        
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        div2.innerHTML=`<img src="http://openweathermap.org/img/wn/${data[i].weather[0].icon}.png"/>`
        let p1 = document.createElement("p");
        p1.innerText=`${parseInt(data[i].main.temp)}°`;
        p1.style.fontSize="18px"
        p1.style.fontWeight="bold"
        let p2 = document.createElement("p");
        p2.innerText=`${parseInt(data[i].main.feels_like)}°`;
        // let p3 = document.createElement("div");

        
    
        let p3 = document.createElement("p")
        p3.innerText=a[0]
        div.append(p3,div2,p1,p2);


        document.querySelector("#weekly").append(div);

    }

  }



function myDateFormatter(date) {
    return (
      new Date(date).toLocaleString("default", {
        weekday: "short",
      }) +
      ", " +
      String(new Date(date).getDate()) +
      " " +
      new Date(date).toLocaleString("default", {
        month: "short",
      })
    );
  }
//   weather()
//   async function weather(){
//     try{
//         let w = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=43&lon=32&appid=${apiKey}`)
//         let q = await w.json();
//         console.log(q);

//     }catch(err){
//         console.log(err)

//     }
//   }
 

 