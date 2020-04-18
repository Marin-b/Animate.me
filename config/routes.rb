Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  resources :animations do
    member do
      get :export
    end
    resources :frames
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
