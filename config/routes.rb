Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :scores
  post 'validate', to: 'words#validate'
  get 'generate', to: 'words#generate'
  post 'auth/login', to: 'authentication#authenticate'
  post 'signup', to: 'users#create'
end
