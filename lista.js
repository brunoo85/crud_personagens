const URL = "https://crudcrud.com/api/042db635a2814657823f8a083c47c1e9/personagens";

async function getPersonagem() {
  const response = await fetch(URL);
  return await response.json();
}

async function deletePersonagem(id) {
  const response = await fetch(URL + `/${id}`, { method: "DELETE" });
  if (response.status == 200) return "Você excluiu o personagem";
  return "Algo deu errado";
}

function createPersonagem(personagem, index) {
  const container = document.querySelector(".container");
  const id = `personagem-${personagem._id}`;

  let elem = document.querySelector(`div#${id}`);
  if (elem) return;

  elem = document.createElement("div");
  elem.id = id;
  elem.className = "elem";

  const img = document.createElement("img");
  img.src = `images/perfil${personagem.genero}.jpg`;
  img.width = "50";
  img.className = "imgElem";

  const nome = document.createElement("a");
  nome.innerText = `Nome: ${personagem.nome}`;
  nome.className = "nome";
  nome.href = `./registro.html?id=${personagem._id}`;

  const tend = document.createElement("p");
  tend.className = "tend";
  tend.innerText = `Tendência: ${personagem.tendencia}`;

  const gen = document.createElement("p");
  gen.className = "generoLista";
  gen.innerText = `Gênero: ${personagem.genero}`;

  const nota = document.createElement("p");
  nota.className = "nota";
  nota.innerText = `Nota: ${personagem.nota}`;

  const btnDelete = document.createElement("button");
  btnDelete.className = "btnDelete botao"
  btnDelete.innerText = "Remover";
  btnDelete.id = "delete";

  btnDelete.addEventListener("click", () => {
    if (confirm("Você tem certeza que quer remover este personagem da lista????????")) {
      elem.remove();
      deletePersonagem(personagem._id).then((msg) => alert(msg));
    }
  });

  const btnVer = document.createElement("button");
  btnVer.className = "btnVer botao"
  btnVer.innerText = "Ver Mais";
  btnVer.id = "verMais";

  btnVer.addEventListener("click", () => {
    alert(personagem.descricao);
  });

  elem.appendChild(img);
  elem.appendChild(nome);
  elem.appendChild(tend);
  elem.appendChild(gen);
  elem.appendChild(nota);
  elem.appendChild(btnDelete);
  elem.appendChild(btnVer);

  container.appendChild(elem);
}

const interval = setInterval(() => {
  getPersonagem().then((listaPersonagens) => {
    listaPersonagens.forEach(createPersonagem);
  });
  console.log("consultou a lista");
}, 5000);

setTimeout(() => {
  clearInterval(interval);
}, 5000);