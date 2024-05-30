<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="monedasFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalMonedas"
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
        monedas: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
          { key: 'valor_Moneda', label: 'Valor Moneda' },        
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalMonedas: 0,
      };
    },
    computed: {
      monedasFiltradas() {
        // Filtrar monedas según el estado del checkbox
        let monedasFiltradas = this.mostrarFilasSinDatos ? this.monedas.filter(moneda => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(moneda).some(valor => valor === '' || valor === null);
        }) : this.monedas;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return monedasFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerMonedas();
    },
    methods: {
      async obtenerMonedas() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.monedas) {
          console.log('Monedas obtenidas:', data.monedas);          
          this.monedas = data.monedas;
          this.totalMonedas = data.monedas.length;
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
  