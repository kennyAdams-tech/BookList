// Book constructor
class Book {
    constructor(title, author, isbn){
      this.title = title;
      this.author = author;  
      this.isbn = isbn;
    }
}

// UI constructor
class UI{
   addBookToList(book) {
     const list = document.getElementById('book-list')
     const row = document.createElement('tr')
     row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
     `
     list.appendChild(row)
   }

   clearFields() {
     document.getElementById('title').value = ''
     document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
   }

   setAlert(message, className) {
      const container = document.querySelector('.container')
      const form = document.querySelector('#book-form')
      const div = document.createElement('div')
      div.className = `alert ${className}`
      div.appendChild(document.createTextNode(message))

      container.insertBefore(div, form)
      setTimeout(function () {
        document.querySelector('.alert').remove()
      }, 3000)
   }

   deleteBook(target) {
      if (target.className === 'delete') {
         target.parentElement.parentElement.remove()
      }
   }

}

//Store Constructor
class Store {
   static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
       
        return books;
    }

    static addBooks(book) {
         const books = Store.getBooks()
         books.push(book)
         localStorage.setItem('books',JSON.stringify(books))
    }

    static displayBooks() {
        const books = Store.getBooks()

        books.forEach(function (book) {
            //instantiate ui
            const ui = new UI()
            ui.addBookToList(book)
        })
    }

    static removeBooks(isbn) {
        const books = Store.getBooks()

        books.forEach(function (book, index) {
           if (book.isbn === isbn) {
               books.splice(index, 1)
           }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}

//DOM loaded
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    //instantiate book
    const book = new Book(title, author, isbn)
    //instantiate ui
    const ui = new UI()

    //validate
    if (title === '' || author === '' || isbn === '' ) {
        ui.setAlert('Please input all fields!', 'error')
    } else {
        //addBookToList
        ui.addBookToList(book)
        // add to LS
        Store.addBooks(book)
        // clearfields
        ui.clearFields()
        ui.setAlert('Book Added!', 'success')

    }

   
    e.preventDefault()
})

//delete book
document.getElementById('book-list').addEventListener('click', function (e) {
    //instantiate ui
    const ui = new UI()
    // deleteBook
    ui.deleteBook(e.target)
    //remove from LS
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
    ui.setAlert('Book removed!', 'success')
   
})