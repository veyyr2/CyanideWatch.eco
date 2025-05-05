// В файле js/map.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация карты
    const map = L.map('world-map').setView([20, 0], 2);
    
    // Добавление базового слоя карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Глобальная переменная для хранения всех маркеров
    let allMarkers = [];
    
    // Загрузка данных о загрязнениях
    fetch('/api/spots')
        .then(response => response.json())
        .then(data => {
            // Сохраняем данные для графиков
            window.allSpotsData = data;
            
            // Создаем событие о загрузке данных
            const event = new CustomEvent('mapDataLoaded', { detail: data });
            document.dispatchEvent(event);
            
            // Создаем маркеры для всех данных
            createMarkers(data);
            
            // Добавляем обработчик изменения фильтра
            document.getElementById('year-filter').addEventListener('change', function() {
                filterMarkersByYear(this.value);
            });
        });
    
    // Функция для создания маркеров
    function createMarkers(data) {
        // Очищаем предыдущие маркеры
        allMarkers.forEach(marker => map.removeLayer(marker));
        allMarkers = [];
        
        data.forEach(spot => {
            // Создание маркеров для каждого места загрязнения
            const marker = L.circleMarker([spot.lat, spot.lng], {
                radius: getRadius(spot.measurement_value),
                fillColor: getColor(spot.measurement_value),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
            
            // Добавление всплывающей информации
            const newsLink = spot.news_link || null;
            marker.bindPopup(`
                <h3>${spot.location}</h3>
                <p><strong>Тип загрязнения:</strong> ${
                    spot.measurement_type === 'water' ? 'Вода' :
                    spot.measurement_type === 'soil' ? 'Почва' :
                    spot.measurement_type === 'air' ? 'Воздух' :
                    'другое'
                  }</p>
                <p><strong>Уровень загрязнения:</strong> ${spot.measurement_value} мг/л</p>
                <p><strong>Дата:</strong> ${spot.date}</p>
                <p>${spot.description}</p>
                ${newsLink ? `<a href="${newsLink}" target="_blank" rel="noopener noreferrer">Читать новость</a>` : ''}
            `);
            
            // Сохраняем маркер и его данные
            marker.spotData = spot;
            allMarkers.push(marker);
        });
        
        // Показываем все маркеры по умолчанию
        filterMarkersByYear('all');
    }
    
    // Функция для фильтрации маркеров по году
    function filterMarkersByYear(year) {
        allMarkers.forEach(marker => {
            // Удаляем маркер с карты
            map.removeLayer(marker);
            
            // Если выбран "Все годы" или год маркера совпадает с выбранным
            const spotYear = new Date(marker.spotData.date).getFullYear().toString();
            if (year === 'all' || spotYear === year) {
                map.addLayer(marker);
            }
        });
    }
    
    // Функция для определения цвета маркера
    function getColor(value) {
        if (value < 0.01) {
            return '#1f77b4'; // голубой - незначительное загрязнение
        } else if (value >= 0.01 && value < 0.07) {
            return '#ffcc00'; // желтый - слабое загрязнение
        } else if (value >= 0.07 && value < 0.1) {
            return '#ff7f0e'; // оранжевый - среднее загрязнение
        } else {
            return '#d62728'; // красный - сильное загрязнение
        }
    }
    
    // Функция для определения размера маркера
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