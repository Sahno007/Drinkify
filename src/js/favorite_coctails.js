import { onLearnMoreClickHandler } from './popupcocktails';
import { createMarkup, iconFavMarkup } from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const cardList = document.querySelector('.cardlist'); // list
const plugEl = document.querySelector('.plug'); //sorry
const paginationContainer = document.querySelector('.tui-pagination');

const KEY_FAVORITE_COCKTAILS = 'favoriteCocktails';
const favCokctArr =
  JSON.parse(localStorage.getItem(KEY_FAVORITE_COCKTAILS)) ?? [];

let currentPage = 1;
let coctailsPerPage = 6;
let visibleNumbers = 4;
if (screen.width >= 1280) {
  visibleNumbers = 7;
}

if (
  window.location.pathname === '/Drinkify/favorite-cocktails.html' ||
  window.location.pathname === '/favorite-cocktails.html'
) {
  renderFavCocktails(favCokctArr, cardList);
}

function renderFavCocktails(arr, container) {
  if (
    window.location.pathname === '/Drinkify/favorite-cocktails.html' ||
    window.location.pathname === '/favorite-cocktails.html'
  ) {
    if (!arr.length) {
      plugEl.classList.remove('visually-hidden');
    } else plugEl.classList.add('visually-hidden');
  }

  container.innerHTML = '';
  paginationContainer.innerHTML = '';

  if (arr.length <= coctailsPerPage) {
    container.innerHTML = arr
      .map(card => {
        return createMarkup(card, iconFavMarkup);
      })
      .join('');
  } else {
    showPaginatedList(arr, container, coctailsPerPage, currentPage);
    SetupPagination(arr, paginationContainer, coctailsPerPage);
  }
}

function showPaginatedList(arr, container, per_page, page) {
  container.innerHTML = '';
  page--;

  let start = per_page * page;
  let end = start + per_page;
  let markup = arr.slice(start, end);

  return renderFavCocktails(markup, cardList);
}

function SetupPagination(items, wrapper, per_page) {
  wrapper.innerHTML = '';

  const options = {
    totalItems: items.length,
    itemsPerPage: per_page,
    visiblePages: visibleNumbers,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn btnStyle">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected btnStyleActive btnMargL btnMargR">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} btnMargL btnMargR btnStyle">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} btnMargL btnMargR btnStyle">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip btnStyle">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(paginationContainer, options);

  pagination.on('beforeMove', evt => {
    const { page } = evt;
    const result = showPaginatedList(
      favCokctArr,
      cardList,
      coctailsPerPage,
      page
    );
  });
}

export { renderFavCocktails, cardList, favCokctArr };
