document.addEventListener("DOMContentLoaded", () => {
	const taskForm = document.getElementById("task-form");
	const taskInput = document.getElementById("task-input");
	const taskList = document.getElementById("task-list");
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	let editIndex = -1;

	function renderTasks() {
		taskList.innerHTML = "";
		tasks.forEach((task, index) => {
			const li = document.createElement("li");
			li.innerHTML = `
        <span class="${
					task.completed ? "complete" : ""
				}" data-index="${index}">${task.text}</span>
        <div>
          <button class="edit-btn" data-index="${index}">
            <i class="fas fa-edit"></i>
          </button>
          <button class="complete-btn" data-index="${index}">
            <i class="fas ${task.completed ? "fa-undo" : "fa-check"}"></i>
          </button>
          <button class="delete-btn" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
			taskList.appendChild(li);
		});
	}

	taskForm.addEventListener("submit", (e) => {
		e.preventDefault();
		if (editIndex === -1) {
			const task = {
				text: taskInput.value,
				completed: false,
			};
			tasks.push(task);
		} else {
			tasks[editIndex].text = taskInput.value;
			editIndex = -1;
		}
		taskInput.value = "";
		localStorage.setItem("tasks", JSON.stringify(tasks));
		renderTasks();
	});

	taskList.addEventListener("click", (e) => {
		const index = e.target.closest("button").getAttribute("data-index");
		if (e.target.closest("button").classList.contains("complete-btn")) {
			tasks[index].completed = !tasks[index].completed;
			localStorage.setItem("tasks", JSON.stringify(tasks));
			renderTasks();
		} else if (e.target.closest("button").classList.contains("delete-btn")) {
			if (confirm("Are you sure you want to delete this task?")) {
				tasks.splice(index, 1);
				localStorage.setItem("tasks", JSON.stringify(tasks));
				renderTasks();
			}
		} else if (e.target.closest("button").classList.contains("edit-btn")) {
			taskInput.value = tasks[index].text;
			editIndex = index;
		}
	});

	renderTasks();
});
