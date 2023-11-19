const carrinho = [];
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
                            <button class="buy-btn" id="buy${produto.id}">Comprar</button>
                        </div>
                    `;

            produtosContainer.appendChild(produtoDiv);

            //--------- variáveis do html -----------------------------------------------------------------
            let $output = produtosContainer.querySelector('.output');
            let $btnFechar = $output.querySelector('#fechar');
            let $btnComprar = produtoDiv.querySelector('button');
            let $btnCarrinho = document.querySelector('#btn-carrinho');
            // let $valorTotal = $output.querySelector('#valorTotal');
            let $informacoesCarrinho = $output.querySelector('#informacoesCarrinho');

            //--------- eventos ao clicar nos botões -------------------------------------------------------
            $btnComprar.addEventListener('click', function () {
                const produtoId = this.id.replace('buy', ''); // Obtém o ID do produto
                const produtoClicado = data.find(produto => produto.id == produtoId);
                console.log(addAoCarrinho(produtoClicado));
                atualizarCarrinho();
            });

            $btnFechar.addEventListener('click', function () {
                fecharCarrinho();
            });

            $btnCarrinho.addEventListener('click', function(){
                abrirCarrinho();
            })
            
            //----- funções ------------------------------------------------------------------------------------------

            function addAoCarrinho(produto) {
                const itemExistenteIndex = carrinho.findIndex(item => item.produto.title === produto.title);
            
                if (itemExistenteIndex !== -1) {
                    carrinho[itemExistenteIndex].quantidade++;
                    carrinho[itemExistenteIndex].valorTotal += produto.price;
                } else {
                    carrinho.push({
                        produto: produto,
                        quantidade: 1,
                        valorTotal: produto.price,
                    });
                }
            }

            function atualizarCarrinho() {
                abrirCarrinho()
                $informacoesCarrinho.innerHTML = ''; // Limpar o conteúdo anterior
            
                let valorTotalCarrinho = 0;
            
                carrinho.forEach(item => {
                    const prodCarrinho = document.createElement('div');
                    prodCarrinho.innerHTML = `
                        <h4>${item.produto.title}</h4>
                        <p>Quantidade: ${item.quantidade}</p>
                    `;
            
                    $informacoesCarrinho.appendChild(prodCarrinho);
            
                    valorTotalCarrinho += item.valorTotal;
                });
            
                const totalCart = document.createElement('p');
                totalCart.innerHTML = `<p>Valor total: ${valorTotalCarrinho.toFixed(2)}</p>`;
                $informacoesCarrinho.appendChild(totalCart);
            }

            function fecharCarrinho() {
                $output.style.display = 'none';//esconde o carrinho
            }

            function abrirCarrinho() {
                $output.style.display = 'block';
            }
        });
    })

    .catch(error => console.error('Erro ao obter dados da API:', error));