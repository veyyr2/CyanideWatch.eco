class RegistrationsController < Devise::RegistrationsController
    def new
      if params[:promote_to_moderator]
        store_location_for(:user, become_moderator_path)
      end
      super
    end
  
    def after_sign_up_path_for(resource)
      if session[:user_return_to] == become_moderator_path
        moderators_path
      else
        super
      end
    end
  
    private
  
    def become_moderator_path
      moderators_path # или ваш путь для создания модератора
    end
  end