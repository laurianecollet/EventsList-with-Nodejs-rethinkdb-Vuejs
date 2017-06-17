<template>
	<div>
		<vue-toast ref='toast'></vue-toast>
		<li>
			<select class="browser-default" @click="searchFunc()" v-model="dataStore.orderby">
    					<option value="" disabled selected>Trier par </option>
							<option v-for="tri in dataStore.tris" v-bind:value="tri.value" >{{tri.text}}</option>
  		</select>
		</li>
		<input @keyup="searchFunc()" type="search" v-model="dataStore.search">
		<a href="#" @click="sendMail()">Send an email</a>
	</div>
</template>

<script>
	import 'vue-toast/dist/vue-toast.min.css'
	import VueToast from 'vue-toast'
	import { Store } from '@/Store.js';
	export default {
		name: 'search',
		components: {
			VueToast
		},
		data() {
			return {
				dataStore: Store.datas,
			}
		},
		methods: {
			searchFunc() {
				Store.searchFunction();
			},
			sendMail() {
				Store.sendMailJu();
				let toast = this.$refs.toast
				toast.showToast('Le mail a été envoyé', { theme: 'info', timeLife: 1000 })
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	div {
		width: 600px;
		margin: auto;
	}
</style>