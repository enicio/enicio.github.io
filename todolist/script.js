

// Requisito 5 e 6  - Cria uma nova tarefa
let buttonPushed = document.querySelector('#criar-tarefa')
buttonPushed.addEventListener("click", newTask)

function newTask () {
  let newTask = document.createElement('Li')
  newTask.innerText = document.querySelector('#texto-tarefa').value

  if ( newTask.innerText == "") {
    alert("Não é permitido tarefa em branco")
  } else {
  document.querySelector('#lista-tarefas').appendChild(newTask)
  document.querySelector('#texto-tarefa').value = ""
  }
}

// Requisito 7 e 8 - Não permite selecionar mais de um ao mesmo tempo
let getTasks = document.getElementById('lista-tarefas')
getTasks.addEventListener('click', changeBackground)

function changeBackground (e) {

  const selectAllTasks = document.querySelectorAll('li')

  for (let index = 0; index < selectAllTasks.length; index += 1) {
    if (selectAllTasks[index].style.backgroundColor == 'rgb(128, 128, 128)')  {
      selectAllTasks[index].style.removeProperty('background-color')
    }
  }
 e.target.style.backgroundColor = "rgb(128, 128, 128)"
}

// Requisito 9 - Marca com dois cliques

getTasks.addEventListener("dblclick", setLineThrough);

function setLineThrough(e) {

  if (e.target.className == 'completed') {
    e.target.classList.remove('completed')
    } else {
    e.target.className = 'completed'
  }
}

// Requisito 10 - Deletos todos os itens
let deleteButton = document.querySelector('#apaga-tudo')
deleteButton.addEventListener('click', deleteAllTasks);

function deleteAllTasks () {
  let allItensOfTasks = document.getElementById("lista-tarefas");
  while (allItensOfTasks.firstChild) {
    allItensOfTasks.removeChild(allItensOfTasks.firstChild);
  }
}

// Requisito 11 - Deleta os itens marcados
let deleteFinish = document.querySelector('#remover-finalizados')
deleteFinish.addEventListener('click', deleteFinishedTasks)

function deleteFinishedTasks () {
  const list = document.getElementById('lista-tarefas')
  const tasksFinished = list.querySelectorAll('.completed')

  for (let index = 0; index < tasksFinished.length; index += 1) {
    tasksFinished[index].remove()
  }
}

// Requisito 12 - Adicionar botão salvar
let saveTask = document.querySelector('#salvar-tarefas')
saveTask.addEventListener('click', saveTaskToLocalStorage)

function saveTaskToLocalStorage() {
  let taskToSave = document.getElementById('lista-tarefas').innerHTML
  localStorage.setItem('lista', taskToSave)
}

document.getElementById('lista-tarefas').innerHTML = localStorage.getItem('lista')

//Requisito 14 - Remover item selecionado
let deleteSelected = document.querySelector('#remover-selecionado')
deleteSelected.addEventListener('click', deleteSelectedtask)

function deleteSelectedtask () {

  const selectAllTasks = document.querySelectorAll('li')

  if (typeof(Storage) !== "undefined") {

    for (let index = 0; index < selectAllTasks.length; index += 1) {
      if (selectAllTasks[index].style.backgroundColor == 'rgb(128, 128, 128)')  {
        selectAllTasks[index].remove()
      }
    }

   } else {
      document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }

}
