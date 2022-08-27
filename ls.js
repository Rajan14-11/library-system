update()

function update() {
    
    let booklist = localStorage.getItem('booklist')
    let books;
    if (booklist == null) {
        books = [];
    }
    else {
        books = JSON.parse(booklist)
    }
    let tableBody = document.getElementById('tableBody')
    let uistring = "";
    books.forEach(function (element,index) {

        uistring += `
    <tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td><button class=" btn btn-sm btn-primary" onclick="deleteBook(${index})">Delete</button></td>
    </tr>`
    });
    tableBody.innerHTML = uistring;
}

function deleteBook(index){
    let booklist = localStorage.getItem('booklist')
    let books = JSON.parse(booklist);
    console.log(books)
    books.splice(index,1);
    localStorage.setItem('booklist' , JSON.stringify(books));
    let bookName = books["name"];
    let boldText = 'Deleted' ; 
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>${boldText}:</strong> ${bookName} has been deleted.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
    </div>`
    
    setTimeout(() => {
        message.innerHTML = ''
    }, 3000);
    update();
    console.log(bookName)
}

class Book {
    constructor(name, author) {
        this.name = name;
        this.author = author;
    }
}
class Display {
    
    add(Book) {
        console.log("Book has been added to library");

        let booklist = localStorage.getItem('booklist');
        let books;
        if (booklist == null) {
            books = [];
        } else {
            books = JSON.parse(booklist);
        }

        books.push(Book);
        localStorage.setItem('booklist', JSON.stringify(books));
        
        update();
    }
    clear() {
        let libraryform = document.getElementById("libraryform")
        libraryform.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2 || book == " ") {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, messagedisplay) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success'
        }
        else {
            boldText = 'Error!'
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${boldText}:</strong> ${messagedisplay}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`

        setTimeout(() => {
            message.innerHTML = ''
        }, 5000);
    }
}

let libraryform = document.getElementById('libraryform');
libraryform.addEventListener('submit', libraryformsubmit);

function libraryformsubmit(e) {
    e.preventDefault()
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let book = new Book(name, author);
    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear()
        display.show('success', 'You have successfully added the book')
    }
    else {
        display.show('danger', 'Sorry! The book is not added')
    }
}

 let myinput = document.getElementById("myinput");
     myinput.addEventListener('input',()=>{
    let inputval = myinput.value.toLowerCase();
    let tablebody = document.getElementById("tablebody")
   let  tr = tablebody.getElementsByTagName("tr");

   for(let i =1; i<tr.length;i++){
       let td = tr[i].getElementsByTagName("td")[0];
       
       let textvalue = td.textContent.toLowerCase();

       if(textvalue.includes(inputval)){
           tr[i].style.display = ""
       }
       else{
           tr[i].style.display = "none"
       }
   }
})
