<template>
	<div>
		<h1>Show Food</h1>
		<!-- <p>id: {{ food.id }}</p> -->
		<p>ชื่ออาหาร : {{ food.foodname }}</p>
		<p>สูตรอาหาร : {{ food.receipt }}</p>
		<p>คำอธิบาย : {{ food.description }}</p>
		<!-- <p>content: {{ food.content }}</p> -->
		<p>ประเภท : {{ food.category }}</p>
		<!-- <p>status: {{ food.status }}</p> -->
		<p>
			<button v-on:click="navigateTo('/food/edit/'+food.id)">
				แก้ไข food
			</button>
			<button v-on:click="navigateTo('/foods')">กลับ</button>
		</p>
	</div>
</template>
<script>
import FoodsService from "@/services/FoodsService";
export default {
	data() {
		return {
			food: null,
		};
	},
	async created() {
		try {
			let foodId = this.$route.params.foodId;
			this.food = (await FoodsService.show(foodId)).data;
		} catch (error) {
			console.log(error);
		}
	},
	methods: {
		navigateTo(route) {
			this.$router.push(route);
		},
	},
};
</script>
<style scoped>

</style>
