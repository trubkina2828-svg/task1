package ru.example.library.service;

import ru.example.library.model.Book;
import ru.example.library.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Получить все книги
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Получить книгу по ID
    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));
    }

    // Добавить или сохранить книгу
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    // Удалить книгу
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    // Поиск по названию
    public List<Book> search(String query) {
        if (query == null || query.isBlank()) {
            return getAllBooks();
        }

        return bookRepository.findByTitleContainingIgnoreCase(query);
    }

    // Сортировка: дата выдачи + название
    public List<Book> sortByIssueDateAndTitle() {
        return bookRepository.findAllByOrderByIssueDateAscTitleAsc();
    }
}