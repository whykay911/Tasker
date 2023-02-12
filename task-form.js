var request = window.indexedDB.open("taskDatabase", 2);

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("description", "description", { unique: false });
  objectStore.createIndex("assignTo", "assignTo", { unique: false });
  objectStore.createIndex("startDate", "startDate", { unique: false });
  objectStore.createIndex("endDate", "endDate", { unique: false });
};

request.onerror = function(event) {
  console.error("Database error: " + event.target.errorCode);

};


request.onsuccess = function(event) {
  var db = event.target.result;
  
  var form = document.getElementById("task-form");
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      var name = form.elements.name.value;
      var description = form.elements.description.value;
      var assignTo = form.elements.assignTo.value;
      var startDate = form.elements.startDate.value;
      var endDate = form.elements.endDate.value;
      var tx = db.transaction("tasks", "readwrite");
      var objectStore = tx.objectStore("tasks");
      var request = objectStore.add({
        name: name,
        description: description,
        assignTo: assignTo,
        startDate: startDate,
        endDate: endDate
      });

      request.onsuccess = function(event) {
      console.log("Task added to database");
      };

      request.onerror = function(event) {
      console.error("Database error: " + event.target.errorCode);
      };
  });
}






