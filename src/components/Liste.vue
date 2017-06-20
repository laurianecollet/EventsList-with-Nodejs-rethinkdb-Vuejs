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
						<p>{{event.nbbillet}} billets disponibles</p>
						<a @click="nbBillet(event, true)">+</a>
						<a @click="nbBillet(event, false)">-</a>
					</div>
					<div class="card-action">
						<a href="#" @click="callToggleGratuit(event, event.payant)"><span v-if="event.payant">Payant</span><span v-else>Gratuit</span></a>
						<router-link :to="{ name: 'Detail', params: { id: event.id } } ">Voir le détail</router-link>
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
			callToggleGratuit(event, eventIsPayant) {
				Store.toggleGratuit(event, eventIsPayant)
			},
			nbBillet(event, add) {
				Store.addNewBillet(event, add)
			},
			voirDetails(id) {
				Store.plusDetails(id)
			},
		}
	}

</script>
<style>
	div {
		width: 600px;
		margin: auto;
	}
</style>