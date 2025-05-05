ActiveAdmin.register News do
  # Разрешенные параметры
  permit_params :image_url, :title, :description, :external_link

  # Настройки для Ransack (решает ошибку поиска)
  config.sort_order = 'created_at_desc'
  
  # Белый список атрибутов для поиска
  controller do
    def apply_filtering(chain)
      @search = chain.ransack(params[:q] || {})
      @search.result(distinct: true)
    end
  end

  # Ограничение доступа
  controller do
    def scoped_collection
      if current_admin_user.moderator? || current_admin_user.admin?
        super
      else
        super.none
      end
    end
  end

  # Показываем только нужные действия для модераторов
  actions :all, except: (proc { !current_admin_user.admin? } if ActiveAdmin.application.respond_to?(:namespace) &&
    ActiveAdmin.application.namespace(:admin).authorization_adapter.name == 'ActiveAdmin::CanCanAdapter')

  # Настройка списка новостей
  index do
    selectable_column
    column :title
    column :description do |news|
      truncate(news.description, length: 50)
    end
    column :external_link do |news|
      link_to 'Ссылка', news.external_link, target: '_blank'
    end
    column :created_at
    actions
  end

  # Настройка формы
  form do |f|
    f.inputs 'Детали новости' do
      f.input :title
      f.input :description
      f.input :external_link
      f.input :image_url
    end
    f.actions
  end

  # Разрешенные атрибуты для Ransack
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "external_link", "id", "image_url", "title", "updated_at"]
  end

  # Фильтры (только для админа)
  filter :title, if: proc { current_admin_user.admin? }
  filter :created_at, if: proc { current_admin_user.admin? }
end