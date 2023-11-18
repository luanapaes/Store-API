fetch('https://fakestoreapi.com/products?limit=5')
    .then(res => res.json())
    .then(data => {
        const produtosContainer = document.getElementById('produtos-container');

        data.forEach(produto => {
            const produtoDiv = document.createElement('div');
            produtoDiv.innerHTML = `
                        <div class="card">
                            <h2 class="titulo-produto">${produto.title}</h2>
                            <p id="preco"><strong>Preço:</strong> ${produto.price}</p>
                            <p id="categoria-produto"><strong>Categoria:</strong> ${produto.category}</p>
                            <p class="descricao-produto"><strong>Descrição:</strong> ${produto.description} </p>
                            <img src="${produto.image}" alt="${produto.title}" class="imagem_produto">
                            <hr>
                            <button id="buy">Comprar</button>
                        </div>
                    `;

            produtosContainer.appendChild(produtoDiv);

//--------- variáveis do html -----------------------------------------------------------------
            let $output = produtosContainer.querySelector('.output')
            let $btnComprar = produtoDiv.querySelector('#buy');
            let $informacoesCarrinho = document.getElementById('#informacoesCarrinho')
            let nrCliques = 0;

//--------- eventos ao clicar nos botões -------------------------------------------------------
            $btnComprar.addEventListener('click', function () {
                let valorTotalCompra = 0
                nrCliques++;

                abrirCarrinho(produto.title)
            })

            $output.addEventListener('click', fecharCarrinho);

//--------- funções -----------------------------------------------------------------------------

        //-----mostra o nome e número de clique no produto---------------------------------------
            // function carrinho(numeroCliques, nomeProduto){
            //     console.log('numeros de item no carrinho', numeroCliques, 'nome: ',nomeProduto)
            // }

            function fecharCarrinho(){
                $output.style.display = 'none';
            }

            function abrirCarrinho(nomeProduto, valorTotal){
                $output.style.display = 'block'
                
                const prodCarrinho = document.createElement('div');
                prodCarrinho.innerHTML = `
                    <h1>${nomeProduto}</h1>
                    <p>Valor Total: ${valorTotal}</p>
                `;

                $informacoesCarrinho.appendChild(prodCarrinho)
            }
        });


    })

    .catch(error => console.error('Erro ao obter dados da API:', error));

//-----------------------------------------------------------------------------------

