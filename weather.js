const input = document.querySelector("input");
const button = document.querySelector("button");
const wrongDiv = document.querySelector(".wrong");
let isError = false;

//* api'den veri çekmek için
const getWeather = async (cityName) => {
  const key = "6e1a3eda9fa53b82169bd49471c74f36";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=eng`;
  try {
    const res = await fetch(url);
    console.log(res);
    if (!res.ok) {
      isError = true;
      // throw new Error(`Something went wrong. Failure Code :${res.status}`);
    }
    const data = await res.json();
    
    console.log(data);
    renderWeather(data);
  } catch (error) {
    console.log(error);
  }
};


//* değerleri yazdırmak için
const weatherListDiv = document.querySelector(".row");
const renderWeather = (item) => {
  console.log(cities);
  console.log(item);
  console.log(input.innerText);
  if (isError) {
    wrongDiv.innerHTML = `<h2>City name writes wrong</h2>`;
    cities = cities.filter((a) => a !== cities[cities.length -1])
    console.log(cities);
    
  }

  if (cities.length == 4) {
    weatherListDiv.firstElementChild.remove();
    cities.shift();
    console.log(cities);
  }
  const { name, main, weather } = item;

  weatherListDiv.innerHTML += `    
  <div class="card col-sm-4" style="width: 18rem">
      <ul class="list-group list-group-flush">
        <li class="list-group-item item1">${name.replace("Province", "")} ${Math.round(main.temp)}<sup>°C</sup></li>
        
        <li class="list-group-item item4">Min ${Math.round(main.temp_min)}°C /Max ${Math.round(main.temp_max)}°C</li>
        <img class="img " src="http://openweathermap.org/img/w/${
          weather[0].icon
        }.png" class="card-img-top" alt="icon" />        
        <li class="list-group-item item3">${weather[0].description.toUpperCase()}</li>
        <div class="d-grid gap-2 col-6 mx-auto btnRemove">
        <button class="btn remove" type="button">Remove</button>
      </div>
      </ul>
    </div>
    `;
   console.log(weather);
    const classNew = weather[0].main
  const lastChild = row.lastElementChild;
  
  lastChild.classList.add(`${classNew}`)
    console.log(weather[0].main);
    console.log(lastChild);
  

};


let cities = [];


const aciklama = document.querySelector(".aciklama")
//* buton click için
button.addEventListener("click", () => {
  isError = false
  if(cities.includes(input.value.toLowerCase())){
    aciklama.innerHTML += `<h2>You know the weather for <span class="danger">${input.value.toUpperCase()}</span></h2>`;
    wrongDiv.innerHTML = `<h2></h2>`;
  }else{
  cities.push(input.value.toLowerCase())
  getWeather(input.value);
    aciklama.innerHTML = `<h2> </h2>`;
    wrongDiv.innerHTML = `<h2></h2>`;
}
  input.value = "";
});

//* enter tuşu aktif olması için
input.addEventListener("keydown", (e) => {
  isError = false
  e.key === "Enter" && button.click();
  // input.value = "";
});


//* remove basınca silme ve yeniden yazdırma yapabilme

const row = document.querySelector(".row");

row.addEventListener("click", (e) => {
  if (e.target.innerText == "Remove") {
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.previousElementSibling.firstElementChild.innerText.toLowerCase());
    console.log(cities);
    cities = cities.filter((item) => item !== e.target.parentElement.previousElementSibling.firstElementChild.innerText.toLowerCase())
    console.log(cities);    
  }
})




//* focus olması için
window.onload = () => input.focus();


