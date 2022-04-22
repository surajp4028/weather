const container = document.querySelector('.container'),
getdata = container.querySelector('.get-data'),
infotext = getdata.querySelector('.info-text'),
inputfeild = getdata.querySelector('input'),
locationbtn = document.querySelector('button'),
wheatherresult = document.querySelector('.whether-result'),
i = container.querySelector('header i'),
wicon = wheatherresult.querySelector('.main-result img');

var apiid = '3d84be2959474775db0f8626e7021e8e';
let api;

inputfeild.addEventListener("keyup", (e) =>{
    if(e.key == "Enter" && inputfeild.value != ""){
        //console.log("hello");
        requestApi(inputfeild.value);
        e.preventDefault();
    }
});


i.addEventListener("click",()=>{
   // console.log("touch");
    getdata.classList.remove('active');
    wheatherresult.classList.remove('active');
    i.classList.remove('active');
    
});

locationbtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else{
        alert("your browser not support geolocation api");
    }
});

function onError(error){
    //console.log(error);
    infotext.innerText = error.message;
    infotext.classList.add('error');
}
function onSuccess(position){
    console.log(position);
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiid}`;
    //console.log(latitude);
    fetchData();
}

function requestApi(city){
   
    //console.log(city)
    api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiid}`;
    fetchData();
    
}

function fetchData(){
    infotext.innerText = "Getting wheather details...";
    infotext.classList.add('pending');
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));

}

function weatherDetails(info){
    if(info.cod == "404"){
        infotext.innerText = `${inputfeild.value} isn't valid City name`;
        infotext.classList.add('error');
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description ,id} = info.weather[0];
        const {feels_like,humidity,temp} = info.main;


        if( id == 800){
            wicon.src = "wh-con/clear.png";
        }
        else if( id >= 200 && id <= 232){
            wicon.src = "wh-con/thunderstorm.png";
        }
        else if( id >= 600 && id <= 622){
            wicon.src = "wh-con/snow.png";
        }
        else if( id >= 701 && id <= 781){
            wicon.src = "wh-con/haze.png";
        }
        else if( id >= 801 && id <= 804){
            wicon.src = "wh-con/cloudy.png";
        }
        else if( (id >= 300 && id <= 321 ) || (id >= 500 && id<= 531) ){
            wicon.src = "wh-con/rain.png";
        }






        wheatherresult.querySelector('.temp .num').innerText = temp;
        wheatherresult.querySelector('.wh-condition .condition').innerText = description;
        wheatherresult.querySelector('.area .place').innerText = `${city}, ${country}`;

        wheatherresult.querySelector('.feel-humidity .feel .feel-value').innerText = feels_like;

        wheatherresult.querySelector('.feel-humidity .humidity .feel-value').innerText = humidity;
        
        

        infotext.classList.remove('pending','error');
        getdata.classList.add('active');
        wheatherresult.classList.add('active');
        i.classList.add('active');
    }
    console.log(info);
   
}