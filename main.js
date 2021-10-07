document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let city = document.querySelector("#input-text").value;
  console.log(city);
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => {
      console.log(res);
      return res.json().then((data) => {
        console.log(data);
        let display = document.querySelector("div.display");
        display.innerHTML = `<div><strong>${city}</strong></div>
        <div><strong>Area: </strong>${data.nearest_area[0].areaName[0].value}</div>
        <div><strong>Region: </strong>${data.nearest_area[0].region[0].value}</div>
        <div><strong>Country: </strong>${data.nearest_area[0].country[0].value}</div>
        <div><strong>Currently: Feels like </strong>${data.current_condition[0].FeelsLikeF}°F</div>`;

        let ul = document.querySelector("div.history ul");
        let li = document.createElement("li");
        ul.append(li);
        ul.style.liststyletype = "circle";
        li.textContent = `${city} - ${data.current_condition[0].FeelsLikeF}°F`;

        if (document.querySelector("ul li").textContent.includes("previous")) {
          document.querySelector("li#default").remove();
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
