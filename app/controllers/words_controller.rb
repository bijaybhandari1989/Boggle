class WordsController < ApplicationController
  # POST /validate
  # return if the word is valid or not
  def validate
    if(word_params[:word].empty?)
      response = { valid: false, message: Message.empty_word }
      json_response(response, :created)
      return
    end
    word = Word.find_by(name: word_params[:word])
    if(word.nil?)
      response = { valid: false, message: Message.invalid_word }
      json_response(response, :created)
    else
      response = { valid: true, message: Message.valid_word }
      json_response(response, :created)
    end   
  end

  private

  def word_params
    params.permit(:word)
  end
end