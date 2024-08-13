const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(){
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if (isNaN(pages) || pages.trim() === "" || parseInt(pages) <= 0) {
        alert("Please enter a valid number of pages.");
        return; // Exit the function if the input is invalid
    }

    // Create a new book object
    const newBook = new Book(title, author, pages, read);

    // Add the new book to the library array
    myLibrary.push(newBook);

    // Update the display to show the new book
    displayBooks();

    // Reset the form after submission
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    document.querySelector('.form').classList.remove('visible');
}

function displayBooks(){
    const booksContainer = document.querySelector('.book-container');
    booksContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');


        bookCard.innerHTML = `
            <h2><strong>Title: </strong>${book.title}</h2>
            <h3><strong>Author: </strong>${book.author}</h3>
            <p><strong>Pages:${book.pages} pages</strong></p>
            <p>${book.read ? 'Read' : 'Not Read'}</p>
            <div class="button-container">
                <button class="remove-button" data-index="${index}">Remove</button>
                <button class="toggle-read-button" data-index="${index}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
            </div>
        `;

        booksContainer.appendChild(bookCard);
    });


    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            removeBookFromLibrary(index);
        });
    });

    document.querySelectorAll('.toggle-read-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            myLibrary[index].read = !myLibrary[index].read;
            displayBooks(); // Refresh the book list to reflect changes
        });
    });
}


function removeBookFromLibrary(index) {
    if (index >= 0 && index < myLibrary.length) {
        myLibrary.splice(index, 1);
        displayBooks();
    } else {
        console.error(`Invalid index: ${index}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('btn');
    const form = document.querySelector('.form');
    const cancel = document.getElementById('cancel');


    btn.addEventListener('click', () => {
        form.classList.toggle('visible');
    });

    cancel.addEventListener('click', () => {
        form.classList.remove('visible');
    });

    const submit = document.getElementById('submit');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        addBookToLibrary();
    });
});



