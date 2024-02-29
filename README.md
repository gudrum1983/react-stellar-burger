# Учебный проект - "Stellar Burger"

___________________________

### Описание проекта

Stellar Burger - это учебный проект, разработанный в рамках курса "Web-разработчик +" от Яндекс Практикум. Проект
охватывает ключевые темы веб-разработки, включая основы React, Redux, управление состоянием, роутинг, авторизацию и
TypeScript.

Проект состоит из нескольких этапов, включающих организацию инфраструктуры, создание и структурирование компонентов,
работу с Redux для управления состоянием приложения, реализацию функциональности перетаскивания ингредиентов и
сортировки, взаимодействие с сервером через API для аутентификации и управления заказами, настройку роутинга и
защищенных маршрутов, а также внедрение сокет-соединения для обновления данных в реальном времени.

Проект представляет собой одностраничное не адаптивное веб-приложение для создания и заказа бургеров. Пользователи могут
выбирать ингредиенты из списка, перетаскивать их в конструктор бургера, просматривать детали ингредиентов и заказов, а
также регистрироваться, авторизовываться, восстанавливать пароль и управлять своим профилем.

Stellar Burger отличается отличной типизацией, включая использование TypeScript для всех компонентов, утилитарных
функций, экшенов, редьюсеров, хранилища и хуков. Это обеспечивает надежность и чистоту кода, а также облегчает
разработку и поддержку проекта.

Проект позволяет студентам закрепить полученные знания и навыки в области веб-разработки, а также понять основные
принципы построения современных веб-приложений.

___________________________

### Описание проекта

Проект "Stellar Burger" представляет собой одностраничное не адаптивное веб-приложение реализованное в рамках обучения.
Задача проекта - создание инструмента для визуализации различных алгоритмов и структур данных с целью более глубокого
понимания их работы. Приложение позволяет пользователям интерактивно изучать и наблюдать процесс работы алгоритмов,
таких как разворот строки, генерация последовательности Фибоначчи, сортировка массива. Оно также обеспечивает
возможность визуального отображения добавления и удаления элементов в структурах данных, таких как стек, очередь и
связный список.

Проект создан на основе учебного шаблона репозитория в котором уже были реализованы:

- Начальная файловая структура в соответствии с Create React App
- Ui компоненты

С шаблоном репозитория вы можете [ознакомиться по ссылке.](https://github.com/yandex-praktikum/react-stellar-burger)

Проект реализован с помощью навыков и знаний полученных
при прохождения спринта "Роутинг и авторизация" на курсе Яндекс Практикума.

Для сдачи проекта необходимо было реализовать:

__1 этап__

- Организовать инфраструктуру проекта:
    - [x] Создать новый проект и установить дополнительные пакеты;
    - [x] инициализировать git-репозиторий;
- Layout главной страницы:
    - [x] AppHeader — шапка приложения
    - [x] BurgerIngredients — список ингредиентов
    - [x] BurgerConstructor — текущий состав бургера
    - [x] организовать проверки типов данных propTypes

__2 этап__

- Обновление инфраструктуры приложения для интеграции Redux и react-dnd:
    - [x] Установка необходимых пакетов для Redux-хранилища и DnD.
    - [x] Изменение структуры приложения для использования Redux.
- Подготовка хранилища Redux:
    - [x] Подготовка начального состояния и создание редьюсеров.
    - [x] Подключение хранилища к приложению.
- Создание первых экшенов и редьюсеров:
    - [x] Описание функциональности для работы с ингредиентами и заказами.
    - [x] Использование redux-thunk для асинхронных действий.
- Навигация по ингредиентам с помощью react-intersection-observer:
    - [x] Создать переключатели в BurgerIngredients для навигации с подсветкой по текущей группе ингредиентов.
- Сортировка и перетаскивание ингредиентов с помощью react-dnd:
    - [x] Реализовать перетаскивать ингредиенты из BurgerIngredients в BurgerConstructor с изменением счетчика и
      динамическим расчётом стоимости бургера.
    - [x] Перетаскивание ингредиентов внутри BurgerConstructor.
- Взаимодействие с API:
    - [x] Отправка запроса к API для создания заказа и получения номера.
- Layout модальных окон:
    - [x] детали ингредиента
    - [x] детали заказа

__3 этап__

- Layout страниц:
    - [x] авторизации и регистрации
    - [x] восстановления и сброса пароля
    - [x] профиля пользователя
- Запросы к API:
    - [x] авторизация и обновление токена
    - [x] выход из системы
    - [x] получение и обновление информации о пользователе
- Настройка роутинга:
    - [x] Установка пакетов для роутинга,
    - [x] создание компонентов BrowserRouter, Router и Routes в App.
    - [x] Создание директории /pages и маршрутов страниц
    - [x] Настройка переходов для кнопок на страницах авторизации и регистрации.
    - [x] настроить защищённые маршруты в приложении

__4 Этап__

- Layout страниц:
    - [x] Лента заказов
    - [x] История заказов
    - [x] Добавление страниц для отдельного просмотра деталей ингредиента и заказа

- Сокет-соединение с авторизацией
    - [x] Получение и актуализация ленты и истории заказов при
      каждом обновлении списка заказов на сервере
    - [x] обновление информации о заказе

__5 Этап__

- Рефакторинг-типизация проекта:
    - [x] Перевести все компоненты и утилитарные функции с PropTypes на TypeScript.
    - [x] Типизировать экшены, редьюсеры, хранилище и хуки
    - [x] типизировать DnD и react-intersection-observer


- [x] Проверить что всё работает ну или почти всё работает :)

___

### Используемые инструменты и технологии

- Языки: `HTML` `CSS` `JavaScript` `TypeScript`
- Инструменты управления проектом: `Git` `GitHub` `GitHub Pages`
- Инструменты для разработки и сборки
  проекта: `Node.js` `Webpack` `NPM` `React` `Create React App` `React Router` `Redux`
- Взаимодействие с API: `WebSockets` `API requests`
- Дополнительные библиотеки: `React DnD` `react-intersection-observer`

---

### Запуск проекта

- Склонируйте репозиторий.
- Установите зависимости с помощью команды

```bash
npm install
```

- Запустите проект с помощью

```bash
npm start
```

### Ссылки

* [Ссылка на макет в Figma](https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link?node-id=6291:2799)
* [Готовый проект на GitHub Pages](https://gudrum1983.github.io/react-stellar-burger/)

### Автор
Екатерина Кочкина студентка курса "Web-разработчик +", кагортa 25-aquamarune, 2024г.
