<template>
    <div> <!-- Corregir -->
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
  import Departamentos from './Departamentos.vue'; 
  import Jobs from './Jobs.vue';
  
  export default {
    data() {
      return {
        componenteActivo: 'Departamentos', 
      };
    },
    components: {
      Departamentos, 
      Jobs, 
    },
    methods: {
      mostrarPestana(pestaña) {
        this.componenteActivo = pestaña;
      },
    },
  };
  </script>
  