const but_themeToggle = document.getElementById('but_night_theme_toggle'); // кнопка смены темы
const main_logo = document.getElementById('main_logo'); // логотип
const header_right_triangle = document.getElementById('header_right_triangle'); // треугольник справа у хидер
const footer_left_triangle = document.getElementById('footer_left_triangle') // треугольник слева у футер
const trinagle_for_style = document.getElementsByClassName('trinagle_for_style') // треугольники для стиля в шапках контента у мэина
const body = document.body;
const savedTheme = localStorage.getItem('theme'); // сохранённая тема

// Функция для плавной смены изображения
function changeImageWithFade(element, newSrc) {
    element.style.opacity = '0'; // Плавно исчезает
    setTimeout(() => {
        element.src = newSrc; // Меняем src
        element.style.opacity = '1'; // Плавно появляется
    }, 200); // Задержка = длительность transition (0.2s)
}

// Применяем тему при загрузке
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark_theme') {
        // Устанавливаем тёмные изображения (без анимации при загрузке)
        but_themeToggle.src = "images/images for page style/but_theme_toggle_to_light.png"; // для кнопки смены темы
        main_logo.src = "images/images for page style/cyanidewatch_logo_dark.png"; // для логотипа
        header_right_triangle.src = "images/images for page style/triangle-right-dark.PNG"; // для правого треу
        footer_left_triangle.src = "images/images for page style/triangle-left-dark.png"; // для левого треу
        for (let i = 0; i < trinagle_for_style.length; i++) {
            trinagle_for_style[i].src = "images/images for page style/triangle-all-dark.PNG"; // для треу для стиля
        }
    }
}

// Обработчик клика с плавной сменой
but_themeToggle.addEventListener('click', () => {
    // сменить класс на темный для боди
    body.classList.toggle('dark_theme');

    if (body.classList.contains('dark_theme')) {
        // картинки
        changeImageWithFade(but_themeToggle, "images/images for page style/but_theme_toggle_to_light.png"); // для кнопки смены темы
        changeImageWithFade(main_logo, "images/images for page style/cyanidewatch_logo_dark.png"); // для логотипа
        changeImageWithFade(header_right_triangle, "images/images for page style/triangle-right-dark.PNG"); // для правого треугольника
        changeImageWithFade(footer_left_triangle, "images/images for page style/triangle-left-dark.PNG"); // для правого треугольника
        for (let i = 0; i < trinagle_for_style.length; i++) {
            changeImageWithFade(trinagle_for_style[i], "images/images for page style/triangle-all-dark.PNG"); // для треу для стиля
        }

        // сохранить тему
        localStorage.setItem('theme', 'dark_theme');
    } 
    else {
        // картинки
        changeImageWithFade(but_themeToggle, "images/images for page style/but_theme_toggle_to_dark.png"); // для кнопки смены темы
        changeImageWithFade(main_logo, "images/images for page style/cyanidewatch_logo_light.png"); // для логотипа
        changeImageWithFade(header_right_triangle, "images/images for page style/triangle-right-light.PNG"); // для правого треугольника
        changeImageWithFade(footer_left_triangle, "images/images for page style/triangle-left-light.PNG"); // для правого треугольника
        for (let i = 0; i < trinagle_for_style.length; i++){
            changeImageWithFade(trinagle_for_style[i], "images/images for page style/triangle-all-light.PNG"); // для треу для стиля
        }
        
        // удалить тему (пустые кавычки для удаления)
        localStorage.setItem('theme', '');
    }
});