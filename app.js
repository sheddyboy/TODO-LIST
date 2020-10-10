const taskAdd = document.querySelector("#add-task");
const navs = document.querySelectorAll(".nav-link");
let taskList = document.querySelector(".task-list");
let trashList = document.querySelector(".trash-list");
let completedList = document.querySelector(".completed-list");
const searchInput = document.querySelector("#search-input input");
const editModal = document.querySelector("#edit-modal input");
const editModalBtn = document.querySelector("#edit-modal button");

const ui = new UI();

function movingAnimation(e, sign, currentList){
    const currentTask = e.target.parentElement.parentElement.parentElement;

    anime({
        targets:`#${currentTask.id}`,
        translateX: `${sign}110%`,
        duration: 400,
        easing:"easeInBack"
    });
    
    setTimeout(()=>{
        ui.removeTask(currentTask);
        if(currentList.firstElementChild.childElementCount < 1){
            ui.noTaskVisibility("on");
            ui.searchVisibility("off");
        }
    },600);
}

taskAdd.addEventListener("click",()=>{
    ui.addTask();
});

navs.forEach(nav =>{
    nav.addEventListener("click",(e)=>{
        if(nav === e.target){
            ui.switchTabs(e.target);
        }
    });
});

taskList.addEventListener("click",(e)=>{
    taskList = document.querySelector(".task-list");

    if(e.target.classList.contains("fa-trash-alt")){
        ui.toTrash(e.target);

        movingAnimation(e,"+",taskList);

        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        ui.removeFromLocalStorage("Task2.0",text);
    }

    if(e.target.classList.contains("fa-check-square")){
        ui.toCompleted(e.target);

        movingAnimation(e,"+",taskList);

        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        ui.removeFromLocalStorage("Task2.0",text);
    }  
    
    if(e.target.classList.contains("fa-edit")){
        $('#edit-modal').modal('toggle');

        let data = e.target.parentElement.parentElement.previousElementSibling;

        editModal.value = data.textContent;

        return currentTarget = data;
    }
});

editModalBtn.addEventListener("click", ()=>{
    let validation = true;
    const arrayLS = ui.returnLocalStorage();

    arrayLS.forEach(ls =>{
        ls.forEach(task =>{
            if(task === editModal.value){
                editModal.classList.add("is-invalid");

                setTimeout(()=>{
                    editModal.classList.remove("is-invalid");
                },1700);

                validation = false;
            }
        });
    });

    if(validation){
        $('#edit-modal').modal('toggle');
    
        let taskListArray = JSON.parse(localStorage.getItem("Task2.0"));
    
        taskListArray.forEach((list,index,array) =>{
            if(list === currentTarget.textContent){
                array.splice(index,1,editModal.value);
            }
        });
    
        localStorage.setItem("Task2.0",JSON.stringify(taskListArray));
    
        currentTarget.textContent = editModal.value;
    
        
    }
});

completedList.addEventListener("click",(e)=>{
    completedList = document.querySelector(".completed-list");

    if(e.target.classList.contains("fa-undo")){
        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        
        ui.toTask(e.target);

        movingAnimation(e,"-",completedList);

        ui.removeFromLocalStorage("Completed2.0",text);
    }

    if(e.target.classList.contains("fa-trash-alt")){
        ui.toTrash(e.target);

        movingAnimation(e,"+",completedList);

        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        ui.removeFromLocalStorage("Completed2.0",text);
    }
});

trashList.addEventListener("click",(e)=>{
    trashList = document.querySelector(".trash-list");

    if(e.target.classList.contains("fa-undo")){
        ui.toTask(e.target);

        movingAnimation(e,"-",trashList);

        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        ui.removeFromLocalStorage("Trash2.0",text);
    }

    if(e.target.classList.contains("fa-trash")){
        movingAnimation(e,"+",trashList);

        const text = e.target.parentElement.parentElement.parentElement.firstElementChild.textContent;
        ui.removeFromLocalStorage("Trash2.0",text);
    }
});

searchInput.addEventListener("keyup",()=>{
    taskListItems = document.querySelectorAll("#task-list .list-group-item p");
    trashListItems = document.querySelectorAll("#trash-list .list-group-item p");
    completedListItems = document.querySelectorAll("#completed-list .list-group-item p");

    taskListItems.forEach(item =>{
        if(item.textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1){
            item.parentElement.style.display = "block";
        }else{
            item.parentElement.style.display = "none";
        }
    });

    trashListItems.forEach(item =>{
        if(item.textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1){
            item.parentElement.style.display = "block";
        }else{
            item.parentElement.style.display = "none";
        }
    });

    completedListItems.forEach(item =>{
        if(item.textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1){
            item.parentElement.style.display = "block";
        }else{
            item.parentElement.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.getItem("Completed2.0")){
        let storedCompletedList = JSON.parse(localStorage.getItem("Completed2.0"));

        storedCompletedList.forEach(list =>{
            ui.toCompleted(null,list);
        });
    }

    if(localStorage.getItem("Trash2.0")){
        let storedTrashList = JSON.parse(localStorage.getItem("Trash2.0"));

        storedTrashList.forEach(list =>{
            ui.toTrash(null,list);
        });
    }

    if(localStorage.getItem("Task2.0")){
        let storedTaskList = JSON.parse(localStorage.getItem("Task2.0"));

        storedTaskList.forEach(list =>{
            ui.toTask(null,list);

            if(taskList.firstElementChild.childElementCount > 0){
                ui.taskVisibility("on");
                ui.noTaskVisibility("off");
                ui.searchVisibility("on");
            }
        });
    }
});