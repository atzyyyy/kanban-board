const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const s = ["backlog", "todo", "in-progress", "done"];
const backlogs = document.querySelector("#backlog");
const todo = document.querySelector("#todo");
const inProgress = document.querySelector("#in-progress");
const done = document.querySelector("#done");

const form = document.getElementById("form-task");
const div = document.createElement("div");

function displayTasks(task) {
    const p = document.createElement("div");
    p.setAttribute("draggable", "true");
    p.setAttribute("ondragstart", "drag(event)");
    p.setAttribute("id", task.id);
    p.setAttribute("class", "task");
    p.innerText = task.name;
    if (task.status === "backlog") {
        backlogs.appendChild(p);
    }
    else if (task.status === "todo") {
        todo.appendChild(p);
    }
    else if (task.status === "in-progress") {
        inProgress.appendChild(p);
    }
    else if (task.status === "done") {
        done.appendChild(p);
    }
}

function createTask() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("task");
        const status = document.getElementById("status");
        const randId = crypto.randomUUID();

        if (input.value === "") {
            return;
        }
        const task = {
            id: randId,
            name: input.value,
            status: status.value,
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        input.value = "";
        displayTasks(task);
    })
}

function allowDrop(ev) {
    ev.preventDefault();
    if (s.includes(ev.target.id)) {
        ev.dataTransfer.dropEffect = "move";
    } else {
        ev.dataTransfer.dropEffect = "none";
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    tasks.find(task => task.id === data).status = ev.target.id
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ev.target.appendChild(document.getElementById(data));
}

window.onload = () => {
    for (let i = 0; i < tasks.length; i++) {
        displayTasks(tasks[i]);
    }
}