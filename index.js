const express = require("express");
const fs = require('fs');
const books = require("./MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Route
app.get("/api/books", (req, res) => {
  return res.json(books);
});

// app.route("/api/books").put((req, res) => {
//   const {title, ...updateData} = req.body;
//   const index = books.findIndex(book => book.title === title);
//    if (index === -1) {
//     return res.status(404).json({error: "book not found"});
//   }
//   books[index] = {...books[index], ...updateData};
//   fs.writeFile('./MOCK_DATA.json', JSON.stringify(books));
//   return res.json({status: "books updated", book: books[index]});
// })
// .delete((req, res) => {
//   const {title} = req.body;
//   const index = books.findIndex(book => book.title === title);
//   if (index === -1) {
//     return res.status(404).json({error: "book not found"});
//   }
//   books.splice(index, 1);
//   fs.writeFile('./MOCK_DATA.json', JSON.stringify(books));
//   return res.json({status: "Book deleted"});
// });

app.route("/api/books").put((req, res) => {
  const {title, ...updateData} = req.body;
  const index = books.findIndex(book => book.title === title);
  if (index === -1) {
    return res.status(404).json({error: "book not found"});
  }
  books[index] = {...books[index], ...updateData};
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(books), (err) => {
    if (err) return res.status(500).json({error: "Failed to update file"});
    return res.json({status: "books updated", book: books[index]});
  });
})
.delete((req, res) => {
  const {title} = req.body;
  const index = books.findIndex(book => book.title === title);
  if (index === -1) {
    return res.status(404).json({error: "book not found"});
  }
  books.splice(index, 1);
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(books), (err) => {
    if (err) return res.status(500).json({error: "Failed to update file"});
    return res.json({status: "Book deleted"});
  });
});

app.get("/books", (req, res) => {
  const html = `
  <ul>
     ${books.map((book) => `<li>${book.title}</li>`).join("")}
  </ul>`;
  res.send(html);
});

app.post("/api/books", (req, res) => {
  const body = req.body;
  console.log("Body",body);
  books.push(body);
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(books), (err, data) => {
    return res.json({status: "pending"});
  })
})

// app.put("/api/books/:id", (req, res) => {
//   return res.json({status: "pending"});
// })

// app.delete("/api/books/:id", (req, res) => {
//   return res.json({status: "pending"});
// })

app.listen(PORT, () => console.log(`Server started at port 3000`));