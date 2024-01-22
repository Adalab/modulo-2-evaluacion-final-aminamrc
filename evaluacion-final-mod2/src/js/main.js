'use strict';

const searchSection = document.querySelector('.js-search-section');
const inputAnime = document.querySelector('.js-inputAnime');
const btn= document.querySelector('.js-btn');
const reset= document.querySelector('.js-reset');
const resultsContainer=document.querySelector('.js-results');
let animeList=document.querySelector('.js-anime-list');
const favoritesContainer=document.querySelector('.js-favorites');
const favoritesList=document.querySelector('.js-favorite-list');
const inputAnimeValue=inputAnime.value;
//const urlApi=`https://api.jikan.moe/v4/anime?q=naruto/${inputAnime.value}`;

console.log(inputAnimeValue);

let dataAnime= [];
function getDataApi () {
    fetch(`https://api.jikan.moe/v4/anime?q=${inputAnime.value}`)
    .then (response => response.json())
    .then (data => {
      dataAnime=data.data;
      console.log(dataAnime);
      renderAnime (dataAnime,resultsContainer);
      //localStorage.setItem('anime', JSON.stringify(animeList)); chiamarlo nel fav e removefav
    }); 
}


// let alltitleAnime=[];
// let allimgAnime = [];

function renderAnime (array,container) {
    let animeList= "";
    animeList += ` <h3> Lista Anime </h3>`;
    for (const each of array) {
    // alltitleAnime = each.title;
    // allimgAnime =each.images;
    // console.log(alltitleAnime);
    // console.log(allimgAnime.jpg.image_url); 
    animeList += `<li class="list_anime js-anime-selected" id="${each.mal_id}"> <p> ${each.title} </p>  
     <img src=" ${each.images.jpg.image_url}" alt="img"> </img> </li> <button type="reset" class="btn-style js-btn-remove"> X </button>`
     if (each.images.jpg.image_url === 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png') {
        each.images.jpg.image_url ='https://placehold.co/250x350';
     } else (`${each.images.jpg.image_url}`); //let ImageUrl=
    } if (favoriteList) {
      console.log('fave');
      `<img class="favorite-style"> </img>`
    }
    container.innerHTML = animeList;
    listenerAnimeList ();
    ListenerRemoveFavorites ();
    
}

function ListenerRemoveFavorites () {

const btnRemoveFavorites=document.querySelectorAll('.js-btn-remove');
for ( const all of btnRemoveFavorites) {
btnRemoveFavorites.addEventListener('click', removeFavorites);
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
   (item) => (item.mal_id) === (idAnime)  );
   console.log(thisAnime); 

  if (thisAnime !== -1) {
   favoriteList.splice(AnimeSelected,1);  
   } else {
   console.log('already added');
  }
   //console.log(favoriteList);
  //renderAnime (favoriteList,favoritesContainer);
  

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
     localStorage.setItem('anime', JSON.stringify(animeList));
     renderAnime (favoriteList,favoritesContainer);
    

}

function listenerAnimeList () {
    const allAnimeSelected=document.querySelectorAll('.js-anime-selected');
    for (const each of allAnimeSelected) {
        each.addEventListener('click', addFavorite);
        console.log('cliked');
    } 
     }

     

     function getDataLocalStorage() {
        const dataAnimeLocal = JSON.parse(localStorage.getItem('anime'));
        if (dataAnimeLocal !== null) {
          animeList = dataAnimeLocal;
          getDataLocalStorage();
          renderAnime(dataAnimeLocal, resultsContainer);
          
        } else {
          getDataApi();
        }
        console.log(animeList);
      }
      
      
     
     // animeList[one].addEventListener('click', addFavorite);
     // console.log('cliked');
    

    