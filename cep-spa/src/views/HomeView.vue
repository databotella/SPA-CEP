<template>
  <div class="home fade-in">
    <img src="@/assets/tradeup.png" alt="Logo da empresa" class="logo" />
    <h1 class="h1titulo">Bem-vindo ao Sistema de Busca de CEP</h1>
    <p>Esse sistema permite que você busque o endereço de qualquer CEP no Brasil.</p>
    <p>Para começar, clique no botão abaixo e digite um CEP válido:</p>

    <router-link to="/buscar" class="icon-button">
      <font-awesome-icon :icon="['fas', 'search-location']" />
      <span>Buscar CEP</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped>
/* Animação de Fade-In para o conteúdo */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.logo {
  width: 200px;
  height: auto;
  margin-top: 20px;
}

/* Estilo para os botões com ícones */
.icon-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #0056d2;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: pulse 1.5s infinite; /* Animação de pulsação no botão */
}

.icon-button:hover {
  background-color: #007bff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.icon-button font-awesome-icon {
  margin-right: 8px;
  font-size: 24px;
}

/* Animação de pulsação no botão */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
}
.h1titulo {
  font-size: 2.5rem;
  margin-top: 20px;
  color: rgba(0, 0, 50, 0.8);
  margin-bottom: 10px;
}
</style>
