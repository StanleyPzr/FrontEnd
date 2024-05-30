<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="posicionesFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalPosiciones"
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
    posiciones: [],
    camposTabla: [
      { key: 'positionID', label: 'PositionID' },
      { key: 'positionName', label: 'PositionName' },
      { key: 'positionCode', label: 'PositionCode' },
      { key: 'positionJobID', label: 'PositionJobID' },
      { key: 'positionFTE', label: 'PositionFTE' },
      { key: 'positionMaximumPersons', label: 'PositionMaximumPersons' },
      { key: 'positionActiveStatus', label: 'PositionActiveStatus' },
      { key: 'positionEffectiveStartDate', label: 'PositionEffectiveStartDate' },
      { key: 'positionEffectiveEndDate', label: 'PositionEffectiveEndDate' },
      { key: 'positionOrganizationID', label: 'PositionOrganizationID' },      
    ],     
    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalPosiciones: 0,
  };
},
computed: {
  posicionesFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let posicionFiltrados = this.mostrarFilasSinDatos ? this.posiciones.filter(posicion => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(posicion).some(valor => valor === '' || valor === null);
    }) : this.posiciones;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return posicionFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerPosiciones();
},
methods: {
  async obtenerPosiciones() {
    const data = await Estado.ObtenerPositions();
    if (data) {
        console.log('Posiciones obtenidas:', data);
      this.posiciones = data;
      this.totalPosiciones = data.length;
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
