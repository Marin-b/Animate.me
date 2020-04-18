class AddAnimationReferenceInFrames < ActiveRecord::Migration[5.2]
  def change
    add_reference :frames, :animation
  end
end
