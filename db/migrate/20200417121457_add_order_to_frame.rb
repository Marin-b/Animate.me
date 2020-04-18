class AddOrderToFrame < ActiveRecord::Migration[5.2]
  def change
    add_column :frames, :order, :integer
  end
end
