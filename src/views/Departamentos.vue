<template>     
  <div>
    <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
    <b-form-input
      v-model="busqueda"
      placeholder="Buscar por cualquier campo..."
      class="mb-3"
    ></b-form-input>
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
      :total-rows="totalDepartamentosFiltrados"
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
      totalDepartamentosFiltrados: 0,
      busqueda: '',
    };
  },
  computed: {
    departamentosFiltrados() {
      let departamentosFiltrados = this.departamentos;

      if (this.mostrarFilasSinDatos) {
        departamentosFiltrados = departamentosFiltrados.filter(depto =>
          Object.values(depto).some(valor => valor === '' || valor === null)
        );
      }

      if (this.busqueda) {
        const busquedaLower = this.busqueda.toLowerCase();
        departamentosFiltrados = departamentosFiltrados.filter(depto =>
          Object.values(depto).some(valor =>
            String(valor).toLowerCase().includes(busquedaLower)
          )
        );
      }
      
      this.actualizarTotalDepartamentosFiltrados(departamentosFiltrados.length);     
      const inicio = (this.paginaActual - 1) * 10;
      const fin = this.paginaActual * 10;
      return departamentosFiltrados.slice(inicio, fin);
    },
  },
  watch: {
    busqueda() {
      this.paginaActual = 1; 
    },
    mostrarFilasSinDatos() {
      this.paginaActual = 1; 
    }
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
        this.totalDepartamentosFiltrados = data.length; 
      }
    },
    debeAgregarDato(item, columna) {
      return item[columna] === '' || item[columna] === null;
    },
    agregarDato(item, columna) {      
      console.log('Agregar dato para:', columna, 'de', item);      
      item[columna] = '01234567890123'; 
    },
    actualizarTotalDepartamentosFiltrados(total) {
      this.totalDepartamentosFiltrados = total;
    },
  },
};
</script>
