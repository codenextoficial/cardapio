let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    let total = 0;

    itensCarrinho.innerHTML = '';

    carrinho.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
        
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.onclick = () => removerDoCarrinho(index);

        listItem.appendChild(removerButton);
        itensCarrinho.appendChild(listItem);
        total += item.preco;
    });

    totalCarrinho.textContent = `Total: R$${total.toFixed(2)}`;
}

function enviarPedidoWhatsApp() {
    let numeroMesa = document.getElementById('numero-mesa').value;
    let nomeCliente = document.getElementById('nome-cliente').value;
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

    // Formata o link para o WhatsApp
    let linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
    
    // Abre uma nova janela ou aba para enviar a mensagem no WhatsApp
    window.open(linkWhatsapp, '_blank');

    // Limpa os campos após enviar o pedido
    carrinho = [];
    atualizarCarrinho();
    document.getElementById('numero-mesa').value = "";
    document.getElementById('nome-cliente').value = "";
    document.getElementById('telefone').value = "";
    document.getElementById('observacao').value = "";
}

function calcularTotalCarrinho() {
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco;
    });
    return total;
}

function atualizarNumeroMesa() {
    numeroMesa = document.getElementById('numero-mesa').value;
}

function atualizarNomeCliente() {
    nomeCliente = document.getElementById('nome-cliente').value;
}

function atualizarNumeroTelefone() {
    numeroTelefone = document.getElementById('telefone').value;
}

function atualizarObservacao() {
    observacao = document.getElementById('observacao').value;
}
