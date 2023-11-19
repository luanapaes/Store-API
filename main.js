fetch('https://fakestoreapi.com/products?limit=5')
    .then(res => res.json())
    .then(data => {
        const produtosContainer = document.getElementById('produtos-container');
        const carrinho = [];

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
                            <button>Comprar</button>
                        </div>
                    `;

            produtosContainer.appendChild(produtoDiv);

            //--------- variáveis do html -----------------------------------------------------------------
            let $output = produtosContainer.querySelector('.output');
            let $btnFechar = $output.querySelector('#fechar');
            let $btnComprar = produtoDiv.querySelector('button');
            $valorTotal = $output.querySelector('#valorTotal');
            let $informacoesCarrinho = $output.querySelector('#informacoesCarrinho');

            function addAoCarrinho(produto) {
                const itemExistenteIndex = carrinho.findIndex(item => item.produto.title === produto.title);
            
                if (itemExistenteIndex !== -1) {
                    carrinho[itemExistenteIndex].quantidade++;
                    carrinho[itemExistenteIndex].valorTotal += produto.price;
                    atualizarCarrinho()
                } else {
                    carrinho.push({
                        produto: produto,
                        quantidade: 1,
                        valorTotal: produto.price,
                    });
                    atualizarCarrinho()
                }
            }

            function atualizarCarrinho() {
                $output.style.display = 'block';
    
                let valorTotalCarrinho = 0;
            
                carrinho.forEach(item => {
                    const prodCarrinho = document.createElement('div');
                    prodCarrinho.innerHTML = `
                        <h4>${item.produto.title}</h4>
                        <p>Quantidade: ${item.quantidade}</p>
                        <p>Valor total: ${item.valorTotal}</p>
                    `;
            
                    $informacoesCarrinho.appendChild(prodCarrinho);
            
                    Math.floor(parseFloat(valorTotalCarrinho += item.valorTotal));
                });
            
                $valorTotal.textContent = `Valor total: ${valorTotalCarrinho}`;
            }
            console.log(carrinho)

            $btnComprar.addEventListener('click', function () {
                console.log(this)
                addAoCarrinho(produto);
       
            });

            $btnFechar.addEventListener('click', function(){
                $output.style.display = 'none';
            })
        });
    })

    .catch(error => console.error('Erro ao obter dados da API:', error));
//-----------------------------------------------------------------------------------
