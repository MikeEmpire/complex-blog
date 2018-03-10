Rails.application.routes.draw do
  resources :posts
  resources :posts do
  	resources :comments
  end
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
