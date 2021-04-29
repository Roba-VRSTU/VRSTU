from django.contrib import admin

from blog.admin.categories_posts_inline import CategoriesPostsInline


class PostAdmin(admin.ModelAdmin):
    """投稿管理

    Parameters
    ----------
    admin : admin
        admin インターフェース
    """

    # 一覧画面の表示カラム
    list_display = [
        'title',
        'get_all_categories',
        'view_count',
        'good_count',
        'lang',
        'sort',
        'is_published',
        'created_at',
        'updated_at',
        'author']
    # 一覧画面のフィルターに表示するカラム
    list_filter = [
        'lang',
        'is_published',
        'categories']
    # 詳細画面の表示情報
    fieldsets = [
        (None, {
            'fields': [
                'title',
                'content',
                'lang',
                'author',
                'sort',
                'alias',
                'is_published'],
        }),
        ('SEO', {
            'classes': ('collapse',),
            'fields': ['description', 'keywords'],
        }),
    ]
    # 所属カテゴリーの表示
    inlines = (CategoriesPostsInline,)
