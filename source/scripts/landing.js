document.addEventListener('DOMContentLoaded', () => {
  const mainNav = document.querySelector('.main-nav');
  const toggleButton = document.querySelector('.button-toogle');
  const mainHeader = document.querySelector('.main-header');
  const blurBackground = document.querySelector('.blur-background');

  mainNav.classList.add('main-nav--closed');
  toggleButton.classList.add('button-toogle--visible');
  mainHeader.classList.add('main-header--fixed');

  toggleButton.addEventListener('click', () => {
    const isNavClosed = mainNav.classList.toggle('main-nav--closed');
    toggleButton.classList.toggle('button-toogle--close');
    document.body.classList.toggle('no-scroll', !isNavClosed);
    mainHeader.classList.toggle('main-header--open', !isNavClosed);
    blurBackground.style.display = isNavClosed ? 'none' : 'block';
  });

  document.addEventListener('click', (event) => {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnToggleButton = toggleButton.contains(event.target);

    if (!(isClickInsideNav || isClickOnToggleButton)) {
      const isNavOpen = !mainNav.classList.contains('main-nav--closed');
      if (isNavOpen) {
        mainNav.classList.remove('main-nav--open');
        mainNav.classList.add('main-nav--closed');
        toggleButton.classList.remove('button-toogle--close');
        toggleButton.classList.add('button-toogle--visible');
        document.body.classList.remove('no-scroll');
        mainHeader.classList.remove('main-header--open');
        blurBackground.style.display = 'none';
      }
    }
  });
});

