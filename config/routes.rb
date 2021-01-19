Rails.application.routes.draw do
  resources :logins
  get 'home/index'
  get 'home/about'
  get 'home/filter'
  root 'home#index'
  namespace :api do
    namespace :v1 do
      resources :items
    end
  end
  namespace :api do
    namespace :v2 do
      resources :logins
    end
  end
  resources :items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
