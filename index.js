const WARNINGERROR = "При загрузке произошла ошибка. Пожалуйста, попробуйте снова";
const ERRORPIC = "images/error-cat.png";

let container = document.createElement("form");
let div = document.createElement("div");
div.classList.add("search-box");
div.innerHTML = `<label for="search">Search:</label><input type="text" class="search" id="search" />`
let button = document.createElement("button");
button.textContent = "OK";
button.setAttribute("type", "submit");
div.append(button);
container.append(div);
document.body.append(container);
let div_error = document.createElement("div");
div_error.classList.add("error");
container.append(div_error);

let form = document.querySelector("button");
form.addEventListener("click", function(event) {
    event.preventDefault();
    searchGIFs();
});

async function getGIFs() {
    let errorCleaner = document.querySelector(".error");
    if (errorCleaner !== null) {
        errorCleaner.innerHTML = "";
    }
    try {
        let request = document.querySelector(".search").value;
        const APIKEY = "coz7mNXbBDAPMHGvNDR4PVrRB0c0MwjI";
        let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${request}&limit=5&offset=0&rating=g&lang=en`);
        let data = await response.json();
        document.querySelector(".search").value = "";
        return data;
        }
    catch (error) {
        let message = document.createElement("p");
        message.classList.add("errormsg");
        div_error.append(message);
        document.querySelector(".errormsg").textContent = WARNINGERROR;
        let image = document.createElement("img");
        image.setAttribute('src', ERRORPIC);
        image.width = 300;
        div_error.append(image);
        console.log(error.type);
        console.log(error.message);
        document.querySelector(".search").value = "";
        }
}

function showGIFs(data) {
    if (data !== undefined) {
    let result = document.createElement("div");
    result.classList.add("container");
    document.body.append(result);
        if (data.data.length === 0) {
            let zeroArray = document.querySelector(".container");
            zeroArray.textContent = "ничего не найдено...";
        }
        else if (data.data.length > 0) {
            let zeroArray = document.querySelector(".container");
            zeroArray.textContent = "";
            for (let i = 0; i < data.data.length; i++) {
                let image = document.createElement("img");
                image.setAttribute("src", data.data[i].images.downsized.url);
                let newOne = document.querySelector(".container");
                newOne.insertAdjacentElement("afterbegin", image);
        }}
}}

async function searchGIFs() {
    let data = await getGIFs();
    showGIFs(data);
}