<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="jobsFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalJobs"
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
    jobs: [],
    camposTabla: [
      { key: 'jobID', label: 'JobID' },
      { key: 'jobCode', label: 'JobCode' },
      { key: 'codigoIne', label: 'CodigoIne' },
      { key: 'jobActiveStatus', label: 'JobActiveStatus' },
      { key: 'jobEffectiveStartDate', label: 'JobEffectiveStartDate' },
      { key: 'jobEffectiveEndDate', label: 'JobEffectiveEndDate' },
    ],
    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalJobs: 0,
  };
},
computed: {
  jobsFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let jobsFiltrados = this.mostrarFilasSinDatos ? this.jobs.filter(depto => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(depto).some(valor => valor === '' || valor === null);
    }) : this.jobs;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return jobsFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerTrabajos();
},
methods: {
  async obtenerTrabajos() {
    const data = await Estado.ObtenerTrabajos();
    if (data) {
        console.log('Trabajos obtenidos:', data);
      this.jobs = data;
      this.totalJobs = data.length;
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
