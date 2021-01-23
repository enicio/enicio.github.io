function getRndInteger(min, max) {
  return Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min));
}

const createRandomNumbers = (min, max) => {
  const randomNumbers = new Set()
  const range = max - min + 1

  while (randomNumbers.size < range) {
    randomNumbers.add(Math.floor(Math.random() * range))
  }
  return [...randomNumbers]
}

const createList = (li) => {
  if (document.querySelector('li') !== null) {
    const OL = document.querySelector('OL');
    OL.remove();
  }

  const getDivOutput = document.querySelector('.output');
  const OL = document.createElement('OL');
  getDivOutput.appendChild(OL);
  const ols = document.querySelector('OL');

  li.forEach(element => {
    const LI = document.createElement('LI');
    LI.innerHTML = element;
    ols.appendChild(LI);
  });
}

const removeSpaceOnString = (arraypal) => {
  const stringsWithSpaceRemoved = arraypal.map(cadaum => {
    return cadaum.trim();
  });
  return stringsWithSpaceRemoved;
};
const checkDuplicity = (arraypal) => {
  const stringsWithSpaceRemoved = removeSpaceOnString(arraypal);

  const newArrayWithUniqueElements = stringsWithSpaceRemoved.filter((element, index) => {
    return stringsWithSpaceRemoved.indexOf(element) === index;
  });
  return newArrayWithUniqueElements;
}

function checkEmptyElement(itensOnArray) {
  const newArrayWithOutEmptyElements = itensOnArray.filter((element) => element !== '');
  return newArrayWithOutEmptyElements;
}

const randomizer = () => {
  const contentText = document.querySelector('#w3review').value;
  const itensOnArray = contentText.split('\n');

  const newArrayWithOutEmpyElement = checkEmptyElement(itensOnArray);
  const newArrayWithOutDuplicity = checkDuplicity(newArrayWithOutEmpyElement)

  const arrayWithRandomicNumbers = createRandomNumbers(0, newArrayWithOutDuplicity.length - 1);
  const contentTextRandomized = arrayWithRandomicNumbers.map((number) => {
    return newArrayWithOutDuplicity[number];
  });
  createList(contentTextRandomized);
}

function generateRandomNumber() {
  const fisrtNumber = document.querySelector('#firstNumber').value;
  const secondNumber = document.querySelector('#secondNumber').value;

  if (!Number.isInteger(parseInt(fisrtNumber)) || !Number.isInteger(parseInt(secondNumber))) {
    alert('Entre somente com números inteiros.')
  } else {
    const randomNumber = getRndInteger(fisrtNumber, secondNumber);

    document.querySelector('.outputNumber').innerText = '';
    document.querySelector('.outputNumber').innerText = randomNumber;
  }
};

const randomizerButton = document.querySelector('#submit');
randomizerButton.addEventListener('click', randomizer);

const generateRandomNumberButton = document.querySelector('.aleatory-number input[value=Sortear]');
generateRandomNumberButton.addEventListener('click', generateRandomNumber)

