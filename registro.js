const URL = "https://crudcrud.com/api/b3a99f534bcf4994996eb9c585a9c3da/personagens";
console.log("entrou no js do registro");
// import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const generos = document.getElementsByClassName("genero");

async function getPersonagem(id) {
  if (id) {
    const response = await fetch(URL + `/${id}`);
    const personagem = await response.json();

    nome.value = personagem.nome;
    tendencia.value = personagem.tendencia;
    nota.value = personagem.nota;
    descricao.value = personagem.descricao;

    for (let i = 0; i < generos.length; i++) {
      if (generos[i].value == personagem.genero) {
        generos[i].checked = true;
      }
    }
  }
  console.log(personagem);
}

async function addPersonagem(objPersonagem) {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(objPersonagem),
    headers: { 'Content-Type': 'application/json' }
  });

  return await response.json();
}

async function updatePersonagem(id, objPersonagem) {
  console.log("editou");
  const response = await fetch(URL + `/${id}`, {
    method: "PUT",
    body: JSON.stringify(objPersonagem),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
getPersonagem(id);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const {
    nome,
    tendencia,
    genero,
    nota,
    descricao
  } = event.target;

  const novoPersonagem = {
    nome: nome.value,
    tendencia: tendencia.value,
    genero: genero.value,
    nota: nota.value,
    descricao: descricao.value
  };

  //colocar validaçoes
  nomeError.innerText = "";
  tendenciaError.innerText = "";
  generoError.innerText = "";
  notaError.innerText = "";
  descError.innerText = "";

  if (novoPersonagem.nome == "") {
    nomeError.innerText = "Nome é obrigatório";
    return;
  }

  if (novoPersonagem.tendencia == "") {
    tendenciaError.innerText = "Tendência é obrigatória";
    return;
  }

  if (novoPersonagem.nota == "") {
    notaError.innerText = "Nota é obrigatória";
    return;
  } else if (parseFloat(novoPersonagem.nota) <= 0) {
    notaError.innerText = "Nota deve ser um valor acima de zero";
    return;
  }

  if (novoPersonagem.genero == "") {
    generoError.innerText = "Gênero é obrigatório";
    return;
  }

  if (novoPersonagem.descricao == "") {
    imgError.innerText = "Descrição é obrigatória";
    return;
  }

  if (id) {
    updatePersonagem(id, novoPersonagem).then(console.log);
  } else {
    addPersonagem(novoPersonagem);
  }

  form.reset();
  
  window.location = './index.html';
});