function check() {
  if (confirm("Realmente deseja desistir?")) {
    voltar();
  }
}
function voltar() {
  history.back();
}

function mostrar(id) {
  location.href = id;
}

// --- Lógica para a classe 'active' na navegação ---

      // 1. Obter todos os botões de navegação
      const navButtons = document.querySelectorAll('.nav-buttons');

      // Função para definir o botão ativo
      function setActiveButton() {
        const currentPage = location.pathname.split('/').pop(); // Pega o nome do arquivo da URL (ex: "index.html")

        navButtons.forEach(button => {
          // Remove a classe 'active' de todos os botões primeiro
          button.classList.remove('active');

          // Verifica se o data-page do botão corresponde à página atual
          const buttonPage = button.dataset.page;
          if (buttonPage === currentPage) {
            button.classList.add('active'); // Adiciona a classe 'active' ao botão correspondente
          }
        });
      }

      // 2. Adicionar um 'event listener' para cada botão
      navButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Quando um botão é clicado, primeiro navega
          const pageId = this.dataset.page;
          if (pageId) {
            mostrar(pageId); // Isso recarregará a página
          }

          // A lógica para setar o botão ativo será chamada na carga da nova página
          // Não precisamos setar aqui, pois a página vai recarregar.
        });
      });

      // 3. Chamar a função setActiveButton quando a página é carregada
      // Isso garantirá que o botão correto seja ativado ao carregar qualquer página
      document.addEventListener('DOMContentLoaded', setActiveButton);