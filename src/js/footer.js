const carousel = document.querySelector(".carousel-cr-by");
const arrowBtnSliderLeft = document.querySelector(".cr-by-arrow-left");
const arrowBtnSliderRight = document.querySelector(".cr-by-arrow-right");
const firstCardWidth = carousel.querySelector(".cr-by-card").offSetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;
let cardPerView = Math.round(carousel.offSetWidth / firstCardWidth);


// carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//     carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// })

// carouselChildrens.slice(0, cardPerView).forEach(card => {
//     carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
// })

// arrowBtnsSlider.forEach(btn => {
//     btn.addEventListener("click", () => {
//         carousel.scrollLeft += btn.id === "leftslider" ? -firstCardWidth : firstCardWidth;
//     })
// })

const btnClickFootLeft = () => {
    carousel.scrollLeft -= 247;
}

const btnClickFootRight = () => {
    carousel.scrollLeft += 247;
}


const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if  (!isDragging) return;
 carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

// const infiniteScroll = () => {
//     if (carousel.scrollLeft === 0) {
//         console.log("left side reached")
//         carousel.classList.add("no-transition-cr-by");
//         carousel.scrollLeft = carousel.scrolllWidth - ( 2 * carousel.offSetWidth);
//         carousel.classList.remove("no-transition-cr-by");
//     } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offSetWidth) {
//         console.log("right side reached")
//         carousel.classList.add("no-transition-cr-by");
//         carousel.scrollLeft = carousel.offSetWidth;
//         carousel.classList.remove("no-transition-cr-by");
//     }
// }

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop)
// carousel.addEventListener("scroll", infiniteScroll);
arrowBtnSliderLeft.addEventListener("click", btnClickFootLeft)
arrowBtnSliderRight.addEventListener("click", btnClickFootRight)
