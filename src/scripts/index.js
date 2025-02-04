// Usage
document.addEventListener('DOMContentLoaded', () => {
  new MGenCarousel('mgen-carousel', {
    itemWidth: 266,
    spacing: 50,
    interval: 3000,
    scaleActive: 1.255,
    scaleInactive: 1,
    transitionDuration: 0.5,
    showBullet: true,
    isAuto: true,
  });

  new MGenCarousel('vous-carousel',  {
    itemWidth: 363,
    spacing: -20,
    interval: 3000,
    scaleActive: 1.4,
    scaleInactive: 1,
    transitionDuration: 0.5,
    showBullet: false,
    isAuto: false,
  })

});
