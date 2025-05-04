ActiveAdmin.register News do
    permit_params :title, :description, :image_url, :news_link, :user_id
  
    index do
      selectable_column
      id_column
      column :title
      column :description
      column :image_url
      column :news_link
      column :user
      actions
    end
  
    form do |f|
      f.inputs do
        f.input :user
        f.input :title
        f.input :description
        f.input :image_url
        f.input :news_link
      end
      f.actions
    end
  end