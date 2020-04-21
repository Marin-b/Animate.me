class FramesController < ApplicationController
  before_action :set_animation

  def create
    @frame = Frame.new
    @frame.animation = @animation
    @frame.background = false
    @frame.save
    render json: @frame.to_json
  end

  def update
    @frame = Frame.find(params[:id])
    if params[:frame][:content]
      @frame.content.purge
      @frame.content.attach(decode_base_64(params[:frame][:content]))
    end
    render json: @frame.to_json
  end

  def destroy
    @frame = Frame.find(params[:id])
    @frame.destroy
    render json: @frame.to_json
  end

  private

  def set_animation
    @animation = Animation.find(params[:animation_id])
  end

  def strong_params
    params.require(:frame).permit(:order)
  end

  def decode_base_64(file_text, filename = Time.current.to_i)
    base64_image  = file_text.sub(/^data:.*,/, '')
    decoded_image = Base64.decode64(base64_image)
    image_io      = StringIO.new(decoded_image)

    {
      io: handle_string_io_as_file(image_io, filename),
      filename: filename
    }
  end

  def handle_string_io_as_file(io, filename)
    return io unless io.class == StringIO

    file = Tempfile.new(["temp",".png"], encoding: 'ascii-8bit')
    file.binmode
    file.write io.read
    file.open
  end
end
