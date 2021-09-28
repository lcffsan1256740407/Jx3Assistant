//引入Vue和Vuex,并使用Vuex(素质三连)
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//用于响应组件中的动作,逻辑判断
const actions = {

} 

//用于修改数据
const mutations = {

}

//用于存储数据
const state = {
    AdminName:'请登录后使用'
}

const store = new Vuex.Store({
actions,
mutations,
state
})  

//导出store
export default store