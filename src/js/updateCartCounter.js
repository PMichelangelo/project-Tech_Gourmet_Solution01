function updateCartCounterOnLoad() {
  // Получаем текущую длину массива из localStorage и обновляем счетчик в хедере
  const storage = JSON.parse(localStorage.getItem('cartData')) || [];
  const counterElement = document.querySelectorAll('.header-counter');
  counterElement[0].textContent = storage.length.toString();
  counterElement[1].textContent = storage.length.toString();
}

// Вызывайте эту функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});

export { updateCartCounterOnLoad };
