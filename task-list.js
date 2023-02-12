// Open the database


    const request1 = indexedDB.open("tasks", 1);
  
    request1.onsuccess = function(event) {
        db = event.target.result;

        // Get all tasks from the database and add them to the task list
        const objectStore = db.transaction("tasks").objectStore("tasks");
        objectStore.openCursor().onsuccess = function(event) {
          const cursor = event.target.result;
          if (cursor) {
            const taskName = cursor.value.taskName;
            const taskId = cursor.value.id;
      
            const taskList = document.getElementById("task-list");
            const taskItem = document.createElement("li");
            const taskLink = document.createElement("a");
            taskLink.href = `task.html?id=${taskId}`;
            taskLink.textContent = taskName;
            taskItem.appendChild(taskLink);
            taskList.appendChild(taskItem);
      
            cursor.continue();
          }
        };
    };
  
    request1.onerror = function(event) {
      console.error("Failed to open database", event.target.errorCode);
    };
 
