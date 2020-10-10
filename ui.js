class UI {
    constructor(){
        this.taskList = document.querySelector(".task-list");
        this.completedList = document.querySelector(".completed-list");
        this.trashList = document.querySelector(".trash-list");
        this.noTask = document.querySelector(".no-task");
        this.search = document.querySelector("#search-input");
        this.addInput = document.querySelector("#add-input");
        this.inputContainer = document.querySelector("#input-container");
        this.navs = document.querySelectorAll(".nav-link");
        this.id_no = 1;
    }

    // Adding to the Task List
    addTask(){
        const addInputValue = this.addInput.firstElementChild.firstElementChild.value;

        // Setting up Local Storage
        this.checkLocalStorage("Task2.0");
        this.checkLocalStorage("Trash2.0");
        this.checkLocalStorage("Completed2.0");

        // Getting data from local storage
        let storedTaskList = JSON.parse(localStorage.getItem("Task2.0"));
        let storedTrashList = JSON.parse(localStorage.getItem("Trash2.0"));
        let storedCompletedList = JSON.parse(localStorage.getItem("Completed2.0"));

                    // Validation
        let validation = true;
        
        // Checks if input has been repeated in Task list and returns true or false
        const repTaList = storedTaskList.some(listItem =>{
            return listItem === addInputValue;
        });

        // Checks if input has been repeated in Trash list and returns true or false
        const repTrList = storedTrashList.some(listItem =>{
            return listItem === addInputValue;
        });

        // Checks if input has been repeated in Completed list and returns true or false
        const repCompList = storedCompletedList.some(listItem =>{
            return listItem === addInputValue;
        });


        // Checks if a list item has been repeated
        if(repTaList || repTrList || repCompList){
            this.addInput.firstElementChild.firstElementChild.classList.add("is-invalid");

            setTimeout(()=>{
                this.addInput.firstElementChild.firstElementChild.classList.remove("is-invalid");
            },1700);

            validation = false;
        }

        // Add item to task list
        if(addInputValue != "" && validation){
            this.searchVisibility("on");
            this.noTaskVisibility("off");
            this.taskVisibility("on");

            const li = document.createElement("li");
            li.className = "list-group-item mb-2";
            li.id = `task-${this.id_no}`;
            this.id_no++;
        
            li.innerHTML= 
            `
            <p class="mb-1">${addInputValue}</p>
            <span class="mr-3"><a href="#!"><i class="far fa-edit text-muted"></i></a></span>
            <span class="mr-3"><a href="#!"><i class="far fa-trash-alt text-muted"></i></a></span>
            <span class="mr-3"><a href="#!"><i class="far fa-check-square text-muted"></i></a></span>
            `;
          
            this.taskList.firstElementChild.append(li);
            this.clearInputField();

            this.addToLocalStorage("Task2.0",addInputValue);
        }
    }

    // Adding to the Completed List
    addCompleted(data){
        this.completedList.firstElementChild.append(data);
    }

    // Adding to the Trash List
    addTrash(data){
        this.trashList.firstElementChild.append(data);
    }

    // Clear Input field
    clearInputField(){
        this.addInput.firstElementChild.firstElementChild.value = "";
    }

    // Toggle Visibility
    searchVisibility(trigger){
        if(trigger === "on"){
            this.search.classList.remove("d-none");
        }else if(trigger === "off"){
            this.search.classList.add("d-none");
        }
    }

    noTaskVisibility(trigger){
        if(trigger === "on"){
            this.noTask.classList.remove("d-none");
        }else if(trigger === "off"){
            this.noTask.classList.add("d-none");
        }
    }

    inputContVisibility(trigger){
        if(trigger === "on"){
            this.inputContainer.classList.remove("d-none");
        }else if(trigger === "off"){
            this.inputContainer.classList.add("d-none");
        }
    }
    
    addInputVisibility(trigger){
        if(trigger === "on"){
            this.addInput.classList.remove("d-none");
        }else if(trigger === "off"){
            this.addInput.classList.add("d-none");
        }
    }

    taskVisibility(trigger){
        if(trigger === "on"){
            this.taskList.classList.remove("d-none");
        }else if(trigger === "off"){
            this.taskList.classList.add("d-none");
        }
    }

    completedTaskVisibility(trigger){
        if(trigger === "on"){
            this.completedList.classList.remove("d-none");
        }else if(trigger === "off"){
            this.completedList.classList.add("d-none");
        }
    }

    trashTaskVisibility(trigger){
        if(trigger === "on"){
            this.trashList.classList.remove("d-none");
        }else if(trigger === "off"){
            this.trashList.classList.add("d-none");
        }
    }

    // Switch Tabs
    switchTabs(target){
        this.navs.forEach(nav =>{
            nav.classList.remove("active");
        });
        target.classList.add("active");

        this.inputContVisibility("off");
        this.noTaskVisibility("off");
        this.taskVisibility("off");
        this.completedTaskVisibility("off");
        this.trashTaskVisibility("off");

        if(target.id === "task-tab"){
            if(this.taskList.firstElementChild.childElementCount < 1){
                this.addInputVisibility("on");
                this.searchVisibility("off");
                this.inputContVisibility("on");
                this.noTaskVisibility("on");
            }else{
                this.inputContVisibility("on");
                this.addInputVisibility("on");
                this.noTaskVisibility("off");
                this.taskVisibility("on");
                this.searchVisibility("on");
            }
        }

        if(target.id === "completed-tab"){
            if(this.completedList.firstElementChild.childElementCount < 1){
                this.noTaskVisibility("on");
            }else{
                this.inputContVisibility("on");
                this.addInputVisibility("off");
                this.searchVisibility("on");
                this.completedTaskVisibility("on");
            }
        }

        if(target.id === "trash-tab"){
            if(this.trashList.firstElementChild.childElementCount < 1){
                this.noTaskVisibility("on");
            }else{
                this.inputContVisibility("on");
                this.addInputVisibility("off");
                this.searchVisibility("on");
                this.trashTaskVisibility("on");
            }
        }
    }

    // Move List
    toCompleted(target,storedData){
        let data;
        if(target){
            data = target.parentElement.parentElement.parentElement.firstElementChild.textContent;

            this.addToLocalStorage("Completed2.0",data);
        }else{
            data = storedData;
        }

        const li = document.createElement("li");
        li.className = "list-group-item mb-2";
        li.id = `completed-${this.id_no}`;
        this.id_no++;

        li.innerHTML= 
        `
        <p class="mb-1">${data}</p>
        <span class="mr-3"><a href="#!"><i class="fas fa-undo text-muted"></i></a></span>
        <span class="mr-3"><a href="#!"><i class="far fa-trash-alt text-muted"></i></a></span>
        `;

        this.addCompleted(li);
    }

    toTrash(target,storedData){
        let data;
        if(target){
            data = target.parentElement.parentElement.parentElement.firstElementChild.textContent;

            this.addToLocalStorage("Trash2.0",data);
        }else{
            data = storedData;
        }

        const li = document.createElement("li");
        li.className = "list-group-item mb-2";
        li.id = `trash-${this.id_no}`;
        this.id_no++;
    
        li.innerHTML= 
        `
        <p class="mb-1">${data}</p>
        <span class="mr-3"><a href="#!"><i class="fas fa-undo text-muted"></i></a></span>
        <span class="mr-3"><a href="#!"><i class="fas fa-trash text-danger"></i></a></span>
        `;

        this.addTrash(li);
    }

    toTask(target,storedData){
        let data;
        if(target){
            data = target.parentElement.parentElement.parentElement.firstElementChild.textContent;

            this.addToLocalStorage("Task2.0",data);
        }else{
            data = storedData;
        }

        const li = document.createElement("li");
        li.className = "list-group-item mb-2";
        li.id = `task-${this.id_no}`;
        this.id_no++;
    
        li.innerHTML= 
        `
        <p class="mb-1">${data}</p>
        <span class="mr-3"><a href="#!"><i class="far fa-edit text-muted"></i></a></span>
        <span class="mr-3"><a href="#!"><i class="far fa-trash-alt text-muted"></i></a></span>
        <span class="mr-3"><a href="#!"><i class="far fa-check-square text-muted"></i></a></span>
        `;

        this.taskList.firstElementChild.append(li);
    }

    // Remove Task
    removeTask(task){
        task.remove();
    }

    // Local Storage
    addToLocalStorage(key,value){
        if(localStorage.getItem(key)){
            let storageList = JSON.parse(localStorage.getItem(key));
            storageList.push(value);
            localStorage.setItem(key,JSON.stringify(storageList));
        }else{
            let storageList = [];
            storageList.push(value);
            localStorage.setItem(key,JSON.stringify(storageList));
        }
    }

    removeFromLocalStorage(key,value){
        let storageList = JSON.parse(localStorage.getItem(key));

        storageList.forEach((list,index) =>{
            if(value === list){
                storageList.splice(index,1);
            }
        });

        localStorage.setItem(key,JSON.stringify(storageList));
    }

    checkLocalStorage(task){
        if(JSON.parse(localStorage.getItem(task)) === null){
            localStorage.setItem(task,JSON.stringify([]));
        }
    }

    returnLocalStorage(){
        let storedTaskList = JSON.parse(localStorage.getItem("Task2.0"));
        let storedTrashList = JSON.parse(localStorage.getItem("Trash2.0"));
        let storedCompletedList = JSON.parse(localStorage.getItem("Completed2.0"));

        return [storedTaskList, storedCompletedList, storedTrashList];
    }
}