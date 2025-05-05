document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/news')
      .then(response => response.json())
      .then(news => {
        const container = document.getElementById('news-container');
        news.forEach(item => {
          container.innerHTML += `
            <div class="news-card">
              <img src="${item.image_url}" alt="${item.title}">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <a href="${item.external_link}" target="_blank">Читать далее</a>
            </div>
          `;
        });
      });
  });