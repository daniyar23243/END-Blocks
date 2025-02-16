function allowDrop (ev) {
  ev.preventDefault();
}

function drag (ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop (ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    const droppedElement = document.getElementById(data);
    droppedElement.addEventListener("dragend", () => {
      droppedElement.draggable= false;  
  })
if (droppedElement.classList.contains("t-shape")) {
  droppedElement.style.transform = "translateX(-3.25rem)";
  }
if (droppedElement.classList.contains("l-shape")) {
    droppedElement.style.transform = "translateY(-3.25rem)";
    }
if (droppedElement.classList.contains("o-shape")) {
    droppedElement.classList.add("moved");
  }      
}

function dragStart(ev) {
    console.log("dragging")
    ev.target.classList.add("dragging");
  }
  
  function dragEnd(ev) {
    console.log("no drag")
    ev.target.classList.remove("dragging");
  }

