import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddSnack from '@/components/AddSnack'
import EditSnack from '@/components/EditSnack'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-snack',
      name: "AddSnack",
      component: AddSnack
    },
    {
      path: '/edit-snack/:snack_slug',
      name: "EditSnack",
      component: EditSnack
    }
  ]
})
