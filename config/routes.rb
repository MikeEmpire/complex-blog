Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  resources :posts
  resources :posts do
  	resources :comments
  end
  root to: 'visitors#index'
  devise_for :users
  resources :users
end
