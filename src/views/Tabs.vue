<template>
    <div>
      <b-card no-body>
        <b-tabs card v-model="tabIndex">
          <b-tab title="Departamentos">
            <Departamentos />
          </b-tab>
          <b-tab title="Trabajos">
            <Jobs />
          </b-tab>
          <b-tab title="Unidad de Negocios">
            <BusinessUnit />
          </b-tab>
          <b-tab title="Entidades Legales">
            <Entidades />
          </b-tab>
          <b-tab title="Locaciones">
            <Locaciones />
          </b-tab>
          <b-tab title="Posiciones">
            <Posiciones />
          </b-tab>
          <b-tab title="Grados">
            <Grados />
          </b-tab>
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
        tabIndex: 0, // Use this to control the active tab
      };
    },
    components: {
      Departamentos, 
      Jobs,
      BusinessUnit,
      Entidades,
      Posiciones,
      Locaciones,
      Grados,
    },
  };
  </script>
  