# DB テーブル名のプレフィックス
DB_TBL_PREFIX = 'blog_'

DB_TBL = {
    'CATEGORY': DB_TBL_PREFIX + 'category',
    'TAG': DB_TBL_PREFIX + 'tag',
    'POST': DB_TBL_PREFIX + 'post',
    'CATEGORIES_POSTS': DB_TBL_PREFIX + 'categories_posts',
    'TAGS_POSTS': DB_TBL_PREFIX + 'tags_posts',
}

# カテゴリーのモード値定義
VAL_CATEGORY_MODE = (
    (0, 'リスト'),
    (1, 'シングルページ'),
    (2, 'リンク'),
)

# 言語の定義
VAL_LANG = (
    (0, '日本語'),
    (1, '中国語'),
)
