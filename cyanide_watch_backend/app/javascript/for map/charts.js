document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки данных с карты
    document.addEventListener('mapDataLoaded', function(e) {
        const spotsData = e.detail;
        renderCharts(spotsData);
    });
    
    // Если данные уже загружены (например, при обновлении фильтра)
    if (window.allSpotsData) {
        renderCharts(window.allSpotsData);
    }
});

function renderCharts(spotsData) {
    // 1. График распределения по уровням загрязнения
    renderPollutionLevelsChart(spotsData);
    
    // 2. График топ самых загрязненных мест
    renderTopPollutedChart(spotsData);
}

function renderPollutionLevelsChart(spotsData) {
    // Группируем точки по уровням загрязнения
    const levels = {
        low: spotsData.filter(spot => spot.measurement_value < 0.01).length,
        mediumLow: spotsData.filter(spot => spot.measurement_value >= 0.01 && spot.measurement_value < 0.07).length,
        mediumHigh: spotsData.filter(spot => spot.measurement_value >= 0.07 && spot.measurement_value < 0.1).length,
        high: spotsData.filter(spot => spot.measurement_value >= 0.1).length
    };
    
    const ctx = document.getElementById('pollutionLevelsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Незначительное', 'Слабое', 'Среднее', 'Сильное'],
            datasets: [{
                label: 'Количество точек',
                data: [levels.low, levels.mediumLow, levels.mediumHigh, levels.high],
                backgroundColor: [
                    '#1f77b4', // голубой
                    '#ffcc00', // желтый
                    '#ff7f0e', // оранжевый
                    '#d62728'  // красный
                ],
                borderColor: [
                    '#1a68a0',
                    '#e6b800',
                    '#e67000',
                    '#b31e1e'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Количество точек'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Уровень загрязнения'
                    }
                }
            }
        }
    });
}

function renderTopPollutedChart(spotsData) {
    // Сортируем места по уровню загрязнения (по убыванию)
    const sortedSpots = [...spotsData].sort((a, b) => b.measurement_value - a.measurement_value);
    
    // Берем топ-10 (или меньше, если данных мало)
    const topSpots = sortedSpots.slice(0, Math.min(10, sortedSpots.length));
    
    const ctx = document.getElementById('topPollutedChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topSpots.map(spot => spot.location),
            datasets: [{
                label: 'Уровень загрязнения (мг/л)',
                data: topSpots.map(spot => spot.measurement_value),
                backgroundColor: '#d62728', // красный для загрязнения
                borderColor: '#b31e1e',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Горизонтальные столбцы
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Уровень загрязнения (мг/л)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Местоположение'
                    }
                }
            }
        }
    });
}