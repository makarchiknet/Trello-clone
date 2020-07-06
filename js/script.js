
Application.load();

document
   .querySelector('.adder')
   .addEventListener('click', (event) => {
      const taskCard = new Card;
      document.querySelector('.columns').append(taskCard.element);

      Application.save();
   });

