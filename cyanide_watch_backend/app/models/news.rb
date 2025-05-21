class News < ApplicationRecord
  # rails db:create db:migrate db:seed
  # rails tmp:clear
  
    # Базовые валидации
    validates :title, presence: true
    validates :description, presence: true
    validates :external_link, presence: true
  
    # Необязательное поле с простой проверкой URL
    validates :image_url, format: { with: URI::DEFAULT_PARSER.make_regexp }, allow_blank: true
  
    # Разрешенные атрибуты для поиска
    def self.ransackable_attributes(auth_object = nil)
      ["title", "description", "external_link", "image_url", "created_at", "updated_at"]
    end

    # Разрешенные ассоциации (пустой массив, если ассоциаций нет)
    def self.ransackable_associations(auth_object = nil)
      []
    end
  end