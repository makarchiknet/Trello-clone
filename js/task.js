
class Task {
   constructor(id = null, content = '') {

      const element = this.element = document.createElement('div');
      element.classList.add('note');
      element.setAttribute('draggable', 'true');
      element.textContent = content;

      if (id) {
         element.setAttribute('data-note-id', id);
      }
      else {
         element.setAttribute('data-note-id', Task.counter);
         Task.counter++;
      }

      console.log(Task.counter);

      element.addEventListener('dblclick', (event) => {
         element.setAttribute('contenteditable', 'true');
         element.removeAttribute('draggable');
         this.element.closest('.column').removeAttribute('draggable');
         element.focus();
      });
      element.addEventListener('blur', (event) => {
         element.removeAttribute('contenteditable');
         if (!element.textContent.trim().length) {
            element.remove();
         } else {
            element.setAttribute('draggable', 'true');
            this.element.closest('.column').setAttribute('draggable', 'true');
         }
         Application.save();
      });



      element.addEventListener('dragstart', this.dragstart.bind(this));
      element.addEventListener('dragend', this.dragend.bind(this));
      element.addEventListener('dragenter', this.dragenter.bind(this));
      element.addEventListener('dragover', this.dragover.bind(this));
      element.addEventListener('dragleave', this.dragleave.bind(this));
      element.addEventListener('drop', this.drop.bind(this));
   }

   dragstart(event) {
      Task.dragged = this.element;
      this.element.classList.add('dragged');
      event.stopPropagation();
   }

   dragend(event) {
      event.stopPropagation();

      Task.dragged = null;
      this.element.classList.remove('dragged');

      document
         .querySelectorAll('.note')
         .forEach(item => item.classList.remove('under'));

      Application.save();
   }

   dragenter(event) {
      if (!Task.dragged || this.element === Task.dragged) {
         return;
      }
      this.element.classList.add('under');
   }

   dragover(event) {
      event.preventDefault();
      if (!Task.dragged || this.element === Task.dragged) {
         return;
      }
   }

   dragleave(event) {
      if (!Task.dragged || this.element === Task.dragged) {
         return;
      }
      this.element.classList.remove('under');
   }

   drop(event) {
      event.stopPropagation();

      if (!Task.dragged || this.element === Task.dragged) {
         return;
      }

      if (this.element.parentElement === Task.dragged.parentElement) {
         const node = Array.from(this.element.parentElement.querySelectorAll('.note'));
         const indexA = node.indexOf(this.element);
         const indexB = node.indexOf(Task.dragged);

         if (indexA < indexB) {
            this.element.parentElement.insertBefore(Task.dragged, this.element);
         } else {
            this.element.parentElement.insertBefore(Task.dragged, this.element.nextElementSibling);
         }
      }

      else {
         this.element.parentElement.insertBefore(Task.dragged, this.element);
      }
   }
}

Task.counter = 8;
Task.dragged = null;





