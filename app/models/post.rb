class Post < ApplicationRecord
  has_many :comments
  has_attached_file :image, styles: { large: "600x600>", medium: "300x300#", small: "150x150#", thumb: "100x100#" },
                    default_url: "/images/:style/missing.png",
                    :convert_options => { :all => "-quality 75 -strip" },
                    :storage => :s3,
                    :bucket => "kameron-blog"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  before_post_process :check_file_size

  enum categories: {
    "Music" => 1,
    "Think Pieces" => 2,
    "Style" => 3,
    "Written Works" => 4,
    "Album Reviews" => 5
  }

  def next(post)
    Post.where('id < ?', post.id).last
  end

  def first(post)
    if (post)
      Post.where('id > ?', post.id).first
    else
      Post.all.order("created_at").last
    end
  end

  def check_file_size
    valid?
    errors[:image_file_size].blank?
  end
end
