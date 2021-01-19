class CreateLogins < ActiveRecord::Migration[6.0]
  def change
    create_table :logins do |t|
      t.string :name
      t.string :password

      t.timestamps
    end
  end
end
