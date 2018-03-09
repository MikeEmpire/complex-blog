class Post < ApplicationRecord
  has_attached_file :image, style: { large: "600x600>", medium: "300x300>", thumb: "100x100#" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  enum categories: {
    "Music" => 1,
    "Think Pieces" => 2,
    "Style" => 3,
    "Written Works" => 4,
    "Album Reviews" => 5
  }

end
