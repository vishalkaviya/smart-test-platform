from django.urls import path
from api.views import auth_views, user_views


urlpatterns = [
    path('register/', auth_views.register_user),
    path('complete-profile/', auth_views.complete_profile),
    path('login/', auth_views.login_user),
    path('profile/', user_views.get_user_profile),
]
