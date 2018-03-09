class ChangeCategoryToStringInPost < ActiveRecord::Migration[5.1]
  def change
    change_column :posts, :category, :string
  end
end
