class AnimationsController < ApplicationController
  before_action :authenticate_user!

  layout 'draw', only: :show
  def show
    @animation = Animation.find(params[:id])
    @frames = @animation.frames.order(:order).map { |f| { id: f.id, content: f.base_64_content, order: f.order } }
  end

  def index
    @animations = current_user.animations
  end

  def new
    @animation = Animation.new
  end

  def create
    @animation = Animation.new(strong_params)
    @animation.user = current_user
    if @animation.save
      redirect_to animation_path(@animation)
    else
      render :new
    end
  end

  def export
    @animation = Animation.find(params[:id])
    animation_exporter = AnimationExporter.new(@animation, 2)
    send_file animation_exporter.run
  end

  private

  def strong_params
    params.require(:animation).permit(:format, :title, :background)
  end
end
