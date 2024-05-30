<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="plantasFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalplantas"
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
        plantas: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'nom_Planta', label: 'Nombre Planta' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalplantas: 0,
      };
    },
    computed: {
        plantasFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let plantasFiltradas = this.mostrarFilasSinDatos ? this.plantas.filter(planta => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(planta).some(valor => valor === '' || valor === null);
        }) : this.plantas;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return plantasFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerPlantas();
    },
    methods: {
      async obtenerPlantas() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.plantas) {
          console.log('Plantas obtenidas:', data.plantas);
          console.log('all data obtenidas:', data);         
          this.plantas = data.plantas;
          this.totalplantas = data.plantas.length;
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
  