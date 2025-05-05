# app/controllers/admin_users/registrations_controller.rb
class AdminUsers::RegistrationsController < Devise::RegistrationsController
    before_action :configure_sign_up_params, only: [:create]
  
    protected
  
    def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
      params[:admin_user][:role] = 'moderator' if params[:role] == 'moderator'
    end
  end