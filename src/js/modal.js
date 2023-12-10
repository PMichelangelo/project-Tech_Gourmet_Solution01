import { getServerProductsById } from './fetchProducts.js';
import * as basicLightbox from 'basiclightbox';
import icons from '../img/icons.svg'
import modalEmailMob from '../img/modal-email-mob.png'
import modalEmailMob2x from '../img/modal-email-mob-2x.png'
import modalEmailTab from '../img/modal-email-tab.png'
import modalEmailTab2X from '../img/modal-email-tab.png'
import modalEmailDesk from '../img/modal-email-desk.png'
import modalEmailDesk2X from '../img/modal-email-desk-2x.png'

    export { openModal, openSubcribeModal, openErrorModal };

    async function openModal(productId) {
      try {
        const productData = await getServerProductsById(productId);

        const modalContent = document.createElement('div');

        modalContent.innerHTML = `
    <div class ="modal-test" ><img src="${productData.img}" alt="${productData.name}">
      <p>${productData.name}</p>
      <p>${productData.category}</p>
      <p>${productData.size}</p>
      <p>${productData.popularity}</p>
      <p>${productData.desc}</p>
      <p>${productData.price}</p>
      <button>Add to cart</button></div>

    `;

        const instance = basicLightbox.create(modalContent);

        instance.show();
        addoOverflow()

    function closeModal() {
      instance.close();
      revomeOverflow();
    }

    document.addEventListener('keydown', closeModal);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

    function openSubcribeModal() {
      try {
        const instance = basicLightbox.create(`<div class="footer-modal">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content'><h3 class='footer-modal-title'>Thanks for subscribing for <span class='span'>new</span> products</h3>
        <p class='footer-modal-text'>We promise you organic and high-quality products that will meet your expectations. Please stay with us and we promise you many pleasant surprises.</p>
        <picture class='footer-modal-img'>
      <source
        srcset="
          ${modalEmailMob}     1x,
          ${modalEmailMob2x}   2x
        "
        media="(min-width: 375px) and (max-width: 767px)"
      />
      <source
        srcset="
          ${modalEmailTab}     1x,
          ${modalEmailTab2X}   2x
        "
        media="(min-width: 768px) and (max-width: 1439px)"
      />
      <source
        srcset="
          ${modalEmailDesk}     1x,
          ${modalEmailDesk2X}   2x
        "
        media="(min-width: 1440px)"
      />
      <img src="./img/modal-email-mob.png" alt="vegetables" />
    </picture>
    </div>`);

        instance.show();
        addoOverflow();

        function closeModalEsp(event) {
          if (event.key === 'Escape') {
            instance.close();
            revomeOverflow();
          }
        }
        function closeModal() {
          instance.close();
          revomeOverflow();
        }

        document.addEventListener('keydown', closeModalEsp);
        const closeBtn = document.querySelector('.close-footer-modal');
        closeBtn.addEventListener('click', closeModal);
      } catch (error) {
        console.error(error);
      }
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
  } catch (error) {
    console.error(error);
  }
}
function openErrorModal() {
  try {
    const instance = basicLightbox.create(`<div class="footer-modal-err">
       <button class='close-footer-modal'> <svg class="icon-close-footer" width="10" height="10">
          <use href="${icons}#icon-close-btn"></use>
        </svg></button>
        <div class='footer-modal-content-err'><h3 class='footer-modal-err-title'>This <span>email address</span> has already been entered</h3>
        <p class='footer-modal-err-text'>You have already subscribed to our new products. Watch for offers at the mailing address.</p>
    </div>`);
        instance.show();
        addoOverflow();
        function closeModalEsp(event) {
          if (event.key === 'Escape') {
            instance.close();
            revomeOverflow();
          }
        }
        function closeModal() {
          instance.close();
          revomeOverflow();
        }

        document.addEventListener('keydown', closeModalEsp);
        const closeBtn = document.querySelector('.close-footer-modal');
        closeBtn.addEventListener('click', closeModal);
      } catch (error) {
        console.error(error);
      }
    }


    function addoOverflow() {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('keydown', closeModalEsp);
    const closeBtn = document.querySelector('.close-footer-modal');
    closeBtn.addEventListener('click', closeModal);
  } catch (error) {
    console.error(error);
  }
}
function addoOverflow() {
  document.body.style.overflow = 'hidden';
}

