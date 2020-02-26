//////////////////Zona constantes//////////////////
const LimSupA=40;
const LimSupB=25;
const LimSupC=200;
const LimSupO=110;
const LimSupCO=57000;
//////////////////Zona funciones///////////////////
// Funcion Random
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getMax(listan) {
    let max = 0;
    for (let j = 1; j < listan.length; j++) {
        if (listan[j] >= max) {
            max = listan[j];
        }
    }
    return max;
}
function getMin(listan) {
    let min = 100000;
    for (let j = 1; j < listan.length; j++) {
        if (listan[j] <= min) {
            min = listan[j];
        }
    }
    return min;
}
function genYaxis(listan){
    let listar=[]
    for (let j=1;j<listan.length;j++){
        listar.push(j);
    }
    return listar;
}
function genYcolorA(listan){
    let listar=[]
    let max=getMax(listan);
    let min=getMin(listan);
    for (let j=0;j<listan.length;j++){
        if(listan[j]===min || listan[j]===max){
            listar.push("#8e5ea2");
        }
        else if (listan[j]>=LimSupA){
            listar.push("#c45850");
        }
        else{
            listar.push("#3cba9f")
        }
    }
    return listar;
}
function genYcolorB(listan){
    let listar=[]
    let max=getMax(listan);
    let min=getMin(listan);
    for (let j=0;j<listan.length;j++){
        if(listan[j]===min || listan[j]===max){
            listar.push("#8e5ea2");
        }
        else if (listan[j]>=LimSupB){
            listar.push("#c45850");
        }
        else{
            listar.push("#3cba9f")
        }
    }
    return listar;
}
function genYcolorC(listan){
    let listar=[]
    let max=getMax(listan);
    let min=getMin(listan);
    for (let j=0;j<listan.length;j++){
        if(listan[j]===min || listan[j]===max){
            listar.push("#8e5ea2");
        }
        else if (listan[j]>=LimSupC){
            listar.push("#c45850");
        }
        else{
            listar.push("#3cba9f")
        }
    }
    return listar;
}
function genYcolorO(listan){
    let listar=[]
    let max=getMax(listan);
    let min=getMin(listan);
    for (let j=0;j<listan.length;j++){
        if(listan[j]===min || listan[j]===max){
            listar.push("#8e5ea2");
        }
        else if (listan[j]>=LimSupO){
            listar.push("#c45850");
        }
        else{
            listar.push("#3cba9f")
        }
    }
    return listar;
}
function genYcolorCO(listan){
    let listar=[]
    let max=getMax(listan);
    let min=getMin(listan);
    for (let j=0;j<listan.length;j++){
        if(listan[j]===min || listan[j]===max){
            listar.push("#8e5ea2");
        }
        else if (listan[j]>=LimSupCO){
            listar.push("#c45850");
        }
        else{
            listar.push("#3cba9f")
        }
    }
    return listar;
}
///////////Emisions////////////////
//Randomizo el input
let input = "Ind-"
let inputpar = ""
for (let int = 0; int < 6; int++) {
    inputpar = inputpar + int * getRndInteger(0, 9);
}
input = input + inputpar;
let input00 = document.getElementById("favId");
input00.setAttribute("value", input)
//Lista de Provincias con las mediciones Ok
let listaProvincias = [];
let url = "https://api.openaq.org/v1/locations?country=ES&limit=550";
let elem00 = document.getElementById("provincia")
fetch(url).then(recibirDatos).then(mostrarDatos).then(generarListado)
function recibirDatos(respuesta) {
    return respuesta.json();
}
function mostrarDatos(datos) {
    for (let z = 0; z < datos.meta.found; z++) {
        if (listaProvincias.includes(datos.results[z].city) === true) {

        }
        else {
            listaProvincias.push(datos.results[z].city)
        }
    }
    console.log(datos);
}
function generarListado() {
    for (let i = 0; i < listaProvincias.length; i++) {
        if (listaProvincias[i].indexOf(" ") !== -1) {
            console.log(listaProvincias[i]);
        }
        else {
            let op = document.createElement("option")
            op.innerText = listaProvincias[i];
            op.setAttribute("value", listaProvincias[i])
            elem00.appendChild(op);
        }
    }
}
// listaProvincias=["Bizkaia","Araba","Gipuzkoa","Cantabria","Asturias","Galicia","Navarra","La Rioja"]
//Generear listado municipios
let elem01 = document.getElementById("muni");
let urlPar00 = "https://api.openaq.org/v1/locations?country=ES&city=";
//Al seleccionar una provincia genero los municipios
elem00.addEventListener("change", function () {
    elem01.innerHTML = "";
    // window.confirm(""+" "+);
    //Limite 550 por la cantidad de municipios 
    let url00 = urlPar00 + elem00.value + "&limit=550"
    console.log(url00)
    fetch(url00).then(recibirDatos00).then(mostrarDatos00)
    function recibirDatos00(respuesta00) {
        return respuesta00.json();
    }
    function mostrarDatos00(datos00) {
        let op01 = document.createElement("option")
        //Guardo el id de localización en el value
        op01.setAttribute("value", "")
        op01.innerText = "Elige un municipio o zona"
        elem01.appendChild(op01);
        for (let j = 0; j < datos00.meta.found; j++) {
            let op = document.createElement("option")
            //Guardo el id de localización en el value y las coordenadas
            op.setAttribute("value", datos00.results[j].location)
            op.innerText = datos00.results[j].locations[0] + " --> Coordenadas:: Longitud: " + datos00.results[j].coordinates.longitude + " Latitud: " + datos00.results[j].coordinates.latitude;
            elem01.appendChild(op);
        }
        console.log(datos00);
    }
});
//Llamo a los elementos restantes
let coord=[]
let elem02 = document.getElementById("medidor");
let elem03 = document.getElementById("filtro");
let elem04 = document.getElementById("resul")
let elem05=document.getElementById("grafica")
let elem06=document.getElementById("mapZon")
let urlParl10 = "https://api.openaq.org/v1/measurements?country=ES&city="
elem01.addEventListener("change", function () {
    coord=[]
    let listaComp = [];
    elem02.innerHTML = "";
    elem04.innerHTML = "";
    elem05.innerHTML="";
    // El limite de 96 es para que muestre las 24 ultimas horas
    let url10 = urlParl10 + elem00.value + "&location=" + elem01.value + "&limit=120";
    console.log(url10);
    fetch(url10).then(recibirDatos10).then(mostrarDatos10)
    function recibirDatos10(respuesta10) {
        return respuesta10.json();
    }
    function mostrarDatos10(datos10) {
        //Guardo las coordenadas
        let lat=datos10.results[0].coordinates.latitude;
        let long=datos10.results[0].coordinates.longitude;
        coord.push(lat);
        coord.push(long);
        console.log(coord)
        //Lista para guardar los parametros de los que dispone el medidor.
        for (let j = 0; j < datos10.meta.limit; j++) {
            try {
                let op = document.createElement("option")
                //Guardo el id de localización en el value
                if (listaComp.includes(datos10.results[j].parameter) === true) {

                }
                else {
                    listaComp.push(datos10.results[j].parameter);
                    op.setAttribute("value", datos10.results[j].parameter);
                    op.innerText = datos10.results[j].parameter;
                    elem02.appendChild(op);
                }
                //Si la estacion no tiene parámetros o no funciona aviso
            } catch (error) {
                let fail = document.createElement("h3")
                fail.innerText = "Estacion de contaminantes no disponible"
                fail.setAttribute("style", "color:red")
                elem04.appendChild(fail)
                break;
            }
        }
        console.log(datos10);
        if (listaComp.length > 0) {
            let op = document.createElement("option")
            op.setAttribute("value", "Todos");
            op.innerText = "Todos"
            elem02.appendChild(op);
        }
    }
})
//Recojo los valores de lo elegido
elem03.addEventListener("click", function () {
    let listaGen = [];
    let listaCO = [];
    let listaNO = [];
    let listaO3 = [];
    let listaSO2 = [];
    let listaPM25 = [];
    let listaPM10 = [];
    let medGen = [];
    let medCO = 0;
    let medNO = 0;
    let medO3 = 0;
    let medSO2 = 0;
    let medPM25 = 0;
    let medPM10 = 0;
    elem04.innerHTML = "";
    elem05.innerHTML="";
    try {
        let url11 = urlParl10 + elem00.value + "&location=" + elem01.value + "&limit=120"
        console.log(url11)
        swal({
            title: "Filtro realizado con exito",
            text: elem02.selectedOptions[0].label,
            icon: "success",
        });
        fetch(url11).then(recibirDatos20).then(mostrarDatos20).then(genRes).then(genGraph).then(fillGraph)
        function recibirDatos20(respuesta20) {
            return respuesta20.json();
        }
        function mostrarDatos20(datos20) {
            //Lista para guardar los parametros de los que dispone el medidor.
            for (let j = 0; j < datos20.meta.limit; j++) {
                //Introducimos la secuenci de ifs para captar los valores
                if (elem02.value === datos20.results[j].parameter) {
                    listaGen.push(datos20.results[j].value);
                }
                else if (elem02.value === "Todos") {
                    if (datos20.results[j].parameter === "co") {
                        listaCO.push(datos20.results[j].value);
                    }
                    else if (datos20.results[j].parameter === "no2") {
                        listaNO.push(datos20.results[j].value);
                    }
                    else if (datos20.results[j].parameter === "o3") {
                        listaO3.push(datos20.results[j].value);
                    }
                    else if (datos20.results[j].parameter === "so2") {
                        listaSO2.push(datos20.results[j].value);
                    }
                    else if (datos20.results[j].parameter === "pm25") {
                        listaPM25.push(datos20.results[j].value);
                    }
                    else if (datos20.results[j].parameter === "pm10") {
                        listaPM10.push(datos20.results[j].value);
                    }
                }
                else {

                }
            }
            console.log(listaGen);
            console.log(listaCO);
            console.log(listaNO);
            console.log(listaO3);
            console.log(listaSO2);
            console.log(listaPM25);
            console.log(listaPM10);
        }
        // 
        function genRes() {
            if (listaGen.length > 0) {
                let sum = 0;
                //Div datos
                let div=document.createElement("div");
                div.setAttribute("class","card-text");
                div.setAttribute("style","width: 18rem;");
                //Div body
                let div00=document.createElement("div")
                div00.setAttribute("class","card-body")
                //Head
                let op00 = document.createElement("h2");
                op00.setAttribute("class","card-title")
                // Media
                let op01 = document.createElement("p");
                op01.setAttribute("class","card-text")
                // Max
                let op02 = document.createElement("p");
                op02.setAttribute("class","card-text")
                // Min
                let op03 = document.createElement("p");
                op03.setAttribute("class","card-text")
                for (let ini = 0; ini < listaGen.length; ini++) {
                    sum += listaGen[ini];
                }
                medGen = sum / (listaGen.length);
                let max = getMax(listaGen);
                let min = getMin(listaGen);
                op00.innerText = ("Los valores para " + elem02.selectedOptions[0].label + " son")
                op01.innerText = "El valor medio es " + medGen + " µg/m³"
                op02.innerText = "El valor máximo es " + max + " µg/m³"
                op03.innerText = "El valor mínimo es " + min + " µg/m³"
                div00.appendChild(op00);
                div00.appendChild(op01);
                div00.appendChild(op02);
                div00.appendChild(op03);
                div.appendChild(div00)
                elem04.appendChild(div)
            }
            else {
                if (listaCO.length > 0) {
                    let sum = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaCO.length; ini++) {
                        sum += listaCO[ini];
                    }
                    medCO = sum / (listaCO.length);
                    let max = getMax(listaCO);
                    let min = getMin(listaCO);
                    op00.innerText = "Los valores de CO:"
                    op01.innerText = "El valor medio es " + medCO + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
                if (listaNO.length > 0) {
                    let sum00 = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaNO.length; ini++) {
                        sum00 += listaNO[ini];
                    }
                    medNO = sum00 / (listaNO.length);
                    let max = getMax(listaNO);
                    let min = getMin(listaNO);
                    op00.innerText = "Los valores de NOx"
                    op01.innerText = "El valor medio es " + medNO + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
                if (listaO3.length > 0) {
                    let sum01 = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaO3.length; ini++) {
                        sum01 += listaO3[ini];
                    }
                    medO3 = sum01 / (listaO3.length);
                    let max = getMax(listaO3);
                    let min = getMin(listaO3);
                    op00.innerText = "Los valores de O3"
                    op01.innerText = "El valor medio es " + medO3 + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
                if (listaSO2.length > 0) {
                    let sum02 = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaSO2.length; ini++) {
                        sum02 += listaSO2[ini];
                    }
                    medSO2 = sum02 / (listaSO2.length);
                    let max = getMax(listaSO2);
                    let min = getMin(listaSO2);
                    op00.innerText = "Los valores de SO2"
                    op01.innerText = "El valor medio es " + medSO2 + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
                if (listaPM10.length > 0) {
                    let sum00 = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaPM10.length; ini++) {
                        sum00 += listaPM10[ini];
                    }
                    medPM10 = sum00 / (listaPM10.length);
                    let max = getMax(listaPM10);
                    let min = getMin(listaPM10);
                    op00.innerText = "Los valores de PM10"
                    op01.innerText = "El valor medio es " + medPM10 + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
                if (listaPM25.length > 0) {
                    let sum03 = 0;
                    //Div datos
                    let div=document.createElement("div");
                    div.setAttribute("class","card-text");
                    div.setAttribute("style","width: 18rem;");
                    //Div body
                    let div00=document.createElement("div")
                    div00.setAttribute("class","card-body")
                    //Head
                    let op00 = document.createElement("h2");
                    op00.setAttribute("class","card-title")
                    // Media
                    let op01 = document.createElement("p");
                    op01.setAttribute("class","card-text")
                    // Max
                    let op02 = document.createElement("p");
                    op02.setAttribute("class","card-text")
                    // Min
                    let op03 = document.createElement("p");
                    op03.setAttribute("class","card-text");
                    for (let ini = 0; ini < listaPM25.length; ini++) {
                        sum03 += listaPM25[ini];
                    }
                    medPM25 = sum03 / (listaPM25.length);
                    let max = getMax(listaPM25);
                    let min = getMin(listaPM25);
                    op00.innerText = "Los valores de PM25"
                    op01.innerText = "El valor medio es " + medPM25 + " µg/m³"
                    op02.innerText = "El valor máximo es " + max + " µg/m³"
                    op03.innerText = "El valor mínimo es " + min + " µg/m³"
                    div00.appendChild(op00);
                    div00.appendChild(op01);
                    div00.appendChild(op02);
                    div00.appendChild(op03);
                    div.appendChild(div00);
                    elem04.appendChild(div);
                }
            }
        }
        function genGraph(){
            if (listaGen.length>0){
                let canva=document.createElement("canvas");
                canva.setAttribute("width","200");
                canva.setAttribute("height","112");
                canva.setAttribute("id","genChart")
                elem05.appendChild(canva)
            }
            else{
                if(listaCO.length>0){
                    let canva=document.createElement("canvas");
                    canva.setAttribute("width","200");
                    canva.setAttribute("height","112");
                    canva.setAttribute("id","COChart")
                    elem05.appendChild(canva)
                }
                if (listaNO.length>0 || listaO3.length>0 || listaSO2.length>0 || listaPM10.length>0 || listaPM25.length>0){
                    let canva=document.createElement("canvas");
                    canva.setAttribute("width","200");
                    canva.setAttribute("height","112");
                    canva.setAttribute("id","AllChart")
                    elem05.appendChild(canva)
                }
            }
        }
        function fillGraph(){
            //Eje X
            let ejey=genYaxis(listaGen);
            let ejec=[];
            //Colores eje
            if (listaGen.length>0){
                if (elem02.selectedOptions[0].label==="co"){
                    ejec=genYcolorCO(listaGen);
                }
                if (elem02.selectedOptions[0].label==="pm10"||elem02.selectedOptions[0].label==="no2"){
                    ejec=genYcolorA(listaGen);
                }
                if (elem02.selectedOptions[0].label==="pm25"){
                    ejec=genYcolorB(listaGen);
                }
                if (elem02.selectedOptions[0].label==="o3"){
                    ejec=genYcolorO(listaGen);
                }
                if (elem02.selectedOptions[0].label==="so2"){
                    ejec=genYcolorC(listaGen);
                }
                new Chart(document.getElementById("genChart"), {
                    type: 'bar',
                    data: {
                      labels: ejey,
                      datasets: [
                        {
                          label: "Valores contaminante "+ elem02.selectedOptions[0].label,
                          backgroundColor: ejec,
                          data: listaGen
                        }
                      ]
                    },
                    options: {
                      legend: { display: false },
                      title: {
                        display: true,
                        text: 'Valores de contaminantes hoy'
                      }
                    }
                });
            }
            else{
                let listaDatos=[];
                if (listaCO.length > 0){
                    ejec00=genYaxis(listaCO);
                    new Chart(document.getElementById("COChart"), {
                        type: 'line',
                        data: {
                          labels: ejec00,
                          datasets: [{ 
                              data: listaCO,
                              label: "CO",
                              borderColor: "#3e95cd",
                              fill: false
                            }, 
                          ]
                        },
                        options: {
                          title: {
                            display: true,
                            text: 'Contaminante CO'
                          }
                        }
                      });
                }
                if (listaNO.length > 0){
                    ejec=genYaxis(listaNO);
                    let NOData =  { 
                        data: listaNO,
                        label: "Oxidos de nitrogeno",
                        borderColor: "#8e5ea2",
                        fill: false
                    };
                    listaDatos.push(NOData)
                }
                if (listaPM25.length > 0){
                    ejec=genYaxis(listaPM25);
                    let PM25Data =  { 
                        data: listaPM25,
                        label: "Particulas 2,5 micras",
                        borderColor: "#3cba9f",
                        fill: false
                    };
                    listaDatos.push(PM25Data)
                }
                if (listaPM10.length > 0){
                    ejec=genYaxis(listaPM10);
                    let PM10Data =  { 
                        data: listaPM10,
                        label: "Particulas 10 micras",
                        borderColor: "#e8c3b9",
                        fill: false
                    };
                    listaDatos.push(PM10Data)
                }
                if (listaO3.length > 0){
                    ejec=genYaxis(listaO3);
                    let O3Data =  { 
                        data: listaO3,
                        label: "Ozono",
                        borderColor: "#c45850",
                        fill: false
                    };
                    listaDatos.push(O3Data)
                }
                if (listaSO2.length > 0){
                    ejec=genYaxis(listaSO2);
                    let SO2Data =  { 
                        data: listaSO2,
                        label: "Dióxido azufre",
                        borderColor: "#63AA82",
                        fill: false
                    };
                    listaDatos.push(SO2Data)
                }
                console.log(listaDatos)
                new Chart(document.getElementById("AllChart"), {
                    type: 'line',
                    data: {
                      labels: ejec,
                      datasets: listaDatos,
                    },
                    options: {
                      title: {
                        display: true,
                        text: 'Contaminantes filtrados'
                      }
                    }
                  });
            }
        }

    } catch (error) {
        let fail = document.createElement("h3");
        fail.innerText = "Estación de contaminantes no disponible";
        fail.setAttribute("style", "color:red");
        elem04.appendChild(fail);
        swal({
            title: "Error el el filtrado",
            text: elem02.selectedOptions[0].label,
            icon: "error",
        });
    }
})
elem03.addEventListener("click",function(){
    try {
        elem06.innerHTML="";
        let head=document.createElement("h3");
        head.innerText="Posición de la estación contaminante"
        let canvamap=document.createElement("div");
        canvamap.setAttribute("id","mapC")
        elem06.appendChild(head)
        elem06.appendChild(canvamap);
        let mymap = L.map('mapC').setView(coord, 18);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYWRyaWFuaTk0IiwiYSI6ImNrNzFzZTN1OTA2bjkzb3AxbWlodzNhZ2EifQ.Vq7tAL6FBSCBPHtPIcLC6w'
        }).addTo(mymap);
        let marker = L.marker(coord).addTo(mymap);
        marker.bindPopup("<b>Estación </b>"+"<b>"+elem01.selectedOptions[0].label+"</b>"+"<br>").openPopup();
    } catch (error) {
        elem06.innerHTML=""
        let fail = document.createElement("h3");
        fail.innerText = "Ubicación de la estación de contaminantes no disponible";
        fail.setAttribute("style", "color:red");
        elem04.appendChild(fail);
    }
})
//////////Clase localizacion////////////////////
class Local{
    constructor(id,provincia,medidorID,medidor,medicion,coordenadas,fecha){
        this.id=id;
        this.provincia=provincia;
        this.medidorID=medidorID;
        this.medidor=medidor;
        this.medicion=medicion;
        this.coordenadas=coordenadas;
        this.fecha=fecha
    }
}
/////////Zona local storage////////////////
let listaFav=[];
let elem07=document.getElementById("fav");
let elem08=document.getElementById("searches")
elem07.addEventListener("click",function(){
    if(JSON.parse(localStorage.getItem("favoritos"))!==null){
        listaFav = JSON.parse(localStorage.getItem("favoritos")); //guardamos en la lista lo que está guardado en local storage
    }
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    let locali=new Local(input00.value,elem00.value,elem01.value,elem01.selectedOptions[0].label,elem02.value,coord,today);
    console.log(locali);
    listaFav.push(locali);
    localStorage.setItem("favoritos",JSON.stringify(listaFav));
})
//Muestro el historico de busquedas
elem03.addEventListener("click",function(){
    if(JSON.parse(localStorage.getItem("favoritos"))!==null){
        listaFav = JSON.parse(localStorage.getItem("favoritos")); //guardamos en la lista lo que está guardado en local storage
    }
    elem08.innerHTML="";
    let op=document.createElement("h2");
    op.innerHTML="Histórico favoritos";
    elem08.appendChild(op);
    for (let i=0;i<listaFav.length;i++){
        let p00=document.createElement("p");
        let br=document.createElement("br")
        p00.innerHTML="ID "+listaFav[i].id+" Provincia "+listaFav[i].provincia+ " Medidor "+listaFav[i].medidorID+" == "+listaFav[i].medidor+" parámetro "+listaFav[i].medicion+" Coordenadas:: Longitud: "+listaFav[i].coordenadas[1]+" Latitud: "+listaFav[i].coordenadas[0]+" Fecha: "+listaFav[i].fecha;
        console.log(listaFav[i].id);
        elem08.appendChild(p00);
        elem08.appendChild(br);
    }
})
