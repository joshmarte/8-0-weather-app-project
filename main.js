function getData(city) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => {
      //   console.log(res);
      return res.json().then((data) => {
        // console.log(data);

        let divDisplay = document.querySelector("div.display");
        divDisplay.innerHTML = `<div><strong>${city}</strong></div>
        <div><strong>Area: </strong>${data.nearest_area[0].areaName[0].value}</div>
        <div><strong>Region: </strong>${data.nearest_area[0].region[0].value}</div>
        <div><strong>Country: </strong>${data.nearest_area[0].country[0].value}</div>
        <div><strong>Currently: Feels like </strong>${data.current_condition[0].FeelsLikeF}°F</div>`;

        let links = document.querySelectorAll("a.links");
        let cities = [];
        for (let link of links) {
          cities.push(link.textContent);
        }
        console.log(cities);
        if (!cities.includes(city)) {
          let ul = document.querySelector("div.history ul");
          let li = document.createElement("li");
          ul.append(li);
          ul.style = "list-style-type: inherit";
          li.innerHTML = `<a class="links" href="#" onClick="getData('${city}')">${city}<a/><span> - ${data.current_condition[0].FeelsLikeF}°F<span/>`;
        }

        if (document.querySelector("ul li").textContent.includes("previous")) {
          document.querySelector("li#default").remove();
        }

        let daysGrid = document.querySelector("div.days");
        daysGrid.innerHTML = `<div id="today">
        <div><strong>Today</strong></div>
        <br>
        <div><strong>Average Temperature: </strong>${data.weather[0].avgtempF}°F</div>
        <br>
        <div><strong>Max Temperature: </strong>${data.weather[0].maxtempF}°F</div>
        <br>
        <div><strong>Min Temperature: </strong>${data.weather[0].mintempF}°F</div>
        </div>
        <div id="tomorrow">
        <div><strong>Tomorrow</strong></div>
        <br>
        <div><strong>Average Temperature: </strong>${data.weather[1].avgtempF}°F</div>
        <br>
        <div><strong>Max Temperature: </strong>${data.weather[1].maxtempF}°F</div>
        <br>
        <div><strong>Min Temperature: </strong>${data.weather[1].mintempF}°F</div>
        </div>
        <div id="day-after">
        <div><strong>Day After Tomorrow</strong></div>
        <br>
        <div><strong>Average Temperature: </strong>${data.weather[2].avgtempF}°F</div>
        <br>
        <div><strong>Max Temperature: </strong>${data.weather[2].maxtempF}°F</div>
        <br>
        <div><strong>Min Temperature: </strong>${data.weather[2].mintempF}°F</div>
        </div>`;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let city = document.querySelector("#input-text").value;
  document.querySelector("#input-text").value = "";

  getData(city);
});
