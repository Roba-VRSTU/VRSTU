from django.contrib import admin

from blog.models import TagsPosts


class TagsPostsInline(admin.TabularInline):
    """カテゴリー - 投稿 リレーションシップ管理

    Parameters
    ----------
    admin : admin
        admin インターフェース
    """

    model = TagsPosts
    # 初期表示されるフォームの数（デフォルトは３つ）
    extra = 1
    # 表示名
    verbose_name = 'タグ'
    verbose_name_plural = 'タグ'
