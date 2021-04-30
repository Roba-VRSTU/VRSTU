from django.urls import path

from blog import views

urlpatterns = [
    path('categories/', views.get_categories, name='get_categories'),
    path('posts/', views.get_posts, name='get_posts'),
    path('post/<int:post_id>', views.get_post, name='get_post'),
]
