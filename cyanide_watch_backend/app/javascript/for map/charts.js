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

    // Обработчик изменения темы
    document.addEventListener('themeChanged', function() {
        updateChartColors();
    });
});

function updateChartColors() {
    const isDarkTheme = document.body.classList.contains('dark_theme');
    const textColor = isDarkTheme ? '#ffffff' : '#333333';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const bgColor = isDarkTheme ? '#2E2222' : '#ffffff';

    // Обновляем цвета для первого графика
    if (pollutionLevelsChart) {
        pollutionLevelsChart.options.scales.x.ticks.color = textColor;
        pollutionLevelsChart.options.scales.y.ticks.color = textColor;
        pollutionLevelsChart.options.scales.x.grid.color = gridColor;
        pollutionLevelsChart.options.scales.y.grid.color = gridColor;
        // Добавляем обновление цвета заголовка оси X
        if (pollutionLevelsChart.options.scales.x.title) {
            pollutionLevelsChart.options.scales.x.title.color = textColor;
        }
        // Добавляем обновление цвета заголовка оси Y
        if (pollutionLevelsChart.options.scales.y.title) {
            pollutionLevelsChart.options.scales.y.title.color = textColor;
        }
        pollutionLevelsChart.update();
    }

    // Обновляем цвета для второго графика
    if (topPollutedChart) {
        topPollutedChart.options.scales.x.ticks.color = textColor;
        topPollutedChart.options.scales.y.ticks.color = textColor;
        topPollutedChart.options.scales.x.grid.color = gridColor;
        topPollutedChart.options.scales.y.grid.color = gridColor;
         // Добавляем обновление цвета заголовка оси X
        if (topPollutedChart.options.scales.x.title) {
            topPollutedChart.options.scales.x.title.color = textColor;
        }
        // Добавляем обновление цвета заголовка оси Y
        if (topPollutedChart.options.scales.y.title) {
            topPollutedChart.options.scales.y.title.color = textColor;
        }
        topPollutedChart.update();
    }

    // Обновляем фон контейнеров графиков
    document.querySelectorAll('.chart-box').forEach(box => {
        box.style.backgroundColor = bgColor;
    });
}

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
    updateChartColors(); // Обновляем цвета при первой загрузке
}

function renderPollutionLevelsChart(data) {
    const ctx = document.getElementById('pollutionLevelsChart');
    const isDarkTheme = document.body.classList.contains('dark_theme');
    const textColor = isDarkTheme ? '#ffffff' : '#333333';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
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
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: 'Уровень загрязнения',
                            color: textColor
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: 'Количество точек',
                            color: textColor
                        }
                    }
                }
            }
        });
    }
}

function renderTopPollutedChart(data) {
    const ctx = document.getElementById('topPollutedChart');
    const isDarkTheme = document.body.classList.contains('dark_theme');
    const textColor = isDarkTheme ? '#ffffff' : '#333333';
    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
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
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: 'Уровень загрязнения (мг/л)',
                            color: textColor
                        }
                    },
                    y: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: gridColor
                        },
                        title: {
                            display: true,
                            text: 'Местоположение',
                            color: textColor
                        }
                    }
                }
            }
        });
    }
}