function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
  const scrollUpButton = document.getElementById('scrollUpButton');

  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    scrollUpButton.style.display = 'flex';
  } else {
    scrollUpButton.style.display = 'none';
  }
});

document.getElementById('scrollUpButton').addEventListener('click', scrollToTop);