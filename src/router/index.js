import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', 
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path :'/Registrar',
      name :'sign-in',

      component: () => import('../views/Sign-in.vue')
    },
    {
      path : '/Panel',
      name : 'Panel del sistema',
      component: () => import('../views/PanelView.vue')
    }
    ,{
      path : '/Alta Producto',
      name : 'Alta Producto',
      component : () => import('../views/AltasView.vue')
    },
    {
      path : '/Baja Producto',
      name : 'Baja Producto',
      component : () => import('../views/BajasView.vue')
    },
    {
      path :  '/Consulta',
      name : 'Consulta',
      component : () => import('../views/BusquedaView.vue')
    },
    {
      path : '/Ventas',
      name : 'ventas',
      component : () => import('../views/RegistroVenta.vue')
    },
    {
      path : '/Baja_Usuario',
      name : 'Baja Usuario',
      component : () => import('../views/BajaUsuarioView.vue')
    },
    {
      path : '/Datos_de_usuario',
      name :  'Datos_de_usuario',
      component : () => import('../views/UsuarioAltaView.vue')
    },
    {
      path : '/Datos_de_direccion',
      name :  'Datos_de_direccion',
      component : () => import('../views/DireccionAltaView.vue')
    },
    {
      path : '/Soporte',
      name : 'Soporte',
      component : () => import('../views/soporteView.vue')
    }
  

  ]
})

export default router
