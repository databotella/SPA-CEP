<template>
	<div class="busca-cep">
	  <h2>Buscar Endereço pelo CEP</h2>
  
	  <!-- Campo de Input para o CEP -->
	  <input type="text" v-model="cep" placeholder="Digite o CEP" class="cep-input" />
  
	  <!-- Botão de Busca com Ícone -->
	  <button @click="buscarCep" class="icon-button">
		<font-awesome-icon :icon="['fas', 'search']" />
		<span>Buscar</span>
	  </button>
  
	  <!-- Botão de Voltar com Ícone -->
	  <router-link to="/" class="icon-button voltar-button">
		<font-awesome-icon :icon="['fas', 'arrow-left']" />
		<span>Voltar</span>
	  </router-link>
  
		<!-- Botão para exibir/ocultar histórico -->
		<button @click="toggleHistory" class="icon-button history-toggle">
		<font-awesome-icon :icon="['fas', 'history']" />
		<span>Histórico</span>
		</button>

		<!-- Histórico de Buscas (aparece apenas ao clicar no botão de histórico) -->
		<div v-if="showHistory && history.length" class="history">
		<h3>Histórico de buscas</h3>
		<ul>
			<li v-for="item in history" :key="item">
			<button @click="searchFromHistory(item)" class="history-item">{{ item }}</button>
			</li>
		</ul>
		</div>

  
	  <!-- Exibição do Endereço em Estilo de Cartão -->
	  <div v-if="endereco" class="endereco-card slide-in">
		<h3>Endereço Encontrado:</h3>
		<div class="endereco-item">
		  <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
		  <p><strong>Logradouro:</strong> {{ endereco.logradouro }}</p>
		</div>
		<div class="endereco-item">
		  <font-awesome-icon :icon="['fas', 'building']" />
		  <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
		</div>
		<div class="endereco-item">
		  <font-awesome-icon :icon="['fas', 'city']" />
		  <p><strong>Cidade:</strong> {{ endereco.localidade }} - {{ endereco.uf }}</p>
		</div>
		<div class="endereco-item">
		  <font-awesome-icon :icon="['fas', 'phone']" />
		  <p><strong>DDD:</strong> {{ endereco.ddd }}</p>
		</div>
	  </div>
  
	  <!-- Mapa do Endereço -->
	  <div v-if="endereco" class="map-container">
		<div id="map" class="map"></div>
	  </div>
  
	  <div v-if="loading" class="loading-spinner"></div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
	data() {
	  return {
		cep: '',
		endereco: null,
		loading: false,
		history: [],
		map: null,
		showHistory: false,
	  };
	},
	created() {
	  this.history = JSON.parse(localStorage.getItem('history')) || [];
	},
	methods: {
	  validarCEP(cep) {
		cep = cep.replace(/\D/g, '');
		return cep.length === 8;
	  },
	  buscarCep() {
		if (!this.validarCEP(this.cep)) {
		  alert('CEP inválido. Por favor, insira um CEP com 8 dígitos numéricos.');
		  return;
		}
  
		this.loading = true;
  
		axios
		.get(`https://app-uhback.szmxvf.easypanel.host/?cep=${this.cep}`)
		  .then((response) => {
			if (response.data.erro) {
			  alert('CEP não encontrado.');
			  this.endereco = null;
			} else {
			  this.endereco = response.data;
			  this.addToHistory(this.cep);
			  this.loadMap(); // carrega mapa 
			}
		  })
		  .catch((error) => {
			console.error('Erro ao buscar o CEP:', error);
		  })
		  .finally(() => {
			this.loading = false;
		  });
	  },
	  addToHistory(cep) {
		if (!this.history.includes(cep)) {
		  this.history.unshift(cep);
		  if (this.history.length > 10) this.history.pop();
		  localStorage.setItem('history', JSON.stringify(this.history));
		}
	  },
	  searchFromHistory(cep) {
		this.cep = cep;
		this.buscarCep();
	  },
	  toggleHistory() {
    this.showHistory = !this.showHistory;
  		},
	  loadMap() {
		if (this.map) {
		  this.map.remove(); 
		}
  
		const { localidade: city, uf: state } = this.endereco;
		const address = `${city}, ${state}`;
  
		// Geocoding com Nominatim
		axios
		  .get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
		  .then((response) => {
			const [lat, lng] = [response.data[0].lat, response.data[0].lon];
  
			// Inicializa o mapa
			this.map = L.map('map').setView([lat, lng], 13);
  
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			  maxZoom: 19,
			  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(this.map);
  
			L.marker([lat, lng]).addTo(this.map);
  
			// Força o mapa a se redimensionar corretamente
			setTimeout(() => {
			  this.map.invalidateSize();
			}, 100);
		  })
		  .catch((error) => {
			console.error('Erro ao carregar o mapa:', error);
		  });
	  }
	}
  };
  </script>
  
  <style scoped>
/* Define box-sizing para garantir que a largura seja respeitada corretamente */
*,
*::before,
*::after {
  box-sizing: border-box;
}

.busca-cep {
  max-width: 350px; 
  width: 90%; 
  margin: 40px auto;
  text-align: center;
  background-color: #f7f8fc;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Animação de foco para o campo de entrada */
.cep-input {
  width: calc(100% - 20px);
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.cep-input:focus {
  border-color: #0056d2;
  box-shadow: 0 0 5px rgba(0, 86, 210, 0.2);
  outline: none;
}

/* Estilo para os botões com ícones */
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px); /* Ajuste para respeitar o padding */
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #0056d2;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 5px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-button:hover {
  background-color: #007bff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Estilos específicos para o botão de voltar */
.voltar-button {
  background-color: #e0e7ff;
  color: #0056d2;
}

.voltar-button:hover {
  background-color: #d4d9ff;
}

/* Animação de entrada para o cartão de endereço */
.endereco-card {
  background-color: #e0e7ff;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  text-align: left;
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.4s ease forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo dos itens de endereço */
.endereco-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.endereco-item font-awesome-icon {
  margin-right: 12px;
  color: #0056d2;
  font-size: 22px;
}

.endereco-item p {
  margin: 0;
  font-size: 16px;
}

/* Spinner de carregamento */
.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0056d2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Estilo para o botão de histórico */
.history-toggle {
  width: calc(100% - 20px); 
  background-color: #ffaa00b4;
  color: #ffffff;
  margin-top: 10px;
}

.history-toggle:hover {
  background-color: #ffde59;
}

/* Responsividade para dispositivos menores */
@media (max-width: 768px) {
  .busca-cep {
    padding: 15px;
    margin: 20px auto;
  }

  .cep-input,
  .icon-button,
  .voltar-button,
  .history-toggle {
    width: calc(100% - 10px);
    font-size: 14px;
  }
}

/* Estilos do histórico */
.history {
  margin-top: 20px;
  text-align: left;
}

.history h3 {
  font-size: 16px;
  color: #333;
}

.history-item {
  background: none;
  border: none;
  color: #0056d2;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}

.history-item:hover {
  color: #007bff;
}

/* Container do mapa */
.map-container {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
