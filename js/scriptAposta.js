// Função para confirmar o preenchimento do formulário de aposta
document.getElementById('btSubmit').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var cpf = document.getElementById('cpf').value;
    var number1 = document.getElementById('number1').value;
    var number2 = document.getElementById('number2').value;
    var number3 = document.getElementById('number3').value;
    var number4 = document.getElementById('number4').value;
    var number5 = document.getElementById('number5').value;
    
    var jsonData = {
        betterName: name,
        betterCPF: cpf,
        chosenNumbers: [number1, number2, number3, number4, number5]
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

           document.getElementById('formBet').reset();
        } else {
            console.error('Erro ao realizar a aposta!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});



// Função para sortear um número aleatório para a aposta
document.getElementById('btRandom').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var cpf = document.getElementById('cpf').value;

    var jsonData = {
        betterName: name,
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
document.getElementById('btDraw').addEventListener('click', function() {
    if(confirm("Finalizar fase de apostas e realizar sorteio?")){    
        fetch("http://localhost:8080/draws/makeDraw", {
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