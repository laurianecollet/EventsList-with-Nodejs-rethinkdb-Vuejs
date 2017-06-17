<template>
	<div>
		<div class="row">
			<div class="col s12 m7">
				<router-link :to="{ name: 'Hello'} ">Revenir à la liste</router-link>
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
						<a><i class="material-icons" @click="deleteEvent()">delete</i></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'detail',
		data() {
			return {
				event: {}
			}
		},
		created() {
			axios.get(`http://localhost:3000/events/${this.$route.params.id}`).then((res) => {
				this.event = res.data;
			});
		},
		methods: {
			deleteEvent() { // j'envoie une requete sur l'url
				axios.delete(`http://localhost:3000/events/${this.event.id}`).then((res) => {
					this.$router.push({ name: 'Hello' });
				});
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	div {
		width: 900px;
		margin: auto;
	}
</style>