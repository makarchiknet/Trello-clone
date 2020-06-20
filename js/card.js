const Card = {
   counter: 4,
   drugged: null,
   dropped: null,

   addElement(cardElement) {

      const addTaskBtn = cardElement.querySelector('[data-action-addNote]');

      addTaskBtn.addEventListener('click', (event) => {

         const task = Task.create();

         cardElement.querySelector('[data-notes]').append(task);

         task.setAttribute('contenteditable', 'true');
         task.focus();

      });

      const cardHeader = cardElement.querySelector('.column-header');

      cardHeader.addEventListener('dblclick', (event) => {
         cardHeader.setAttribute('contenteditable', 'true');
         cardHeader.focus();
         cardElement.removeAttribute('draggable');
      });

      cardHeader.addEventListener('blur', (event) => {
         cardHeader.removeAttribute('contenteditable');
         cardElement.setAttribute('draggable', 'true');
      });
      cardElement.addEventListener('dragstart', Card.dragstart);
      cardElement.addEventListener('dragend', Card.dragend);
      // cardElement.addEventListener('dragenter', Card.dragenter);
      cardElement.addEventListener('dragover', Card.dragover);
      // cardElement.addEventListener('dragleave', Card.dragleave);
      cardElement.addEventListener('drop', Card.dragdrop);
   },

   dragstart(event) {
      Card.dragged = this;
      this.classList.add('dragged');

      event.stopPropagation();

      document
         .querySelectorAll('.note')
         .forEach(task => task.removeAttribute('draggable'));
   },

   dragend(event) {
      event.stopPropagation();
      Card.dragged = null;
      Card.dropped = null;

      this.classList.remove('dragged');

      document
         .querySelectorAll('.note')
         .forEach(task => task.setAttribute('draggable', 'true'));
      // console.log('-');

   },

   // dragenter(event) {
   //    event.stopPropagation();
   //    if (!Card.dragged || this === Card.dragged) {
   //       return;
   //    }
   //    if (this || this.children) {
   //       this.classList.add('under');
   //    }
   // },

   dragover(event) {
      Card.dropped = this;

      event.preventDefault();
      event.stopPropagation();

      if (Card.dropped === this) {
         if (Card.dropped) {
            Card.dropped.classList.remove('under');
         }
         Card.dropped = null;
      }


      if (!Card.dragged || this === Card.dragged) {
         return;
      }

      Card.dropped = this;

      document
         .querySelectorAll('.column')
         .forEach(item => item.classList.remove('under'));

      this.classList.add('under');
   },

   // dragleave(event) {
   //    // event.stopPropagation();

   //    if (!Card.dragged || this === Card.dragged) {
   //       return;
   //    }
   //    console.log(this.children);
   //    if (this && this.children) {
   //       this.classList.remove('under');
   //       this.children.forEach(item => item.classList.remove('block'));
   //    }

   // },

   dragdrop(event) {
      if (Task.dragged) {
         return this.querySelector('[data-notes]').append(Task.dragged);
      }
      else if (Card.dragged) {
         const children = Array.from(document.querySelector('.columns').children),
            indexA = children.indexOf(this),
            indexB = children.indexOf(Card.dragged);
         console.log(indexA, indexB);

         if (indexA < indexB) {
            document.querySelector('.columns').insertBefore(Card.dragged, this);
         } else {
            document.querySelector('.columns').insertBefore(Card.dragged, this.nextElementSibling);
         }

         document
            .querySelectorAll('.column')
            .forEach(item => item.classList.remove('under'));
      }

   }
};