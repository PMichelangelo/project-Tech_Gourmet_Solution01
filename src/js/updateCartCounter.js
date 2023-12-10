function updateCartCounterOnLoad() {
  // Получаем текущую длину массива из localStorage и обновляем счетчик в хедере
  const storage = JSON.parse(localStorage.getItem("cartData")) || [];
  const counterElement = document.querySelector('.header-counter');
  counterElement.textContent = storage.length.toString();
}

// Вызывайте эту функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterOnLoad();
});

export {updateCartCounterOnLoad}