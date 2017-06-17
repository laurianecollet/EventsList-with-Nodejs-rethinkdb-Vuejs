<template>
	<div>
		<li>
			<select class="browser-default">
    					<option value="" disabled selected>Trier par </option>
							<option >Intitule</option>
							<option >Prix</option>
  		</select>
		</li>
		<input @keyup="searchFunc()" type="search" v-model="dataStore.search">

	</div>
</template>

<script>
	import { Store } from '@/Store.js';
	export default {
		name: 'search',
		data() {
			return {
				dataStore: Store.datas,
			}
		},
		methods: {
			searchFunc() {
				Store.searchFunction();
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