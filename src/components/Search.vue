<template>
	<div>
		<li>
			<select class="browser-default" v-model="datas.searchCategorie">
    					<option value="" disabled selected>Trier par </option>
							<option >Intitule</option>
							<option >Prix</option>
  		</select>
		</li>
		<input @keyup.enter="searchFunction()" type="search" v-model="search">

	</div>
</template>

<script>
	import { Store } from '@/Store.js';
	export default {
		name: 'search',
		data() {
			return {
				dataStore: Store.datas,
				search: "",
			}
		},
		methods: {
			searchFunction() {
				this.$http.get(`http://localhost:3000/filter?search=${this.search}&tri=${this.intitule}`).then((res) => {
					this.dataStore.events = res.body;
					console.log(this.search) // il ne complete pas mon champ search 
				});
			},
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