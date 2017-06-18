import axios from 'axios';
import Vue from 'vue';
export const Store = {
	datas: {
		events: [],
		search: "",
		tris: [
			{ text: "Intitule", value: "intitule" },
			{ text: "Prix", value: "prix" },
		],
		orderby: '',
	},
	loadData() {
		axios.get('http://localhost:3000/events?limit=7&orderBy=date').then((response) => {
			this.datas.events = response.data;
		});
	},
	searchFunction() {
		axios.get(`http://localhost:3000/search?intitule=${this.datas.search}&tri=${this.datas.orderby}`).then((res) => {
			this.datas.events = res.data;
			console.log(this.datas.search)
			console.log(this.datas.events)
		});
	},
	toggleGratuit(event, eventIsPayant) {
		axios.put(`http://localhost:3000/events/${event.id}`, { payant: !eventIsPayant }).then((res) => {
			let editedEvent = res.data;
			let indice = this.datas.events.indexOf(event)
			if (indice != -1) {
				this.datas.events[indice] = editedEvent;
				Vue.set(this.datas.events, indice, editedEvent)
			}
		});
	},

	/*changePayant(id) {
		axios.post(`http://localhost:3000/payant/${id}`).then((res) => {
			this.datas.events = res.data;
		});
	},*/
	addNewBillet(id) {
		axios.post(`http://localhost:3000/billetPlus/${id}`).then((res) => {
			this.datas.events = res.data;
		});
	},
	deleteNewBillet(id) {
		axios.post(`http://localhost:3000/billetMoins/${id}`).then((res) => {
			this.datas.events = res.data;
		});
	},
	sendMailJu() {
		axios.post(`http://localhost:3000/send`).then((res) => {
		});
	},
	plusDetails(id) {
		axios.get(`http://localhost:3000/details`).then((res) => {
			this.datas.events = res.data;
		});
	}
}