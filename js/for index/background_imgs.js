function repeatBackgroundImages() {
    const container = document.getElementById('container_main_aside');
    const bgImagesContainer = document.getElementById('body_bg_imgs');
    const bgImages = bgImagesContainer.querySelectorAll('.img_background');

    if (bgImages.length === 0) return;

    // Очищаем ранее добавленные клоны, чтобы не накапливались
    bgImagesContainer.querySelectorAll('.img_clone').forEach(clone => clone.remove());

    const containerHeight = container.offsetHeight;
    let currentBgHeight = 0;

    bgImages.forEach(img => {
        currentBgHeight += img.offsetHeight;
    });

    while (currentBgHeight < containerHeight) {
        for (let img of bgImages) {
            const remainingHeight = containerHeight - currentBgHeight;

            if (remainingHeight <= 0) break;

            const clone = img.cloneNode(true);
            clone.classList.add('img_clone'); // Пометка клона для возможного удаления

            // Если остаётся меньше, чем высота изображения — обрезаем
            if (remainingHeight < img.offsetHeight) {
                clone.style.height = `${remainingHeight}px`;
                clone.style.overflow = 'hidden';
                clone.style.objectFit = 'cover'; // если это <img>
                clone.style.display = 'block'; // на случай, если по умолчанию inline
            }

            bgImagesContainer.appendChild(clone);
            currentBgHeight += Math.min(img.offsetHeight, remainingHeight);
        }
    }
}

window.addEventListener('load', repeatBackgroundImages);
window.addEventListener('resize', repeatBackgroundImages);