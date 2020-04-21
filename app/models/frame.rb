class Frame < ApplicationRecord
  include ActiveStorageSupport::SupportForBase64
  include OpenURI
  has_one_attached :content
  belongs_to :animation

  before_update :purge_content
  before_create :set_order

  def set_order
    self.order = animation.frames.order(:order).last.order + 10 unless self.order
  end

  def purge_content
    content.purge if content.attached?
  end

  def base_64_content
    "data:image/png;base64," + Base64.encode64(content.download) if content.attached?
  end
end
