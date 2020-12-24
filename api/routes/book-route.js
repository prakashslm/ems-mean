/* eslint-disable no-param-reassign */
import { Router } from 'express';
import { bookController } from '../controllers/book-controller';

export function routes(Book) {
  const bookRouter = Router();
  const controller = bookController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.get);

  // middleware for book collection validate
  bookRouter.route('/books/:id', (req, res, next) => {
    console.log('/books/:id', req.params.id);
    Book.findById(req.params.id, (err, book) => {
      if (err) {
        return res.send(err);
      }
      console.log(book);
      if (book) {
        req.book = book;
        return next('route');
      }
      return res.sendStatus(404);
    });
  })
    .get((req, res) => {
      console.log('/books/:id', req.params.id);
      const returnBook = res.book || {};  // res.book.toJSON();
      const genre = encodeURIComponent(returnBook.genre);
      returnBook.links = {};
      returnBook.links.filterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}}`
      return res.json(returnBook);
    })
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    }).patch((req, res) => {
      const { book } = req;

      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach(([key, value]) => {
        book[key] = value;
      });
      req.book.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    }).delete((req, res) => {
      req.book.remove((err) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return bookRouter;
}
