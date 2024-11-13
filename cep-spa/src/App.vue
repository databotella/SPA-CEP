<template>
  <nav>
    <router-link to="/" class="nav-button">Início</router-link>
    <router-link to="/buscar" class="nav-button">Buscar</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;

  /* Estilos de fundo */
  background-image: url('@/assets/backgroud2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 80px;
  animation: fadeIn 1s ease forwards;
}

/* Animação de fade-in para o fundo */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Estilos para o menu de navegação */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 0;
  background-color: rgba(0, 0, 50, 0.8);
  text-align: center;
  z-index: 1000;
  display: flex;
  justify-content: center;
  gap: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-100%);
  animation: slideDown 0.5s ease forwards;
}

/* Animação de deslize para a barra de navegação */
@keyframes slideDown {
  to {
    transform: translateY(0);
  }
}

/* Botão de navegação minimalista */
.nav-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease, transform 0.3s ease;
}

/* Efeito hover nos botões */
.nav-button:hover {
  color: #ffde59;
  transform: translateY(-2px);
}

/* Linha de destaque animada ao passar o mouse */
.nav-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ffde59;
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: right;
}

.nav-button:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Botão ativo com sublinhado permanente */
.nav-button.router-link-exact-active {
  color: #ffde59;
}

.nav-button.router-link-exact-active::after {
  transform: scaleX(1); /* Linha amarela sempre visível no botão ativo */
  transform-origin: left;
}
</style>
