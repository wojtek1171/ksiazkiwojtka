const Book = require("../models/books");
const Quote = require("../models/quotes");
const fs = require("fs");

module.exports = class API {
  // fetch all books
  static async fetchAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // fetch book by id
  static async fetchBookById(req, res) {
    const id = req.params.id;
    try {
      const book = await Book.findById(id);
      res.status(200).json(book);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // create a book
  static async createBook(req, res) {
    const book = req.body;
    const imagename = req.file?.filename;
    book.image = imagename;
    try {
      await Book.create(book);
      res.status(201).json({ message: "Book created succesfully." });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // update a book
  static async updateBook(req, res) {
    const id = req.params.id;
    let newImage = "";
    if (req.file) {
      newImage = req.file.filename;
      if (req.body.oldImage != "cover-default.jpg") {
        try {
          fs.unlinkSync("./uploads/" + req.body.oldImage);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      newImage = req.body.oldImage;
    }
    const newBook = req.body;
    newBook.image = newImage;

    try {
      await Book.findByIdAndUpdate(id, newBook);
      res.status(200).json({ message: "Book updated succesfully." });
    } catch (err) {
      res.status(404).json({ message: err.message });
      console.log(err);
    }
  }

  // delete a book
  static async deleteBook(req, res) {
    const id = req.params.id;
    try {
      const result = await Book.findByIdAndDelete(id);
      if (result.image != "" && result.image != "cover-default.jpg") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (err) {
          console.log(err);
        }
      }
      res.status(200).json({ message: "Book deleted succesfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // get all books number
  static async countBooks(req, res) {
    const id = req.params.id;
    try {
      const book = await Book.countDocuments();
      res.status(200).json(book);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // fetch all author's occurances
  static async getField(req, res) {
    const param = req.params.param;
    let book = {};
    try {
      switch (param) {
        case "authors":
          book = await Book.find({}, { _id: 0, authors: 1 });
          break;
        case "translators":
          book = await Book.find({}, { _id: 0, translators: 1 });
          break;
        case "tags":
          book = await Book.find({}, { _id: 0, tags: 1 });
          break;
        case "publishers":
          book = await Book.find({}, { _id: 0, publisher: 1 });
          break;
      }
      res.status(200).json(book);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getBooksSortedDescByCreationDate(req, res) {
    try {
      const books = await Book.find().sort({ created: -1 }).limit(10);
      res.status(200).json(books);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //--------------------------------------------------------------------

  // fetch all quotes
  static async fetchAllQuotes(req, res) {
    try {
      const quotes = await Quote.find();
      res.status(200).json(quotes);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // fetch quote by id
  static async fetchQuoteById(req, res) {
    const id = req.params.id;
    try {
      const quote = await Quote.findById(id);
      res.status(200).json(quote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // create a quote
  static async createQuote(req, res) {
    const quote = req.body;
    try {
      await Quote.create(quote);
      res.status(201).json({ message: "Quote created succesfully." });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // update a quote
  static async updateQuote(req, res) {
    const id = req.params.id;
    const newQuote = req.body;

    try {
      await Quote.findByIdAndUpdate(id, newQuote);
      res.status(200).json({ message: "Quote updated succesfully." });
    } catch (err) {
      res.status(404).json({ message: err.message });
      console.log(err);
    }
  }

  // delete a quote
  static async deleteQuote(req, res) {
    const id = req.params.id;
    try {
      const result = await Quote.findByIdAndDelete(id);
      res.status(200).json({ message: "Quote deleted succesfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
