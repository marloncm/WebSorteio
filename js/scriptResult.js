  // Função para fazer a solicitação para o endpoint da API e exibir os vencedores
  async function mostrarVencedores() {
    try {
        const response = await fetch('http://localhost:8080/draws/vencedores');
        const data = await response.json();

        // Limpar o conteúdo anterior
        document.getElementById('vencedores').innerHTML = '';

        // Verificar se há vencedores
        if (data.length === 0) {
            document.getElementById('vencedores').textContent = 'Não há vencedores para este sorteio.';
            return;
        }

        // Criar uma lista para exibir os vencedores
        const listaVencedores = document.createElement('ul');

        // Iterar sobre os vencedores e adicionar à lista
        data.forEach(vencedor => {
            const itemLista = document.createElement('li');
            itemLista.textContent = `Nome: ${vencedor.betterName}, CPF: ${vencedor.betterCPF}, Números Escolhidos: ${vencedor.chosenNumbers.join(', ')}`;
            listaVencedores.appendChild(itemLista);
        });

        // Adicionar a lista de vencedores ao elemento div
        document.getElementById('vencedores').appendChild(listaVencedores);
    } catch (error) {
        console.error('Erro ao carregar os vencedores:', error);
        document.getElementById('vencedores').textContent = 'Erro ao carregar os vencedores.';
    }
}


async function mostrarTotalVencedores() {
    try {
        const response = await fetch("http://localhost:8080/draws/vencedores/total");
        const data = await response.json();

        // Exibir o total de vencedores
        document.getElementById('totalVencedores').textContent = data.totalVencedores;

    } catch (error) {
        console.error('Erro ao carregar o total de vencedores:', error);
    }
}

// Chamar a função para mostrar os vencedores quando a página for carregada
window.onload = mostrarTotalVencedores;
window.onload = mostrarVencedores;


document.getElementById('btPrize').addEventListener('click', function() {
    alert("Redirecionando para o prêmio...");
    window.location.href = 'https://www.linkedin.com/in/marlonmariano/';
});

document.getElementById('btHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});