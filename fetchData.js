const API_key = "3f30b3ba0fe4270b03c215a679c6175f";

window.onload = function () {
  var startPosition;
  var geoSuccess = function (position) {
    startPosition = position;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${startPosition.coords.latitude}&lon=${startPosition.coords.longitude}&units=metric&appid=${API_key}`
    )
      .then((data) => data.json())
      .then((jsonData) => {
        console.log(jsonData);
        // console.log(jsonData.name);
        // console.log(jsonData.main.temp);
        // console.log(jsonData.main.feels_like);
        // console.log(jsonData.weather[0].description);
        // console.log(jsonData.weather[0].icon);
        fetch(
          `http://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`
        )
          .then((res) => res.blob())
          .then((result) => {
            document.getElementById("text_location").textContent =
              jsonData.name;
            document.getElementById("text_location_country").textContent =
              jsonData.sys.country;
            document.getElementById("text_temp").innerHTML = Math.round(
              jsonData.main.temp
            );
            document.getElementById("text_feelslike").innerHTML = Math.round(
              jsonData.main.feels_like
            );
            document.getElementById("text_desc").innerText =
              jsonData.weather[0].description;

            const imageObjectURL = URL.createObjectURL(result);
            document.getElementById("icon").src = imageObjectURL;
          });
      });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
