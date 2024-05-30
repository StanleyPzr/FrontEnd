<template>
  <div>
      <b-card no-body>
          <b-tabs card>
              <b-nav tabs>
                  <b-nav-item @click="mostrarPestana('Departamentos')">Departamentos</b-nav-item>
                  <b-nav-item @click="mostrarPestana('Jobs')">Trabajos</b-nav-item>
                  <b-nav-item @click="mostrarPestana('BusinessUnit')">Unidad de Negocios</b-nav-item>
                  <b-nav-item @click="mostrarPestana('Entidades')">Entidades Legales</b-nav-item>
                  <b-nav-item @click="mostrarPestana('Locaciones')">Locaciones</b-nav-item>
                  <b-nav-item @click="mostrarPestana('Posiciones')">Posiciones</b-nav-item>
                  <b-nav-item @click="mostrarPestana('Grados')">Grados</b-nav-item>
              </b-nav>
              <component :is="componenteActivo"></component>
          </b-tabs>
      </b-card>
  </div>
</template>

<script>
import Departamentos from './Departamentos.vue'; 
import Jobs from './Jobs.vue';
import BusinessUnit from './BusinessUnit.vue';
import Entidades from './LegalEntities.vue';
import Posiciones from './Positions.vue';
import Locaciones from './Locations.vue';
import Grados from './Grades.vue'

export default {
  data() {
      return {
          componenteActivo: 'Departamentos', 
      };
  },
  components: {
      Departamentos, 
      Jobs,
      BusinessUnit,
      Entidades,
      Posiciones,
      Locaciones,
      Grados
  },
  methods: {
      mostrarPestana(pestana) {
          this.componenteActivo = pestana;
      },
  },
};
</script>
