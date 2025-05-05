document.addEventListener('DOMContentLoaded', function() {
    // шапки приветствия и эсайд
    const welcomeHat = document.getElementById('welcome_hat');
    const asideHat = document.getElementById('aside_hat');

    if (welcomeHat && asideHat) {
        // Устанавливаем высоту шапки aside равной высоте шапки приветствия
        asideHat.style.height = `${welcomeHat.offsetHeight}px`;
    }
});