package ru.example.library.controller;

import ru.example.library.model.Book;
import ru.example.library.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Получить все книги
    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    // Получить книгу по ID
    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    // Добавить книгу
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    // Изменить книгу
    @PutMapping("/{id}")
    public Book updateBook(
            @PathVariable Long id,
            @RequestBody Book book) {

        Book existingBook = bookService.getBookById(id);

        existingBook.setTitle(book.getTitle());
        existingBook.setPublisher(book.getPublisher());
        existingBook.setIssueDate(book.getIssueDate());
        existingBook.setStudentName(book.getStudentName());
        existingBook.setReturnDate(book.getReturnDate());

        return bookService.saveBook(existingBook);
    }

    // Удалить книгу
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    // Поиск
    @GetMapping("/search")
    public List<Book> search(@RequestParam String query) {
        return bookService.search(query);
    }

    // Сортировка: дата выдачи + название
    @GetMapping("/sort")
    public List<Book> sort() {
        return bookService.sortByIssueDateAndTitle();
    }
}