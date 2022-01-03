var data = document.getElementById('cities');

function populateHeader(jsonObj) {
    var myH3 = document.createElement('h3');
    myH3.textContent = jsonObj['name'] + ", " + jsonObj['country'];
    data.appendChild(myH3);

    var myPara = document.createElement('p');
    myPara.textContent = 'Latitude : ' + jsonObj['lat'] + ', longitude: ' + jsonObj['lng'];
    data.appendChild(myPara);
}
// Converting JSON object to JS object

// Define recursive function to print nested values
// function printValues(obj) {
//     for(var k in obj) {
//         if(obj[k] instanceof Object) {
//             printValues(obj[k]);
//         } else {
//             document.write(obj[k] + "<br>");
//         };
//     }
// }        

function printValues(obj) {
    for(let i =0 ; i<100; i++) {
        populateHeader(obj[i])
    }
}
function initMap(){
    var options = {
        zoom: 12,
        center: {lat: 47.82289, lng: 35.19031}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
}
/*
*Первый способ
*/
// var request = new XMLHttpRequest();
// request.open("GET", "node_modules/cities.json/cities.json", false);
// request.send(null)
// var obj = JSON.parse(request.responseText);    
// printValues(obj);
/*
*Второй способ
*/
// fetch("node_modules/cities.json/cities.json", { mode: "no-cors" }) // disable CORS because path does not contain http(s)
// .then((res) => res.json())
// .then((data) => printValues(data));

/*
*Async await fetch JSON
https://dmitripavlutin.com/javascript-fetch-async-await/
*/
var cities= [];
async function fetchMoviesJSON() {
    const response = await fetch("node_modules/cities.json/cities.json");
    const elements = await response.json();
    return elements;
}
fetchMoviesJSON().then(json_data => {
    // fetched cities
    // setTimeout(()=>console.log(cities), 1000)
    // console.log(cities)  //если хотим сразу вывести данные
    for(var k in json_data) {
        var v = json_data[k]; //добавляем из json в массив
        cities.push(k, v);
    }
    printValues(json_data)
    //console.log(cities) //тут срабатывает мгновенно
});
//console.log(cities) // после fetch ожидание, затем обновляется страница
setTimeout(()=>console.log(cities), 1000)