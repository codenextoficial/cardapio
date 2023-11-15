let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoElemento = document.getElementById('carrinho');
    let total = 0;

    carrinhoElemento.innerHTML = '';

    carrinho.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;

        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.addEventListener('click', () => {
            removerDoCarrinho(index);
        });

        listItem.appendChild(removerButton);
        carrinhoElemento.appendChild(listItem);
        total += item.preco;
    });

    const totalElemento = document.getElementById('total-carrinho');
    totalElemento.textContent = `Total: R$${total.toFixed(2)}`;
}

function carregarCarrinhoSalvo() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
}

function calcularTotalCarrinho() {
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco;
    });
    return total;
}

function enviarPedidoWhatsapp() {
    let numeroMesa = document.getElementById('mesa').value;
    let nomeCliente = document.getElementById('nome').value;
    let numeroTelefone = document.getElementById('telefone').value;
    let observacao = document.getElementById('observacao').value;

    let mensagem = `Mesa: ${numeroMesa}\n`;
    mensagem += `Cliente: ${nomeCliente}\n`;
    mensagem += `Telefone: ${numeroTelefone}\n`;
    mensagem += `Observação: ${observacao}\n\n`;
    mensagem += "Meu pedido:\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - R$${item.preco.toFixed(2)}\n`;
    });

    mensagem += `\nTotal: R$${calcularTotalCarrinho().toFixed(2)}`;

    let numeroWhatsapp = "+5587992437345"; // Substitua pelo seu número de WhatsApp

    let linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
    
    window.open(linkWhatsapp, '_blank');

    carrinho = [];
    localStorage.removeItem('carrinho');
    atualizarCarrinho();

    document.getElementById('mesa').value = "";
    document.getElementById('nome').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('observacao').value = "";
}

// Adicionado para atualizar o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinhoSalvo();
    atualizarCarrinho();
});

// Event Listeners
document.getElementById('verCarrinho').addEventListener('click', function() {
    window.location.href = 'carrinho.html';
});

document.getElementById('enviarPedidoWhatsapp').addEventListener('click', enviarPedidoWhatsapp);

document.getElementById('voltarMenu').addEventListener('click', function() {
    window.location.href = 'index.html';
});
