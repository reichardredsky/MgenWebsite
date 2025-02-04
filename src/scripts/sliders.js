document.addEventListener('DOMContentLoaded', () => {
  const sliderWrapper = document.getElementById('card-sliders');
  const sliderContainer = sliderWrapper.querySelector('.slider--container');
  const sliderItems = sliderContainer.querySelectorAll('.slider--item');
  const slideButtonWrapper = document.getElementById('card-sliders-buttons');
  const prev = slideButtonWrapper.querySelector('.slider--prev');
  const next = slideButtonWrapper.querySelector('.slider--next');
  let currentPossition = 0;
  const sliderWidth = sliderContainer.getBoundingClientRect().width;
  const itemWidth = sliderItems[0].getBoundingClientRect().width;
  // const parentWrapWidth = sliderWrapper.getBoundingClientRect().width;
  const gapX =   itemWidth;
  const xTranslate = gapX; //(sliderWidth / gapX);

  const setPossition = () => {
    console.log(xTranslate)
    sliderContainer.style.transform = `translateX(-${(gapX)*currentPossition}px)`;
  }

  next.addEventListener('click', () => {
    console.log('currentPossition > sliderItems.length ', currentPossition, sliderItems.length)
    if (currentPossition > sliderItems.length - 1) return;
    currentPossition = (currentPossition + 1);
    setPossition();
  });

  prev.addEventListener('click', () => {
    if (currentPossition < 1) return;
    currentPossition = (currentPossition - 1);
    setPossition();
  });
});