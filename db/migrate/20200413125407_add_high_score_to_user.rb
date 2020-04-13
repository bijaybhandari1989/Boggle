class AddHighScoreToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :high_score, :number
  end
end
