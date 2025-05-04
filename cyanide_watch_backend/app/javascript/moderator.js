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
          } else if (result.status === 'redirect') {
            window.location.href = result.url; // Перенаправляем на регистрацию
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