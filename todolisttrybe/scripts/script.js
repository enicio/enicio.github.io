let generalBlock = document.querySelectorAll('.general-block')
let divContent = document.createElement('DIV')


for (index = 0; index < kombi.length - 1; index += 1) {

  generalBlock[0].appendChild(divContent).classList.add('contents');
  blocks = document.querySelectorAll('.contents')
  block = document.createElement('details')
  block.classList.add(`bloco${index}`)
  //progress = document.createElement('progress')

  blocks[0].appendChild(block)
  //blocks[0].appendChild(progress).value = "0"
  //progress.max = "100"
  //progress.id = `pBloco${index}`

  summary = document.createElement('summary')
  document.querySelectorAll('details')[index].appendChild(summary).innerText = kombi[index]
}

//Adicionando os conteudos de cada bloco

list = document.createElement('OL')

document.querySelectorAll('details')[0].appendChild(list)

let nextDatails = 0;
let childrenCount = 0;


for (let index = 0; index < kombiCarregada.length; index += 1) {

  if (kombiCarregada[index] == null) {
    nextDatails += 1;
    index += 1;
    childrenCount = 0
    list = document.createElement('OL')
    document.querySelectorAll('details')[nextDatails].appendChild(list)
  }

  linkToContent = document.createElement('a')
  CadaItem = document.createElement('LI')
  CadaItem.id = "conteudos"
  document.querySelectorAll('details')[nextDatails].querySelector('ol')
    .appendChild(CadaItem).innerText = kombiCarregada[index]

  document.querySelectorAll('details')[nextDatails].querySelector('ol')
    .children[childrenCount].appendChild(linkToContent).href = contentLinks[index]
  document.querySelectorAll('details')[nextDatails].querySelector('ol')
    .children[childrenCount].appendChild(linkToContent).innerText = '>'
  document.querySelectorAll('details')[nextDatails].querySelector('ol')
    .children[childrenCount].appendChild(linkToContent).target = '_blank'
  childrenCount += 1;

}



//window.addEventListener('click', changeBackground)
let ops = document.querySelector('.contents')
ops.addEventListener('click', changeBackground)

let progresso = 0;

function changeBackground(e) {
  if (e.target.tagName == 'LI') {
    e.target.classList.toggle("selected")
  }
  progresso = document.getElementsByClassName('selected').length
  document.querySelector('progress').value = progresso
}
