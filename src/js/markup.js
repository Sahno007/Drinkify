import spriteURL from '/img/sprite.svg';
import picUrl from '/img/rafiki.jpg';
import { favCokctArr } from './favorite_coctails';

const iconMainMarkup = `${spriteURL}#fullheart`;
const iconFavMarkup = `${spriteURL}#trash`;

function createMarkup({ drinkThumb, drink, description, _id: id }, iconMarkup) {
  let classAd;
  let classRemove;

  const inStorageIn = favCokctArr.find(({ _id: curId }) => curId === id);

  if (inStorageIn) {
    classAd = 'visually-hidden';
    classRemove = '';
  } else {
    classAd = '';
    classRemove = 'visually-hidden';
  }

  let markup = `<li class="cardlist-item id-for-del" data-id=${id}>
        <img src="${drinkThumb}" loading="lazy" class="cardlist-img" alt="${drink}" onerror="this.onerror=null;this.src='${picUrl}';" width=300>
        <h3 class="cardlist-drink">${drink}</h3>
        <p class="cardlist-descr">${description}</p>
        <div class="cartlist-btns"><button class="cardlist-learn">learn more</button>
        <button class="cardlist-fav add-to-fav-cockt-headt ${classAd}">
        <svg class="cardlist-svg" weight="18" height="18">
        <use href="${spriteURL}#heart"></use>
        </svg>
        </button>
        <button class="cardlist-fav remove-from-fav-cockt-bin ${classRemove}">
        <svg class="cardlist-svg" weight="18" height="18">
         <use href="${iconMarkup}"></use>
        </svg>
        </button>
        </div>
        </li>`;
  return markup;
}

export { createMarkup, iconMainMarkup, iconFavMarkup };
