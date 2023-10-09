import { fetchCocktails } from './drinkifyapi';
import Notiflix from 'notiflix';
import * as basicLightbox from 'basiclightbox';
import { onIngrListClickHandler } from './popupingredients';
import spriteURL from '/img/sprite.svg';
import { renderFavCocktails, cardList } from './favorite_coctails';

const KEY_FAVORITE_COCKTAILS = 'favoriteCocktails';
const cardsGallery = document.querySelector('.cardlist');
const SEARCH_BY_ID_LINK = 'cocktails/lookup/';
const SEARCH_BY_ID_PARAM = 'id';
const favCokctArr =
  JSON.parse(localStorage.getItem(KEY_FAVORITE_COCKTAILS)) ?? [];
let cocktailObj;
let currentCocktail;

const scrollController = {
  disabledScroll() {
    document.body.style.cssText = `
    overflow: hidden;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;`;
  },
  enabledScroll() {
    document.body.style.cssText = '';
  },
};

// function addPaddingUpScroll() {
//   const element = document.querySelector('.go-top-btn');
//    if( window.innerWidth >= 1280 ){
//     element.style.right = '40px';
//  } else {
//      return;
//  } 

// };
// function removePaddingUpScroll() {
//   const element = document.querySelector('.go-top-btn');
//   element.style.right = '30px';
// };

cardsGallery.addEventListener('click', onLearnMoreClickHandler);
cardsGallery.addEventListener('click', onAddOrRemoveButtonHandler);

async function onLearnMoreClickHandler(e) {
  if (!e.target.classList.contains('cardlist-learn')) {
    return;
  }

  currentCocktail = e.target.closest('.cardlist-item');
  const id = e.target.closest('.cardlist-item').dataset.id;
  await fetchCocktails(SEARCH_BY_ID_LINK, SEARCH_BY_ID_PARAM, id).then(resp => {
    const { _id, drinkThumb, instructions, drink, ingredients, description } =
      resp[0];

    cocktailObj = {
      _id,
      drinkThumb,
      description,
      drink,
    };

    let ingredientsRaw = ingredients
      .map(ingredient => {
        return `<li data-id="${
          ingredient.ingredientId
        }" class="text item-card"><a href="#" class="ingredient-btn">${
          ingredient.measure || ''
        }${ingredient.title}</a></li>`;
      })
      .join('');

    showModalWindow(id, ingredientsRaw, drink, instructions, drinkThumb);
    scrollController.disabledScroll();
    // addPaddingUpScroll();
  });
}

function showModalWindow(id, ingredientsRaw, drink, instructions, drinkThumb) {
  const instance = basicLightbox.create(
    `<div class="container-popup id-for-del" data-id="${id}">
  <button class="popup-close-btn close-cocktail-modal-x">
    <svg class="popup-close-btn-icon">
      <use href="${spriteURL}#cross"></use>
    </svg>
  </button>
  <div class="box">
    <div class="picture"><img src="${drinkThumb}" alt="${drink}" loading='lazy' onerror="this.onerror=null;this.src='img/rafiki.jpg';"/></div>
    <div>
      <h2 class="name">${drink}</h2>
      <p class="caption-card">Ingredients:</p>
      <p class="text text-card">Per cocktail</p>
      <ul class="list-card ingredients-list custom-scrollbar">${ingredientsRaw}</ul>
    </div>
  </div>
  <p class="caption-card">Instructions:</p>
  <p class="text desc-card custom-scrollbar">
   ${instructions}
  </p>
  <div class="container-button">
  <button type="button" class="button-card favorite add-to-fav-cockt" data-id="${id}">
    add to favorite
  </button>
   <button type="button" class="visually-hidden button-card favorite remove-from-fav-cockt" data-id="${id}">
    Remove from favorite
  </button>
   <button type="button" class="button-card back close-cocktail-modal-back">Back</button></div>
</div>`,
    {
      onShow: instance => {
        instance.element().querySelector('.close-cocktail-modal-back').onclick =
          instance.close;
        instance.element().querySelector('.close-cocktail-modal-x').onclick =
          instance.close;
        instance
          .element()
          .querySelector('.add-to-fav-cockt')
          .addEventListener('click', onClickFavAddHandler);
        instance
          .element()
          .querySelector('.remove-from-fav-cockt')
          .addEventListener('click', onClickFavRemoveHandler);

        checkIfInFavStorage(instance);
      },
      onClose: instance => {
        instance
          .element()
          .querySelector('.add-to-fav-cockt')
          .removeEventListener('click', onClickFavAddHandler);
        instance
          .element()
          .querySelector('.remove-from-fav-cockt')
          .removeEventListener('click', onClickFavRemoveHandler);
      },
      onClose: () => {
        scrollController.enabledScroll();
        // removePaddingUpScroll();
      },
    }
  );
  instance.show();
  document
    .querySelector('.ingredients-list')
    .addEventListener('click', onIngrListClickHandler);
}

function checkIfInFavStorage(instance) {
  const inStorageIn = favCokctArr.find(
    ({ _id }) =>
      _id === instance.element().querySelector('.container-popup').dataset.id
  );

  if (inStorageIn) {
    instance
      .element()
      .querySelector('.add-to-fav-cockt')
      .classList.add('visually-hidden');
    instance
      .element()
      .querySelector('.remove-from-fav-cockt')
      .classList.remove('visually-hidden');
  }
}

async function onAddOrRemoveButtonHandler(e) {
  e.preventDefault();

  if (
    e.target.classList.contains('add-to-fav-cockt-headt') ||
    e.target.closest('.add-to-fav-cockt-headt')
  ) {
    currentCocktail = e.target.closest('.cardlist-item');
    const currentId = e.target.closest('.cardlist-item').dataset.id;

    await fetchCocktails(SEARCH_BY_ID_LINK, SEARCH_BY_ID_PARAM, currentId).then(
      resp => {
        const { _id, drinkThumb, drink, description } = resp[0];

        cocktailObj = {
          _id,
          drinkThumb,
          description,
          drink,
        };
      }
    );

    addCocktail();
  } else if (
    e.target.classList.contains('remove-from-fav-cockt-bin') ||
    e.target.closest('.remove-from-fav-cockt-bin')
  ) {
    currentCocktail = e.target.closest('.cardlist-item');
    RemoveCockt(e);
  } else return;
}

function onClickFavAddHandler(e) {
  e.preventDefault();

  document.querySelector('.add-to-fav-cockt').classList.add('visually-hidden');
  document
    .querySelector('.remove-from-fav-cockt')
    .classList.remove('visually-hidden');

  addCocktail();
}

function addCocktail() {
  currentCocktail
    .querySelector('.add-to-fav-cockt-headt')
    .classList.add('visually-hidden');
  currentCocktail
    .querySelector('.remove-from-fav-cockt-bin')
    .classList.remove('visually-hidden');

  Notiflix.Notify.info(`Cocktail ${cocktailObj.drink} added to favorites`);

  favCokctArr.push(cocktailObj);
  localStorage.setItem(KEY_FAVORITE_COCKTAILS, JSON.stringify(favCokctArr));
}

function onClickFavRemoveHandler(e) {
  e.preventDefault();

  document
    .querySelector('.add-to-fav-cockt')
    .classList.remove('visually-hidden');
  document
    .querySelector('.remove-from-fav-cockt')
    .classList.add('visually-hidden');

  RemoveCockt(e);
}

function RemoveCockt(e) {
  currentCocktail
    .querySelector('.add-to-fav-cockt-headt')
    .classList.remove('visually-hidden');
  currentCocktail
    .querySelector('.remove-from-fav-cockt-bin')
    .classList.add('visually-hidden');

  const itemToRemove = favCokctArr.findIndex(
    ({ _id }) => _id === e.target.closest('.id-for-del').dataset.id
  );

  Notiflix.Notify.info(
    `Cocktail ${favCokctArr[itemToRemove].drink} removed from favorites`
  );

  favCokctArr.splice(itemToRemove, 1);
  localStorage.setItem(KEY_FAVORITE_COCKTAILS, JSON.stringify(favCokctArr));

  if (
    window.location.pathname === '/Drinkify/favorite-cocktails.html' ||
    window.location.pathname === '/favorite-cocktails.html'
  ) {
    renderFavCocktails(favCokctArr, cardList);
  }
}

export { onLearnMoreClickHandler, showModalWindow, onClickFavRemoveHandler };
