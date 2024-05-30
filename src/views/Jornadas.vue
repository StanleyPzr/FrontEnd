<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="jornadasFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalJornadas"
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
        jornadas: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalJornadas: 0,
      };
    },
    computed: {
      jornadasFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let jornadasFiltradas = this.mostrarFilasSinDatos ? this.jornadas.filter(jornada => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(jornada).some(valor => valor === '' || valor === null);
        }) : this.jornadas;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return jornadasFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerJornadas();
    },
    methods: {
      async obtenerJornadas() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.jornadas) {
          console.log('Jornadas obtenidas:', data.jornadas);          
          this.jornadas = data.jornadas;
          this.totalJornadas = data.jornadas.length;
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
  