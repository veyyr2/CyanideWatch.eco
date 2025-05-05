document.addEventListener('DOMContentLoaded', function() {
  const newsList = document.getElementById('news-list');
  
  // Функция для загрузки новостей
  function loadNews() {
    fetch('/api/news')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(newsItems => {
        renderNews(newsItems);
      })
      .catch(error => {
        console.error('Error loading news:', error);
        newsList.innerHTML = '<p class="error">Не удалось загрузить новости. Пожалуйста, попробуйте позже.</p>';
      });
  }

  // Функция для отображения новостей
  function renderNews(newsItems) {
    if (newsItems.length === 0) {
      newsList.innerHTML = '<p>Новостей пока нет.</p>';
      return;
    }

    newsList.innerHTML = newsItems.map(news => `
      <div class="news-card">
        ${news.image_url ? `<img src="${news.image_url}" alt="${news.title}" class="img_content_divs news-image">` : ''}
        <div class="news-content">
          <h3 class="news-title">${news.title}</h3>
          <div class="news-description">
            ${news.description}
            
          </div>
          
          <div class="news-link-date-content">
            ${news.external_link ? `<a href="${news.external_link}" target="_blank" class="news-link">Читать далее</a>` : ''}
            <div class="news-date">${new Date(news.created_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Загружаем новости при загрузке страницы
  loadNews();
});