const startBtn = document.querySelector('.start-btn');
const api = 'https://rickandmortyapi.com/api/character/';
const homeImage = document.querySelector('.home_image');
const persons = 826;
const count = 4;
const answersContainer = document.querySelector('.answers-container');
const resultContainer = document.querySelector('.result');

const randomPerson = () => Math.floor(Math.random() * persons + 1);
const checkAnswer = (isCorrect) => {
  if (isCorrect) {
    resultContainer.textContent = 'Correct!';
    resultContainer.style.color = 'green';
    startBtn.disabled = false;
    startBtn.style.cursor = 'pointer';
  } else {
    resultContainer.textContent = 'Mistake!';
    resultContainer.style.color = 'red';
    startBtn.style.cursor = 'auto';
    startBtn.disabled = true;
  }
};

function createAnswerButton(name, isCorrect) {
  const answerBtn = document.createElement('button');
  answerBtn.className = 'btn';
  answerBtn.textContent = name;
  answerBtn.addEventListener('click', () => checkAnswer(isCorrect));
  answersContainer.appendChild(answerBtn);
}

startBtn.addEventListener('click', () => {
  answersContainer.innerHTML = '';
  resultContainer.textContent = '';
  startBtn.textContent = 'Next';

  const correctPersonId = randomPerson();
  fetch(`${api}${correctPersonId}`)
    .then((response) => {
      if (!response.ok) throw new Error('Ошибка запроса');
      return response.json();
    })
    .then((correctPerson) => {
      homeImage.src = correctPerson.image;
      createAnswerButton(correctPerson.name, true);

      const promises = [];
      for (let i = 0; i < count - 1; i += 1) {
        promises.push(
          fetch(`${api}${randomPerson()}`).then((response) => {
            if (!response.ok) throw new Error('Ошибка запроса');
            return response.json();
          }),
        );
      }

      Promise.all(promises).then((nodePersons) => {
        nodePersons.forEach((person) => {
          createAnswerButton(person.name, false);
        });

        const buttons = Array.from(answersContainer.querySelectorAll('button'));
        buttons.sort(() => Math.random() - 0.5);
        buttons.forEach((button) => answersContainer.appendChild(button));
      });
    })
    .catch((error) => {
      console.error(error);
      resultContainer.textContent = 'Произошла ошибка. Попробуйте снова.';
      resultContainer.style.color = 'red';
    });
});
