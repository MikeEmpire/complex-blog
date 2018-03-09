Rails.application.routes.draw do
  resources :comments
  resources :posts
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
