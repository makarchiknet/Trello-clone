
document
   .querySelectorAll('.column')
   .forEach(Card.addElement);

document
   .querySelectorAll('.note')
   .forEach(Task.makeChanges);


document
   .querySelector('.adder')
   .addEventListener('click', (event) => {
      const taskCard = document.createElement('div');
      taskCard.classList.add('column');
      taskCard.setAttribute('draggable', 'true');
      taskCard.setAttribute('data-column-id', Card.counter);

      taskCard.innerHTML = `
   <p class="column-header" contenteditable="true">В плане</p>
   <div data-notes></div>
   <p class="column-footer">
      <span data-action-addNote class="action">+ Добавить задание</span>
   </p>`;

      Card.counter++;

      document.querySelector('.columns').append(taskCard);

      Card.addElement(taskCard);

   });

