<template>  
  <div>
    <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
    <b-table
        :items="clasesEmpleadoFiltradas"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
    >                 
    </b-table>
    <b-pagination
      v-model="paginaActual"
      :total-rows="totalclasesEmpleado"
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
        clasesEmpleados: [],
        camposTabla: [
          { key: 'id', label: 'Id' },
          { key: 'descripcion', label: 'Descripción' },
                  
        ],     
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalclasesEmpleado: 0,
      };
    },
    computed: {
        clasesEmpleadoFiltradas() {
        // Filtrar jornadas según el estado del checkbox
        let clasesEmpleados = this.mostrarFilasSinDatos ? this.clasesEmpleados.filter(clase => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(clase).some(valor => valor === '' || valor === null);
        }) : this.clasesEmpleados;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return clasesEmpleados.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerclasesEmpleado();
    },
    methods: {
      async obtenerclasesEmpleado() {
        const data = await Estado.ObtenerJuegosComunes();
        if (data && data.clasesEmpleado) {
          console.log('Clases de Empleado obtenidas:', data.clasesEmpleado);          
          this.clasesEmpleados = data.clasesEmpleado;
          this.totalclasesEmpleado = data.clasesEmpleado.length;
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
  