from django.contrib.auth.models import User
from django.db import models

from blog.constants import VAL_LANG


class StatusSet(models.Model):
    """ステータスセットモデル抽象基底クラス

    Parameters
    ----------
    models : models
        models インターフェース
    """

    # 公開
    is_published = models.BooleanField(
        '公開',
        default=False)
    # 言語
    lang = models.SmallIntegerField(
        '言語',
        default=VAL_LANG[0][0], choices=VAL_LANG)
    # 表示順序
    sort = models.IntegerField(
        '表示順序',
        null=True, default=0,
        help_text='若い番号は上位に表示される．')
    # 作成日時
    created_at = models.DateTimeField(
        '作成日時',
        auto_now_add=True)
    # 最終更新日時
    updated_at = models.DateTimeField(
        '最終更新日時',
        auto_now=True)
    # 作成者
    author = models.ForeignKey(
        User, on_delete=models.CASCADE,
        verbose_name='作成者')

    class Meta:
        """メタデータ定義
        """

        abstract = True
