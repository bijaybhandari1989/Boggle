class WordsController < ApplicationController
  # POST /validate
  # return if the word is valid or not
  def validate
    if(word_params[:word].empty?)
      response = { valid: false, message: Message.empty_word, word: "", score: 0 }
      json_response(response, :created)
      return
    end
    word = Word.find_by(name: word_params[:word])
    if(word.nil?)
      response = { valid: false, message: Message.invalid_word, word: word_params[:word], score: 0 }
      json_response(response, :created)
    else
      response = { valid: true, message: Message.valid_word, word: word_params[:word], score: word_params[:word].length }
      json_response(response, :created)
    end   
  end

  private

  def word_params
    params.permit(:word)
  end
end