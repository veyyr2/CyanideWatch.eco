function openmodalZoomImgs(imgElement) {
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
    document.getElementById("imageModal").style.display = "none";
    document.getElementById("modalImage").classList.remove("zoomed");
}

// Закрытие модального окна при клике вне изображения
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
};