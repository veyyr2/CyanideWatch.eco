ActiveAdmin.register News do
  permit_params :title, :description, :image_url, :external_link

  # Убираем все ограничения доступа (временно)
  controller do
    def scoped_collection
      super # Полный доступ без ограничений
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