class CreateAnimations < ActiveRecord::Migration[5.2]
  def change
    create_table :animations do |t|
      t.string :title
      t.string :format
      t.references :user

      t.timestamps
    end
  end
end
