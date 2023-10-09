import {
  searchCocktails,
  SEARCH_LINK,
  LETTER_PARAM,
  resetSearch,
} from './search';

const openBtn = document.querySelector('.open-alphabet-btn');
const lettersMenu = document.querySelector('.alphabet-list');
const alphabetContainer = document.querySelector('.list-container');

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
];

function menuMarkup(arr) {
  return arr
    .map(
      letter =>
        `<li class='letter-item'><a href='#' class='letter-link'>${letter}</a></li>`
    )
    .join('');
}

function onOpeen() {
  const svgDown = document.querySelector('.svg-icon-down');
  const svgUp = document.querySelector('.svg-icon-up');
  if (alphabetContainer.classList.contains('display') === true) {
    alphabetContainer.classList.remove('display');
    svgDown.classList.add('display');
    svgUp.classList.remove('display');
    lettersMenu.insertAdjacentHTML('afterbegin', menuMarkup(alphabet));
  } else {
    alphabetContainer.classList.add('display');
    svgDown.classList.remove('display');
    svgUp.classList.add('display');
    lettersMenu.innerHTML = '';
  }
}

openBtn.addEventListener('click', () => {
  onOpeen();
});

lettersMenu.addEventListener('click', e => {
  e.preventDefault();
  const currentLetter = e.target.textContent;
  openBtn.innerHTML = `<p class="btn-letter">${currentLetter}</p>
  <svg class="svg-icon-down">
      <use href="./img/sprite.svg#chevron-down"></use>
    </svg>
    <svg class="svg-icon-up display">
      <use href="./img/sprite.svg#chevron-up"></use>
    </svg>`;
  alphabetContainer.classList.add('display');
  openBtn.style.background = '#9CDFDF';
  lettersMenu.innerHTML = '';

  resetSearch();
  searchCocktails(e.target.textContent, SEARCH_LINK, LETTER_PARAM);
});
