import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
    path: "/",
    name: "main",
    component: () => import("../view/Main.vue"),
    redirect: '/test/Token',
    children:[{
      path:'test/:id',
      name:'test',
      component: ()=>import('../view/Test.vue'),
    
    }]
  },
  ]
})

export default router;