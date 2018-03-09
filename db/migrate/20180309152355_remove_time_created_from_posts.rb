class RemoveTimeCreatedFromPosts < ActiveRecord::Migration[5.1]
  def change
    remove_column :posts, :time_created, :date
  end
end
