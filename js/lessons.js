
document.addEventListener("DOMContentLoaded", () => {
  const optionsList = document.querySelector(".options-list");
  const verifyButton = document.querySelector(".main-buttons");
  const radioButtons = optionsList.querySelectorAll('input[type="radio"]');
  const optionItems = optionsList.querySelectorAll(".option-item"); // Seleciona todos os itens de opção

  // Função para verificar se alguma opção está selecionada
  function checkSelection() {
    let isOptionSelected = false;
    radioButtons.forEach((radio) => {
      if (radio.checked) {
        isOptionSelected = true;
      }
    });

    // Habilita ou desabilita o botão com base na seleção
    verifyButton.disabled = !isOptionSelected;
  }

  // Função para atualizar os estilos das opções (selected class)
  function updateOptionStyles() {
    optionItems.forEach((item) => {
      const radio = item.querySelector('input[type="radio"]');
      if (radio.checked) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  }

  // Adiciona event listeners para cada radio button
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      checkSelection(); // Verifica a seleção
      updateOptionStyles(); // Atualiza os estilos visuais
    });
  });

  // Adiciona event listener para cada item de opção (para clique na área do card)
  optionItems.forEach((item) => {
    item.addEventListener("click", () => {
      const radio = item.querySelector('input[type="radio"]');
      radio.checked = true; // Marca o radio button interno como checado
      // Dispara manualmente o evento 'change' para que o listener acima seja ativado
      const event = new Event("change");
      radio.dispatchEvent(event);
    });
  });

  // Chama a função uma vez no carregamento da página para definir o estado inicial do botão
  checkSelection();
  updateOptionStyles();
});
