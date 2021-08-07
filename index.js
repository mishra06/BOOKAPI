const express = require("express");

//Database
const database = require("./database");

// Initialization
const booky = express();

// configuration
booky.use(express.json());


/*
Route            /
Description      Get all books
Access           PUBLIC
parameter        NONE
Methods          GET
*/

booky.get("/", (req, res) => {
    
 return res.json({ books: database.books });
});

/*
Route            /is
Description      Get specific books based on ISBN
Access           PUBLIC
parameter        isbn
Methods          GET
*/

booky.get("/is/:isbn", (req, res) => {
    const getspecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

        if (getspecificBook.length === 0) {
            return res.json({
                 error: `No book found for the ISBN of ${req.params.isbn}`,});
        }

        return res.json({ book: getspecificBook });
});


/*
Route            /c
Description      Get specific books based on category
Access           PUBLIC
parameter        category
Methods          GET
*/
booky.get("/c/:category", (req, res) => {
    const getspecificBook = database.books.filter((book) => 
     book.category.includes(req.params.category)
    );

    if (getspecificBook.length === 0) {
        return res.json({
             error: `No book found for the category of ${req.params.category}`,});
    }

    return res.json({ book: getspecificBook });
});

/*
Route            /author
Description      Get all authors
Access           PUBLIC
parameter        NONE
Methods          GET
*/
booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
});


/*
Route            /author book
Description      Get all authors based on books
Access           PUBLIC
parameter        isbn
Methods          GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getspecificAuthor = database.author.filter((author) => 
    author.books.includes(req.params.isbn)
   );

   if (getspecificAuthor.length === 0) {
       return res.json({
            error: `No Author found for the book of ${req.params.isbn}`,
        });
   }

   return res.json({ author: getspecificAuthor });
});



/*
Route            /publications
Description      Get all publications
Access           PUBLIC
parameter        NONE
Methods          GET
*/
booky.get("/publication", (req, res) => {
    return res.json({ publications: database.publication })
});


/*
Route            /book/new
Description      add new book
Access           PUBLIC
parameter        NONE
Methods          POST
*/
booky.post("/book/add", (req, res) => {
    console.log(req.body);
    const { newBook } = req.body.newBook;
    database.books.push(newBook);
    return res.json({ books: database.books });
});

/*
Route            /author/add
Description      add new author
Access           PUBLIC
parameter        NONE
Methods          POST
*/
booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({ authors: database.author });
  });

  /*
Route            /book/update/title
Description      Update book title
Access           PUBLIC
parameter        NONE
Methods          PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.title = req.body.newBookTitle;
        return;
      }
    });
  
    return res.json({ books: database.books });
  });

  /*
Route            /book/update/author
Description      update/add new author for a book
Access           PUBLIC
parameter        isbn
Methods          PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // update book database
  
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        return book.author.push(parseInt(req.params.authorId));
      }
    });
  
    // update author database
  
    database.author.forEach((author) => {
      if (author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });
  
    return res.json({ books: database.books, author: database.author });
  });

  /*
  Route           /publication/update/book
  Description     update/add new book to a publication
  Access          PUBLIC
  Parameters      isbn
  Method          PUT
  */
booky.put("/publication/update/book/:isbn", (req, res) => {
    database.publications.forEach((publication) =>{
        if (publication.books.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books, publications: database.publications, message: "successfully updated publication",
    });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    );

    // ===> strictly equal too
    // !===> not equal tooo

    database.books = updatedBookDatabase;
    return res.json({ books: database.books });
  });

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, authorId
Method          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    console.log(book)
    if (book.ISBN === req.params.isbn) {
     const newAuthorList = book.authors.filter(
         (author) => author !== parseInt(req.params.authorId)
         );
         book.author = newAuthorList;
         return;
       }
     });

  // update the author database
  database.authors.forEach((author) => {
    if(author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn);
        author.books = newBooksList;
        return;
    }
  });

  return res.json({book: database.books,author: database.authors,message: "author was deleated!!!!!",});
});


/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/

booky.delete("/publiations/delete/book/:isbn/:pubId", (req, res) => {
  //update publication database
  database.publications.forEach((publication) => {
    if(publication.id === parseInt(req.params.pubId)){
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn);

        database.publications.books = newBooksList;
        return;
    }
  });

  //update book database
  database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn){
      book.publications = 0; // no pulication available
      return;
    }
  });

  return res.json({books: database.books,publications: database.publication})
});

booky.listen(3000, () => console.log("Hy server is running! "));

//HTTP Client -> helper who  helps you to to make http request