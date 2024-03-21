  // Função para fazer a solicitação para o endpoint da API e exibir os vencedores
  async function mostrarVencedores() {
    try {
        const response = await fetch('http://localhost:8080/draws/winners');
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
            itemLista.textContent = `Nome: ${vencedor.betterName}, CPF: ${vencedor.betterCPF}`;
            listaVencedores.appendChild(itemLista);
        });

        // Adicionar a lista de vencedores ao elemento div
        document.getElementById('vencedores').appendChild(listaVencedores);
    } catch (error) {
        console.error('Erro ao carregar os vencedores:', error);
        document.getElementById('vencedores').textContent = 'Erro ao carregar os vencedores.';
    }
}


// Função para atualizar os números sorteados

async function showDrawnNumbers() {
    try {
        const responseNumerosSorteados = await fetch('http://localhost:8080/draws/getDrawnNumbers');
        const numerosSorteados = await responseNumerosSorteados.json();

        // Verificar se há números sorteados
        if (numerosSorteados.length === 0) {
            document.getElementById('numerosSorteados').textContent = 'Não há números sorteados ainda.';
            return;
        }
// Criar um parágrafo para exibir os números sorteados
const paragrafoNumerosSorteados = document.createElement('p');

// Montar o texto dos números sorteados em uma linha
const numerosSorteadosTexto = numerosSorteados.join(', ');

// Definir o texto do parágrafo
paragrafoNumerosSorteados.textContent = `Números Sorteados: ${numerosSorteadosTexto}`;

// Adicionar o parágrafo de números sorteados ao elemento div
document.getElementById('numerosSorteados').appendChild(paragrafoNumerosSorteados);

    } catch (error) {
        console.error('Erro ao carregar os números sorteados:', error);
        document.getElementById('numerosSorteados').textContent = 'Erro ao carregar os números sorteados.';
    }
}

// Função para atualizar o total de vencedores
async function updateTotalWinners() {
    try{
        const totalWinners = await fetchData('http://localhost:8080/draws/getTotalWinners');
        

        if (totalWinners === 0) {
            document.getElementById('totalVencedores').textContent = '0';
            return;
        }else{
            document.getElementById('totalVencedores').textContent = `Total de Vencedores: ${totalWinners}`;

        }

    }catch (error) {
        console.error('Erro ao carregar o total de vencedores:', error);
        document.getElementById('totalVencedores').textContent = 'Erro ao carregar o total de vencedores.';
    }

}

// Chamar as funções de atualização quando a página for carregada
window.onload = async function () {
     showDrawnNumbers();
     updateTotalWinners();
     mostrarVencedores();
};

// Chamar a função para mostrar os vencedores quando a página for carregada
//window.onload = mostrarVencedores;


document.getElementById('btPrize').addEventListener('click', function() {
    alert("Redirecionando para o prêmio...");
    window.location.href = 'https://www.linkedin.com/in/marlonmariano/';
});

document.getElementById('btHome').addEventListener('click', function() {
    window.location.href = 'index.html';
});



document.getElementById('btBets').addEventListener('click', async function() {
    try {
        const response = await fetch('http://localhost:8080/draws/getAllBets');
        const data = await response.json();

        // Limpar o conteúdo anterior
        document.getElementById('listBetters').innerHTML = '';

        // Verificar se há apostadores
        if (data.length === 0) {
            document.getElementById('listBetters').textContent = 'Não há apostadores para este sorteio.';
            return;
        }

        // Criar uma lista para exibir os vencedores
        const subtitle = document.createElement('h2');
        subtitle.textContent = 'Listando Apostadores...';
        document.getElementById('listBetters').appendChild(subtitle);
        const listaApostadores = document.createElement('ul');

        // Iterar sobre os apostadores e adicionar à lista
        data.forEach(bet => {
            const itemLista = document.createElement('li');
            itemLista.textContent = `Nome: ${bet.betterName}, CPF: ${bet.betterCPF}, Números Escolhidos: ${bet.chosenNumbers.join(', ')}`;
            listaApostadores.appendChild(itemLista);
        });

        // Adicionar a lista de vencedores ao elemento div
        document.getElementById('listBetters').appendChild(listaApostadores);
    } catch (error) {
        console.error('Erro ao carregar os apostadores:', error);
        document.getElementById('listBetters').textContent = 'Erro ao carregar os apostadores.';
    }
});


async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    return await response.json();
}