<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="gradosFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalGrados"
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
    grados: [],
    camposTabla: [
      { key: 'gradeID', label: 'GradeID' },
      { key: 'gradeName', label: 'GradeName' },
      { key: 'gradeCode', label: 'GradeCode' },
      { key: 'gradeActiveStatus', label: 'GradeActiveStatus' },               
    ],
    

    mostrarFilasSinDatos: false,
    paginaActual: 1,
    totalGrados: 0,
  };
},
computed: {
  gradosFiltrados() {
    // Filtrar departamentos según el estado del checkbox
    let gradosFiltrados = this.mostrarFilasSinDatos ? this.grados.filter(grado => {
      // Verificar si alguna de las propiedades está vacía o es nula
      return Object.values(grado).some(valor => valor === '' || valor === null);
    }) : this.grados;

    // Aplicar paginación
    const inicio = (this.paginaActual - 1) * 10;
    const fin = this.paginaActual * 10;
    return gradosFiltrados.slice(inicio, fin);
  },
},
mounted() {
  this.obtenerGrados();
},
methods: {
  async obtenerGrados() {
    const data = await Estado.ObtenerGrades();
    if (data) {
        console.log('Grados obtenidas:', data);
      this.grados = data;
      this.totalGrados = data.length;
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
