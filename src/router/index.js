import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Tabs from '@/views/Tabs.vue'
import Errores from '@/views/Errores.vue'
import ArchivosXML from '@/views/archivosXML.vue'
import AgregarDatos from '@/views/agregarDatos.vue'
import Solicitudcambiotablas from '@/views/solicitudcambiotablas.vue'
import RegistroCambios from '@/views/RegistroCambios.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/archivos',
    name: 'archivosXML',
    component: ArchivosXML
  },
  {
    path: '/agregar',
    name: 'agregarDatos',
    component: AgregarDatos
  },
  {
    path: '/solicitudCambio',
    name: 'cambioTabla',
    component: Solicitudcambiotablas
  }, 
  {
    path: '/tablas',
    name: 'Tablas',
    component: Tabs
  },  
  {
    path: '/errores',
    name: 'Errores',
    component: Errores
  },
  {
    path: '/registrocambios',
    name: 'RegistroCambios',
    component: RegistroCambios   
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
