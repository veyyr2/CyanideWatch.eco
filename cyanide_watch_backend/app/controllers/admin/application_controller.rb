# app/controllers/admin/application_controller.rb

class Admin::ApplicationController < ActiveAdmin::BaseController
  # Если вы используете Devise, то аутентификация уже настроена
  # before_action :authenticate_admin_user!

  # Явно указываем контроллеру, что он должен перехватывать
  # исключение ActiveAdmin::AccessDenied и вызывать метод :access_denied
  rescue_from ActiveAdmin::AccessDenied, with: :access_denied

  protected # Метод должен быть protected, чтобы быть доступным для rescue_from

  # Этот метод будет вызван, когда ActiveAdmin::AccessDenied будет вызвано.
  def access_denied(exception)
    # Вывести сообщение для пользователя
    flash[:error] = "У вас нет прав для выполнения этого действия."
    # Перенаправить пользователя на дашборд Active Admin
    redirect_to admin_dashboard_path # <--- ИЗМЕНЕНО: Перенаправляем на дашборд
  end
end
