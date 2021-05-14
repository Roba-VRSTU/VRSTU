from django.contrib import admin

from blog.admin.category_admin import CategoryAdmin
from blog.admin.tag_admin import TagAdmin
from blog.admin.post_admin import PostAdmin
from blog.models import Category, Tag, Post

__all__ = [CategoryAdmin, TagAdmin, PostAdmin]

admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
