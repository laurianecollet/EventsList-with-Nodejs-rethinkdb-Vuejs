import axios from 'axios';
export const Store = {
	datas: {
		events: [],
		search: "",
		tri: [
			{ text: "Intitule", value: "Intitule" },
			{ text: "Prix", value: "Prix" },
		],
	},
	loadData() {
		axios.get('http://localhost:3000/').then((response) => {
			this.datas.events = response.data;
		});
	},
	searchFunction() {
		axios.get(`http://localhost:3000/filter?search=${this.datas.search}`).then((res) => {
			this.datas.events = res.data;
			console.log(this.datas.search)
			console.log(this.datas.events)
		});
	},
}