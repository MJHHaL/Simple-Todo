
//Container style
let container = document.querySelector(".container");
container.style.cssText = "display:flex; flex-direction:column; align-items:center; padding:20px; gap:10px"


//form div
let form = document.querySelector(".form");
form.style.cssText = "display:flex; justify-content:center; background-color:#eee; width:600px; padding:20px; border-radius:5px; gap:10px "

//input
let input = document.querySelector(".input");
input.style.cssText = "height:40px; width:300px; padding-left:10px; border:0px solid black; border-radius:5px;";

// submit
let submit = document.querySelector(".add");
submit.style.cssText = "border:0px solid black; cursor: pointer; width:100px; border-radius:5px; background-color:red; color:white";

let taskDiv = document.querySelector(".tasks");
taskDiv.style.cssText = "display:flex; flex-direction:column; width:400px; padding:20px; background-color:#eee; width:600px; border-radius:5px; ";


let p = document.createElement('p');
p.style.cssText = "display:flex; justify-content:center";


let arr = [];


getLocalStorage();

emptyMassage();

if (localStorage.getItem("task")) {
    arr = JSON.parse(localStorage.getItem("task"));
}

submit.onclick = function (e) {
    if (input.value.trim() !== "") {
        addToArr(input.value);
        input.value = '';
    } else {
        e.preventDefault();
        input.focus();
    }
}

function addToArr(textTask) {
    let task = {
        id: Date.now(),
        title: textTask,
    };
    arr.push(task);
    display(arr);
    localStorage.setItem("task", JSON.stringify(arr));
    emptyMassage()
}


function emptyMassage() {
    p.innerHTML = "";
    let tasks = localStorage.getItem("task");
    let taskArray = tasks ? JSON.parse(tasks) : [];
    let count = taskArray.length;
    if (count === 0) {
        let x = document.createTextNode("No Task");
        p.append(x);
        document.body.appendChild(p);
    } else {
        p.remove()
    }
}

function display(addArr) {
    taskDiv.innerHTML = "";
    addArr.forEach((e) => {
        let div = document.createElement("div");
        div.style.cssText = "display:flex;  justify-content:space-between ; padding:20px; margin:10px; background-color:white; width:500px; gap:10px;";
        let btn = document.createElement("button");
        btn.style.cssText = "border:0px solid black; cursor: pointer; height:30px; width:70px;  border-radius:5px; background-color:red; color:white";

        div.appendChild(document.createTextNode(e.title));
        btn.appendChild(document.createTextNode("Delete"));
        btn.onclick = () => {
            div.remove();
            arr = removes(e.id);
            emptyMassage()
        }
        div.appendChild(btn);
        taskDiv.appendChild(div);

    });
}

function removes(id) {
    let tasks = JSON.parse(localStorage.getItem("task"));
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("task", JSON.stringify(tasks));
    return tasks;
}

function getLocalStorage() {
    let data = localStorage.getItem("task");
    if (data) {
        let task = JSON.parse(data);
        display(task)
    }
}



