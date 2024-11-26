---
title: Calendar 日历日程
description:
type: 0
group: ⚙ 组件
menuName: Calendar 日历日程
icon:
order: 36
---

## 基本用法

设置 `schedules` 属性

```schema: scope="body"
{
    "type": "calendar",
    "value": "1638288000",
    "schedules": [
      {
        "startTime": "2021-12-11 05:14:00",
        "endTime": "2021-12-11 06:14:00",
        "content": "这是一个日程1"
      },
      {
        "startTime": "2021-12-21 05:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程2"
      }
    ]
}
```

## 自定义颜色

```schema: scope="body"
{
    "type": "calendar",
    "value": "1638288000",
    "schedules": [
      {
        "startTime": "2021-12-11 05:14:00",
        "endTime": "2021-12-11 06:14:00",
        "content": "这是一个日程1",
        "className": "bg-success"
      },
      {
        "startTime": "2021-12-21 05:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程2",
        "className": "bg-info"
      }
    ]
}
```

```schema: scope="body"
{
    "type": "calendar",
    "value": "1638288000",
    "scheduleClassNames": ["bg-success", "bg-info"],
    "schedules": [
      {
        "startTime": "2021-12-11 05:14:00",
        "endTime": "2021-12-11 06:14:00",
        "content": "这是一个日程1"
      },
      {
        "startTime": "2021-12-21 05:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程2"
      }
    ]
}
```

## 自定义日程展示

```schema: scope="body"
{
    "type": "calendar",
    "value": "1638288000",
    "schedules": [
      {
        "startTime": "2021-12-11 05:14:00",
        "endTime": "2021-12-11 06:14:00",
        "content": "这是一个日程1"
      },
      {
        "startTime": "2021-12-21 05:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程2"
      }
    ],
    "scheduleAction": {
      "actionType": "drawer",
      "drawer": {
        "title": "日程",
        "body": {
          "type": "table",
          "columns": [
            {
              "name": "time",
              "label": "时间"
            },
            {
              "name": "content",
              "label": "内容"
            }
          ],
          "data": "${scheduleData}"
        }
      }
    }
}
```

## 支持从数据源中获取日程

```schema
{
    "type": "page",
    "data": {
      "schedules": [
        {
          "startTime": "2021-12-11 05:14:00",
          "endTime": "2021-12-11 06:14:00",
          "content": "这是一个日程1"
        },
        {
          "startTime": "2021-12-21 05:14:00",
          "endTime": "2021-12-22 05:14:00",
          "content": "这是一个日程2"
        }
      ]
    },
    "body": [
      {
        "type": "calendar",
        "value": "1638288000",
        "schedules": "${schedules}"
      }
    ]
}
```

## 放大模式

```schema: scope="body"
{
    "type": "calendar",
    "value": "1638288000",
    "largeMode": true,
    "schedules": [
      {
        "startTime": "2021-12-11 05:14:00",
        "endTime": "2021-12-11 06:14:00",
        "content": "这是一个日程1"
      },
      {
        "startTime": "2021-12-12 02:14:00",
        "endTime": "2021-12-13 05:14:00",
        "content": "这是一个日程2"
      },
      {
        "startTime": "2021-12-20 05:14:00",
        "endTime": "2021-12-21 05:14:00",
        "content": "这是一个日程3"
      },
      {
        "startTime": "2021-12-21 05:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程4"
      },
      {
        "startTime": "2021-12-22 02:14:00",
        "endTime": "2021-12-23 05:14:00",
        "content": "这是一个日程5"
      },
      {
        "startTime": "2021-12-22 02:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程6"
      },
      {
        "startTime": "2021-12-22 02:14:00",
        "endTime": "2021-12-22 05:14:00",
        "content": "这是一个日程7"
      }
    ]
}
```

## Calendar 属性表

| 属性名             | 类型                                                                                      | 默认值                                                                 | 说明                                                                                                                                                                                                                            |
| ------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type               | `string`                                                                                  | `"calendar"`                                                           | 指定为 calendar 渲染器                                                                                                                                                                                                          |
| schedules          | `Array<{startTime: string, endTime: string, content: any, className?: string}> \| string` |                                                                        | 日历中展示日程，可设置静态数据或从上下文中取数据，startTime 和 endTime 格式参考[文档](https://momentjs.com/docs/#/parsing/string/)，className 参考[背景色](https://baidu.gitee.io/amis/zh-CN/style/background/background-color) |
| scheduleClassNames | `Array<string>`                                                                           | `['bg-warning', 'bg-danger', 'bg-success', 'bg-info', 'bg-secondary']` | 日历中展示日程的颜色，参考[背景色](https://baidu.gitee.io/amis/zh-CN/style/background/background-color)                                                                                                                         |
| scheduleAction     | `SchemaNode`                                                                              |                                                                        | 自定义日程展示                                                                                                                                                                                                                  |
| largeMode          | `boolean`                                                                                 | `false`                                                                | 放大模式                                                                                                                                                                                                                        |
## 事件表

| 事件名称           | 事件参数                                        | 说明                  |
|-------------------|------------------------------------------------|----------------------|
| change            |  `value: string` 时间值            |  值变化                           |

## 动作表

| 动作名称           | 动作配置                 | 说明                    |
|-------------------|-------------------------|------------------------|
| clear             | -                       | 清空                    |
| reset             | -                       | 值重置                   |