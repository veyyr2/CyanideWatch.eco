class Spot < ApplicationRecord
    # Добавьте этот метод, чтобы разрешить Ransack использовать определенные атрибуты
    def self.ransackable_attributes(auth_object = nil)
      # Перечислите здесь все атрибуты вашей модели Spot, по которым вы хотите разрешить поиск/фильтрацию
      # Включите "test" в этот список, чтобы исправить вашу текущую ошибку
      ["created_at", "date", "description", "id", "id_value", "lat", "lng", "location", "measurement_type", "measurement_value", "news_link", "updated_at", "test"]
    end
  
    # Если у вас есть ассоциации (например, belongs_to, has_many)
    # и вы хотите разрешить поиск по ним, вам также нужно определить метод ransackable_associations:
    # def self.ransackable_associations(auth_object = nil)
    #   # Перечислите здесь названия ассоциаций, по которым хотите разрешить поиск/фильтрацию
    #   [] # Например, если нет ассоциаций для поиска
    # end
  
  
    # ... возможно, здесь есть другой код вашей модели (методы, валидации и т.д.) ...
  
  end