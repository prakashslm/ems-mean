export function booksController(Book) {
  console.log('------------------------', Book);
  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      // TODO: term called HATEOASd
      const returnBooks = books.map((book) => {
        // const newBook = JSON.parse(JSON.stringify(book)); // book.toObject(); // book.toJSON();
        const newBook = book.toJSON();
        console.log(typeof (book), book, newBook);
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}}`;
        return newBook;
      });
      console.log(returnBooks);
      return res.json(returnBooks);
    });
  }

  return { post, get };
}
