class Card {
   constructor(id = null) {
      const instance = this;
      this.tasks = [];

      const element = this.element = document.createElement('div');
      element.classList.add('column');
      element.setAttribute('draggable', 'true');

      if (id) {
         element.setAttribute('data-column-id', id);
      }
      else {
         element.setAttribute('data-column-id', Card.counter);
         Card.counter++;
      }

      element.innerHTML = `
   <p class="column-header" contenteditable="true">В плане</p>
   <div data-notes></div>
   <p class="column-footer">
      <span data-action-addNote class="action">+ Add task</span>
   </p>`;

      const addTaskBtn = element.querySelector('[data-action-addNote]');

      addTaskBtn.addEventListener('click', (event) => {
         const task = new Task();
         instance.add(task.element);

         task.element.setAttribute('contenteditable', 'true');
         task.element.focus();

      });

      const cardHeader = element.querySelector('.column-header');

      cardHeader.addEventListener('dblclick', (event) => {
         cardHeader.setAttribute('contenteditable', 'true');
         cardHeader.focus();
         element.removeAttribute('draggable');
      });

      cardHeader.addEventListener('blur', (event) => {
         cardHeader.removeAttribute('contenteditable');
         element.setAttribute('draggable', 'true');

         Application.save();
      });

      element.addEventListener('dragstart', this.dragstart.bind(this));
      element.addEventListener('dragend', this.dragend.bind(this));
      element.addEventListener('dragover', this.dragover.bind(this));
      element.addEventListener('drop', this.dragdrop.bind(this));

   }

   add(...tasks) {
      for (const task of tasks) {
         if (!this.tasks.includes(task)) {
            this.tasks.push(task);

            this.element.querySelector('[data-notes]').append(task);

         }
      }
   }

   dragstart(event) {
      Card.dragged = this.element;
      this.element.classList.add('dragged');

      event.stopPropagation();

      document
         .querySelectorAll('.note')
         .forEach(task => task.removeAttribute('draggable'));
   }

   dragend(event) {
      event.stopPropagation();
      Card.dragged = null;
      Card.dropped = null;

      this.element.classList.remove('dragged');

      document
         .querySelectorAll('.note')
         .forEach(task => task.setAttribute('draggable', 'true'));

      document
         .querySelectorAll('.column')
         .forEach(cardElement => cardElement.classList.remove('under'));

      Application.save();
   }

   dragover(event) {
      Card.dropped = this.element;

      event.preventDefault();
      event.stopPropagation();

      if (Card.dropped === this.element) {
         if (Card.dropped) {
            Card.dropped.classList.remove('under');
         }
         Card.dropped = null;
      }


      if (!Card.dragged || this.element === Card.dragged) {
         return;
      }

      Card.dropped = this.element;

      document
         .querySelectorAll('.column')
         .forEach(item => item.classList.remove('under'));

      this.element.classList.add('under');
   }

   dragdrop(event) {
      if (Task.dragged) {
         return this.element.querySelector('[data-notes]').append(Task.dragged);
      }
      else if (Card.dragged) {
         const children = Array.from(document.querySelector('.columns').children),
            indexA = children.indexOf(this.element),
            indexB = children.indexOf(Card.dragged);

         if (indexA < indexB) {
            document.querySelector('.columns').insertBefore(Card.dragged, this.element);
         } else {
            document.querySelector('.columns').insertBefore(Card.dragged, this.element.nextElementSibling);
         }

         document
            .querySelectorAll('.column')
            .forEach(item => item.classList.remove('under'));
      }

   }
}

Card.counter = 4;
Card.drugged = null;
Card.dropped = null;




