function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createRandomNumbers = (min, max) => {
  const randomNumbers = new Set()
  const range = max - min + 1

  while (randomNumbers.size < range) {
    randomNumbers.add(~~(Math.random() * range))
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


const randomizer = () => {
  const contentText = document.querySelector('#w3review').value;
  const itensOnArray = contentText.split('\n');
  const arrayWithRandomicNumbers = createRandomNumbers(0, itensOnArray.length - 1);
  const contentTextRandomized = arrayWithRandomicNumbers.map((number) => {
    return itensOnArray[number];
  });
  createList(contentTextRandomized);
}


const randomizerButton = document.querySelector('#submit');
randomizerButton.addEventListener('click', randomizer);
