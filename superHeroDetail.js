

console.log("superhero page");

let ts = "1681802982683";
let publicKey = "";
let privatekey = ""


let hashVal = CryptoJS.MD5(ts + privatekey + publicKey).toString();

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const CharacterId = urlParams.get('CharacterId')
console.log(CharacterId);


async function fetchSuperHero() {
  let url = `https://gateway.marvel.com:443/v1/public/characters/${CharacterId}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData.data.results);
  let superHeroArray = jsonData.data.results[0];
  console.log(superHeroArray);

  const superDiv = document.createElement("div");
  superDiv.classList.add("superDiv")

  const img = document.createElement("img");
  img.src = superHeroArray.thumbnail.path + "." + superHeroArray.thumbnail.extension;
  img.classList.add("imgSuper");
  const imgDiv = document.createElement("Div");
  imgDiv.appendChild(img);



  const name = document.createTextNode(superHeroArray.name);
  const nameDiv = document.createElement("Div");
  nameDiv.appendChild(name);

  const description = document.createTextNode(superHeroArray.description);
  const descriptionDiv = document.createElement("Div");
  descriptionDiv.appendChild(description);


  descriptionDiv.classList.add("descriptionDiv");
  imgDiv.classList.add("imgDiv");
  nameDiv.classList.add("nameDiv");

  superDiv.appendChild(imgDiv);
  superDiv.appendChild(nameDiv);
  superDiv.appendChild(descriptionDiv);


  let comicArray = superHeroArray.comics.items;
  console.log("comics " + comicArray);

  const Comicitem = document.createElement("ul");
  Comicitem.classList.add("ULitem");


  const ComicHeading = document.createElement("h2");
  const comicheadingtext = document.createTextNode("Comics List");
  ComicHeading.appendChild(comicheadingtext);
  Comicitem.classList.add("ULitem");

  comicArray.map((item) => {
    console.log("comicsitem " + item.name);
    const listitem = document.createElement("li");
    listitem.classList.add("superHeroComicItem")

    const paragraph = document.createElement("p");

    paragraph.appendChild(document.createTextNode(item.name));
    // listAnchor.title="this is title"
    // listAnchor.href = `${item.resourceURI}?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;

    listitem.appendChild(paragraph);
    Comicitem.appendChild(listitem);

  })

  let seriesArray = superHeroArray.series.items;
  console.log("comics " + seriesArray);


  const Seriesitem = document.createElement("ul");
  Seriesitem.classList.add("ULitem");

  const SeriesHeading = document.createElement("h2");
  const seriesheadingtext = document.createTextNode("Series List");
  SeriesHeading.appendChild(seriesheadingtext);
  Seriesitem.classList.add("ULitem");

  seriesArray.map((item) => {
    console.log("seriesitem " + item.name);
    const listitem = document.createElement("li");
    listitem.classList.add("superHeroSeriesItem")

    const paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(item.name));
    listitem.appendChild(paragraph);
    Seriesitem.appendChild(listitem);

  })


  let storiesArray = superHeroArray.stories.items;
  console.log("stories " + storiesArray);

  const Storiesitem = document.createElement("ul");
  Storiesitem.classList.add("ULitem");

  const StoriesHeading = document.createElement("h2");
  const storiesheadingtext = document.createTextNode("Series List");
  StoriesHeading.appendChild(storiesheadingtext);
  Storiesitem.classList.add("ULitem");

  storiesArray.map((item) => {
    console.log("Storiesitem " + item.name);
    const listitem = document.createElement("li");
    listitem.classList.add("superHeroSeriesItem")

    const paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(item.name));
    listitem.appendChild(paragraph);
    Storiesitem.appendChild(listitem);

  });

  superDiv.appendChild(ComicHeading);
  superDiv.appendChild(Comicitem);
  superDiv.appendChild(document.createElement("hr"))
  superDiv.appendChild(SeriesHeading);
  superDiv.appendChild(Seriesitem);
  superDiv.appendChild(document.createElement("hr"))

  superDiv.appendChild(StoriesHeading);
  superDiv.appendChild(Storiesitem);

  let mainLayout = document.getElementById("mainLayout");
  mainLayout.appendChild(superDiv);



}

fetchSuperHero();

home.addEventListener('click', (event) => {
  var str =  window.location.href;
    var lastIndex = str.lastIndexOf("/");
    var path = str.substring(0, lastIndex);
  window.location.href =path+"/index.html";
});
