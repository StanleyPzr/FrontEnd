<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="pensionadosFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalpensionados"
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
        pensionados: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalpensionados: 0,
      };
    },
    computed: {
        pensionadosFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let pensionadosFiltradas = this.mostrarFilasSinDatos ? this.pensionados.filter(pensionado => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(pensionado).some(valor => valor === '' || valor === null);
        }) : this.pensionados;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return pensionadosFiltradas.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerPensionados();
    },
    methods: {
      async obtenerPensionados() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.pensionados) {
          console.log('Clasificaciones obtenidas:', data.pensionados);
          console.log('all data obtenidas:', data);         
          this.pensionados = data.pensionados;
          this.totalpensionados = data.pensionados.length;
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
  