function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

// document.addEventListener('DOMContentLoaded', function() {
//   console.log('Документ загружен и готов!'); // Выводим в консоль при загрузке документа

//   fetch('figures.html')
//     .then(response => response.text())
//     .then(html => {
//       console.log('HTML файл загружен!'); // Выводим, когда файл загружен

//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, 'text/html');

//       // Получаем все элементы с классом "figure"
//       const allFigures = Array.from(doc.querySelectorAll('.figure'));
//       console.log('Найдено фигур: ', allFigures.length); // Выводим количество найденных фигур

//       // Функция для выбора случайных фигур
//       function getRandomFigures(arr, num) {
//         const randomFigures = [];
//         const usedIndexes = new Set();

//         while (randomFigures.length < num) {
//           const randomIndex = Math.floor(Math.random() * arr.length);

//           // Проверяем, не был ли уже выбран этот индекс
//           if (!usedIndexes.has(randomIndex)) {
//             randomFigures.push(arr[randomIndex]);
//             usedIndexes.add(randomIndex);
//           }
//         }

//         return randomFigures;
//       }

//       // Выбираем две случайные фигуры
//       const randomFigures = getRandomFigures(allFigures, 2);
//       console.log('Случайно выбранные фигуры: ', randomFigures); // Выводим выбранные фигуры

//       // Получаем спавнер, куда будем добавлять фигуры
//       const spawner = document.querySelector('.blockSpawner');
      
//       // Добавляем их в спавнер
//       randomFigures.forEach(figure => {
//         if (figure instanceof Node) {
//           spawner.appendChild(figure);
//           console.log('Фигура добавлена в спавнер: ', figure); // Выводим информацию о добавленной фигуре

//           // Привязываем обработчик событий dragstart для каждой фигуры
//           figure.addEventListener('dragstart', drag);
//         }
//       });
//     })
//     .catch(err => console.log('Ошибка загрузки фигуры: ', err)); // Выводим ошибку, если что-то пошло не так
// });



function allowDrop (ev) {
  ev.preventDefault();
}

function drop (ev) {

  const block = ev.target;
  const blockID = parseInt(block.id)  ;
    ev.preventDefault();
    if (block.children.length>0) {
      return;
    }
    const data = ev.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);
    ev.target.appendChild(droppedElement);
    droppedElement.addEventListener("dragend", () => {
      droppedElement.draggable= false;  
  })
  const children = Array.from(droppedElement.children);
if (droppedElement.classList.contains("t-shape")) {
  ev.target.removeChild(document.getElementById(data));
  document.getElementById(blockID).appendChild(children[3]);
  document.getElementById(blockID-1).appendChild(children[0]);
  document.getElementById(blockID+8).appendChild(children[1]);
  document.getElementById(blockID+1).appendChild(children[2])
  }
if (droppedElement.classList.contains("l-shape")) {
    children[3].classList.remove("corner");
    children[3].classList.add("placed", "l");
    document.getElementById(blockID).appendChild(children[3]);
    document.getElementById(blockID-8).appendChild(children[0]);
    document.getElementById(blockID+8).appendChild(children[1]);
    document.getElementById(blockID+9).appendChild(children[2]);
    ev.target.removeChild(document.getElementById(data));
    }
if (droppedElement.classList.contains("o-shape")) {
    document.getElementById(blockID-1).appendChild(children[0]);
    document.getElementById(blockID+1).appendChild(children[2]);
    document.getElementById(blockID).appendChild(children[1]);
    for (let i = 7; i<10; i++) {
      let tempId = blockID - i;
      let placedBlock = document.getElementById(tempId); 
      placedBlock.appendChild(children[15-i]);
      let tempId2 = blockID + i;
      let placedBlock2 = document.getElementById(tempId2); 
      placedBlock2.appendChild(children[i-4]);
    }
    ev.target.removeChild(document.getElementById(data));
  }  
  DeleteColumn();
  DeleteRow();
}


function DeleteColumn(){
  for (let j=1; j<=8; j++){
    if (checkColumn(j)){
      for (let k =0; k<8; k++){
        document.getElementById(j+k*8).removeChild(document.getElementById(j+k*8).firstElementChild);
      }
    }
  }
}


function checkColumn(colStartID) {
  const numRows = 8; // Укажите количество строк

  for (let i = 0; i < numRows; i++) {
    const block = document.getElementById(colStartID + i * 8);  // предполагаем, что у вас 8 блоков в колонне
    if (!block || !block.children.length>0) {
      return false;  // Если хотя бы один блок не содержит "placed", возвращаем false
    }
  }
  return true;  // Если все блоки в колонне содержат класс "placed", возвращаем true
}


function DeleteRow() {
  for (let j = 0; j < 8; j++) { // 8 строк
    let rowStartID = 1 + j * 8; // Начальный ID строки
    if (checkRow(rowStartID)) {
      for (let k = 0; k < 8; k++) { // 8 столбцов
        let block = document.getElementById(rowStartID + k);
        if (block.firstElementChild) {
          block.removeChild(block.firstElementChild);
        }
      }
    }
  }
}

function checkRow(rowStartID) {
  const numCol = 8; // Количество блоков в ряду
  for (let i = 0; i < numCol; i++) {
    const block = document.getElementById(rowStartID + i);
    if (!block || block.children.length === 0) {
      return false; // Если хотя бы один блок пуст, ряд не завершен
    }
  }
  return true; // Если все блоки заняты, ряд завершен
}
