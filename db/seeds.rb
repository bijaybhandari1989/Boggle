# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

words = []
File.open("data/words.txt","r").each do |line|
    new_word = line.strip
    w = Word.new
    w.name = new_word
    words.push(w)
end

 def import_words(words)
   Word.transaction do
      columns = [:name]
      Word.import columns, words, validate: false
     #import(COLUMNS, words, validate: false, on_duplicate_key_ignore: true)
   end
 end

 import_words(words)

puts "Total words inserted: #{Word.count}"