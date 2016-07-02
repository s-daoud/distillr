Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :show] do
      resources :friends, only: :index
    end
    resources :friends, only: [:create, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :drinks, only: [:index, :create, :show]
    resources :checkins, only: [:index, :create, :destroy] do
      resources :comments, only: [:create, :destroy]
      resources :likes, only: [:create, :destroy]
    end
  end
end
