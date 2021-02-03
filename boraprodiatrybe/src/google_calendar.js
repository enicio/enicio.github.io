function sendEventsToApi(events) {
  const token = localStorage.getItem(environments.ACCESS_TOKEN_KEY);
  const apiUrl = `${environments.API_URL}/events`;
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(events),
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    .catch((err) => {
      alert(`Erro ao adicionar eventor: ${err}`);
    });
}

function getEventsFromList() {
  const list = document.querySelector(".list");
  const events = Array.from(list.children).map((item) => {
    const schedule = item.querySelector(".schedule");
    const task = item.querySelector(".task");
    const [startHour] = schedule.innerText.match(/^\d{2}:\d{2}/);
    const [endHour] = schedule.innerText.match(/\d{2}:\d{2}$/);
    return {
      title: task.innerText,
      startHour,
      endHour,
    };
  });
  return events;
}
