<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="plantillasFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalplantillas"
        :per-page="10"
        aria-controls="mi-tabla"
      ></b-pagination>
    </div>
  </template>
  
  <script>
  import Estado from '@/helpers/Estado.service.js';
  
  export default {
    data() {
      return {
        plantillas: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'cod_Contrato', label: 'Código de Contrato' },
          { key: 'valor_Contrato', label: 'Valor de Contrato' },                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalplantillas: 0,
      };
    },
    computed: {
        plantillasFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let plantillasFiltradas = this.mostrarFilasSinDatos ? this.plantillas.filter(plantilla => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(plantilla).some(valor => valor === '' || valor === null);
        }) : this.plantillas;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return plantillasFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerPlantillas();
    },
    methods: {
      async obtenerPlantillas() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.plantillasContrato) {
          console.log('Plantillas obtenidas:', data.plantillasContrato);
          console.log('all pl data obtenidas:', data);         
          this.plantillas = data.plantillasContrato;
          this.totalplantillas = data.plantillasContrato.length;
        }
      },
      debeAgregarDato(item, columna) {
        return item[columna] === '' || item[columna] === null;
      },
      agregarDato(item, columna) {      
        console.log('Agregar dato para:', columna, 'de', item);      
        item[columna] = '01234567890123'; 
      },
    },
  };
  </script>
  