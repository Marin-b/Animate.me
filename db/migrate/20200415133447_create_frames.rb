class CreateFrames < ActiveRecord::Migration[5.2]
  def change
    create_table :frames do |t|

      t.timestamps
    end
  end
end
