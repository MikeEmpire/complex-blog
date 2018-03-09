class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string : title
      t.text :body
      t.date :time_created

      t.timestamps
    end
  end
end
