class Message
  def self.not_found(record = 'record')
    "Sorry, #{record} not found."
  end

  def self.invalid_credentials
    'Invalid credentials'
  end

  def self.invalid_token
    'Invalid token'
  end

  def self.missing_token
    'Missing token'
  end

  def self.unauthorized
    'Unauthorized request'
  end

  def self.account_created
    'Account created successfully'
  end

  def self.account_not_created
    'Account could not be created'
  end

  def self.expired_token
    'Sorry, your token has expired. Please login to continue.'
  end

  def self.new_high_score
    'Congrats!! Your New High Score: %s'
  end

  def self.encourage_user
    'Try little harder!! Your High Score: %s'
  end

  def self.score_user
    'Your Score: %s'
  end

  def self.invalid_word
    'Invalid Word'
  end

  def self.valid_word
    'Valid Word'
  end

  def self.empty_word
    'Word is empty'
  end
end