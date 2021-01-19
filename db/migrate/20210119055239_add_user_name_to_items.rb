class AddUserNameToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :user_name, :string
    add_index :items, :user_name
  end
end
