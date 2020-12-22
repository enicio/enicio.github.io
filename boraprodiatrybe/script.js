let cont = 1;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gererateRandomColor = () => {
  const array = [];
  array[0] = getRandomIntInclusive(0, 255);
  array[1] = getRandomIntInclusive(0, 255);
  array[2] = getRandomIntInclusive(0, 255);
  return array;
};

const createLI = (initialHourSeparated, finalHourSeparated, schedule, arrayRGB) => {
  const initialHourToMinutes = (Number(initialHourSeparated[0]) * 60) + Number(initialHourSeparated[1]);
  const finalHourToMinutes = (Number(finalHourSeparated[0]) * 60) + Number(finalHourSeparated[1]);
  const durationOfSchedule = Math.abs((Number(finalHourToMinutes) - Number(initialHourToMinutes)) * 0.166);

  const ol = document.querySelector('.list');
  const li = document.createElement('LI');
  const span = document.createElement('span');
  li.style.background = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`
  li.innerHTML = ` ${schedule} ${initialHourSeparated[0]}:${initialHourSeparated[1]} ate
                   ${finalHourSeparated[0]}:${finalHourSeparated[1]}`;

  span.setAttribute('class', 'erase');
  span.setAttribute('class', 'glyphicon glyphicon-remove')
  li.appendChild(span);
  li.setAttribute('class', `toER${arrayRGB[0]}${arrayRGB[1]}`)
  ol.appendChild(li);

  document.querySelector('#schedule').value = '';
  document.querySelector('#initialHour').value = '';
  document.querySelector('#finalHour').value = '';

  return durationOfSchedule;

};

const saveToLocalStorage = () => {
  //const svgs = document.getElementsByClassName('circular-chart');
  const svgs = document.querySelector('.svgonclock');
  const lists = document.querySelector('.list');
  //console.log(svgs.innerHTML);
  const schedulesList = lists.innerHTML;
  const scheduleSVG = svgs.innerHTML;
  localStorage.setItem('svgs', scheduleSVG);
  localStorage.setItem('list', schedulesList);
};
const schedulesTrybe = document.querySelector('#submit');
schedulesTrybe.addEventListener('click', () => {
  const contentText = document.querySelector('#schedulesText').value;
  const arrayOfLinesOnTextArea = contentText.split('\n');

  const linesByHour = arrayOfLinesOnTextArea.map((line) => {
    // console.log(line);
    const hour = line.toString().match(/(0[0-9]|1[0-9]|2[0-9])h([0-9])\w+/);
    if (hour !== null) return hour;
  });

  let arrayHorarios = [];

  linesByHour.forEach((line) => {
    if (typeof line !== 'undefined') {
      arrayHorarios.push(line)
    }
  });

  arrayHorarios.forEach((hora) => {
    const initialHourSeparated = hora[0].split('h');
    const finalHourSeparated = initialHourSeparated;
    const arrayRGB = gererateRandomColor();
    createLI(initialHourSeparated, finalHourSeparated, hora.input, arrayRGB);
    createSchedulesOnClock(initialHourSeparated, 1, arrayRGB)
  });
  saveToLocalStorage()
});

const createSchedulesOnClock = (initialHourSeparated, durationOfSchedule, arrayRGB) => {
  const degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;

  const svgonclock = document.querySelector('.svgonclock');

  const sv = `
        <svg viewBox="0 0 36 36" class="circular-chart toER${arrayRGB[0]}${arrayRGB[1]}">
          <path class="circle" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
    `;

  svgonclock.innerHTML += sv;
  cont = cont + 1;

  svgonclock.lastElementChild.style.transform = `rotate(${degreeToRotate}deg)`;
  svgonclock.lastElementChild.style.strokeDasharray = `${durationOfSchedule} , 100`;
  svgonclock.lastElementChild.lastElementChild.style.stroke = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`

};

const button = document.querySelector('.button');
const hora = button.addEventListener('click', () => {
  const schedule = document.querySelector('#schedule').value;
  const initialHour = document.querySelector('#initialHour').value;
  const finalHour = document.querySelector('#finalHour').value;
  const initialHourSeparated = initialHour.split(':')
  const finalHourSeparated = finalHour.split(':')
  // let AMPM = '';

  const arrayRGB = gererateRandomColor();

  if (schedule === '' || initialHour === '' || finalHour === '') {
    alert('Não pode haver campos em branco.')
  } else {

    const durationOfSchedule = createLI(initialHourSeparated, finalHourSeparated, schedule, arrayRGB);

    const degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;

    const svgonclock = document.querySelector('.svgonclock');
    // const sv = `
    //     <svg viewBox="0 0 36 36" class="circular-chart rotate-${cont} toER${arrayRGB[0]}${arrayRGB[1]}">
    //       <path class="circle color-${cont} stroke-${cont} " d="M18 2.0845
    //             a 15.9155 15.9155 0 0 1 0 31.831
    //             a 15.9155 15.9155 0 0 1 0 -31.831" />
    //     </svg>
    // `;

    const sv = `
        <svg viewBox="0 0 36 36" class="circular-chart toER${arrayRGB[0]}${arrayRGB[1]}">
          <path class="circle" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
    `;

    svgonclock.innerHTML += sv;
    cont = cont + 1;

    svgonclock.lastElementChild.style.transform = `rotate(${degreeToRotate}deg)`;
    svgonclock.lastElementChild.style.strokeDasharray = `${durationOfSchedule} , 100`;
    svgonclock.lastElementChild.lastElementChild.style.stroke = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`

    saveToLocalStorage()
  }

});


const ajuste = document.querySelectorAll('.erase');
(ajuste.length > 0) ? localStorage.clear() : console.log('num deu');
ajuste.forEach((apagar) => {
  apagar.parentElement.remove()
});


const toEraseOneItem = (e) => {
  if (e.target.classList[1] === 'glyphicon-remove') {
    const classToErase = e.target.parentElement.classList[0];
    const elementsToErase = document.querySelectorAll(`.${classToErase}`);
    elementsToErase.forEach((element) => {
      element.remove();
    });
    saveToLocalStorage()
  }
};

document.addEventListener('click', toEraseOneItem);

setInterval(() => {
  const hr = document.querySelector('#hr');
  const mn = document.querySelector('#mn');
  const sc = document.querySelector('#sc');
  const dateComplete = document.querySelector('#date');
  let day = new Date();
  let actualDay = day.getDate();
  let mouth = day.getMonth() + 1;
  let year = day.getFullYear();
  let dateInPage = Number(dateComplete.innerText.substring(0, 2));
  if (actualDay !== dateInPage) {
    dateComplete.innerText = `${actualDay}/${mouth}/${year}`;
  }
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;
  hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;
}, 1000);

const recoverSchedulesOnLocalStorage = () => {
  const listOnLocalStorage = localStorage.getItem('list')
  const listOPS = document.querySelector('.list');
  const listRec = listOnLocalStorage;
  listOPS.innerHTML = listRec;

  const svgOnLocalStotage = localStorage.getItem('svgs')
  const svgonclock = document.querySelector('.svgonclock');
  const svRec = svgOnLocalStotage;
  svgonclock.innerHTML = svRec;
};


window.onload = function () {
  recoverSchedulesOnLocalStorage();
};
