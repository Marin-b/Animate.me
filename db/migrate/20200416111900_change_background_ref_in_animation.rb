class ChangeBackgroundRefInAnimation < ActiveRecord::Migration[5.2]
  def change
    add_column :animations, :background_id, :integer
  end
end
