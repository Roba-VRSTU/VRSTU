from django.conf import settings
from django.core import serializers
from django.http import JsonResponse
import json

from blog.models import Category, Post


def get_categories(request):
    """カテゴリー一覧取得

    Parameters
    ----------
    request : WSGIRequest
        リクエスト

    Returns
    -------
    JsonResponse
        カテゴリー一覧
    """
    categories = Category.objects.filter(is_published=True).order_by('sort')
    categories_json = json.loads(serializers.serialize('json', categories))
    result = list(map(format_result, categories_json))
    response = JsonResponse(result, safe=False)
    add_response_header(response)

    return response


def get_posts(request):
    """投稿一覧取得

    Parameters
    ----------
    request : WSGIRequest
        リクエスト

    Returns
    -------
    JsonResponse
        投稿一覧
    """
    posts = Post.objects.filter(is_published=True)\
        .order_by('sort', '-created_at')
    posts_json = json.loads(serializers.serialize('json', posts))
    result = list(map(format_post_list, posts_json))
    response = JsonResponse(result, safe=False)
    add_response_header(response)

    return response


def get_post(request, post_id):
    """投稿詳細取得

    Parameters
    ----------
    request : WSGIRequest
        リクエスト
    post_id : int
        投稿 ID

    Returns
    -------
    JsonResponse
        投稿詳細
    """
    post = Post.objects.filter(is_published=True).get(pk=post_id)
    post_json = json.loads(serializers.serialize('json', [post]))
    response = JsonResponse(post_json, safe=False)
    add_response_header(response)

    return response


def add_response_header(rsp):
    """レスポンスにヘッダー情報を追加

    Parameters
    ----------
    rsp : JsonResponse
        JSON レスポンス
    """
    rsp['Access-Control-Allow-Origin'] = settings.CORS_DOMAIN
    rsp['Access-Control-Allow-Credentials'] = 'true'
    rsp['Access-Control-Allow-Headers'] = "Content-Type, Accept"
    rsp['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS"


def format_result(result: dict) -> dict:
    """処理結果フォーマット
    DB から取得したデータを API 処理結果として出力するためにフォーマットを行う．

    Parameters
    ----------
    result : dict
        フォーマット対象

    Returns
    -------
    dict
        フォーマット結果
    """
    format_result = {}
    format_result.update(id=result['pk'])
    format_result.update(result['fields'])

    return format_result


def format_post_list(result: dict) -> dict:
    """処理結果フォーマット（投稿一覧用）
    DB から取得したデータを API 処理結果として出力するためにフォーマットを行う．


    Parameters
    ----------
    result : dict
        フォーマット対象

    Returns
    -------
    dict
        フォーマット結果
    """
    format_result = {}
    format_result.update(
        id=result['pk'],
        description=result['fields']['description'],
        title=result['fields']['title'],
        alias=result['fields']['alias'],
        created_at=result['fields']['created_at'],
        updated_at=result['fields']['updated_at'],
        overview=result['fields']['overview'])

    return format_result
