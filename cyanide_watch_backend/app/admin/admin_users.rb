ActiveAdmin.register AdminUser do
  # может смотреть только админ
  menu if: proc { current_admin_user.admin? }

  # 1. Разрешенные параметры (добавлена роль)
  permit_params :email, :password, :password_confirmation, :role

  # 2. Настройка Ransack для поиска
  controller do
    def apply_filtering(chain)
      @search = chain.ransack(params[:q] || {})
      @search.result(distinct: true)
    end
  end

  # 3. Отображение списка пользователей
  index do
    selectable_column
    id_column
    column :email
    column :role # Добавлено отображение роли
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  # 4. Фильтры (с ограничением для модераторов)
  filter :email, if: proc { current_admin_user.admin? }
  filter :role, if: proc { current_admin_user.admin? }
  filter :current_sign_in_at, if: proc { current_admin_user.admin? }
  filter :sign_in_count, if: proc { current_admin_user.admin? }
  filter :created_at, if: proc { current_admin_user.admin? }

  # 5. Форма редактирования с защитой
  form do |f|
    f.inputs 'Admin User Details' do
      f.input :email
      if f.object.new_record?
        f.input :password
        f.input :password_confirmation
      end
      # Только админ может менять роли
      f.input :role, as: :select, collection: AdminUser.roles.keys if current_admin_user.admin?
    end
    f.actions
  end

  # 6. Безопасное обновление (без требования пароля)
  controller do
    def update
      if params[:admin_user][:password].blank?
        params[:admin_user].delete(:password)
        params[:admin_user].delete(:password_confirmation)
      end
      super
    end
  end

  # 7. Ограничение действий для модераторов
  actions :all, except: [:destroy] unless proc { current_admin_user.admin? }
end