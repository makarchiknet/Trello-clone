const Application = {
   save() {
      const object = {
         cards: {
            counter: 1,
            card: []
         },
         tasks: {
            caunter: 1,
            task: []
         }
      };

      document
         .querySelectorAll('.column')
         .forEach(cardElement => {

            const card = {
               title: cardElement.querySelector('.column-header').textContent,
               counter: parseInt(cardElement.getAttribute('data-column-id')),
               taskId: []
            };

            cardElement
               .querySelectorAll('.note')
               .forEach(task => {

                  card.taskId.push(parseInt(task.getAttribute('data-note-id')));
               });

            object.cards.card.push(card);

         });

      document
         .querySelectorAll('.note')
         .forEach(taskElement => {
            const task = {
               counter: parseInt(taskElement.getAttribute('data-note-id')),
               task: taskElement.textContent
            };

            object.tasks.task.push(task);
         });

      const json = JSON.stringify(object);

      localStorage.setItem('trello', json);

      return object;
   },


   load() {
      if (!localStorage.getItem('trello')) {
         return;
      }

      const mountePoint = document.querySelector('.columns');
      mountePoint.innerHTML = '';

      const object = JSON.parse(localStorage.getItem('trello'));
      const getTaskById = id => object.tasks.task.find(note => note.counter === id);
      // console.log(object.tasks);

      for (const { counter, taskId: id, title } of object.cards.card) {
         const card = new Card(counter);

         mountePoint.append(card.element);
         card.element.querySelector('.column-header').textContent = title;

         for (const taskId of id) {
            const { counter, task } = getTaskById(taskId);
            const note = new Task(counter, task);

            card.add(note.element);
         }
      }
   }
};



