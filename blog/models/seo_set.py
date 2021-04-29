from django.db import models


class SEOSet(models.Model):
    """SEO セットモデル抽象基底クラス

    Parameters
    ----------
    models : models
        models インターフェース
    """

    # 別名
    alias = models.CharField(
        '別名',
        max_length=255, null=True, blank=True, unique=True,
        help_text='設定された場合は URL の一部として利用できる．\
            カテゴリーのモードが“リンク”の場合に，外部 URL も設定可能になる．')
    # メタディスクリプション
    description = models.TextField(
        'ディスクリプション',
        null=True, blank=True,
        help_text='SEO 対策：メタディスクリプション')
    # キーワード
    keywords = models.CharField(
        'キーワード',
        max_length=255, null=True, blank=True,
        help_text='SEO 対策：キーワード')

    class Meta:
        """メタデータ定義
        """

        abstract = True
