from django.contrib import admin

from blog.admin.category_admin import CategoryAdmin
from blog.admin.post_admin import PostAdmin
from blog.models import Category, Post

__all__ = [CategoryAdmin, PostAdmin]

admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)
