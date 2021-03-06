"""vrstu URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path

from vrstu.constants import API_BASE_URL, ADMIN_SITE_TITLE, ADMIN_INDEX_TITLE
from vrstu import views

admin.site.site_header = '%s %s %s' % (
    settings.SITE_NAME, settings.VERSION, ADMIN_SITE_TITLE)

admin.site.index_title = ADMIN_INDEX_TITLE

urlpatterns = [
    path(settings.ADMIN_URL + '/', admin.site.urls),
    path(API_BASE_URL + 'blog/', include('blog.urls')),
    re_path(r'^.*', views.index, name='index'),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
