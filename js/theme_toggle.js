// Получаем ссылку на кнопку переключения темы по её ID
const but_themeToggle = document.getElementById('but_night_theme_toggle');
// Получаем ссылку на элемент <body>, чтобы менять его классы
const body = document.body;
// Пытаемся получить сохраненную тему из localStorage
const savedTheme = localStorage.getItem('theme');

// Если тема была сохранена ранее (savedTheme не null и не undefined)
if (savedTheme) {
    // Добавляем сохраненный класс темы к элементу <body>
    body.classList.add(savedTheme);
}

// Добавляем обработчик события 'click' с стрелочной функцией на кнопку переключения темы
but_themeToggle.addEventListener('click', () => {
    // Переключаем класс 'dark_theme' у элемента <body> (добавляем или удаляем его)
    body.classList.toggle('dark_theme');

    // Если элемент <body> теперь содержит класс 'dark_theme' (темная тема активна)
    if (body.classList.contains('dark_theme')) {
        // Сохраняем 'dark_theme' в localStorage, чтобы при следующей загрузке страницы тема сохранилась
        localStorage.setItem('theme', 'dark_theme');
    } else {
        // Если 'dark_theme' был удален (светлая тема активна), удаляем запись из localStorage
        // Установка пустой строки, эквивалентна удалению элемента.
        localStorage.setItem('theme', '');
    }
});