var express = require('express');
var router = express.Router();
var debug = require('debug')('router:books');

const options = { verbose: console.debug};
const database = require('better-sqlite3')('books.sqlite', options);

let books = [
    {
        id: 1,
        author: "Eduard Petiška, Zdeněk Miler",
        title: "Krtek a kalhotky",
        publicDate: new Date("2005-02-03"),
        image: 'https://www.knihydobrovsky.cz/thumbs/book-detail-fancy-box/mod_eshop/produkty/k/krtek-a-kalhotky-9788076173262.jpg',
        price: 150,
        info: `Krtek a jeho kamarádi - zajíček, medvěd, myška a žabka, prožívají velká dobrodružství v lese, na louce
          a ve vodě. Krtek si navíc ušije s pomocí dalších zvířátek nádherné kalhotky. Leporelo je určeno nejmenších
          dětem od 2 let.`
    },
    {
        id: 2,
        author: "Adolf Hitler",
        title: "Mein Kampf",
        publicDate: new Date("1925-07-18"),
        image: 'https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/41214080.jpg',
        price: 350,
        info: `Dies ist ungek rzte Fassung Mein Kampf ist eine politisch-ideologische Programmschrift Adolf Hitlers.
          Sie erschien in zwei Teilen. Hitler stellte darin seinen Werdegang zum Politiker und seine Weltanschauung dar.
          Das Buch ist weder eine Autobiografie noch ein neues Parteiprogramm, sondern eine zweckgerichtete Kampf- und
          Propagandaschrift, die zum Neuaufbau der NSDAP als zentral gelenkter Partei unter Hitlers F hrung dienen sollte.
           Der erste Band entstand in Hitlers Haftzeit 1924 und wurde erstmals 1925, der zweite 1926 ver ffentlicht. Vor
           allem der erste Band wurde bis 1932 in der Weimarer Republik zu einem viel diskutierten Bestseller.`
    },
    {
        id: 3,
        author: "God",
        title: "Bible",
        publicDate: new Date("0-01-01"),
        image: 'https://www.freebooks-app.com/wp-content/uploads/2019/10/The-holy-bible-free-books.jpg',
        price: 280,
        info: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam egestas wisi a erat.
          Integer tempor. Pellentesque ipsum. Integer malesuada. Vestibulum fermentum tortor id mi. Aenean placerat.
          Pellentesque arcu. Phasellus rhoncus.`
    },
    {
        id: 4,
        author: "J. K. Rowling",
        title: "Harry Potter and the Philosopher's Stone",
        publicDate: new Date("1997-06-26"),
        image: 'https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg',
        price: 690,
        info: `Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green
          ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle.
          Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and
          he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!
          These new editions of the classic and internationally bestselling, multi-award-winning series feature instantly pick-up-able new jackets by Jonny Duddle, with
          huge child appeal, to bring Harry Potter to the next generation of readers. It's time to PASS THE MAGIC ON …`
    },
    {
        id: 5,
        author: "Joseph Heller",
        title: "Catch-22",
        publicDate: new Date("1961-11-10"),
        image: 'https://images-na.ssl-images-amazon.com/images/I/91Bk2JnHJHL.jpg',
        price: 390,
        info: `Explosive, subversive, wild and funny, 50 years on the novel's strength is undiminished. Reading Joseph Heller's classic satire is nothing
          less than a rite of passage. Set in the closing months of World War II, this is the story of a bombardier named Yossarian who is frantic and
          furious because thousands of people he has never met are trying to kill him. His real problem is not the enemy - it is his own army which keeps
          increasing the number of missions the men must fly to complete their service. If Yossarian makes any attempts to excuse himself from the perilous
          missions then he is caught in Catch-22: if he flies he is crazy, and doesn't have to; but if he doesn't want to he must be sane and has to.
          That's some catch...`
    },
];

router.get("/", function (req, res, next) {
    const books = database.prepare('SELECT * FROM books').all();
    res.send(books);
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id) {
        const book = database.prepare('SELECT b.title, b.price, b.info, b.publicDate, a.name, p.title FROM books AS b INNER JOIN author AS a ON a.author_ID = b.author_ID AND INNER JOIN publisher AS p ON p.publisher_ID = b.publisher_ID  WHERE ID = ?').get(id);
        res.send(book);
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
    }
    const stm = database.prepare('INSERT INTO book () VALUES (?,?,?,?)');
    stm.run(...Object.values(book))
    res.send(book);
});

router.patch("/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if (id) {
        const book = database.prepare('SELECT * FROM book WHERE ID = ?').get(id);
        if(book){
            Object.assign(book, body);
            const stm = database.prepare(
                "UPDATE book SET image = ?, title = ?, date = ?, text = ? WHERE id = ?");
            stm.run(book.image, book.title,book.publicDate,book.info,parseInt(id));
        } else{
            res.sendStatus(404)
        } res.send(book);
    } else {
        res.sendStatus(404);
    }
});

router.delete("/id", (req, res) => {
    const id = req.params.id;
    if(id){
        database.prepare("DELETE FROM book WHERE ID = ?").run(id)
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;
