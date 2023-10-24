// // Book constructor
// class Book {
//     constructor(title, author, isbn) {
//       this.title = title;
//       this.author = author;
//       this.isbn = isbn;
//     }
// }

// // UI constructor
// class UI {
//     //addBookToList
//     addBookToList(book) {
//         const list = document.getElementById('book-list')
//         const row = document.createElement('tr')
//         row.innerHTML = `
//             <td>${book.title}</td>
//             <td>${book.author}</td>
//             <td>${book.isbn}</td>
//             <td><a href="#" class="delete">X</a></td>
//         `
//         list.appendChild(row)
//     }

//     //clearFields
//     clearFields() {
//         document.getElementById('title').value = ''
//         document.getElementById('author').value = ''
//         document.getElementById('isbn').value = ''
//     }

//     //deleteBook
//     deletBook(target) {
//         if (target.className === 'delete') {
//             target.parentElement.parentElement.remove()
//         }
//     }

//     setAlert(message, className) {
//         const container = document.querySelector('.container')
//         const form = document.querySelector('#book-form')
//         const div = document.createElement('div')
//         div.className = `alert ${className}`
//         div.appendChild(document.createTextNode(message))

//         container.insertBefore(div, form)
//         setTimeout(function () {
//             document.querySelector('.alert').remove()
//         }, 3000)
//     }
    

// }

// //Store constructor
// class Store {
//     static getBooks() {
//         let books;
//         if (localStorage.getItem('books') === null) {
//             books =[]
//         } else {
//             books = JSON.parse(localStorage.getItem('books'))
//         }

//         return books;
//     }

//     static addBooks(book) {
//         const books = Store.getBooks()
//         books.push(book)
//         localStorage.setItem('books', JSON.stringify(books))
//     }

//     static displayBooks() {
//         const books = Store.getBooks()
//         books.forEach(function (book) {
//             //instantiate UI
//             const ui = new UI()

//             ui.addBookToList(book)
//         })
//     }

//     static removeBooks(isbn) {
//         const books = Store.getBooks()
//         books.forEach(function (book, index) {
//             books.splice(index, 1)
//         })
//         localStorage.setItem('books', JSON.stringify(books))
//     }
// }
// //DOM loeader
// document.addEventListener('DOMContentLoaded', Store.displayBooks)

// // Event listener
// document.getElementById('book-form').addEventListener('submit', function (e) {
//     const title = document.getElementById('title').value
//     const author = document.getElementById('author').value
//     const isbn = document.getElementById('isbn').value

//     //instantiate book
//     const book = new Book(title, author, isbn)
//     //instantiate UI
//     const ui = new UI()

//     // validate
//     if (title === '' || author === '' || isbn === '') {
//         ui.setAlert('Please fill in all fields', 'error')
//     } else {
//         //addBookToList
//         ui.addBookToList(book) 
//         //Add too to LS
//         Store.addBooks(book)
//         //clearFields
//         ui.clearFields()
//         ui.setAlert('Book Added!', 'success')
//     }

     

//     e.preventDefault()
// })

// // Event listener for delete
// document.getElementById('book-list').addEventListener('click', function (e) {
//      //instantiate UI
//      const ui = new UI()

//      ui.deletBook(e.target)
//      //remove from LS
//      Store.removeBooks(e.target.parentElement.previousElementSibling)
//      ui.setAlert('Book removed!', 'success')
//      e.preventDefault()
// })