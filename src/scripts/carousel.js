class MGenCarousel {
  constructor(wrapperId, options = {}) {
    this.carouselWrap = document.getElementById(wrapperId);
    this.carouselContainer = this.carouselWrap.querySelector('.carousel--container');
    this.carouselItems = Array.from(this.carouselContainer.querySelectorAll('.carousel--item'));
    this.intervalID = null;
    this.prevButton = this.carouselWrap.querySelector('.carousel--prev');
    this.nextButton = this.carouselWrap.querySelector('.carousel--next');

    // Default options with user overrides
    this.settings = {
      itemWidth: options.itemWidth || 266,
      spacing: options.spacing || 30,
      interval: options.interval || 2000,
      scaleActive: options.scaleActive || 1.1,
      scaleInactive: options.scaleInactive || 1,
      showBullet: options.showBullet || false,
      isAuto: options.isAuto,
      transitionDuration: options.transitionDuration || 0.5, // In seconds
    };

    this.itemCount = this.carouselItems.length;
    this.currentIndex = 1;
    this.bulletIndex = 1;
    this.containerWidth = this.carouselContainer.getBoundingClientRect().width;
    this.centerX = (this.containerWidth - this.settings.itemWidth) / 2;
    this.bulletWrapper = null;

    this.init();
  }

  createBullet() {
    if (!this.settings.showBullet) return;
    this.bulletWrapper = document.createElement('div');
    this.bulletWrapper.style.alignItems = 'center';
    this.bulletWrapper.style.display = 'inline-flex';
    this.bulletWrapper.style.flex = '0 0 auto';
    this.bulletWrapper.style.gap = '8px';
    this.bulletWrapper.style.justifyContent = 'center';
    this.bulletWrapper.style.position = 'relative';
    this.carouselWrap.append(this.bulletWrapper);

    const bulletItems = document.createElement('div');
    bulletItems.style.backgroundColor = 'var(--gray-nurse)';
    bulletItems.style.borderRadius = '6px';
    bulletItems.style.height = '12px';
    bulletItems.style.position = 'relative';
    bulletItems.style.width = '12px';

    for(let i = 0; i < this.itemCount; i++) {
      if (this.currentIndex === i) {
        bulletItems.style.backgroundColor = 'var(--masala)';
        bulletItems.style.scale = '1.3';
      } else {
        bulletItems.style.backgroundColor = 'var(--gray-nurse)';
        bulletItems.style.scale = '1';
      }
      this.bulletWrapper.appendChild(bulletItems.cloneNode(true));
    }
  }

  init() {
    this.createBullet();
    this.applyStyles();
    this.positionItems();
    this.startRotation();
    if (this.prevButton && this.nextButton) {
      this.nextButton.addEventListener('click', () => {
        this.next();
      });
      this.prevButton.addEventListener('click', () => {
        this.prev();
      });
    }
  }

  applyStyles() {
    this.carouselContainer.style.position = 'relative';
    this.carouselItems.forEach((item) => {
      item.style.position = 'absolute';
      item.style.transition = `transform ${this.settings.transitionDuration}s ease-in-out`;
    });
  }

  positionItems() {
    this.carouselItems.forEach((item, index) => {
      const offset = (index - this.currentIndex + this.itemCount) % this.itemCount;
      const xTranslate = (offset - 1) * (this.settings.itemWidth + this.settings.spacing) + this.centerX;
      const zIndex = offset == 1 ? 10 : offset;
      item.setAttribute('offset', offset);

      item.style.width = `${this.settings.itemWidth}px`;
      item.style.zIndex = zIndex;
      item.style.transform = `translateX(${xTranslate}px) scale(${offset === 1 ? this.settings.scaleActive : this.settings.scaleInactive})`;
    });
  }

  next() {
    this.currentIndex = ((this.currentIndex - 1) + this.itemCount) % this.itemCount;
    this.positionItems();
  }

  prev() {
    this.currentIndex = ((this.currentIndex + 1) + this.itemCount) % this.itemCount;
    this.positionItems();
  }

  startRotation() {

    this.intervalID = setInterval(() => {
      if (!this.settings.isAuto) return;
      this.currentIndex = ((this.currentIndex - 1) + this.itemCount) % this.itemCount;
      this.bulletIndex = ((this.bulletIndex + 1) + this.itemCount) % this.itemCount;

      if (this.bulletWrapper) {
        for (let i = 0; i < this.itemCount; i++) {
          if (i === (this.bulletIndex)) {
            this.bulletWrapper.childNodes[i].style.scale = '1.3';
            this.bulletWrapper.childNodes[i].style.backgroundColor = 'var(--masala)';
          } else {
            this.bulletWrapper.childNodes[i].style.scale = '1';
            this.bulletWrapper.childNodes[i].style.backgroundColor = 'var(--gray-nurse)';
          }
        }
      }
      this.positionItems();
     
    }, this.settings.interval);
  }
}
