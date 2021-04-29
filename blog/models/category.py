from django.db import models

from blog.constants import DB_TBL, VAL_CATEGORY_MODE
from blog.models.seo_set import SEOSet
from blog.models.status_set import StatusSet


class Category(StatusSet, SEOSet):
    """カテゴリーモデル

    Parameters
    ----------
    StatusSet : StatusSet
        ステータスセットモデル
    SEOSet : SEOSet
        SEO セットモデル

    Returns
    -------
    Category
        カテゴリーオブジェクト
    """

    # カテゴリー名
    name = models.CharField(
        'カテゴリー名',
        max_length=255)
    # 親カテゴリー
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True,
        verbose_name='親カテゴリー',
        help_text='親カテゴリーの ID')
    # モード
    mode = models.SmallIntegerField(
        'モード',
        default=VAL_CATEGORY_MODE[0][0], choices=VAL_CATEGORY_MODE,
        help_text='カテゴリーのモード')

    class Meta:
        """メタデータ定義
        """

        # テーブル名
        db_table = DB_TBL['CATEGORY']
        verbose_name = 'カテゴリー'
        verbose_name_plural = 'カテゴリー'

    def __str__(self):
        """カテゴリー名取得

        Returns
        -------
        str
            カテゴリー名
        """

        return self.name
