function Book(name, author, time, status) {
    this.name = name;
    this.author = author;
    this.time = time;
    this.status = status;
}
 
function Display() {
 
}
 
Display.prototype.add = function (book, index) {
    tableBody = document.getElementById("tableBody");
    let uiString = `
                    <tr>
                        <td>${index}</td>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.time}</td>
                        <td>${book.status}  <span style="margin-left: 50px;"><i class="fas fa-edit"></i></span></td>
                    </tr>`;
    tableBody.innerHTML += uiString;
};
 
 
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
};
 

 
var index = 0;
var serial = 0;
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmit);
 
function formSubmit(e) {
    e.preventDefault();
    // console.log('You have successfully submitted the form!')
 
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let date = new Date();
    let cdate = date.getDate();
    let cmonth = date.getMonth()+1;
    let cyear = date.getFullYear();
    let chours = date.getHours();
    let cmins = date.getMinutes();
    let status = "";
    if(chours>12){
        chours-=12;
        status = "PM";
    }else{
        status = "AM";
    }
 
    let dateAndTime = `${cdate}/${cmonth}/${cyear} at ${chours}:${cmins} ${status}`;
  
 
    let status_book = "Not Returned";
 
 
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
 
    let myObj = {
        id: serial+=1,
        book_name: name,
        issued_to: author,
        issued_time: dateAndTime,
        status: status_book
    };
    notesObj.push(myObj);
    console.log(notesObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
 
    let book = new Book(name, author, dateAndTime, status_book);

 
 
    let display = new Display();
 
 
    index += 1;
    display.add(book, index);
    display.clear();
 
 
}