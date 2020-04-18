# Mesto-Russia (backend)
Проект Mesto Russia (backend) - бэкенд часть проекта Mesto Russia, реализованая
в формате проектной работы в Яндекс Практикуме
Используя Express реализован функционал сервера:
- Возвращение существующих в базе пользователей на GET /users
- Возвращение конкретного пользователя на GET /users/:userId
- Создание пользователя POST /users
- Возвращение всех карточек пользователя GET /cards
- Создание карточки POST /cards
- Возврат сообщения об ошибке при неправильном запросе

Также на сервере созданы схема и модель пользователя и карточки с отдельными валидируемыми полями.

## Использованные технологии
Node.js, Express, MongoDB

## Проект на Github
https://github.com/juzlov/Mesto-Russia

## Публичный IP-адрес сервера
84.201.167.157

## Домен
https://mesto-project.tk/

## Как установить?
npm version - 6.13.4
node.js version - 12.16.1

Клонирование проекта:
```
git clone https://github.com/juzlov/Mesto-Russia.git
```

Запустить базу данных
```
mongod
```

Создание локального сервера:
```
npm run dev
```


## Версия
3.0.1
