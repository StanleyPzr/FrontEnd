<template>     
        <b-tab>
          <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
          <b-table
            :items="departamentosFiltrados"
            :fields="camposTabla"
            striped
            hover
            responsive="sm"
          >
            <template #cell(deptID)="row">
              <div>
                {{ row.value }}
                <b-button v-if="debeAgregarDato(row.item, 'deptID')" variant="warning" @click="agregarDato(row.item, 'deptID')">Agregar dato</b-button>
              </div>
            </template>
            <template #cell(deptName)="row">
              <div>
                {{ row.value }}
                <b-button v-if="debeAgregarDato(row.item, 'deptName')" variant="warning" @click="agregarDato(row.item, 'deptName')">Agregar dato</b-button>
              </div>
            </template>
            <template #cell(cod_Unidad_Organica)="row">
              <div>
                {{ row.value }}
                <b-button v-if="debeAgregarDato(row.item, 'cod_Unidad_Organica')" variant="warning" @click="agregarDato(row.item, 'cod_Unidad_Organica')">Agregar dato</b-button>
              </div>
            </template>           
          </b-table>
          <b-pagination
            v-model="paginaActual"
            :total-rows="totalDepartamentos"
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
        departamentos: [],
        camposTabla: [
          { key: 'deptID', label: 'ID' },
          { key: 'deptName', label: 'Nombre' },
          { key: 'cod_Unidad_Organica', label: 'Código Unidad Orgánica' },
          { key: 'deptEffectiveStartDate', label: 'Fecha de Inicio' },
          { key: 'deptEffectiveEndDate', label: 'Fecha de Fin' },
          { key: 'deptStatus', label: 'Estado' },
        ],
        mostrarFilasSinDatos: false,
        paginaActual: 1,
        totalDepartamentos: 0,
      };
    },
    computed: {
      departamentosFiltrados() {
        // Filtrar departamentos según el estado del checkbox
        let departamentosFiltrados = this.mostrarFilasSinDatos ? this.departamentos.filter(depto => {
          // Verificar si alguna de las propiedades está vacía o es nula
          return Object.values(depto).some(valor => valor === '' || valor === null);
        }) : this.departamentos;
  
        // Aplicar paginación
        const inicio = (this.paginaActual - 1) * 10;
        const fin = this.paginaActual * 10;
        return departamentosFiltrados.slice(inicio, fin);
      },
    },
    mounted() {
      this.obtenerDepartamentos();
    },
    methods: {
      async obtenerDepartamentos() {
        const data = await Estado.ObtenerDepartamentos();
        if (data) {
          this.departamentos = data;
          this.totalDepartamentos = data.length;
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
  