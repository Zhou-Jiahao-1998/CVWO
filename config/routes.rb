Rails.application.routes.draw do
  get 'welcome/index'
  get 'home/index'
  get 'home/about'
  get 'home/haha'
  resources :items
  root 'home#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
