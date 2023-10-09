import {
  searchCocktails,
  SEARCH_LINK,
  LETTER_PARAM,
  resetSearch,
} from './search';

const keyboard = document.querySelector('.keyboard');

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

function keyMarkup(arr) {
  return arr
    .map(letter => `<button type='button' class='leter-btn'>${letter}</button>`)
    .join('');
}

keyboard.insertAdjacentHTML('afterbegin', keyMarkup(alphabet));

keyboard.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  resetSearch();
  searchCocktails(e.target.textContent, SEARCH_LINK, LETTER_PARAM);
});
