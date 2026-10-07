let books = [];

// Загрузка всех книг

async function loadBooks() {

    const response = await fetch('/api/books');

    books = await response.json();

    displayBooks(books);

    drawChart(books);
}

// Отображение книг в таблице

function displayBooks(data) {

    const tableBody = document.getElementById('bookTableBody');

    tableBody.innerHTML = '';

    data.forEach(book => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.id}</td>

            <td>${book.title}</td>

            <td>${book.publisher}</td>

            <td>${book.issueDate ?? ''}</td>

            <td>${book.studentName ?? ''}</td>

            <td>${book.returnDate ?? ''}</td>

            <td>
                <button onclick="editBook(${book.id})">
                    Изменить
                </button>

                <button onclick="deleteBook(${book.id})">
                    Удалить
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    document.getElementById('bookCount').textContent = data.length;
}

// Сохранение книги

async function saveBook() {

    const id = document.getElementById('bookId').value;

    const book = {

        title: document.getElementById('title').value,

        publisher: document.getElementById('publisher').value,

        issueDate: document.getElementById('issueDate').value,

        studentName: document.getElementById('studentName').value,

        returnDate: document.getElementById('returnDate').value || null
    };


    let response;


    if (id) {

        response = await fetch(`/api/books/${id}`, {

            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(book)
        });

    } else {

        response = await fetch('/api/books', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(book)
        });
    }


    if (response.ok) {

        clearForm();

        await loadBooks();

        alert('Книга сохранена');

    } else {

        alert('Ошибка при сохранении книги');
    }
}

// Редактирование книги

function editBook(id) {

    const book = books.find(b => b.id === id);

    if (!book) {
        return;
    }


    document.getElementById('bookId').value = book.id;

    document.getElementById('title').value = book.title;

    document.getElementById('publisher').value = book.publisher;

    document.getElementById('issueDate').value =
        book.issueDate ?? '';

    document.getElementById('studentName').value =
        book.studentName ?? '';

    document.getElementById('returnDate').value =
        book.returnDate ?? '';


    document.getElementById('formTitle').textContent =
        'Редактировать книгу';
}

// Удаление книги

async function deleteBook(id) {

    if (!confirm('Удалить эту книгу?')) {
        return;
    }


    const response = await fetch(`/api/books/${id}`, {

        method: 'DELETE'
    });


    if (response.ok) {

        await loadBooks();

    } else {

        alert('Ошибка при удалении книги');
    }
}

// Очистка формы

function clearForm() {

    document.getElementById('bookId').value = '';

    document.getElementById('title').value = '';

    document.getElementById('publisher').value = '';

    document.getElementById('issueDate').value = '';

    document.getElementById('studentName').value = '';

    document.getElementById('returnDate').value = '';

    document.getElementById('formTitle').textContent =
        'Добавить книгу';
}

// Поиск

async function searchBooks() {

    const query =
        document.getElementById('searchInput').value.trim();


    if (!query) {

        await loadBooks();

        return;
    }


    const response =
        await fetch(`/api/books/search?query=${encodeURIComponent(query)}`);

    const data = await response.json();

    books = data;

    displayBooks(data);
}

// Сортировка

async function sortBooks() {

    const response =
        await fetch('/api/books/sort');

    const data = await response.json();

    books = data;

    displayBooks(data);
}

// Гистограмма за 30 дней

function drawChart(data) {

    const chart =
        document.getElementById('chart');

    chart.innerHTML = '';


    const today = new Date();

    const days = [];


    for (let i = 29; i >= 0; i--) {

        const date = new Date(today);

        date.setDate(today.getDate() - i);

        const dateString =
            date.toISOString().split('T')[0];

        days.push(dateString);
    }


    days.forEach(day => {

        const count =
            data.filter(book =>
                book.issueDate === day
            ).length;


        const bar =
            document.createElement('div');

        bar.className = 'bar';


        const height =
            count === 0
                ? 2
                : Math.min(count * 30, 200);


        bar.style.height =
            height + 'px';


        bar.title =
            `${day}: ${count} выдач`;


        const number =
            document.createElement('span');

        number.textContent = count;

        bar.appendChild(number);


        const label =
            document.createElement('div');

        label.className = 'bar-label';

        label.textContent =
            day.substring(5);

        bar.appendChild(label);


        chart.appendChild(bar);
    });
}

// Запуск при открытии страницы

window.onload = loadBooks;