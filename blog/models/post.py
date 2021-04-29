from django.db import models

from blog.constants import DB_TBL
from blog.models.status_set import StatusSet
from blog.models.seo_set import SEOSet
from blog.models.category import Category


class Post(StatusSet, SEOSet):
    """投稿モデル

    Parameters
    ----------
    StatusSet : StatusSet
        ステータスセットモデル
    SEOSet : SEOSet
        SEO セットモデル

    Returns
    -------
    Post
        投稿オブジェクト
    """

    # タイトル
    title = models.CharField(
        'タイトル',
        max_length=255)
    # カテゴリー
    categories = models.ManyToManyField(
        Category, through='CategoriesPosts')
    # 概要
    overview = models.TextField(
        '概要',
        null=True, blank=True)
    # 本文
    content = models.TextField(
        '本文')
    # 閲覧数
    view_count = models.PositiveIntegerField(
        '閲覧数',
        editable=False, default=0)
    # いいね数
    good_count = models.PositiveIntegerField(
        'いいね数',
        editable=False, default=0)

    # 所属された全てのカテゴリーをカンマ区切りの文字列で取得
    def get_all_categories(self):
        return ','.join([category.name for category in self.categories.all()])

    get_all_categories.short_description = 'カテゴリー'

    class Meta:
        """メタデータ定義
        """

        # テーブル名
        db_table = DB_TBL['POST']
        verbose_name = '投稿'
        verbose_name_plural = '投稿'

    def __str__(self):
        """タイトル取得

        Returns
        -------
        str
            タイトル
        """

        return self.title
