import axios from 'axios';
export const Store = {
	datas: {
		events: [],
		tri: [
			{ text: "Intitule", value: "Intitule" },
			{ text: "Prix", value: "Prix" },
		],
	},
	loadData() {
		axios.get('http://localhost:3000/').then((response) => {
			this.datas.events = response.data;
		});
	}
}