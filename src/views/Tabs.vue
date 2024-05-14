<template>
    <div>
        <b-card no-body>
            <b-tabs card>
                <b-nav tabs>
                    <b-nav-item @click="mostrarPestana('departamentos')">Departamentos</b-nav-item>
                    <b-nav-item @click="mostrarPestana('jobs')">Trabajos</b-nav-item>
                </b-nav>  
                <component :is="componenteActivo"></component>
            </b-tabs>
        </b-card>
    </div>
  </template>
  
  <script>
  import Departamentos from './Departamentos.vue'; // Importa el componente de la pestaña Departamentos
  import Jobs from './Jobs.vue';
  
  export default {
    data() {
      return {
        componenteActivo: 'Departamentos', // Pestaña activa por defecto
      };
    },
    components: {
      Departamentos, // Declara el componente Departamentos para su uso en este archivo
      Jobs, // Declara el componente Trabajos para su uso en este archivo
    },
    methods: {
      mostrarPestana(pestaña) {
        this.componenteActivo = pestaña;
      },
    },
  };
  </script>
  