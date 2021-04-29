from django.contrib import admin


class CategoryAdmin(admin.ModelAdmin):
    """カテゴリー管理

    Parameters
    ----------
    admin : admin
        admin インターフェース
    """

    # 一覧画面の表示カラム
    list_display = [
        'name',
        'mode',
        'parent',
        'sort',
        'is_published',
        'lang',
        'created_at',
        'updated_at']
    # 一覧画面のフィルターに表示するカラム
    list_filter = [
        'lang',
        'is_published']
    # 詳細画面の表示情報
    fieldsets = [
        (None, {
            'fields': [
                'name',
                'lang',
                'author',
                'sort',
                'alias',
                'is_published'],
        }),
        ('詳細設定', {
            'classes': ['collapse'],
            'fields': [
                'mode',
                'parent'],
        }),
        ('SEO', {
            'classes': ['collapse'],
            'fields': [
                'description',
                'keywords'],
        }),
    ]
