<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="modalidadesPagoFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalmodalidadesPago"
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
        modalidadesPago: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalmodalidadesPago: 0,
      };
    },
    computed: {
        modalidadesPagoFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let modalidadesPagoFiltradas = this.mostrarFilasSinDatos ? this.modalidadesPago.filter(modalidad => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(modalidad).some(valor => valor === '' || valor === null);
        }) : this.modalidadesPago;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return modalidadesPagoFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerModalidadesPago();
    },
    methods: {
      async obtenerModalidadesPago() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.modalidadesPago) {
          console.log('Modalidades de Pago obtenidas:', data.modalidadesPago);          
          this.modalidadesPago = data.modalidadesPago;
          this.totalmodalidadesPago = data.modalidadesPago.length;
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
  