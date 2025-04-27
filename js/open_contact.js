// Получаем модальное окно
const contactModal = document.getElementById("contactModal");

// Получаем кнопку "Связь со мной" по ID
const contactBtn = document.getElementById("but_contact");

// Получаем элемент <span>, который закрывает модальное окно
const span = document.querySelector("#contactModal .close");

// Когда пользователь нажимает на кнопку, открываем модальное окно
contactBtn.onclick = function() {
    contactModal.style.display = "block";
}

// Когда пользователь нажимает на <span> (x), закрываем модальное окно
span.onclick = function() {
    contactModal.style.display = "none";
}

// Когда пользователь кликает в любом месте вне модального окна, закрываем его
window.onclick = function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
}