<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="codigosIneFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalcodigosIne"
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
        codigosIne: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalcodigosIne: 0,
      };
    },
    computed: {
        codigosIneFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let codigosIneFiltradas = this.mostrarFilasSinDatos ? this.codigosIne.filter(codigos => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(codigos).some(valor => valor === '' || valor === null);
        }) : this.codigosIne;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return codigosIneFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerCodigosIne();
    },
    methods: {
      async obtenerCodigosIne() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.codigosIne) {
          console.log('codigosIne obtenidos:', data.codigosIne);          
          this.codigosIne = data.codigosIne;
          this.totalcodigosIne = data.codigosIne.length;
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
  