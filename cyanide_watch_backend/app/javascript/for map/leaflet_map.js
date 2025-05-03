// В файле js/map.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const map = L.map('world-map').setView([20, 0], 2);
    
    // Добавление базового слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Загрузка данных о загрязнениях
    fetch('/api/spots')
        .then(response => response.json())
        .then(data => {
            data.forEach(spot => {
                // Создание маркеров для каждого места загрязнения
                const marker = L.circleMarker([spot.lat, spot.lng], {
                    radius: getRadius(spot.measurement_value),
                    fillColor: getColor(spot.measurement_value),
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                }).addTo(map);
                
                // Добавление всплывающей информации
                // Если news_link отсутствует (null/nil), ссылка не отображается
                const newsLink = spot.news_link || null; // Приводим к null для JS
                marker.bindPopup(`
                    <h3>${spot.location}</h3>
                    <p><strong>Тип загрязнения:</strong> ${
                        spot.measurement_type === 'water' ? 'Вода' :
                        spot.measurement_type === 'soil' ? 'Почва' :
                        spot.measurement_type === 'air' ? 'Воздух' :
                        'другое' // Значение по умолчанию, если ни один из вышеперечисленных типов не совпал
                      }</p>
                    <p><strong>Уровень загрязнения:</strong> ${spot.measurement_value} мг/л</p>
                    <p><strong>Дата:</strong> ${spot.date}</p>
                    <p>${spot.description}</p>
                    ${newsLink ? `<a href="${newsLink}" target="_blank" rel="noopener noreferrer">Читать новость</a>` : ''}
                `);
            });
        });
    
    // Функция для определения цвета маркера в зависимости от уровня загрязнения
    function getColor(value) {
        if (value < 0.01) {
            return '#2ca02c'; // зеленый - отсутствие/очень слабое загрязнение
        } else if (value >= 0.01 && value < 0.07) {
            return '#ffcc00'; // желтый - слабое загрязнение
        } else if (value >= 0.07 && value < 0.1) {
            return '#ff7f0e'; // оранжевый - умеренное загрязнение
        } else {
            return '#d62728'; // красный - сильное загрязнение
        }
    }
    
    // Функция для определения размера маркера в зависимости от уровня загрязнения
    function getRadius(value) {
        if (value < 0.01) {
            return 5; // маленький размер для слабого загрязнения
        } else if (value >= 0.01 && value < 0.07) {
            return 7; // средний размер для умеренного загрязнения
        } else if (value >= 0.07 && value < 0.1) {
            return 9; // крупный размер для значительного загрязнения
        } else {
            return 12; // очень крупный размер для сильного загрязнения
        }
    }
});