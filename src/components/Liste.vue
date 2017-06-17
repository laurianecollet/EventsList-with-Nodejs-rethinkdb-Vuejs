<template>
	<div class="hello">
		<!--<ul class="collection" :key="event.id" v-for="event in dataStore.events">
			<li class="collection-item">{{event.intitule}}{{event.payant}}{{event.type}}{{event.url}}</li>
		</ul>-->
		<div class="row">
			<div class="col s12 m7" :key="event.id" v-for="event in dataStore.events">
				<div class="card">
					<div class="card-image">
						<img :src="event.url">
						<span class="card-title">{{event.intitule}}</span>
					</div>
					<div class="card-content">
						<p v-if="event.payant === true"><i class="material-icons">payment</i> {{event.prix}}€
						</p>
						<p v-if="event.payant === false"><i class="material-icons">thumb_up</i></p>
						<p>{{event.type}}</p>
					</div>
					<div class="card-action">
						<a href="#">Envoyer un email</a>
						<a href="#" v-if="event.payant === true" @click="billetGratuit(event.id)">Gratuit</a>
						<a href="#" v-if="event.payant === false" @click="billetPayant(event.id)">Payant</a>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import { Store } from '@/Store.js';
	export default {
		name: 'liste',
		data() {
			return {
				dataStore: Store.datas,
			}
		},
		created() {
			Store.loadData();
		},
		methods: {
			billetGratuit(id) {
				Store.changeGratuit(id)
				console.log(id)
			},
			billetPayant(id) {
				Store.changePayant(id)
			}
		}
	}

</script>
<style>
	div {
		width: 600px;
		margin: auto;
	}
</style>