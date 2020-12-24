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

const getSchedulesSVG = () => {
  let arrayOfAngles = [];
  const svgTag = document.querySelectorAll('.circular-chart');
  svgTag.forEach((svg) => {
    const rotateZ = svg.style.transform;
    const angleOnSvg = rotateZ.match(/([0-9])?([0-9][0-9])(\.([0-9]))?/);
    arrayOfAngles.push(angleOnSvg[0])
    // console.log(angleOnSvg[0]);
  });
  //console.log(arrayOfAngles);
  return arrayOfAngles;
};

const createLI = (initialHourSeparated, finalHourSeparated, schedule, arrayRGB) => {

  const ops = parseInt(initialHourSeparated[1]);
  if (isNaN(ops)) {
    initialHourSeparated[1] = '00';
  };

  const initialHourToMinutes = (Number(initialHourSeparated[0]) * 60) + Number(initialHourSeparated[1]);
  const finalHourToMinutes = (Number(finalHourSeparated[0]) * 60) + Number(finalHourSeparated[1]);
  const durationOfSchedule = Math.abs((Number(finalHourToMinutes) - Number(initialHourToMinutes)) * 0.166);

  let degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
  if (initialHourSeparated[0] > 12) degreeToRotate -= 360;
  const idToGetSchedule = degreeToRotate * 10;

  const ol = document.querySelector('.list');
  const li = document.createElement('LI');
  const span = document.createElement('span');
  li.style.background = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`
  li.innerHTML = ` ${initialHourSeparated[0]}:${initialHourSeparated[1]} ate
                   ${finalHourSeparated[0]}:${finalHourSeparated[1]} | ${schedule}`;

  span.setAttribute('class', 'erase');
  span.setAttribute('class', 'glyphicon glyphicon-remove')
  li.appendChild(span);
  li.setAttribute('class', `toER${arrayRGB[0]}${arrayRGB[1]}`)
  li.setAttribute('id', `A${idToGetSchedule}`)
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
  localStorage.setItem('svgsTrybe', scheduleSVG);
  localStorage.setItem('listTrybe', schedulesList);
};

const schedulesTrybe = document.querySelector('#submit');
schedulesTrybe.addEventListener('click', () => {
  const contentText = document.querySelector('#schedulesText').value;
  const arrayOfLinesOnTextArea = contentText.split('\n');

  const linesByHour = arrayOfLinesOnTextArea.map((line) => {
    // console.log(line);
    // const hour = line.toString().match(/(0[0-9]|1[0-9]|2[0-9])h([0-9])\w+/);
    const hour = line.toString().match(/(0[0-9]|1[0-9]|2[0-9])h([0-9]|([ ]))\w+/);
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
  let degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
  if (initialHourSeparated[0] > 12) degreeToRotate -= 360;
  console.log(degreeToRotate)
  const svgonclock = document.querySelector('.svgonclock');

  const idToGetSchedule = degreeToRotate * 10;

  const sv = `
        <svg viewBox="0 0 36 36" class="circular-chart toER${arrayRGB[0]}${arrayRGB[1]}" id=A${idToGetSchedule}>
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

    let degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
    if (initialHourSeparated[0] > 12) degreeToRotate -= 360;
    const svgonclock = document.querySelector('.svgonclock');

    const idToGetSchedule = degreeToRotate * 10;

    const sv = `
        <svg viewBox="0 0 36 36" class="circular-chart toER${arrayRGB[0]}${arrayRGB[1]}" id=A${idToGetSchedule}>
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

const mouths = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}

const getAngleOfHour = () => {
  const actualAngleOfPointer = document.querySelector('#hr').style.transform;
  // console.log(actualAngleOfPointer)
  const angle = actualAngleOfPointer.match(/([0-9])?([0-9][0-9])(\.([0-9]))?/);
  return angle[0];
  // console.log(angle)
};

const alertToClasse = () => {
  const hourAngle = getAngleOfHour();
  const arrayOfSchedules = getSchedulesSVG();

  const haveSchedule = arrayOfSchedules.find((schedule) => schedule === hourAngle);
  //console.log(haveSchedule);
  if (haveSchedule) {
    const toUseOnQuery = haveSchedule * 10;

    const messageToNofification = document.querySelectorAll(`#A${toUseOnQuery}`)[0].innerText;

    var notification = new Notification(messageToNofification);
  }
};

function notifyMe() {
  // Verifica se o browser suporta notificações
  if (!("Notification" in window)) {
    alert("Este browser não suporta notificações de Desktop");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Kombi");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

setInterval(() => {
  alertToClasse();
}, 60000)

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
    dateComplete.innerText = `${actualDay} de ${mouths[mouth]} de ${year}`;
  }
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;
  if (hh > 360) hh -= 360;
  hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;

  // alertToClasse();
  //console.log(getAngleOfHour())

}, 1000);

const recoverSchedulesOnLocalStorage = () => {
  const listOnLocalStorage = localStorage.getItem('listTrybe')
  const listOPS = document.querySelector('.list');
  const listRec = listOnLocalStorage;
  listOPS.innerHTML = listRec;

  const svgOnLocalStotage = localStorage.getItem('svgsTrybe')
  const svgonclock = document.querySelector('.svgonclock');
  const svRec = svgOnLocalStotage;
  svgonclock.innerHTML = svRec;
};


window.onload = function () {
  recoverSchedulesOnLocalStorage();
  // alertToClasse();
  notifyMe();

};
