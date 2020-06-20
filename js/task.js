const Task = {

   counter: 8,
   dragged: null,

   makeChanges(task) {
      task.addEventListener('dblclick', (event) => {
         task.setAttribute('contenteditable', 'true');
         task.removeAttribute('draggable');
         task.closest('.column').removeAttribute('draggable');
         task.focus();
      });
      task.addEventListener('blur', (event) => {
         task.removeAttribute('contenteditable');
         if (!task.textContent.trim().length) {
            task.remove();
         } else {
            task.setAttribute('draggable', 'true');
            task.closest('.column').setAttribute('draggable', 'true');
         }

      });

      task.addEventListener('dragstart', Task.dragstart);
      task.addEventListener('dragend', Task.dragend);
      task.addEventListener('dragenter', Task.dragenter);
      task.addEventListener('dragover', Task.dragover);
      task.addEventListener('dragleave', Task.dragleave);
      task.addEventListener('drop', Task.drop);
   },

   create() {
      const task = document.createElement('div');
      task.classList.add('note');
      task.setAttribute('draggable', 'true');
      task.setAttribute('data-note-id', Task.counter);

      Task.counter++;
      Task.makeChanges(task);
      console.log(task);
      return task;

   },

   dragstart(event) {
      Task.dragged = this;
      this.classList.add('dragged');
      event.stopPropagation();
   },

   dragend(event) {
      Task.dragged = null;
      this.classList.remove('dragged');
      document
         .querySelectorAll('.note')
         .forEach(item => item.classList.remove('under'));

      event.stopPropagation();
   },

   dragenter(event) {
      if (!Task.dragged || this === Task.dragged) {
         return;
      }
      this.classList.add('under');
   },

   dragover(event) {
      event.preventDefault();
      if (!Task.dragged || this === Task.dragged) {
         return;
      }
   },

   dragleave(event) {
      if (!Task.dragged || this === Task.dragged) {
         return;
      }
      this.classList.remove('under');
   },

   drop(event) {
      event.stopPropagation();

      if (!Task.dragged || this === Task.dragged) {
         return;
      }

      if (this.parentElement === Task.dragged.parentElement) {
         const node = Array.from(this.parentElement.querySelectorAll('.note'));
         const indexA = node.indexOf(this);
         const indexB = node.indexOf(Task.dragged);

         if (indexA < indexB) {
            this.parentElement.insertBefore(Task.dragged, this);
         } else {
            this.parentElement.insertBefore(Task.dragged, this.nextElementSibling);
         }
      }

      else {
         this.parentElement.insertBefore(Task.dragged, this);
      }
   }

};