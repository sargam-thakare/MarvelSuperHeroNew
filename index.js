
//  import MD5 from "crypto-js/md5"; 

// var MD5 = require('crypto-js/md5'); 
     

console.log("hiii scripting");


let ts = "1681802982683";
let publicKey = "4ae6b7e55f9dccbbbba5d46081daf84a";
let privatekey = "ccf52f5a8839cafeb0a8f699965cc248a272b864";


let hashVal = CryptoJS.MD5(ts + privatekey + publicKey).toString();

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

let superHeroArray = [];
 
let favSuperHeroes=JSON.parse(sessionStorage.getItem("favSuperHeroes"));
if(favSuperHeroes==null)
favSuperHeroes=[]
async function fetchSuperHeroes() {
    let url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData.data.results);
    superHeroArray = jsonData.data.results;
  } 

function generateListofSuperHeroes(superHeroArrayobj){
    let listobj = document.getElementById("superHeroList");

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

        let checkiffav=false;
        if(favSuperHeroes!=null)
        favSuperHeroes.map((item2)=>{
            console.log("fav "+item2.name +"  com "+item)
            if(item.name==item2.name){
                checkiffav=true;
                headerDiv.appendChild(unfavouriteBtn)
            }            
        })
        if(!checkiffav)
        headerDiv.appendChild(favouriteBtn)


        favouriteBtn.addEventListener('click',(event)=>{
            favSuperHeroes.push(item);
            headerDiv.removeChild(favouriteBtn);
            headerDiv.appendChild(unfavouriteBtn)
            console.log("favSuperHeroes "+favSuperHeroes);
            sessionStorage.setItem("favSuperHeroes", JSON.stringify(favSuperHeroes));
        })

        unfavouriteBtn.addEventListener('click',(event)=>{
            favSuperHeroes=   favSuperHeroes.filter((item2)=>
             item.name!=item2.name);
            headerDiv.removeChild(unfavouriteBtn);
            headerDiv.appendChild(favouriteBtn) 
            sessionStorage.setItem("favSuperHeroes", JSON.stringify(favSuperHeroes));
        })


        parentDiv.appendChild(headerDiv)
        parentDiv.appendChild(descriptionDiv)
        parentDiv.classList.add("parentDiv");
        listitem.appendChild(parentDiv);

        nameDiv.addEventListener('click',(event)=>{
            console.log("listitem clicke "+nameDiv);
            var str =  window.location.href;
    var lastIndex = str.lastIndexOf("/");
    var path = str.substring(0, lastIndex);
            window.location.href = path+"/SuperHeroDetail.html?CharacterId="+item.id;
        })
        listobj.appendChild(listitem);
    })
}
  

const fetching =async()=>{
     var f=  await   fetchSuperHeroes();
     var g=  generateListofSuperHeroes(superHeroArray)

}  
fetching();


let searchInput = document.getElementById("search");
searchInput.addEventListener('keyup', (event) => {
    console.log("event tyeped " + event.target.value);

   let superHeroArrayFilterd= superHeroArray.filter((item)=>{
   // (/xys/gi
   console.log("11 "+item.name)
 
   var re = new RegExp(event.target.value, 'i');

        if(item.name.match(re)){
            console.log("matching "+item.name +" "+event.target.value)
            return true;
        }
    })
    let listobj = document.getElementById("superHeroList");
    listobj.innerHTML = "";
    console.log(superHeroArrayFilterd.length)
    var g=  generateListofSuperHeroes(superHeroArrayFilterd)

})


let faveSuperHeroBtn=document.getElementById("favSuperhero");

faveSuperHeroBtn.addEventListener('click',(event)=>{

  
 //   window.location.href = "http://127.0.0.1:5500/FavSuperHeroList.html";
 var str =  window.location.href;
    var lastIndex = str.lastIndexOf("/");
    var path = str.substring(0, lastIndex);
 window.location.href =  path+"/FavSuperHeroList.html";


});


home.addEventListener('click',(event)=>{
    var str =  window.location.href;
    var lastIndex = str.lastIndexOf("/");
    var path = str.substring(0, lastIndex);
  
    window.location.href = path+"/index.html";


});
 

