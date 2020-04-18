class Animation < ApplicationRecord
  belongs_to :user
  has_many :frames, -> { where(background: false) }, class_name: 'Frame', dependent: :destroy
  has_one :background, -> { where(background: true) }, class_name: 'Frame', dependent: :destroy

  after_create :create_background

  def create_background
    build_background
    background.save
  end
end
