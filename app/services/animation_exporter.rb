class AnimationExporter
  require 'fileutils'

  def initialize(animation, fps = 8)
    @animation = animation
    @fps = fps
    @tmp_dir = "#{Rails.root}/tmp/animation_#{@animation.id}"
    FileUtils.rm_rf(@tmp_dir) if Dir.exist?(@tmp_dir)
    Dir.mkdir @tmp_dir
  end

  def combine_with_background(index)
    frame  = MiniMagick::Image.new(@tmp_dir + "/temp_#{index}.png")

    result = @background_img.composite(frame) do |c|
      c.background 'White'
    end
    result.write @tmp_dir + "/frame_#{index.to_s.rjust(3, "0")}.png"
  end

  def set_background
    File.open(@tmp_dir + "/background.png", "wb") do |file|
      file.write(@animation.background.content.download)
    end
    MiniMagick::Tool::Convert.new do |convert|
      convert << @tmp_dir + "/background.png"
      convert.background 'White'
      convert.flatten
      convert << @tmp_dir + "/background_white.png"
    end
    @background_img = MiniMagick::Image.new(@tmp_dir + "/background_white.png")

  end

  def create_image_sequence
    set_background
    @animation.frames.order(:order).each_with_index do |frame, i|
      filepath = "/temp_#{i}.png"
      File.open(@tmp_dir + filepath, 'wb') do |file|
        file.write(frame.content.download)
      end
      combine_with_background(i)
    end
  end

  def create_mp4
    @output_filename = @tmp_dir + "/#{@animation.title.gsub(' ', '_')}.mp4"
    cmd = "ffmpeg -framerate 8 -i #{@tmp_dir}/frame_%03d.png -c:v libx264 -vf format=yuv420p #{@output_filename}"
    system cmd
    @output_filename
  end

  def run
    create_image_sequence
    create_mp4
  end
end
