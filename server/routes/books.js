var express = require('express');
var router = express.Router();
var debug = require('debug')('router:books');

const options = { verbose: console.debug};
const database = require('better-sqlite3')('books.sqlite', options);

router.get("/", function (req, res, next) {
    const books = database.prepare('SELECT * FROM book').all();
    for(let book of books){
        book.author_ID = database.prepare(`SELECT * FROM author WHERE author.author_ID = ${book.author_ID}`).all();
        book.publisher_ID = database.prepare(`SELECT * FROM publisher WHERE publisher.publisher_ID = ${book.publisher_ID}`).all();
    }
    res.send(books);
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id) {
        const book = database.prepare('SELECT * FROM book WHERE book_ID = ?').get(id);
        /*
        book.author_ID = database.prepare(`SELECT * FROM author WHERE author.author_ID = ${book.author_ID}`).all();
        book.publisher_ID = database.prepare(`SELECT * FROM publisher WHERE publisher.publisher_ID = ${book.publisher_ID}`).all();
        */
        res.send(book);
        console.log(req);
        console.log(res);
    } else {
        res.send("Not Found");
    }
});

router.post("/", (req, res) => {
    const body = req.body;
    const book ={
        title: body.title,
        price: body.price,
        info: body.info,
        publicDate: new Date().toISOString(),
        image: body.image
    }
    const stm = database.prepare('INSERT INTO book (title, price, info, publicDate, image) VALUES (?,?,?,?,?)');
    stm.run(...Object.values(book))
    res.send(book);
});

router.patch("/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if (id) {
        const book = database.prepare('SELECT * FROM book WHERE book_ID = ?').get(id);
        if(book){
            Object.assign(book, body);
            const stm = database.prepare(
                "UPDATE book SET title = ?, price = ?, info = ?, publicDate = ?, image = ? WHERE book_ID = ?");
            stm.run(book.title, book.price,book.info,book.publicDate,book.image,parseInt(id));
        } else{
            res.sendStatus(404)
        } res.send(book);
    } else {
        res.sendStatus(404);
    }
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    if(id){
        database.prepare("DELETE FROM book WHERE book_ID = ?").run(id)
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;
