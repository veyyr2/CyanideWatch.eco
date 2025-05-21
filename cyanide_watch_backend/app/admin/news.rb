ActiveAdmin.register News do
  # Новости могут смотреть модераторы и админ
  menu if: proc { current_admin_user.moderator? || current_admin_user.admin? }

  permit_params :title, :description, :image_url, :external_link

  controller do
    before_action :restrict_moderator_access!

    private

    def restrict_moderator_access!
      if current_admin_user.moderator? && !request.path.start_with?('/admin/news')
        redirect_to admin_news_index_path, alert: "У вас нет доступа к этому разделу!"
      end
    end
  end

  index do
    selectable_column
    column :title
    column :description
    column :external_link
    column :created_at
    actions
  end

  form do |f|
    f.inputs 'News Details' do
      f.input :title
      f.input :description
      f.input :external_link
      f.input :image_url
    end
    f.actions
  end
end