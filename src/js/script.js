// seu código aqui

let carrinho = [];

function listarProdutos(array) {
  let lista = document.querySelector(".containerListaProdutos ul");
  lista.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let produtoAtual = array[i];
    let item = criarCard(produtoAtual, i);
    lista.appendChild(item);
  }
}

function criarCard(produto, i) {
  let card = document.createElement("li");

  let imagemProduto = document.createElement("img");
  imagemProduto.src = produto.img;

  let nomeProduto = document.createElement("h3");
  nomeProduto.innerText = produto.nome;
  nomeProduto.classList.add("nomeProduto");

  let categoriaProduto = document.createElement("p");
  categoriaProduto.innerText = produto.categoria;

  let precoProduto = document.createElement("span");
  precoProduto.innerText = converterPreco(produto.preco);

  let divNutrientes = document.createElement("div");
  divNutrientes.classList.add("divNutrientes");

  for (let i = 0; i < produto.componentes.length; i++) {
    let nutriente = document.createElement("p");
    nutriente.innerText = `${i} ${produto.componentes[i]}`;

    divNutrientes.appendChild(nutriente);
  }

  let btnAdicionarCarro = document.createElement("button");
  btnAdicionarCarro.innerText = "Comprar";
  btnAdicionarCarro.classList.add("btnAddCarro");
  btnAdicionarCarro.setAttribute("id", i);

  card.append(
    imagemProduto,
    nomeProduto,
    categoriaProduto,
    divNutrientes,
    precoProduto,
    btnAdicionarCarro
  );
  return card;
}

function converterPreco(preco) {
  let inteiro = parseFloat(preco);
  return inteiro.toLocaleString("pt-br", {
    style: "currency",
    currency: "brl",
  });
}

let exibir = [];

function listarCategoria(categoria) {
  exibir = [];
  for (let i = 0; i < produtos.length; i++) {
    if (categoria == "todos") {
      exibir.push(produtos[i]);
    }
    if (produtos[i].categoria == categoria) {
      exibir.push(produtos[i]);
    }
  }
  listarProdutos(exibir);
}

function buscarProduto(valorProcurar) {
  let resultado = [];
  let entradaFormatado = valorProcurar.toLowerCase();
  for (let i = 0; i < produtos.length; i++) {
    let produtoFormatado = produtos[i].nome.toLowerCase();
    let categoriaFormatado = produtos[i].categoria.toLowerCase();
    let secaoFormatado = produtos[i].secao.toLowerCase();
    if (produtoFormatado.includes(entradaFormatado)) {
      resultado.push(produtos[i]);
    } else if (categoriaFormatado.includes(entradaFormatado)) {
      resultado.push(produtos[i]);
    } else if (secaoFormatado.includes(entradaFormatado)) {
      resultado.push(produtos[i]);
    }
  }
  listarProdutos(resultado);
}

let btnBusca = document.querySelector(".containerBuscaPorNome button");
btnBusca.addEventListener("click", function (event) {
  event.preventDefault();
  let inputBusca = document.getElementById("inputBusca");
  let valorBuscado = inputBusca.value;
  buscarProduto(valorBuscado);
});

let categoriaTodos = document.getElementById("btnTodos");
categoriaTodos.addEventListener("click", function (event) {
  event.preventDefault();
  listarCategoria("todos");
});

let categoriaHortifruti = document.getElementById("btnHortifruti");
categoriaHortifruti.addEventListener("click", function (event) {
  event.preventDefault();
  listarCategoria("fruta");
});

let categoriaPanificadora = document.getElementById("btnPanificadora");
categoriaPanificadora.addEventListener("click", function (event) {
  event.preventDefault();
  listarCategoria("Pães");
});

let categoriaLaticinios = document.getElementById("btnLaticinios");
categoriaLaticinios.addEventListener("click", function (event) {
  event.preventDefault();
  listarCategoria("Leite");
});

listarCategoria("todos");

function adicionarCarrinho(array, id) {
  carrinho.push(array[id]);
  listarCarrinho();
  rodaPeCarro();
}

let lista = document.querySelector(".containerListaProdutos ul");
lista.addEventListener("click", function (event) {
//   if (event.target.tagName === "BUTTON") {
    event.preventDefault();
    let id = event.target.id;
    console.log(exibir[id]);
    adicionarCarrinho(exibir, id);
  
});

function listarCarrinho() {
  let lista = document.getElementById("listaCarro");
  lista.innerHTML = "";

  if (carrinho.length === 0) {
    let div = document.createElement("div");
    div.classList.add("listaCarro");

    let sacola = document.createElement("img");
    sacola.src = "./src/img/sacola.png";

    let paragrafo = document.createElement("p");
    paragrafo.innerText = "Por enquanto não temos produtos no carrinho";

    div.append(sacola, paragrafo);
    lista.appendChild(div);
  } else {
    for (let i = 0; i < carrinho.length; i++) {
      let atual = carrinho[i];

      let card = document.createElement("li");

      let divInfos = document.createElement("div");
      divInfos.classList.add("infosProdCarro");

      let divTextos = document.createElement("div");
      divTextos.classList.add("divTextos");

      let divImg = document.createElement("div");
      divImg.classList.add("divImgCarro");

      let imagem = document.createElement("img");
      imagem.src = atual.img;

      divImg.appendChild(imagem);

      let nome = document.createElement("p");
      nome.innerText = atual.nome;

      let secao = document.createElement("span");
      secao.innerText = atual.secao;

      let preco = document.createElement("p");

      let convertido = converterPreco(atual.preco);
      preco.innerText = convertido;

      let btnRemover = document.createElement("button");
      // btnRemover.innerHTML = '<img src="./src/img/trash.png">'
      btnRemover.id = i;
      btnRemover.classList.add("btnRemover");

      divTextos.append(nome, secao, preco);
      divInfos.append(divTextos, btnRemover);
      card.append(divImg, divInfos);
      lista.appendChild(card);
    }
  }
}

listarCarrinho();

function removerCarrinho(id) {
  carrinho.splice(id, 1);
  listarCarrinho();
  rodaPeCarro();
}

let divCarrinho = document.getElementById("prodCarro");
divCarrinho.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    let id = event.target.id;
    removerCarrinho(id);
    rodaPeCarro();
  }
});

function calculaTotalCarrinho() {
  let total = 0;
  for (let i = 0; i < carrinho.length; i++) {
    total += parseInt(carrinho[i].preco);
  }
  return converterPreco(total);
}

function rodaPeCarro() {
  if (carrinho.length === 0) {
    let rodape = document.querySelector("#rodapeCarro");
    rodape.innerHTML = "";
  } else {
    let rodape = document.querySelector("#rodapeCarro");
    rodape.innerHTML = "";

    let rodapeCarrinho = document.createElement("div");

    let divQuantidade = document.createElement("div");
    divQuantidade.classList.add("divRodape");

    let textoQuantidade = document.createElement("p");
    textoQuantidade.innerText = "Quantidade: ";

    let quantidade = document.createElement("p");
    quantidade.innerText = carrinho.length;

    let divPreco = document.createElement("div");
    divPreco.classList.add("divRodape");

    let textoPreco = document.createElement("p");
    textoPreco.innerText = "Total: ";

    let preco = document.createElement("p");
    preco.innerText = calculaTotalCarrinho();

    divQuantidade.append(textoQuantidade, quantidade);
    divPreco.append(textoPreco, preco);
    rodapeCarrinho.append(divQuantidade, divPreco);

    rodape.append(rodapeCarrinho);
  }
}

rodaPeCarro();
