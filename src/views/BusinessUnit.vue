<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="unidadesFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalUnidades"
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
    unidades: [],
    camposTabla: [
      { key: 'buid', label: 'BUID' },
      { key: 'buName', label: 'buName' },
      { key: 'buLocationID', label: 'buLocationID' },
      { key: 'buStatus', label: 'buStatus' },
      { key: 'buEffectiveStartDate', label: 'buEffectiveStartDate' },
      { key: 'buEffectiveEndDate', label: 'buEffectiveEndDate' },
    ],    
    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalUnidades: 0,
  };
},
computed: {
  unidadesFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let unidadesFiltrados = this.mostrarFilasSinDatos ? this.unidades.filter(unidad => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(unidad).some(valor => valor === '' || valor === null);
    }) : this.unidades;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return unidadesFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerUnidades();
},
methods: {
  async obtenerUnidades() {
    const data = await Estado.ObtenerUnidades();
    if (data) {
        console.log('Unidades de Negocio obtenidas:', data);
      this.unidades = data;
      this.totalUnidades = data.length;
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
