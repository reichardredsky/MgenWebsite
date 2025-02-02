document.addEventListener('DOMContentLoaded', () => {
  const carouselWrap = document.getElementById('mgen-carousel');
  const carouselContainer = carouselWrap.querySelector('.carousel--container');
  const carouselItems = carouselContainer.querySelectorAll('.carousel--item');
  const itemCount = carouselItems.length;
  let currentIndex = 0;
  const gapX = 15;
  const itemsToShow = 3;
  const containerWidth = carouselContainer.getBoundingClientRect().width;
  
  // const itemWidth = containerWidth / itemsToShow;
  const itemWidth = 266;
  const itemSpace = (itemWidth+gapX || (containerWidth / (itemsToShow)));
  // carouselItems

  // Initial positioning
  const positionItems = () => {
    carouselItems.forEach((item, index) => {
      const offset = (currentIndex + index) % itemCount;
      console.log(item.computedStyleMap())
      item.style.width = `${(itemWidth - gapX)}px`;
      // item.style.left = `${(gapX/2)}px`;
      item.style.zIndex = offset;
      item.style.transform = `translateX(${(offset*(itemSpace))}px) ${offset == 1 ? 'scale(1.1)' : 'scale(1)'}`;
    });
  };

  positionItems();

  // Rotation logic
  setInterval(() => {
    currentIndex = (currentIndex + 1) % itemCount;
    // if (currentIndex >= itemCount) {
    //   currentIndex = 0;
    // }
    positionItems();
  }, 2000);
});
