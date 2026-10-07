# Семинарское занятие №2-1

**ФИО:** Трубкина Н.А.

**Группа:** ПИ24-2в 

**Вариант:** Н-Т: поле - издатель (кириллица), сортировка - по двум полям (дата выдачи + название), период - 30 дней

**Ссылка на репозиторий:** https://github.com/trubkina2828-svg/task1

---
## Необходимый функционал:
1. Добавление книги
2. Удаление книги
3. Редактирование книги
4. Поиск книги по различным параметрам
5. Отдельный фильт (сортировка)
6. По дате выдачи книги (Java или JavaScript)
7. Гистограмма количества книг по дням (Java или JavaScript)
8. Счетчик книг в таблице (Java или JavaScript)

---
## Параметры объекта "книга":
1. ID
2. Название книги
3. Издательство
4. Дата выдачи книги студенту
5. ФИО студента
6. Дата сдачи книги студентом в библиотеку

##  pom.xml
Это главный файл Maven, в котором прописываются зависимости проекта. 

Проект рассчитан на Java 21.
``` 
    <properties>
        <java.version>21</java.version>
    </properties>
```
Подключаем возможности Spring для создания веб-приложения: 
``` 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```
Для работы с базой данных через Java:
``` 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
```
Чтобы программа могла подключаться к MySQL, добавим:

``` 
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
```


---
## Структура репозитория

```
Library
└── src
    └── main
        ├── java
        │   └── ru.example
        │       └── library
        │           ├── LibraryApplication.java
        │           │
        │           ├── model
        │           │   └── Book.java
        │           │
        │           ├── repository
        │           │   └── BookRepository.java
        │           │
        │           ├── service
        │           │   └── BookService.java
        │           │
        │           └── controller
        │               └── BookController.java
        │
        └── resources
                    ├── application.properties
                    └── static         
                         ├── index.html
                         │
                         ├── script.js
                         │
                         └── style.css
```
