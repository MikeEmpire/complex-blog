class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.integer :category
      t.date :time_created
      t.integer :category
      t.timestamps
    end
  end
end
