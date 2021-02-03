# Test project User-options

Для запуска требуется: `node.js v10+`, `MongoDB v3+`
Или запуск через `docker-compose up -d`

В сборке для `docker` использованы 2 контейнера:
1. MongoDB и вынесенным наружу volume с базой
2. Node.js контейнер собирающийся с Dockerfile, внутри использован pm2

Самое приложение также можно вынести в отдельный volume для удобства работы с git, если это будет требоваться, чтобы
не пересобирать контейнер каждый раз.

Доступ к API GraphQL обеспечивается по адресу: `localhost/graphql`
Возможные запросы отражены ниже:

```graphql
mutation addNewOptions {
  addUserOptions(name: "TestAppCreate", value: "yes") {
    name
    value
  }
}

mutation removeOptions {
  removeUserOptions(name: "TestAppCreate") {
    name
    value
  }
}

query getAllOptions {
  userOptions {
    name
    value
  }
}

query getAOptionByName {
  userOptionByName(name: "TestAppCreate") {
    name
    value
  }
}

```
