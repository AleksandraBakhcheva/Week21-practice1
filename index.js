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

let form = document.querySelector("button");
form.addEventListener("click", function(event) {
    event.preventDefault();
    searchGIFs();
});

async function getGIFs() {
    let request = document.querySelector(".search").value;
    const APIKEY = "coz7mNXbBDAPMHGvNDR4PVrRB0c0MwjI";
    let response = await fetch("https://api.giphy.com/v1/gifs/search?api_key="+APIKEY+"&q="+request+"&limit=5&offset=0&rating=g&lang=en"
    );
    let data = await response.json();
    document.querySelector(".search").value = "";
    return data;
}

function showGIFs(data) {
    let result = document.createElement("div");
    result.classList.add("container");
    document.body.append(result);
    //console.log(container);
        if (result !== "") {
            document.body.remove(result);
        }
        for (let i = 0; i < 5; i++) {
            let image = document.createElement("img");
            image.setAttribute("src", data.data[i].images.downsized.url);
            image.width = 300;
            result.append(image);
        }
}

async function searchGIFs() {
    let data = await getGIFs();
    showGIFs(data);
}