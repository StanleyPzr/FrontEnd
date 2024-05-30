<template>     
    <b-tab>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="locacionesFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalLocaciones"
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
    locaciones: [],
    camposTabla: [
      { key: 'locationID', label: 'LocationID' },
      { key: 'localDescription', label: 'LocalDescription' },
      { key: 'locationName', label: 'LocationName' },
      { key: 'locInternalLocationCode', label: 'LocInternalLocationCodes' },
      { key: 'locationRegion1', label: 'LocationRegion1' },
      { key: 'locationRegion2', label: 'LocationRegion2' },
      { key: 'locationRegion3', label: 'LocationRegion3' },
      { key: 'locationAddresLine1', label: 'LocationAddresLine1' },
      { key: 'locationActionDate', label: 'LocationActionDate' },
      { key: 'locationEffectiveStartDate', label: 'LocationEffectiveStartDate' },
      { key: 'locationEffectiveEndDate', label: 'LocationEffectiveEndDate' }
    ],     
    
    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalLocaciones: 0,
  };
},
computed: {
  locacionesFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let locacionesFiltrados = this.mostrarFilasSinDatos ? this.locaciones.filter(locacion => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(locacion).some(valor => valor === '' || valor === null);
    }) : this.locaciones;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return locacionesFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerLocaciones();
},
methods: {
  async obtenerLocaciones() {
    const data = await Estado.ObtenerLocations();
    if (data) {
        console.log('Localizaciones obtenidas:', data);
      this.locaciones = data;
      this.totalLocaciones = data.length;
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
