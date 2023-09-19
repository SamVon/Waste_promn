import { createWebHistory, createRouter } from "vue-router"

import { useStorage } from "vue3-storage"
const storage = useStorage()

import Store from "../pages/Store.vue"
import Report from "../pages/Report.vue"
import Pos from "../pages/Pos.vue"
import Transection from "../pages/Transection.vue"
import Login from "../pages/Login.vue"
import Register from "../pages/Register.vue"

export const routes = [
   {
  path: '/store',
  component: Store,
  children: [
    {
      path: 'products',
      component: ProductList
    }
  ]
},
    {
        name: "transection",
        path: "/transection",
        component:Transection
    },
    {
        name: "pos",
        path: "/pos",
        component:Pos
    },
    {
        name: "report",
        path: "/report",
        component:Report
    },
    {
        name: "login",
        path: "/login",
        component:Login
    },
    {
        name: "register",
        path: "/register",
        component:Register
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(){
        window.scrollTo(0,0)
    }
})

router.beforeEach((to, from, next)=>{

    console.log(storage.getStorageSync("vue-isLoggin"))
    console.log(window.Laravel.isLoggin)

    if(to.path=="/register"){
        next()
    } else {
        if(to.path=="/" && storage.getStorageSync("vue-isLoggin") && !window.Laravel.isLoggin){
            next({
                path:"/login",
                replace: true
            })
        }
        else if(to.path!="/login" && !storage.getStorageSync("vue-isLoggin") && !window.Laravel.isLoggin){
            next({
                path:"/login",
                replace: true
            })
        } else {
            if(to.path=="/login" && storage.getStorageSync("vue-isLoggin") && window.Laravel.isLoggin){
                next({
                    path:"/store",
                    replace: true
                })
            } else {
                next()
            }
        }
    }

})

export default router 
