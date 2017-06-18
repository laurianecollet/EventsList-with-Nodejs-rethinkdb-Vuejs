import axios from 'axios';
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
	changeGratuit(id) {
		axios.post(`http://localhost:3000/gratuit/${id}`).then((res) => {
			this.datas.events = res.data;
		});
	},

	changePayant(id) {
		axios.post(`http://localhost:3000/payant/${id}`).then((res) => {
			this.datas.events = res.data;
		});
	},
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