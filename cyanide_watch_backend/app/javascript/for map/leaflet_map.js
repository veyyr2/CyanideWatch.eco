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
                    radius: getRadius(spot.severity),
                    fillColor: getColor(spot.severity),
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
                    <p><strong>Уровень загрязнения:</strong> ${spot.severity}</p>
                    <p><strong>Дата:</strong> ${spot.date}</p>
                    <p>${spot.description}</p>
                    ${newsLink ? `<a href="${newsLink}" target="_blank" rel="noopener noreferrer">Читать новость</a>` : ''}
                `);
            });
        });
    
    // Функция для определения цвета маркера в зависимости от уровня загрязнения
    function getColor(severity) {
        return severity === 'high' ? '#d62728' :
               severity === 'medium' ? '#ff7f0e' : '#2ca02c';
    }
    
    // Функция для определения размера маркера в зависимости от уровня загрязнения
    function getRadius(severity) {
        return severity === 'high' ? 10 :
               severity === 'medium' ? 7 : 5;
    }
});