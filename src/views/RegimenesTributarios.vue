<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="regimenesTributariosFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalregimenesTributarios"
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
        regimenesTributarios: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalregimenesTributarios: 0,
      };
    },
    computed: {
        regimenesTributariosFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let regimenesTributariosFiltradas = this.mostrarFilasSinDatos ? this.regimenesTributarios.filter(regimenesTributarios => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(regimenesTributarios).some(valor => valor === '' || valor === null);
        }) : this.regimenesTributarios;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return regimenesTributariosFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerRegimenesTributarios();
    },
    methods: {
      async obtenerRegimenesTributarios() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.regimenesTributarios) {
          console.log('regimenesTributarios obtenidos:', data.regimenesTributarios);
          console.log('all data obtenidas:', data);         
          this.regimenesTributarios = data.regimenesTributarios;
          this.totalregimenesTributarios = data.regimenesTributarios.length;
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
  