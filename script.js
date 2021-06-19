var form = document.getElementById("form");
var addButton = document.getElementById("addButton");
var postButton = document.getElementById("postButton");
function openForm(){
    form.hidden = false;
    addButton.hidden = true;
    postButton.hidden = false;
}
function closeForm(){
    form.hidden = true;
    addButton.hidden = false;
    postButton.hidden = true;
}