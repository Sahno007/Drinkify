const scrollButton = document.querySelector(".btn-hero-scroll");
scrollButton.addEventListener("click", function(event) {
  event.preventDefault(); 
  const targetSection = document.querySelector("#cocktails-section"); 
  const targetOffset = targetSection.offsetTop;
  window.scrollTo({
    top: targetOffset,
    behavior: "smooth" 
  });
});