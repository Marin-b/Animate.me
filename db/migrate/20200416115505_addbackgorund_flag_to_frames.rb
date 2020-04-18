class AddbackgorundFlagToFrames < ActiveRecord::Migration[5.2]
  def change
    add_column :frames, :background, :boolean
    remove_column :animations, :background_id
  end
end
