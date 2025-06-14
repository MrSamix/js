const form = document.getElementById("todoForm")
const input = document.getElementById("todoInput")
const addButton = document.getElementById("addBtn")
const charCount = document.getElementById("charCount")
const hoverMsg = document.getElementById("hoverMsg")
const list = document.getElementById("todoList")
const deleteAllBtn = document.getElementById("deleteAllBtn")
const activeTaskCount = document.getElementById("activeTaskCount")


function updateActiveTaskCount() {
    activeTasks = 0;
    const taskItems = list.querySelectorAll("#todoList li");
    for (const item of taskItems) {
        if (!item.classList.contains("completed")) {
            activeTasks++;
        }
    }
    activeTaskCount.textContent = `Active tasks : ${activeTasks}`;
}

function isUniqueTask(taskText) {
    const taskItems = list.querySelectorAll("#todoList li");
    for (const item of taskItems) {
        let text = item.textContent.trim();
        text = text.substring(0, text.length-5)
        if (text === taskText) {
            return false;
        }
    }
    return true;
}



form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const taskText = input.value.trim();
    if(taskText === "") {return;}
    if (!isUniqueTask(taskText)) {
        hoverMsg.textContent = "This task already exists!";
        input.value = "";
        input.focus();
        return;
    } 
    else {
        hoverMsg.textContent = "";
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const block = document.createElement("div");
    block.classList.add("buttons");
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    block.appendChild(editBtn);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X"
    deleteBtn.classList.add("deleteBtn")
    block.appendChild(deleteBtn);

    li.appendChild(block);

    list.appendChild(li);
    input.value = "";
    charCount.textContent = "Entered symbols : 0";
    input.focus();
    updateActiveTaskCount();
})

list.addEventListener("click", e => {
    const target = e.target;

    if (target.classList.contains("deleteBtn")) {
        const li = target.parentElement.parentElement;
        list.removeChild(li)
        updateActiveTaskCount();
        hoverMsg.textContent = "";
        return;
    }
    if (target.classList.contains("editBtn")) {
        let newTask = prompt("Enter a new task");
        
        if (newTask != null && isUniqueTask(newTask)) {
            const li = target.parentElement.parentElement
            li.textContent = newTask;

            const block = document.createElement("div");
            block.classList.add("buttons");
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("editBtn");
            block.appendChild(editBtn);
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X"
            deleteBtn.classList.add("deleteBtn")
            block.appendChild(deleteBtn);

            li.appendChild(block);
            return;
        }
    }
    if (target.tagName === "LI") {
        target.classList.toggle("completed")
        updateActiveTaskCount();
    }
})

input.addEventListener("input", e => {
    charCount.textContent = `Entered symbols : ${e.target.value.length}`
})

input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        addButton.click();
    }
})

addButton.addEventListener("mouseover", () => {
    hoverMsg.textContent = "Click to add a task!";
})

addButton.addEventListener("mouseout", () => {
    hoverMsg.textContent = "";
})


list.addEventListener("mouseover", e => {
    const target = e.target;
    if (target.classList.contains("deleteBtn")) {
        hoverMsg.textContent = "Click to delete a task";
    }
})


list.addEventListener("mouseout", e => {
    const target = e.target;
    if (target.classList.contains("deleteBtn")) {
        hoverMsg.textContent = "";
    }
})

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        list.innerHTML = "";
        hoverMsg.textContent = "All tasks deleted!";
        updateActiveTaskCount();
    } else {
        hoverMsg.textContent = "Deletion cancelled.";
    }
})


deleteAllBtn.addEventListener("mouseover", () => {
    hoverMsg.textContent = "Click to delete all tasks!";
})

deleteAllBtn.addEventListener("mouseout", () => {
    hoverMsg.textContent = "";
})