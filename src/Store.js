import axios from 'axios';
export const Store = {
	datas: {
		events: [],
		search: "",
		tris: [
			{ text: "Intitule", value: "Intitule" },
			{ text: "Prix", value: "Prix" },
		],
		orderby: '',
	},
	loadData() {
		axios.get('http://localhost:3000/').then((response) => {
			this.datas.events = response.data;
		});
	},
	searchFunction() {
		axios.get(`http://localhost:3000/filter?search=${this.datas.search}?orderby=${this.datas.orderby}`).then((res) => {
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
	}
}