// Função para confirmar o preenchimento do formulário de aposta
document.getElementById('btConfirma').addEventListener('click', function() {
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var numero1 = document.getElementById('numero1').value;
    var numero2 = document.getElementById('numero2').value;
    var numero3 = document.getElementById('numero3').value;
    var numero4 = document.getElementById('numero4').value;
    var numero5 = document.getElementById('numero5').value;
    
    var jsonData = {
        betterName: nome,
        betterCPF: cpf,
        chosenNumbers: [numero1, numero2, numero3, numero4, numero5]
    };



    fetch('http://localhost:8080/bets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            alert('Aposta realizada com sucesso!');

           document.getElementById('formAposta').reset();
        } else {
            console.error('Erro ao realizar a aposta!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});



// Função para sortear um número aleatório
document.getElementById('enviarNomeCpf').addEventListener('click', function() {
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;

    var jsonData = {
        betterName: nome,
        betterCPF: cpf
    };

  fetch('http://localhost:8080/bets/surprise', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => {
        if (response.ok) {
            alert("Aposta surpresa registrada!");
        } else {
            console.error('Erro ao realizar a aposta!');
        }
    })
});


// Função para finalizar a fase de aposta e apurar os resultados
document.getElementById('btSortear').addEventListener('click', function() {
    if(confirm("Finalizar fase de apostas e realizar sorteio?")){    
        fetch("http://localhost:8080/draws/sortear", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                    alert("Apurando resultado...");
                    window.location.href = "resultPage.html";      

            } else {
                console.error("Erro ao realizar sorteio!");
            }
        })
        .catch(error => {
            console.error("Erro: ", error);
        });
    }
});