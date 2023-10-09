
/// open/close modal burger

document.addEventListener("DOMContentLoaded", function () {
  const btnMenuBurger = document.querySelector(".js-header-menu-burger");
  const modalBurger = document.querySelector(".js-header-backdrop");
  const closeModalBurger = document.querySelector(".js-header-menu-close");
  const body = document.body;

  function onClickBurger() {
    body.style.overflow = "hidden";
    modalBurger.style.transform = "translateX(0)";
    closeModalBurger.addEventListener("click", onClickCloseModalBurger);
    btnMenuBurger.removeEventListener("click", onClickBurger);
  }

  function onClickCloseModalBurger() {
    const modalBurger = document.querySelector(".js-header-backdrop");
    modalBurger.style.transform = "translateX(100%)";
    btnMenuBurger.addEventListener("click", onClickBurger);
    body.style.overflow = null;
  }

  btnMenuBurger.addEventListener("click", onClickBurger);
});
