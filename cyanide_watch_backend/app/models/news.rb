class News < ApplicationRecord
    # Обязательные поля
    validates :title, presence: true, length: { minimum: 5 }
    validates :description, presence: true
    validates :external_link, presence: true
  
    # Валидация URL (требует гема 'validate_url')
    validates :external_link, url: true
    validates :image_url, url: true, allow_blank: true  # Необязательное поле

    # Разрешенные атрибуты для поиска
    def self.ransackable_attributes(auth_object = nil)
        ["title", "description", "external_link", "image_url", "created_at", "updated_at"]
    end

    # Отключаем поиск по ассоциациям (если они есть)
    def self.ransackable_associations(auth_object = nil)
        []
    end
  end