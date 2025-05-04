class ModeratorsController < ApplicationController
  def create
    if user_signed_in?
      if current_user.moderator.blank?
        current_user.create_moderator!
        render json: { status: 'success', message: 'Вы стали модератором!' }
      else
        render json: { status: 'error', message: 'Вы уже модератор!' }, status: :unprocessable_entity
      end
    else
      render json: { 
        status: 'redirect', 
        url: new_user_registration_path(promote_to_moderator: true) 
      }, status: :unauthorized
    end
  end
end