/// open\close favorite-list
const modalFavoriteSwitch = document.querySelector(".js-header-menu-link");
const modalFavoriteIcon = document.querySelector(".js-header-menu-link-icon");
const modalFavoriteList = document.querySelector(".js-favorite-menu-list");
let modalCurrentRotation = 0;

modalFavoriteSwitch.addEventListener("click", onClickFavorite);

function onClickFavorite() {
  let displayStyle = modalFavoriteList.style.display;
  modalCurrentRotation += 180;
  modalFavoriteIcon.style.transform = `rotate(${modalCurrentRotation}deg)`;

if (displayStyle === "none" || displayStyle === "") {
    displayStyle = "flex";
  } else {
    displayStyle = "none";
  }
  modalFavoriteList.style.display = displayStyle;
}

/// toggle theme
window.addEventListener("DOMContentLoaded", modalWindowLoad);

function modalWindowLoad() {
  const bodyBlock = document.body;
  const saveUserTheme = localStorage.getItem('user-theme');
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    !saveUserTheme ? modalChangeTheme() : null;
  });

  const modalThemeButton = document.querySelector('.themetoggle2');
  const modalResetButton = document.querySelector('.themetoggle_reset2');
  if (modalThemeButton) {
    modalThemeButton.addEventListener("click", function (e) {
      modalResetButton.classList.add('active');
      modalChangeTheme(true);
    });
  }
  if (modalResetButton) {
    modalResetButton.addEventListener("click", function (e) {
      modalResetButton.classList.remove('active');
      localStorage.setItem('user-theme', '');
    });
  }

  function modalSetThemeClass() {
    if (saveUserTheme) {

      bodyBlock.classList.add(saveUserTheme)
      modalResetButton.classList.add('active');
    } else {
      bodyBlock.classList.add(userTheme);
    }
  }
  modalSetThemeClass();

  function modalChangeTheme(saveTheme = false) {
    let currentTheme = bodyBlock.classList.contains('light') ? 'light' : 'dark';
    let newTheme;

    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'light';
    }
    bodyBlock.classList.remove(currentTheme);
    bodyBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
  }
}
