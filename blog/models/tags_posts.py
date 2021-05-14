from django.db import models

from blog.constants import DB_TBL
from blog.models.tag import Tag
from blog.models.post import Post


class TagsPosts(models.Model):
    """タグ - 投稿 リレーションシップモデル

    Parameters
    ----------
    models : Model
        Django モデル

    Returns
    -------
    TagsPosts
        タグ - 投稿 リレーションシップオブジェクト
    """

    # タグ
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    # 投稿
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    # メタオプション
    class Meta:
        """メタデータ定義
        """

        # テーブル名
        db_table = DB_TBL['TAGS_POSTS']

    def __str__(self):
        # タグ名を出力
        return '[%s] %s' % (self.tag.name, self.post.title)
