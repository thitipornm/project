import Api from '@/services/Api'

export default {
    index() {
        return Api().get('foods')
    },
    show(foodId){
        return Api().get('food/'+foodId)
    },
    post(food){
        return Api().post('food', food)
    },
    put(food){
        return Api().put('food/'+food.id, food)
    },
    delete(food){
        return Api().delete('food/'+food.id, food)
    },
}