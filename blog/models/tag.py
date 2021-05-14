from django.db import models

from blog.constants import DB_TBL
from blog.models.seo_set import SEOSet
from blog.models.status_set import StatusSet


class Tag(StatusSet, SEOSet):
    """タグモデル

    Parameters
    ----------
    StatusSet : StatusSet
        ステータスセットモデル
    SEOSet : SEOSet
        SEO セットモデル

    Returns
    -------
    Tag
        タグオブジェクト
    """

    # タグ名
    name = models.CharField(
        'タグ名',
        max_length=255)

    class Meta:
        """メタデータ定義
        """

        # テーブル名
        db_table = DB_TBL['TAG']
        verbose_name = 'タグ'
        verbose_name_plural = 'タグ'

    def __str__(self):
        """タグ名取得

        Returns
        -------
        str
            タグ名
        """

        return self.name
