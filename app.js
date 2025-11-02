$(function (){

/* ====== Task functionality ====== */

let tasks = [
    { id: uid(), title: "Sample task A", completed: false },
    { id: uid(), title: "Sample task B", completed: true  },
];

// unique random id for each task to avoid confusion in tasks
function uid() {
    return Math.random().toString(36).slice(2, 10);
}
// DOM Elements
const $todo = $("#taskList");
const $done = $("#completedList");
const $input = $("#taskInput");

// Add task

$("#addBtn").on("click", function() {
    const text = $input.val().trim();   // ignore leading whitespaces
    if (!text) return;  // ignore empty

    const task = {id: uid(), title: text, completed: false}

    tasks.push(task);
    $todo.append(renderItem(task));

    $input.val("").focus();     // reset input 
});

// Render helpers

function renderAll(){
    $todo.empty();
    $done.empty();
    for (const task of tasks){
        const $row = renderItem(task);
        (task.completed ? $done : $todo).append($row);
    }
}

function renderItem(task) {
  const $li = $(`
    <li class="d-flex align-items-center gap-2 py-2" data-id="${task.id}">
      <input type="checkbox" class="form-check-input task-check">
      <span class="title flex-grow-1"></span>
      <button class="btn btn-sm btn-outline-secondary up"   type="button" aria-label="Move up">↑</button>
      <button class="btn btn-sm btn-outline-secondary down" type="button" aria-label="Move down">↓</button>
      <button class="btn btn-sm btn-outline-danger remove"  type="button" aria-label="Remove">✕</button>
    </li>
  `);
  $li.find(".title").text(task.title);
  $li.find(".task-check").prop("checked", task.completed);
  $li.toggleClass("text-decoration-line-through opacity-75", task.completed);
  
  return $li;
}




$input.on("keydown", function (e){
    if (e.key === "Enter") $("#addBtn").click();
})

// Toggle complete and incomplete

$("#taskList, #completedList").on("change", ".task-check", function () {
    const $li = $(this).closest("li");
    const id = $li.data("id");
    const task = tasks.find(x => x.id === id);
    if (!task) return;

    task.completed = this.checked; // 'this' is the checkbox
    
    // Move the row to the correct list and update style
    $li.toggleClass("text-decoration-line-through opacity-75", task.completed);
    (task.completed ? $done : $todo).append($li);
});

// Remove
$("#taskList, #completedList").on("click", ".remove", function () {
    const $li = $(this).closest("li");
    const id = $li.data("id");
    // remove from data
    tasks = tasks.filter(x => x.id !== id);
    // remove from DOM
    $li.remove();
});

// Reorder with up and down

$("#taskList, #completedList").on("click", ".up, .down", function () {
    const $li = $(this).closest("li");
    const id = $li.data("id");

    // Find the task's index in the overall array
    const idx = tasks.findIndex(task => task.id === id);
    if (idx === -1) return;

    // Build the indices of that "group" (either all completed or all active)
    const groupIsCompleted = tasks[idx].completed;
    const groupIndices = tasks
      .map((task, i) => ({ i, task }))
      .filter(x => x.task.completed === groupIsCompleted)
      .map(x => x.i);

    const posInGroup = groupIndices.indexOf(idx);

    if ($(this).hasClass("up") && posInGroup > 0) {  // if not first
      const a = groupIndices[posInGroup - 1], b = idx;
      [tasks[a], tasks[b]] = [tasks[b], tasks[a]];   // swap in data
      $li.prev().before($li);                        // swap in DOM
    }

    if ($(this).hasClass("down") && posInGroup < groupIndices.length - 1) {   // if not last
      const a = idx, b = groupIndices[posInGroup + 1];
      [tasks[a], tasks[b]] = [tasks[b], tasks[a]];  // swap in data
      $li.next().after($li);                        // swap in DOM
    }
});


renderAll();



// Dark mode button
const btn = document.getElementById('btn');

// Dark mode event listener
btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
})

// event listener for task animations
document.addEventListener("DOMContentLoaded", () => {
   const elements = document.querySelectorAll(".fade-in-element");

   // add show animation when content is loaded
   elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("show");
        }, 200 * index);
   });
});

// guest login button
const guestbtn = document.getElementById('guestbtn');

// guest-login event listner
guestbtn.addEventListener('click', function () {
    window.location.href = 'to-do.html';
});

});
