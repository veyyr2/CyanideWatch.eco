# db/migrate/XXXX_add_role_to_admin_users.rb
class AddRoleToAdminUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :admin_users, :role, :string, default: 'guest'
    # Возможные значения: 'admin', 'moderator', 'guest'
  end
end