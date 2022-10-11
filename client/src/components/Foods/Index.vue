<template>
	<div>
		<h2>Get all foods</h2>
		<h4>จํานวน food {{ foods.length }}</h4>
		<p><button v-on:click="navigateTo('/food/create')">สร้าง food</button></p>
		<div v-for="food in foods" v-bind:key="food.id">
			<!-- <p>id: {{ food.id }}</p> -->
			<p>ชื่ออาหาร : {{ food.foodname }}</p>
			<p>สูตรอาหาร : {{ food.receipt }}</p>
			<p>คำอธิบาย : {{ food.description }}</p>
			<!-- <p>content: {{ food.content }}</p> -->
			<p>ประเภท : {{ food.category }}</p>
			<!-- <p>status: {{ food.status }}</p> -->
			<p>
				<button v-on:click="navigateTo('/food/' + food.id)">ดู food</button>
				<button v-on:click="navigateTo('/food/edit/' + food.id)">
					แก้ไข food
				</button>
				<button v-on:click="deleteFood(food)">ลบข้อมูล</button>
			</p>
			<hr />
		</div>
	</div>
</template>
<script>
import FoodsService from "@/services/FoodsService";
export default {
	data() {
		return {

			foods: [],
		};
	},
	async created() {
		this.foods = (await FoodsService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setUser", null);
			this.$router.push({
				name: "login",
			});
		},

		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteFood(food) {
			let result = confirm("คุณแน่ใจนะ ที่จะลบรีวิวนี้?");
			if (result) {
				try {
					await FoodsService.delete(food);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.foods = (await FoodsService.index()).data;
		},
	},
};
</script>
<style scoped>
</style>