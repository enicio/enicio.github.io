
let buttonPushed = document.querySelector('#criar-tarefa')
buttonPushed.addEventListener("click", newTask)

function newTask () {
  let newTask = document.createElement('Li')
  newTask.innerText = document.querySelector('#texto-tarefa').value
  document.querySelector('#lista-tarefas').appendChild(newTask)
  document.querySelector('#texto-tarefa').value = ""
}


let getTasks = document.getElementById('lista-tarefas')
getTasks.addEventListener('click', changeBackground)

function changeBackground (e) {
 
  const selectAllLI = document.querySelectorAll('li')

  for (let index = 0; index < selectAllLI.length; index += 1) {
    if (selectAllLI[index].style.backgroundColor == 'rgb(128, 128, 128)')  {
      selectAllLI[index].style.removeProperty('background-color')
    }
  }
 e.target.style.backgroundColor = "rgb(128, 128, 128)"
}


getTasks.addEventListener("dblclick", setLineThrough);

function setLineThrough(e) {

  if (e.target.className == 'completed') {
    e.target.classList.remove('completed')
    } else {
    e.target.className = 'completed'
  }
}


let deleteButton = document.querySelector('#apaga-tudo')
deleteButton.addEventListener('click', deleteAllTasks);

function deleteAllTasks () {
  let allItensOfTasks = document.getElementById("lista-tarefas");
  while (allItensOfTasks.firstChild) {
    allItensOfTasks.removeChild(allItensOfTasks.firstChild);
  }
}

let deleteFinish = document.querySelector('#remover-finalizados')
deleteFinish.addEventListener('click', deleteFinishedTasks)

function deleteFinishedTasks () {
  const list = document.getElementById('lista-tarefas')
  const tasksFinished = list.querySelectorAll('.completed')

  for (let index = 0; index < tasksFinished.length; index += 1) {
    tasksFinished[index].remove()
  }
}
