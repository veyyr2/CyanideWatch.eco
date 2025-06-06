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

    # --- ДОБАВЛЕНЫ ОТЛАДОЧНЫЕ СООБЩЕНИЯ ---
    puts "--- DEBUG AUTHORIZATION ---"
    puts "User: #{user.email} (Admin: #{user.admin?}, Moderator: #{user.moderator?})"
    puts "Action: #{action}, Subject: #{subject.inspect} (Class: #{subject.class})" # Добавлено отображение класса subject
    # -----------------------------------

    result = case subject
    when ActiveAdmin::Page # Разрешения для страниц Active Admin (например, дашборд)
      puts "  Matched: ActiveAdmin::Page"
      true
    when ->(s) { s.is_a?(Spot) } # Используем is_a? для более надежной проверки экземпляра
      puts "  Matched: Spot instance"
      if user.admin?
        true # Администраторы могут делать что угодно с Spot
      elsif user.moderator?
        false # Модераторы НЕ МОГУТ делать ничего со Spot
      else
        false # Все остальные роли не имеют доступа к Spot
      end
    when ->(s) { s.is_a?(News) } # Используем is_a? для более надежной проверки экземпляра
      puts "  Matched: News instance"
      if user.admin?
        true # Администраторы могут делать что угодно с News
      elsif user.moderator?
        true # Модераторы могут делать все с News
      else
        false # Все остальные роли не имеют доступа к News
      end
    when ->(s) { s.is_a?(AdminUser) } # Используем is_a? для AdminUser
      puts "  Matched: AdminUser instance"
      if user.admin?
        true # Администраторы могут делать что угодно с ЛЮБЫМ AdminUser (включая нового)
      elsif user.moderator?
        # Модераторы могут просматривать свой собственный профиль, но не других
        action == :read && subject == user
      else
        false
      end
    when ->(s) { s.is_a?(RequestModerator) } # <--- НОВОЕ: Разрешения для экземпляров RequestModerator
      puts "  Matched: RequestModerator instance"
      if user.admin?
        true # Администраторы могут делать что угодно с RequestModerator
      else
        false # Другие роли не имеют доступа к экземплярам RequestModerator
      end
    when Class # Разрешения для классов ресурсов (например, ActiveAdmin.register Post)
      puts "  Matched: Class"
      if subject == Spot
        puts "    Sub-matched: Spot Class"
        user.admin? # Только администраторы могут видеть ресурс Spot в меню и списках
      elsif subject == News
        puts "    Sub-matched: News Class"
        user.admin? || user.moderator? # Только администраторы и модераторы могут видеть ресурс News в меню и списках
      elsif subject == AdminUser
        puts "    Sub-matched: AdminUser Class"
        user.admin? # Только администраторы могут видеть и управлять AdminUser
      elsif subject == RequestModerator # <--- НОВОЕ: Разрешения для класса RequestModerator
        puts "    Sub-matched: RequestModerator Class"
        user.admin? # Только администраторы могут видеть ресурс RequestModerator в меню и списках
      else
        puts "    Sub-matched: Other Class"
        false # По умолчанию запрещать доступ к другим ресурсам, если не указано иное
      end
    else
      puts "  Matched: Fallback (else)"
      false # По умолчанию запрещать доступ, если не определено явно
    end

    # --- ДОБАВЛЕНО ОТЛАДОЧНОЕ СООБЩЕНИЕ ---
    puts "Result: #{result}"
    puts "---------------------------"
    # -----------------------------------
    result
  end

  # Этот метод Active Admin ожидает для обработки отказа в доступе.
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
