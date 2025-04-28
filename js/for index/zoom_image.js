function openmodalZoomImgs(imgElement) {
    // Проверяем ширину экрана
    if (window.innerWidth >= 320 && window.innerWidth <= 768) {
        return; // Выходим из функции для мобильных устройств
    }
    
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    
    modal.style.display = "block";
    modalImg.src = imgElement.src;
    
    // Переключаем зум при клике
    modalImg.onclick = function() {
        this.classList.toggle("zoomed");
    };
}

function closemodalZoomImgs() {
    // Проверяем ширину экрана
    if (window.innerWidth >= 320 && window.innerWidth <= 768) {
        return; // Выходим из функции для мобильных устройств
    }
    
    document.getElementById("imageModal").style.display = "none";
    document.getElementById("modalImage").classList.remove("zoomed");
}

// Закрытие модального окна при клике вне изображения
window.addEventListener('click', function(event) {
    // Проверяем ширину экрана
    if (window.innerWidth >= 320 && window.innerWidth <= 768) {
        return; // Выходим из функции для мобильных устройств
    }
    
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closemodalZoomImgs();
    }
});