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

const removeSpaceOnString = (arraypal) => {
  const stringsWithSpaceRemoved = arraypal.map(cadaum => {
    return cadaum.trim();
  });
  return stringsWithSpaceRemoved;
};
const checkDuplicity = (arraypal) => {

  const stringsWithSpaceRemoved = removeSpaceOnString(arraypal);

  const newArrayWithUniqueElements = stringsWithSpaceRemoved.filter((element, index) => {
    console.log(stringsWithSpaceRemoved.indexOf(element), index)
    return stringsWithSpaceRemoved.indexOf(element) === index;
  });
  return newArrayWithUniqueElements;
}


const randomizer = () => {
  const contentText = document.querySelector('#w3review').value;
  const itensOnArray = contentText.split('\n');

  const newArrayWithOutDuplicity = checkDuplicity(itensOnArray)

  const arrayWithRandomicNumbers = createRandomNumbers(0, newArrayWithOutDuplicity.length - 1);
  const contentTextRandomized = arrayWithRandomicNumbers.map((number) => {
    return newArrayWithOutDuplicity[number];
  });
  createList(contentTextRandomized);
}


const randomizerButton = document.querySelector('#submit');
randomizerButton.addEventListener('click', randomizer);
