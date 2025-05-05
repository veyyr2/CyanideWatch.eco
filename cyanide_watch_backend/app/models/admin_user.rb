class AdminUser < ApplicationRecord
  devise :database_authenticatable, 
         :registerable,
         :recoverable, 
         :rememberable, 
         :validatable

 # Enum для ролей
  enum :role, { 
    admin: 'admin', 
    moderator: 'moderator', 
    guest: 'guest' 
  }, default: :guest

  # Разрешенные атрибуты для поиска (Ransack)
  def self.ransackable_attributes(auth_object = nil)
    ["email", "role", "created_at", "updated_at"]  # Безопасные поля (исключены пароли и токены)
  end

  # Отключаем поиск по ассоциациям
  def self.ransackable_associations(auth_object = nil)
    []
  end

  # Метод для проверки прав
  def can_access?(resource)
    admin? || (moderator? && resource == 'News')
  end
end