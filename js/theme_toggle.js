const but_themeToggle = document.getElementById('but_night_theme_toggle'); // кнопка смены темы
const maing_logo = document.getElementById('main_logo'); // Ссылка на логотип
const header_right_triangle = document.getElementById('header_right_triangle'); // правый треугольник в хидере
const body = document.body;
const savedTheme = localStorage.getItem('theme'); // Сохраненная тема из localStorage

// Если тема была сохранена ранее (savedTheme не null и не undefined)
if (savedTheme) {
    // Добавляем сохраненный класс темы к элементу <body>
    body.classList.add(savedTheme);
    
    // Если тема тёмная, обновляем изображения
    if (savedTheme === 'dark_theme') {
        but_themeToggle.src = "images/images for page style/but_theme_toggle_to_light.png"
        maing_logo.src = "images/images for page style/cyanidewatch_logo_dark.png";
        header_right_triangle.src = "images/images for page style/triangle-right-dark.PNG";
    }
}

// Добавляем обработчик события 'click' с стрелочной функцией на кнопку переключения темы
but_themeToggle.addEventListener('click', () => {
    // Переключаем класс 'dark_theme' у элемента <body> (добавляем или удаляем его)
    body.classList.toggle('dark_theme');

    // Если включена темная тема
    if (body.classList.contains('dark_theme')) {
        // Для кнопки переключения темы сменить фото на темное
        but_themeToggle.src = "images/images for page style/but_theme_toggle_to_light.png"
        // для логотипа переключить на темную тему 
        maing_logo.src = "images/images for page style/cyanidewatch_logo_dark.png";
        // для правого треугольника менять тему
        header_right_triangle.src = "images/images for page style/triangle-right-dark.PNG";

        // Сохраняем 'dark_theme' в localStorage, чтобы при следующей загрузке страницы тема сохранилась
        localStorage.setItem('theme', 'dark_theme');
    } 
    else {
        // Для кнопки переключения темы сменить фото на светлое
        but_themeToggle.src = "images/images for page style/but_theme_toggle_to_dark.png"
        // для логотипа переключить на светлую тему 
        maing_logo.src = "images/images for page style/cyanidewatch_logo_light.png";
        // для правого треугольника менять тему
        header_right_triangle.src = "images/images for page style/triangle-right-light.PNG";

        // Сменить на светлую тему путём удаления dark-theme заменой пустой строкой.
        localStorage.setItem('theme', '');
    }
});