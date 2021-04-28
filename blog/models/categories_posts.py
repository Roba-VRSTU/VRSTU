from django.db import models

from blog.constants import DB_TBL
from blog.models.category import Category
from blog.models.post import Post


class CategoriesPosts(models.Model):
    """カテゴリー - 投稿 リレーションシップモデル

    Parameters
    ----------
    models : Model
        Django モデル

    Returns
    -------
    CategoriesPosts
        カテゴリー - 投稿 リレーションシップオブジェクト
    """

    # カテゴリー
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    # 投稿
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    # メタオプション
    class Meta:
        """メタデータ定義
        """

        # テーブル名
        db_table = DB_TBL['CATEGORIES_POSTS']

    def __str__(self):
        # カテゴリー名を出力
        return '[%s] %s' % (self.category.name, self.post.title)
