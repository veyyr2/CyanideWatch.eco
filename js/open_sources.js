// Получаем модальное окно
const sourcesModal = document.getElementById("sourcesModal");
// Получаем кнопку, которая открывает модальное окно
const sourcesBtn = document.getElementById("but_sources");
// Получаем элемент <span>, который закрывает модальное окно
const span2 = document.querySelector("#sourcesModal .close");

// Открываем модальное окно при клике на кнопку
sourcesBtn.onclick = function() {
    sourcesModal.style.display = "block";
};

// Закрываем модальное окно при клике на <span> (x)
span2.onclick = function() {
    sourcesModal.style.display = "none";
};

// Закрываем модальное окно при клике вне его области
window.onclick = function(event) {
    if (event.target == sourcesModal) {
        sourcesModal.style.display = "none";
    }
};