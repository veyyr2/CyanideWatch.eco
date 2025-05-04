// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
document.addEventListener('DOMContentLoaded', function() {
    const becomeModeratorBtn = document.getElementById('becomeModerator');
    if (becomeModeratorBtn) {
      becomeModeratorBtn.addEventListener('click', function(e) {
        e.preventDefault();
        fetch('/moderators', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
          },
          credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
          if (data.redirect_url) {
            window.location.href = data.redirect_url;
          }
        });
      });
    }
  });

  async function loadNews() {
    try {
      const response = await fetch('/news.json');
      
      if (!response.ok) {
        throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
      }
      
      const news = await response.json();
      
      const container = document.getElementById('news-container');
      if (container) {
        container.innerHTML = news.map(item => `
          <div class="news-item">
            <h3>${item.title}</h3>
            <img src="${item.image_url}" alt="${item.title}" loading="lazy">
            <p>${item.description}</p>
            <a href="${item.news_link}" target="_blank" rel="noopener">Читать далее</a>
          </div>
        `).join('');
      }
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      const container = document.getElementById('news-container');
      if (container) {
        container.innerHTML = `
          <div class="error-message">
            Не удалось загрузить новости. Пожалуйста, попробуйте позже.
            <button onclick="loadNews()">Повторить попытку</button>
          </div>
        `;
      }
    }
  }
  
  // Загружаем новости при загрузке страницы и каждые 5 минут
  document.addEventListener('DOMContentLoaded', loadNews);
  setInterval(loadNews, 300000);


  document.addEventListener('DOMContentLoaded', function() {
    const becomeModeratorBtn = document.getElementById('becomeModerator');
    
    if (becomeModeratorBtn) {
      becomeModeratorBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        try {
          const response = await fetch('/moderators', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            credentials: 'same-origin'
          });
  
          const result = await response.json();
          
          if (response.ok) {
            alert(result.message);
            window.location.reload();
          } else {
            alert(result.message || 'Произошла ошибка');
          }
        } catch (error) {
          console.error('Ошибка:', error);
          alert('Ошибка сети');
        }
      });
    }
  });