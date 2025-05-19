document.addEventListener('DOMContentLoaded', function() {
  // Получаем элементы
  const modal = document.getElementById('modal_eco');
  const btn = document.getElementById('open_modal_eco');
  const span_eco = document.getElementsByClassName('close')[0];

  // Открываем модальное окно при клике на кнопку
  btn.onclick = function() {
    modal.style.display = 'block';
  }

  // Закрываем модальное окно при клике на крестик
  span_eco.onclick = function() {
    modal.style.display = 'none';
  }

  // Закрываем модальное окно при клике вне его области
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
});