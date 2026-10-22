(() => {
  document.querySelectorAll('[data-company-image]').forEach((container) => {
    const placeholder = container.querySelector('.career-image-placeholder');
    const figure = container.querySelector('figure');
    const image = figure.querySelector('img');
    image.addEventListener('load', () => {
      figure.hidden = false;
      placeholder.hidden = true;
    });
    image.addEventListener('error', () => {
      figure.hidden = true;
      placeholder.hidden = false;
    });
    image.src = image.dataset.companySrc;
  });
})();
