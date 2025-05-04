class NewsController < ApplicationController
  # Перед выполнением определенных действий (опционально, но, вероятно, предполагалось)
  # Это должно быть добавлено к конкретным действиям, которые требуют привилегий модератора.
  # Например: before_action :check_moderator, only: [:new, :create]

  def index
    @news = News.all # Получаем все новости из базы данных

    respond_to do |format|
      format.html # Отображает стандартный HTML-шаблон (index.html.erb)
      format.json {
        render json: @news, status: :ok # Отвечает данными в формате JSON
      }
    end
  end

  # Это действие 'json' кажется избыточным, учитывая блок respond_to в index.
  # Если вам нужна только конечная точка JSON для всех новостей, формата JSON в действии `index` достаточно.
  # Если вы предполагали другую конечную точку JSON, возможно, вы захотите переименовать это действие или изменить его логику.
  def json
    @news = News.all
    render json: @news
  end

  def new
    @news = News.new # Инициализирует новый объект News для формы
  end

  def create
    @news = News.new(news_params) # Создает новый объект News с разрешенными параметрами
    if @news.save # Пытается сохранить запись новости в базу данных
      redirect_to news_index_path, notice: 'Новость создана!' # Перенаправляет при успешном сохранении
    else
      render :new # Отображает шаблон new снова при ошибке, показывая ошибки валидации
    end
  end

  private

  # Сильные параметры для разрешения только разрешенных атрибутов при массовом присваивании
  def news_params
    params.require(:news).permit(:title, :description, :image_url, :news_link, :user_id)
  end

  # Метод для проверки, является ли текущий пользователь модератором
  def check_moderator
    unless current_user&.moderator? # Используйте &. для безопасного вызова moderator?, если current_user может быть nil
      redirect_to root_path, alert: "Только модераторы могут создавать новости"
    end
  end

  def list
    @news = News.all
    render 'index' # используем тот же шаблон, что и для index
  end
end