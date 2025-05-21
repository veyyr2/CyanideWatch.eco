# app/admin/authorization_adapter.rb
# Нужен для того, чтобы модераторы не могли заходить в другие модели.

class CustomAuthorizationAdapter < ActiveAdmin::AuthorizationAdapter
  # Этот метод определяет, имеет ли текущий пользователь разрешение на выполнение
  # определенного действия над определенным объектом.
  #
  # Аргументы:
  #   action: Символ, представляющий действие (например, :read, :create, :update, :destroy).
  #   subject: Объект, к которому применяется действие (например, экземпляр модели Spot,
  #            или класс модели Spot, или ActiveAdmin::Page).
  def authorized?(action, subject = nil)
    # user здесь - это current_admin_user, доступный в Active Admin
    # Предполагается, что у вашей модели AdminUser есть методы `admin?` и `moderator?`
    # которые возвращают true/false в зависимости от роли пользователя.

    case subject
    when ActiveAdmin::Page # Разрешения для страниц Active Admin (например, дашборд)
      true # Всегда разрешать доступ к страницам Active Admin (например, дашборду)
    when Spot # Разрешения для вашей модели Spot
      if user.admin?
        true # Администраторы могут делать что угодно с Spot
      elsif user.moderator?
        false # Модераторы НЕ МОГУТ делать ничего со Spot
      else
        false # Все остальные роли не имеют доступа к Spot
      end
    when News # Разрешения для вашей модели News
      if user.admin?
        true # Администраторы могут делать что угодно с News
      elsif user.moderator?
        # ИЗМЕНЕНО: Модераторы теперь могут просматривать, создавать и удалять новости
        true
      else
        false # Все остальные роли не имеют доступа к News
      end
    when Class # Разрешения для классов ресурсов (например, ActiveAdmin.register Post)
      if subject == Spot
        # Только администраторы могут видеть ресурс Spot в меню и списках
        user.admin?
      elsif subject == News
        # Только администраторы и модераторы могут видеть ресурс News в меню и списках
        user.admin? || user.moderator?
      elsif subject == AdminUser
        # Только администраторы могут видеть и управлять AdminUser
        user.admin?
      else
        # По умолчанию запрещать доступ к другим ресурсам, если не указано иное
        false
      end
    else
      # По умолчанию запрещать доступ, если не определено явно
      false
    end
  end

  # Этот метод Active Admin ожидает для обработки отказа в достухе.
  # Он будет вызван, когда authorized? вернет false.
  #
  # Аргументы:
  #   exception: Объект исключения, который может быть передан (например, CanCan::AccessDenied).
  #              В нашем случае, мы просто обрабатываем общий отказ.
  def access_denied(exception)
    # Вывести сообщение для пользователя
    controller.flash[:error] = "У вас нет прав для выполнения этого действия."
    # Перенаправить пользователя на дашборд Active Admin
    controller.redirect_to controller.admin_dashboard_path
  end

  # Этот метод позволяет фильтровать коллекции записей на основе роли пользователя.
  # Например, модератор может видеть только "свои" Spot.
  # Если вы не хотите фильтровать записи таким образом, этот метод можно не использовать
  # или оставить его возвращающим collection без изменений.
  #
  # def scope_collection(collection, action = nil)
  #   if collection.model == Spot && user.moderator?
  #     # Пример: модератор видит только те Spot, которые он создал
  #     # Предполагается, что у Spot есть поле `created_by_admin_user_id`
  #     collection.where(created_by_admin_user_id: user.id)
  #   else
  #     collection # Возвращаем коллекцию без изменений для других случаев
  #   end
  # end
end
