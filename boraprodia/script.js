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

const button = document.querySelector('.button');
const hora = button.addEventListener('click', () => {
  const schedule = document.querySelector('#schedule').value;
  const initialHour = document.querySelector('#initial-hour').value;
  const finalHour = document.querySelector('#final-hour').value;
  const initialHourSeparated = initialHour.split(':')
  const finalHourSeparated = finalHour.split(':')

  const arrayRGB = gererateRandomColor();

  //console.log(finalHourSeparated);


  if (initialHourSeparated[0] > 12) {
    initialHourSeparated[0] = initialHourSeparated[0] - 12;
  }

  if (finalHourSeparated[0] > 12) {
    finalHourSeparated[0] = finalHourSeparated[0] - 12;
  }

  const initialHourToMinutes = (Number(initialHourSeparated[0]) * 60) + Number(initialHourSeparated[1]);
  const finalHourToMinutes = (Number(finalHourSeparated[0]) * 60) + Number(finalHourSeparated[1]);
  const durationOfSchedule = Math.abs((Number(finalHourToMinutes) - Number(initialHourToMinutes)) * 0.166);
  // console.log(initialHourToMinutes, finalHourToMinutes);
  // console.log(durationOfSchedule);

  const ol = document.querySelector('.list');
  const li = document.createElement('LI');
  const span = document.createElement('span');
  //li.classList.add(`bkgrd-color-${cont}`);
  li.style.background = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`
  li.innerHTML = ` ${schedule} ${initialHourSeparated[0]}:${initialHourSeparated[1]} pm ate
                   ${finalHourSeparated[0]}:${finalHourSeparated[1]} pm`;
  span.innerHTML = '  Apagar';
  span.setAttribute('class', 'erase');
  // console.log(span);
  li.appendChild(span);
  li.setAttribute('class', `toER${arrayRGB[0]}${arrayRGB[1]}`)
  ol.appendChild(li);

  const degreeToRotate = (30 * Number(initialHourSeparated[0])) + Number(initialHourSeparated[1]) / 2;
  console.log(degreeToRotate);
  //console.log('cont', cont)

  const clock = document.querySelector('.clock');
  const sv = `
      <svg viewBox="0 0 36 36" class="circular-chart rotate-${cont} toER${arrayRGB[0]}${arrayRGB[1]}">
        <path class="circle color-${cont} stroke-${cont} " d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831" />
      </svg>
  `;
  clock.innerHTML += sv;
  cont = cont + 1;



  clock.lastElementChild.style.transform = `rotate(${degreeToRotate}deg)`;
  clock.lastElementChild.style.strokeDasharray = `${durationOfSchedule} , 100`;
  clock.lastElementChild.lastElementChild.style.stroke = `rgb(${arrayRGB[0]},${arrayRGB[1]},${arrayRGB[2]})`



});

const toEraseOneItem = (e) => {
  if (e.target.innerText === 'Apagar') {
    const classToErase = e.target.parentElement.classList[0];
    const elementsToErase = document.querySelectorAll(`.${classToErase}`);
    elementsToErase.forEach((element) => {
      element.remove();
    });
  }
};

document.addEventListener('click', toEraseOneItem);

setInterval(() => {
  const hr = document.querySelector('#hr');
  const mn = document.querySelector('#mn');
  const sc = document.querySelector('#sc');
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;
  hr.style.transform = `rotateZ(${hh + (mm / 12)}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;
}, 1000);
