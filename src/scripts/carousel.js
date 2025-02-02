document.addEventListener('DOMContentLoaded', () => {
  const carouselWrap = document.getElementById('mgen-carousel');
  const carouselContainer = carouselWrap.querySelector('.carousel--container');
  const carouselItems = Array.from(carouselContainer.querySelectorAll('.carousel--item'));
  const itemCount = carouselItems.length;
  let currentIndex = 1;
  const itemWidth = 266; 
  const containerWidth = carouselContainer.getBoundingClientRect().width;

  // Calculate center position
  const centerX = (containerWidth - itemWidth) / 2;

  // Position items initially
  const positionItems = () => {
    carouselItems.forEach((item, index) => {
      const offset = (index - currentIndex + itemCount) % itemCount;
      const xTranslate = (offset - 1) * (itemWidth + 30) + centerX; 
      const zIndex = offset;

      item.style.width = `${itemWidth}px`;
      item.style.position = 'absolute'; // Ensure absolute positioning
      item.style.zIndex = zIndex;
      item.style.transform = `translateX(${xTranslate}px) ${offset === 1 ? 'scale(1.1)' : 'scale(1)'}`;
    });
  };

  positionItems();

  // Rotation logic
  setInterval(() => {
    currentIndex = (currentIndex - 1) % itemCount;
    positionItems();
  }, 2000);
});
