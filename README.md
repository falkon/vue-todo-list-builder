# Компонент для вывода checkbox списков

## Install

```
npm install vue-todo-list-builder
```

## How to

main.js:

```
import Vue          from 'vue'
import TodoListBuilder from 'vue-todo-list-builder';

Vue.use(TodoListBuilder);
```

```
<todo-list url="{{ route('todo-list') }}" :tasks='@json($todos)'
           err-throttle="Вы сделали слишком много попыток отправки сообщений, попробуйте позже."
           err-other="Произошла ошибка при отправке данных, попробуйте отправить позже."
           add-task
></todo-list>
```

## Props

| Name          | Type          | Default       | Description   |
| ---           | ---           | ---           | ---           |
| url           | String        | Required      | На какой URL отправляются запросы для обработки |
| tasks         | JsonObject    | Required      | Задачи для отображения |
| add-task      | Boolean       | false         | Отображать инпут добавления задачи |
| err-throttle  | String        | Required      | Сообщение об ошибке при частои обращении к URL |
| err-other     | String        | Required      | Сообщение о любой ошибке на сервере |

### Формат данных:
```
[
    {
        id: 1,
        title: 'test Title',
        value: true
    },
    {
        id: 2,
        title: 'test Title 2',
        value: false
    },
]
```

# TODO

* оформить как npm пакет
