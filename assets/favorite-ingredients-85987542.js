import{s as f,P as h,b as y,N as I}from"./tui-pagination-39f9a9b9.js";const l=document.querySelector(".favorite-ingredients-list"),c=document.querySelector(".sorry-ingredients"),u=document.querySelector(".tui-pagination"),n=JSON.parse(localStorage.getItem("KEY_FAVORITE_INGREDIENTS"))??[];let S=1,a=6,b=4;screen.width>=1280&&(b=7);c.classList.add("hidden");r(n,l);n.length||c.classList.remove("hidden");l.addEventListener("click",E);function r(i,e){e.innerHTML="",u.innerHTML="",i.length<=a?e.innerHTML=i.map(s=>{let t="Alcoholic";return s.abv==="0"&&(t="Non-alcoholic"),`<li class="in-card" data-id=${s.id}>
        <h3 class="in-card-title">${s.title}</h3>
        <p class="in-card-alco">${t}</p>
        <p class="in-card-descr">${s.description||"-"}</p>
        <div class="in-card-btns"><button class="btn-learn-more">learn more</button><button class="btn-remove"><svg class="remove-icon">
                        <use href="${f}#trash"></use>
                    </svg></button></div>
</li>`}).join(""):(m(n,l,a,S),k(n,u,a))}function m(i,e,s,t){e.innerHTML="",t--;let o=s*t,d=o+s,g=i.slice(o,d);return r(g,l)}function k(i,e,s){e.innerHTML="";const t={totalItems:i.length,itemsPerPage:s,visiblePages:b,page:1,centerAlign:!1,firstItemClassName:"tui-first-child",lastItemClassName:"tui-last-child",template:{page:'<a href="#" class="tui-page-btn btnStyle">{{page}}</a>',currentPage:'<strong class="tui-page-btn tui-is-selected btnStyleActive btnMargL btnMargR">{{page}}</strong>',moveButton:'<a href="#" class="tui-page-btn tui-{{type}} btnMargL btnMargR btnStyle"><span class="tui-ico-{{type}}">{{type}}</span></a>',disabledMoveButton:'<span class="tui-page-btn tui-is-disabled tui-{{type}} btnMargL btnMargR btnStyle"><span class="tui-ico-{{type}} ,">{{type}}</span></span>',moreButton:'<a href="#" class="tui-page-btn tui-{{type}}-is-ellip btnStyle"><span class="tui-ico-ellip">...</span></a>'}};new h(u,t).on("beforeMove",d=>{const{page:g}=d;m(n,l,a,g)})}function E(i){if(i.target.classList.contains("btn-learn-more")){const e=v(i.target);y.create(`<div id="modal-ingredients" class="modal-in">
      <button type="button" class="modal-in-close-button close-cocktail-modal-x">
        <svg class="icon-in-close" width="11" height="11">
          <use href="./img/sprite.svg#cross"></use>
        </svg>
      </button>
    <div class="descripe-ingredients" data-id="${e.id}"><div class="header-in">
          <h2 id="ingredients-title" class="ingredients-title">${e.title}</h2>
          <p class="kind-in">${e.type}</p>
        </div>
        <div class="ingredients-information">
          <p class="main-description-in">${e.description||"-"}</p>
          <ul class="ingredients-spec">
            <li class="ingredients-description">Type: ${e.type||"-"}</li>
            <li class="ingredients-description">Country of origin: ${e.country||"-"}</li>
            <li class="ingredients-description">Alcohol by volume: ${e.abv||"-"}</li>
            <li class="ingredients-description">Flavour: ${e.flavour||"-"}</li>
          </ul>
        </div>
        <div class="buttons-in">
          <button class="btn-in remove-btn">REMOVE FROM FAVORITE</button>
          <button type="button" id="btn-back" class="btn-in btn-back close-cocktail-modal-back">
            BACK
          </button></div></div>`,{onShow:t=>{t.element().querySelector(".close-cocktail-modal-back").onclick=t.close,t.element().querySelector(".close-cocktail-modal-x").onclick=t.close,t.element().querySelector(".remove-btn").addEventListener("click",p),t.element().querySelector(".remove-btn").onclick=t.close},onClose:t=>{t.element().querySelector(".remove-btn").removeEventListener("click",p)}}).show()}(i.target.closest(".btn-remove")||i.target.closest(".btn-in"))&&(L(i),n.length||c.classList.remove("hidden"))}function v(i){const e=i.closest(".in-card").dataset.id;return n.find(({id:s})=>s===e)}function L(i){const e=v(i.target),s=n.findIndex(({id:t})=>t===e.id);I.Notify.info(`Ingredient ${n[s].title} removed from favorites`),n.splice(s,1),localStorage.setItem("KEY_FAVORITE_INGREDIENTS",JSON.stringify(n)),r(n,l)}function p(i){const e=i.target.closest(".descripe-ingredients").dataset.id,s=n.find(({id:o})=>o===e),t=n.findIndex(({id:o})=>o===s.id);n.splice(t,1),localStorage.setItem("KEY_FAVORITE_INGREDIENTS",JSON.stringify(n)),r(n,l),n.length||c.classList.remove("hidden")}
