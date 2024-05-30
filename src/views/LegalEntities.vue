<template>     
    <b-tab>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="entidadesFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalEntidades"
        :per-page="10"
        aria-controls="mi-tabla"
      ></b-pagination>
    </b-tab>
  

</template>

<script>
import Estado from '@/helpers/Estado.service.js';

export default {
data() {
  return {
    entidades: [],
    camposTabla: [
      { key: 'lempid', label: 'lempId' },
      { key: 'lempName', label: 'lempName' },      
      { key: 'lempStatus', label: 'lempStatus' },
      { key: 'lempEffectiveStartDate', label: 'lempEffectiveStartDate' },
      { key: 'lempEffectiveEndDate', label: 'lempEffectiveEndDate' },
    ],    
    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalEntidades: 0,
  };
},
computed: {
  entidadesFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let entidadesFiltrados = this.mostrarFilasSinDatos ? this.entidades.filter(entidad => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(entidad).some(valor => valor === '' || valor === null);
    }) : this.entidades;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return entidadesFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerEntidades();
},
methods: {
  async obtenerEntidades() {
    const data = await Estado.ObtenerEntidades();
    if (data) {
        console.log('Entidades legales obtenidas:', data);
      this.entidades = data;
      this.totalEntidades = data.length;
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
