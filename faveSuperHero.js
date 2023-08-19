
console.log("favouite superhero");

var favSuperHeroes = JSON.parse(sessionStorage.getItem("favSuperHeroes"));

generateListofSuperHeroes(favSuperHeroes);

function generateListofSuperHeroes(superHeroArrayobj) {
    let listobj = document.getElementById("superHeroList");

    if (superHeroArrayobj != null && superHeroArrayobj.length != 0) {
        superHeroArrayobj.map((item) => {

            const listitem = document.createElement("li");
            listitem.classList.add("superHeroListItem")
            const img = document.createElement("img");
            img.src = item.thumbnail.path + "." + item.thumbnail.extension;
            img.classList.add("superHeroimg");
            const name = document.createTextNode(item.name);
            const nameDiv = document.createElement("Div");
            nameDiv.appendChild(name);

            const parentDiv = document.createElement("Div");


            nameDiv.classList.add("name")
            const description = document.createTextNode(item.description);
            const descriptionDiv = document.createElement("Div");
            descriptionDiv.appendChild(description);

            descriptionDiv.classList.add("description")

            listitem.appendChild(img);

            const headerDiv = document.createElement("Div");
            const favouriteBtn = document.createElement("Button");
            favouriteBtn.textContent = "Favourite";
            favouriteBtn.classList.add("btn");
            favouriteBtn.classList.add("btn-primary");

            const unfavouriteBtn = document.createElement("Button");
            unfavouriteBtn.textContent = "UNfavourite";
            unfavouriteBtn.classList.add("btn");
            unfavouriteBtn.classList.add("btn-danger");


            headerDiv.classList.add("header");
            headerDiv.appendChild(nameDiv)
            headerDiv.appendChild(unfavouriteBtn)



            favouriteBtn.addEventListener('click', (event) => {
                favSuperHeroes.push(item);
                headerDiv.removeChild(favouriteBtn);
                headerDiv.appendChild(unfavouriteBtn)
                console.log("favSuperHeroes " + favSuperHeroes);
                sessionStorage.setItem("favSuperHeroes", JSON.stringify(favSuperHeroes));


            })

            unfavouriteBtn.addEventListener('click', (event) => {
                favSuperHeroes = favSuperHeroes.filter((item2) =>
                    item.name != item2.name);
                headerDiv.removeChild(unfavouriteBtn);
                headerDiv.appendChild(favouriteBtn)
                sessionStorage.setItem("favSuperHeroes", JSON.stringify(favSuperHeroes));
                listobj.removeChild(listitem);
                if (favSuperHeroes.length == 0)
                    nosuperherofavpresent();
            })

            parentDiv.appendChild(headerDiv)

            parentDiv.appendChild(descriptionDiv)

            parentDiv.classList.add("parentDiv");

            listitem.appendChild(parentDiv);

            nameDiv.addEventListener('click', (event) => {

                console.log("listitem clicke " + nameDiv);
                var str =  window.location.href;
                var lastIndex = str.lastIndexOf("/");
                var path = str.substring(0, lastIndex);
                window.location.href =path+"/SuperHeroDetail.html?CharacterId=" + item.id;

            })
            listobj.appendChild(listitem);
        })
    }

    else {

        nosuperherofavpresent();
    }
}

function nosuperherofavpresent() {
    const NothingFav = document.createElement("h1");
    const comicheadingtext = document.createTextNode("No Favourite Super hero");
    NothingFav.appendChild(comicheadingtext);
    // Comicitem.classList.add("ULitem");
    const nofavsuperdiv = document.getElementById("noFavSuperHero");
    nofavsuperdiv.appendChild(NothingFav)
    NothingFav.classList.add("nofavsuperdiv");
}

let searchInput = document.getElementById("search");
searchInput.addEventListener('keyup', (event) => {
    console.log("event tyeped " + event.target.value);

    let superHeroArrayFilterd = favSuperHeroes.filter((item) => {
        // (/xys/gi
        console.log("11 " + item.name)

        var re = new RegExp(event.target.value, 'i');

        if (item.name.match(re)) {
            console.log("matching " + item.name + " " + event.target.value)
            return true;
        }
    })
    let listobj = document.getElementById("superHeroList");
    listobj.innerHTML = "";
    console.log(superHeroArrayFilterd.length)
    var g = generateListofSuperHeroes(superHeroArrayFilterd)

})

home.addEventListener('click', (event) => {


    var str =  window.location.href;
    var lastIndex = str.lastIndexOf("/");
    var path = str.substring(0, lastIndex);
  //  var new_path = path + "/new_path";
   // window.location.assign(new_path);

    window.location.href = path+"/index.html";


});

