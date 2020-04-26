class WordsController < ApplicationController
  # POST /validate
  # return if the word is valid or not
  def validate
    if(word_params[:word].empty?)
      response = { valid: false, message: Message.empty_word, word: "", score: 0 }
      json_response(response, :ok)
      return
    end    
    word = Word.find_by("LOWER(name)= ?", word_params[:word].downcase)
    if(word.nil?)
      response = { valid: false, message: Message.invalid_word, word: word_params[:word], score: 0 }
      json_response(response, :ok)
    else
      score = 1;
      wordLength = word_params[:word].length
      case wordLength
        when 0..2
          score = 0
        when 3..4
          score = 1
        when 5
          score = 2
        when 6
          score = 3
        when 7
          score = 4
        else
          score = 11
      end
      response = { valid: true, message: Message.valid_word, word: word_params[:word], score: score }
      json_response(response, :ok)
    end   
  end

  def generate
    # Taken from New Boggle Dice (https://en.wikipedia.org/wiki/Talk%3aBoggle)
    dices = ["AAEEGN", "ELRTTY", "AOOTTW", "ABBJOO", "EHRTVW", "CIMOTU",
      "DISTTY", "EIOSST", "DELRVY", "ACHOPS", "HIMNQU", "EEINSU", "EEGHNW",
      "AFFKPS", "HLNNRZ", "DEILRX"];

    dices = dices.shuffle!
    randomWords = []

    dices.each do |dice|
      randomWords.push(dice[rand(dice.length)])
    end
    json_response(randomWords, :ok)
  end

  private

  def word_params
    params.permit(:word)
  end
end