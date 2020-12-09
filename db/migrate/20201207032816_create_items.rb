class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.date :Date
      t.time :Time
      t.string :Title
      t.string :Details
      t.string :Tag
      t.boolean :Done

      t.timestamps
    end
  end
end
