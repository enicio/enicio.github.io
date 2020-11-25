let generalBlock = document.querySelectorAll('.general-block');
let divContent = document.createElement('DIV');

for (index = 0; index < kombi.length - 1; index += 1) {
  generalBlock[0].appendChild(divContent).classList.add('contents');
  blocks = document.querySelectorAll('.contents')
  block = document.createElement('details')
  block.classList.add(`bloco${index}`)
  blocks[0].appendChild(block)
  summary = document.createElement('summary')
  document.querySelectorAll('details')[index].appendChild(summary).innerText = kombi[index]
}

//Adicionando os conteudos de cada bloco

list = document.createElement('OL');
document.querySelectorAll('details')[0].appendChild(list);

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

  const getOl = document.querySelectorAll('details')[nextDatails].querySelector('ol')

  getOl.appendChild(CadaItem).innerText = kombiCarregada[index]
  getOl.children[childrenCount].appendChild(linkToContent).href = contentLinks[index]
  getOl.children[childrenCount].appendChild(linkToContent).innerText = '>'
  getOl.children[childrenCount].appendChild(linkToContent).target = '_blank'
  childrenCount += 1;
}

let progresso = 0;
let contents = document.querySelector('.contents')

contents.addEventListener('click', function (e) {
  if (e.target.tagName == 'LI') {
    e.target.classList.toggle("selected")
  }
  progresso = document.getElementsByClassName('selected').length
  document.querySelector('progress').value = progresso
})

contents.addEventListener('mouseover', function (e) {
  if (e.target.tagName == 'LI') {
    e.target.classList.add("mouseOver")
  }
})

contents.addEventListener('mouseout', function (e) {
  if (e.target.tagName == 'LI') {
    e.target.classList.remove("mouseOver")
  }
})

let keyPressedOnSearch = document.getElementById('myInput')
keyPressedOnSearch.addEventListener('keyup', function () {
  let input = document.getElementById('myInput');
  textToSearch = input.value.toUpperCase();

  let blocks = document.querySelectorAll('details');

  for (let index = 0; index < blocks.length; index += 1) {
    let blocksToUppercase = blocks[index].innerText;
    if (blocksToUppercase.toUpperCase().indexOf(textToSearch) > -1) {
      blocks[index].style.display = ""
    } else {
      blocks[index].style.display = "none"
    }
  }
})

