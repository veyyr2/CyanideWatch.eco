# app/admin/request_moderators.rb
ActiveAdmin.register RequestModerator do
  # может смотреть только админ
  menu if: proc { current_admin_user.admin? }

  # Разрешенные параметры для создания/редактирования
  # Эту строку нужно раскомментировать!
  permit_params :first_name, :last_name, :email, :phone_number, :description

  # === Настройка отображения полей в таблице (индексная страница) ===
  index do
    selectable_column # Позволяет выбирать строки для массовых действий
    id_column         # Отображает ID записи
    column :first_name
    column :last_name
    column :email
    column :phone_number
    column :description do |request|
      # Обрезаем длинное описание для лучшего отображения
      truncate(request.description, length: 100)
    end
    column :created_at # Полезно видеть, когда запрос был создан
    actions           # Добавляет кнопки "View", "Edit", "Delete"
  end

  # === Настройка полей для фильтрации ===
  filter :first_name
  filter :last_name
  filter :email
  filter :phone_number
  filter :created_at
  # filter :description # Можно добавить, но для текста часто не очень эффективно

  # === Настройка формы для создания/редактирования ===
  form do |f|
    f.inputs 'Детали запроса' do
      f.input :first_name
      f.input :last_name
      f.input :email
      f.input :phone_number
      f.input :description
    end
    f.actions # Добавляет кнопки "Submit" и "Cancel"
  end

  # === Настройка страницы просмотра (Show page) ===
  show do
    attributes_table do
      row :first_name
      row :last_name
      row :email
      row :phone_number
      row :description
      row :created_at
      row :updated_at
    end
  end

  # Методы ransackable_attributes и ransackable_associations
  # ДОЛЖНЫ НАХОДИТЬСЯ В ФАЙЛЕ МОДЕЛИ: app/models/request_moderator.rb
  # ИХ НЕ ДОЛЖНО БЫТЬ ЗДЕСЬ!
end
