'use strict';

//const searchSection = document.querySelector('.js-search-section');
const inputAnime = document.querySelector('.js-inputAnime');
const btn= document.querySelector('.js-btn');
const reset= document.querySelector('.js-reset');
const resultsContainer=document.querySelector('.js-results');
let  animeList =document.querySelector('.js-anime-list');
const favoritesContainer=document.querySelector('.js-favorites');
const favoritesList=document.querySelector('.js-favorite-list');
const inputAnimeValue=inputAnime.value;


let dataAnime= [];
function getDataApi () {
    fetch(`https://api.jikan.moe/v4/anime?q=${inputAnime.value}`)
    .then (response => response.json())
    .then (data => {
      dataAnime=data.data;
      //console.log(dataAnime);
      renderAnime (dataAnime,resultsContainer);
      
    }); 
}


function renderAnime (arrayAnime,container) {
    let animeList= "";
    for (const eachAnime of arrayAnime) {
    let title=eachAnime.title;
    let imageUrl=eachAnime.images.jpg.image_url;
    animeList += 
    `<li class="list_anime js-anime-selected " id="${eachAnime.mal_id}"> `
    
    if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
      imageUrl ='https://placehold.co/250x250';
     } 
     animeList += `<img src=" ${imageUrl}" alt="img"> </img> `
     animeList += ` <p> ${title} </p>`
     animeList+= `</li>`; 
    }
    container.innerHTML = animeList;
    listenerAnimeList ();
    //ListenerRemoveFavorites ();
    
}



function renderAnimeFavoritos (arrayAnime,container) {
  let favoriteList= "";
  for (const eachAnime of arrayAnime) {
  let title=eachAnime.title;
  let imageUrl=eachAnime.images.jpg.image_url;
  favoriteList += 
  `<li class="list_anime js-anime-selected favorite-style" id="${eachAnime.mal_id}"> `
  
  if (imageUrl === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
    imageUrl ='https://placehold.co/250x250';
   } 
   favoriteList += `<img src=" ${imageUrl}" alt="img"> </img> `;
   favoriteList += ` <p> ${title} </p>`;
   favoriteList += `<button type="reset" class="btn-style js-btn-remove"> X </button>`;
   favoriteList += `</li>`;
    
  container.innerHTML = favoriteList;
 
 
}
 ListenerRemoveFavorites ();
}

function ListenerRemoveFavorites () {

const btnRemoveFavorites=document.querySelectorAll('.js-btn-remove');
for ( const all of btnRemoveFavorites) {
all.addEventListener('click', removeFavorites);
console.log('clicked remove')
}

}


function removeFavorites (event) {

  console.log('clicked');
  const idAnime = (event.currentTarget.id);
  const idAnimeInt =  parseInt (idAnime);
  console.log(idAnime);
  

  const AnimeSelected = dataAnime.find(
  (item) => (idAnimeInt) === (item.mal_id));
  console.log(AnimeSelected);
    

  const thisAnime = favoriteList.findIndex(
   (item) => (item.mal_id) === (idAnimeInt)  );
   console.log(thisAnime); 

  if (thisAnime === -1) {
   favoriteList.splice(AnimeSelected,1);  
   } 

  renderAnimeFavoritos (favoriteList,favoritesContainer);
  localStorage.setItem('anime', JSON.stringify(favoriteList)); 

}

btn.addEventListener('click', handleInput);


function handleInput (event) {
    event.preventDefault();
    console.log(inputAnime.value);
    //console.log(inputValue); 
    getDataApi();
   
}

let favoriteList= [];
function addFavorite (event) {

    const idAnime = (event.currentTarget.id);
    const idAnimeInt =  parseInt (idAnime);
    console.log(idAnime);
    

    const AnimeSelected = dataAnime.find(
        (item) => (idAnimeInt) === (item.mal_id));
        console.log(AnimeSelected);
      

    const thisAnime = favoriteList.findIndex(
        (item) => (item.mal_id) === (idAnimeInt)  );
         console.log(thisAnime); 

      if (thisAnime === -1) {
        favoriteList.push(AnimeSelected);  
      } 
     
    localStorage.setItem('anime', JSON.stringify(favoriteList)); 
     renderAnimeFavoritos (favoriteList,favoritesContainer);
     renderAnime (dataAnime,resultsContainer);
    

}

function listenerAnimeList () {
    const allAnimeSelected=document.querySelectorAll('.js-anime-selected');
    for (const each of allAnimeSelected) {
        each.addEventListener('click', addFavorite);
        console.log('cliked');
    } 
     }

     

     function getDataLocalStorage() {
        const dataAnimeLocal = JSON.parse(localStorage.getItem(favoriteList));
        if (dataAnimeLocal !== null) {
          favoriteList = dataAnimeLocal;
          renderAnimeFavoritos(dataAnimeLocal, favoritesContainer);}
        else    {
          getDataApi();
        }
        
        
      }
      
      getDataLocalStorage();
  
      reset.addEventListener('click',resetAnimeList);

      function resetAnimeList () {
        animeList= [];
        favoriteList= [];
        resultsContainer.innerHTML="";
        favoritesContainer.innerHTML="";
        inputAnime.value="";
        localStorage.setItem('anime', JSON.stringify()); 
      }