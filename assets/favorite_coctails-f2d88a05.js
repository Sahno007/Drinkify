import{f as w,b as _,s as u,o as P,N as C,P as H}from"./tui-pagination-39f9a9b9.js";const g="favoriteCocktails",I=document.querySelector(".cardlist"),q="cocktails/lookup/",M="id",l=JSON.parse(localStorage.getItem(g))??[];let d,n;const R={disabledScroll(){document.body.style.cssText=`
    overflow: hidden;
    padding-right: ${window.innerWidth-document.body.offsetWidth}px;`},enabledScroll(){document.body.style.cssText=""}};I.addEventListener("click",N);I.addEventListener("click",B);async function N(t){if(!t.target.classList.contains("cardlist-learn"))return;n=t.target.closest(".cardlist-item");const a=t.target.closest(".cardlist-item").dataset.id;await w(q,M,a).then(o=>{const{_id:i,drinkThumb:s,instructions:c,drink:e,ingredients:b,description:y}=o[0];d={_id:i,drinkThumb:s,description:y,drink:e};let f=b.map(m=>`<li data-id="${m.ingredientId}" class="text item-card"><a href="#" class="ingredient-btn">${m.measure||""}${m.title}</a></li>`).join("");O(a,f,e,c,s),R.disabledScroll()})}function O(t,a,o,i,s){_.create(`<div class="container-popup id-for-del" data-id="${t}">
  <button class="popup-close-btn close-cocktail-modal-x">
    <svg class="popup-close-btn-icon">
      <use href="${u}#cross"></use>
    </svg>
  </button>
  <div class="box">
    <div class="picture"><img src="${s}" alt="${o}" loading='lazy' onerror="this.onerror=null;this.src='img/rafiki.jpg';"/></div>
    <div>
      <h2 class="name">${o}</h2>
      <p class="caption-card">Ingredients:</p>
      <p class="text text-card">Per cocktail</p>
      <ul class="list-card ingredients-list custom-scrollbar">${a}</ul>
    </div>
  </div>
  <p class="caption-card">Instructions:</p>
  <p class="text desc-card custom-scrollbar">
   ${i}
  </p>
  <div class="container-button">
  <button type="button" class="button-card favorite add-to-fav-cockt" data-id="${t}">
    add to favorite
  </button>
   <button type="button" class="visually-hidden button-card favorite remove-from-fav-cockt" data-id="${t}">
    Remove from favorite
  </button>
   <button type="button" class="button-card back close-cocktail-modal-back">Back</button></div>
</div>`,{onShow:e=>{e.element().querySelector(".close-cocktail-modal-back").onclick=e.close,e.element().querySelector(".close-cocktail-modal-x").onclick=e.close,e.element().querySelector(".add-to-fav-cockt").addEventListener("click",S),e.element().querySelector(".remove-from-fav-cockt").addEventListener("click",L),D(e)},onClose:e=>{e.element().querySelector(".add-to-fav-cockt").removeEventListener("click",S),e.element().querySelector(".remove-from-fav-cockt").removeEventListener("click",L)},onClose:()=>{R.enabledScroll()}}).show(),document.querySelector(".ingredients-list").addEventListener("click",P)}function D(t){l.find(({_id:o})=>o===t.element().querySelector(".container-popup").dataset.id)&&(t.element().querySelector(".add-to-fav-cockt").classList.add("visually-hidden"),t.element().querySelector(".remove-from-fav-cockt").classList.remove("visually-hidden"))}async function B(t){if(t.preventDefault(),t.target.classList.contains("add-to-fav-cockt-headt")||t.target.closest(".add-to-fav-cockt-headt")){n=t.target.closest(".cardlist-item");const a=t.target.closest(".cardlist-item").dataset.id;await w(q,M,a).then(o=>{const{_id:i,drinkThumb:s,drink:c,description:e}=o[0];d={_id:i,drinkThumb:s,description:e,drink:c}}),x()}else if(t.target.classList.contains("remove-from-fav-cockt-bin")||t.target.closest(".remove-from-fav-cockt-bin"))n=t.target.closest(".cardlist-item"),A(t);else return}function S(t){t.preventDefault(),document.querySelector(".add-to-fav-cockt").classList.add("visually-hidden"),document.querySelector(".remove-from-fav-cockt").classList.remove("visually-hidden"),x()}function x(){n.querySelector(".add-to-fav-cockt-headt").classList.add("visually-hidden"),n.querySelector(".remove-from-fav-cockt-bin").classList.remove("visually-hidden"),C.Notify.info(`Cocktail ${d.drink} added to favorites`),l.push(d),localStorage.setItem(g,JSON.stringify(l))}function L(t){t.preventDefault(),document.querySelector(".add-to-fav-cockt").classList.remove("visually-hidden"),document.querySelector(".remove-from-fav-cockt").classList.add("visually-hidden"),A(t)}function A(t){n.querySelector(".add-to-fav-cockt-headt").classList.remove("visually-hidden"),n.querySelector(".remove-from-fav-cockt-bin").classList.add("visually-hidden");const a=l.findIndex(({_id:o})=>o===t.target.closest(".id-for-del").dataset.id);C.Notify.info(`Cocktail ${l[a].drink} removed from favorites`),l.splice(a,1),localStorage.setItem(g,JSON.stringify(l)),(window.location.pathname==="/Drinkify/favorite-cocktails.html"||window.location.pathname==="/favorite-cocktails.html")&&h(l,v)}const F="/Drinkify/assets/rafiki-b0fd8af4.jpg",U=`${u}#fullheart`,j=`${u}#trash`;function K({drinkThumb:t,drink:a,description:o,_id:i},s){let c,e;return k.find(({_id:f})=>f===i)?(c="visually-hidden",e=""):(c="",e="visually-hidden"),`<li class="cardlist-item id-for-del" data-id=${i}>
        <img src="${t}" loading="lazy" class="cardlist-img" alt="${a}" onerror="this.onerror=null;this.src='${F}';" width=300>
        <h3 class="cardlist-drink">${a}</h3>
        <p class="cardlist-descr">${o}</p>
        <div class="cartlist-btns"><button class="cardlist-learn">learn more</button>
        <button class="cardlist-fav add-to-fav-cockt-headt ${c}">
        <svg class="cardlist-svg" weight="18" height="18">
        <use href="${u}#heart"></use>
        </svg>
        </button>
        <button class="cardlist-fav remove-from-fav-cockt-bin ${e}">
        <svg class="cardlist-svg" weight="18" height="18">
         <use href="${s}"></use>
        </svg>
        </button>
        </div>
        </li>`}const v=document.querySelector(".cardlist"),$=document.querySelector(".plug"),p=document.querySelector(".tui-pagination"),J="favoriteCocktails",k=JSON.parse(localStorage.getItem(J))??[];let Y=1,r=6,E=4;screen.width>=1280&&(E=7);(window.location.pathname==="/Drinkify/favorite-cocktails.html"||window.location.pathname==="/favorite-cocktails.html")&&h(k,v);function h(t,a){(window.location.pathname==="/Drinkify/favorite-cocktails.html"||window.location.pathname==="/favorite-cocktails.html")&&(t.length?$.classList.add("visually-hidden"):$.classList.remove("visually-hidden")),a.innerHTML="",p.innerHTML="",t.length<=r?a.innerHTML=t.map(o=>K(o,j)).join(""):(T(t,a,r,Y),W(t,p,r))}function T(t,a,o,i){a.innerHTML="",i--;let s=o*i,c=s+o,e=t.slice(s,c);return h(e,v)}function W(t,a,o){a.innerHTML="";const i={totalItems:t.length,itemsPerPage:o,visiblePages:E,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn btnStyle">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected btnStyleActive btnMargL btnMargR">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}} btnMargL btnMargR btnStyle"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}} btnMargL btnMargR btnStyle"><span class="tui-ico-{{type}}">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip btnStyle"><span class="tui-ico-ellip">...</span></a>'}};new H(p,i).on("beforeMove",c=>{const{page:e}=c;T(k,v,r,e)})}export{K as c,U as i};
