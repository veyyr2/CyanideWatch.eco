# app/models/request_moderator.rb
class RequestModerator < ApplicationRecord
    # Валидации для обязательных полей
    validates :first_name, presence: { message: "Имя не может быть пустым." }
    validates :last_name, presence: { message: "Фамилия не может быть пустой." }
    validates :email, presence: { message: "Email не может быть пустым." }, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email неверный формат" }
    validates :description, presence: { message: "Описание про мотивацию не может быть пустым." }

    # Дополнительные валидации (по желанию)
    validates :phone_number, format: { with: /\A\+?[0-9\s\-\(\)]+\z/, message: "У номера телефона неверный формат", allow_blank: true }

    # Ransackable attributes for searching and filtering in Active Admin
    def self.ransackable_attributes(auth_object = nil)
        # Включите только те атрибуты, по которым вы хотите разрешить поиск/фильтрацию.
        # Этот список основан на фильтрах, которые вы определили в Active Admin.
        %w[first_name last_name email phone_number description created_at updated_at id]
    end

    # Ransackable associations for searching and filtering (если у вас есть ассоциации)
    def self.ransackable_associations(auth_object = nil)
        []
    end
end