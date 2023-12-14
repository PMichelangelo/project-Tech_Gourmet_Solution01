const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const btnToUp = document.querySelector('.btn-up');
btnToUp.addEventListener('click', scrollToTop);

window.onscroll = () => {
  if (window.scrollY > 600) {
    btnToUp.classList.remove('visually-hidden');
    btnToUp.classList.remove('btn-up-hidden');
  } else if (window.scrollY < 600) {
    btnToUp.classList.add('visually-hidden');
  }
};

export { scrollToTop };