const observer = new IntersectionObserver((entries) => {
  entries.forEach((item) => {
    if (item.isIntersecting) {
      const currentHeight = item.target.computedStyleMap().get('height').value || 0;
      item.target.style.height = `25vw`;
      // console.log('currentHeight ', currentHeight)
    }
  })
}, { threshold: 0.5});

const element = document.querySelector('#scroll-animation');

observer.observe(element);