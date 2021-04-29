from django.contrib import admin

from blog.models import CategoriesPosts


class CategoriesPostsInline(admin.TabularInline):
    """カテゴリー - 投稿 リレーションシップ管理

    Parameters
    ----------
    admin : admin
        admin インターフェース
    """

    model = CategoriesPosts
    # 初期表示されるフォームの数（デフォルトは３つ）
    extra = 1
    # 表示名
    verbose_name = 'カテゴリー'
    verbose_name_plural = 'カテゴリー'
