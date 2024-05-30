<template>
    <div class="mt-5">
      <b-card no-body>
        <b-tabs card v-model="tabIndex">
          <b-tab title="Jerarquías">
            <Jerarquias />
          </b-tab>
          <b-tab title="Tipos de Jornadas">
            <TipoJornada />
          </b-tab>
          <b-tab title="Jornadas">
            <Jornadas />
          </b-tab>
          <b-tab title="Jornadas Laborales">
            <JornadasLaborales />
          </b-tab>
          <b-tab title="Clases de Empleado">
            <clasesEmpleado />
          </b-tab>
          <b-tab title="Clasificaciones">
            <clasificaciones />
          </b-tab>
          <b-tab title="Códigos Ine">
            <codigosIne />
          </b-tab>
          <b-tab title="Modalidades de Pago">
            <modalidadesPago />
          </b-tab>
          <b-tab title="Monedas">
            <Monedas />
          </b-tab>
          <b-tab title="Pensionados">
            <Pensionado />
          </b-tab>
          <b-tab title="Plantas">
            <Plantas />
          </b-tab>
          <b-tab title="Plantillas Contratos">
            <Plantillas />
          </b-tab>
          <b-tab title="Regimen">
            <Regimen />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </template>
  
  <script>
  import Jerarquias from './Jerarquias.vue';
  import TipoJornada from './TipoJornada.vue';
  import Jornadas from './Jornadas.vue';
  import JornadasLaborales from './JornadasLaborales.vue';
  import clasesEmpleado from './clasesEmpleado.vue';
  import clasificaciones from './Clasificaciones.vue';
  import codigosIne from './CodigosIne.vue';
  import modalidadesPago from './modalidadesPago.vue';
  import Monedas from './Monedas.vue';
  import Pensionado from './Pensionados.vue';
  import Plantas from './Plantas.vue';
  import Plantillas from './PlantillasContrato.vue';
  import Regimen from './RegimenesTributarios.vue';
  
  export default {
    data() {
      return {
        tabIndex: 0, // Use this to control active tab
      };
    },
    components: {
      Jerarquias,
      TipoJornada,
      Jornadas,
      JornadasLaborales,
      clasesEmpleado,
      clasificaciones,
      codigosIne,
      modalidadesPago,
      Monedas,
      Pensionado,
      Plantas,
      Plantillas,
      Regimen,
    },
  };
  </script>
  