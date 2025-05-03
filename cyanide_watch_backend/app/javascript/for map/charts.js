// charts.js
let pollutionLevelsChart = null;
let topPollutedChart = null;
let currentData = [];

document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки данных карты
    document.addEventListener('mapDataLoaded', function(e) {
        currentData = e.detail;
        renderCharts(currentData);
    });

    // Обработчик изменения фильтра
    document.getElementById('year-filter').addEventListener('change', function() {
        updateCharts();
    });
});

function updateCharts() {
    const selectedYear = document.getElementById('year-filter').value;
    let filteredData = currentData;

    if (selectedYear !== 'all') {
        filteredData = currentData.filter(spot => {
            const spotYear = new Date(spot.date).getFullYear().toString();
            return spotYear === selectedYear;
        });
    }

    renderCharts(filteredData);
}

function renderCharts(data) {
    renderPollutionLevelsChart(data);
    renderTopPollutedChart(data);
}

function renderPollutionLevelsChart(data) {
    const ctx = document.getElementById('pollutionLevelsChart');
    
    // Группируем данные по уровням загрязнения
    const levels = {
        low: data.filter(spot => spot.measurement_value < 0.01).length,
        mediumLow: data.filter(spot => spot.measurement_value >= 0.01 && spot.measurement_value < 0.07).length,
        mediumHigh: data.filter(spot => spot.measurement_value >= 0.07 && spot.measurement_value < 0.1).length,
        high: data.filter(spot => spot.measurement_value >= 0.1).length
    };

    // Если график уже существует, обновляем его данные
    if (pollutionLevelsChart) {
        pollutionLevelsChart.data.datasets[0].data = [
            levels.low, 
            levels.mediumLow, 
            levels.mediumHigh, 
            levels.high
        ];
        pollutionLevelsChart.update();
    } else {
        // Создаем новый график
        pollutionLevelsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Незначительное', 'Слабое', 'Среднее', 'Сильное'],
                datasets: [{
                    label: 'Количество точек',
                    data: [levels.low, levels.mediumLow, levels.mediumHigh, levels.high],
                    backgroundColor: [
                        '#1f77b4', '#ffcc00', '#ff7f0e', '#d62728'
                    ],
                    borderWidth: 1
                }]
            },
            options: getCommonChartOptions('Уровень загрязнения', 'Количество точек')
        });
    }
}

function renderTopPollutedChart(data) {
    const ctx = document.getElementById('topPollutedChart');
    
    // Сортируем и берем топ-10
    const topSpots = [...data]
        .sort((a, b) => b.measurement_value - a.measurement_value)
        .slice(0, 10);

    // Если график уже существует, обновляем его данные
    if (topPollutedChart) {
        topPollutedChart.data.labels = topSpots.map(spot => spot.location);
        topPollutedChart.data.datasets[0].data = topSpots.map(spot => spot.measurement_value);
        topPollutedChart.update();
    } else {
        // Создаем новый график
        topPollutedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: topSpots.map(spot => spot.location),
                datasets: [{
                    label: 'Уровень загрязнения (мг/л)',
                    data: topSpots.map(spot => spot.measurement_value),
                    backgroundColor: '#d62728',
                    borderWidth: 1
                }]
            },
            options: {
                ...getCommonChartOptions('Уровень загрязнения (мг/л)', 'Местоположение'),
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function getCommonChartOptions(xTitle, yTitle) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.dataset.label}: ${context.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: xTitle
                }
            },
            y: {
                title: {
                    display: true,
                    text: yTitle
                }
            }
        }
    };
}