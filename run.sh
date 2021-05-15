#!/bin/bash

MODE=$1

if [ "$MODE" = "build" ]; then
  # ビルド
  cd ui
  npm run-script build -- --prod
elif  "$MODE" = "deploy" ]; then
  # デプロイ
  cd ui
  npm run-script build -- --prod
  cd ..
  python manage.py makemigrations blog
  python manage.py migrate
  python manage.py collectstatic
elif [ "$MODE" = "ui" ]; then
  # フロントエンドの開発サーバー起動
  cd ui
  npm run-script start -- --host 0.0.0.0
else
  python manage.py runserver 0.0.0.0:8000
fi
