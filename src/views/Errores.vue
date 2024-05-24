<template>
    <b-card class="mt-3">
      <b-card-header>
        <h4>Registro de Errores</h4>        
      </b-card-header>
      <b-table :items="errores" :fields="fields" :per-page="perPage" :current-page="currentPage">
        <template #cell(fechaDeteccionError)="data">
          {{ formatDate(data.item.fechaDeteccionError) }}
        </template>
        <template #cell(horaDeteccionError)="data">
          {{ formatTime(data.item.horaDeteccionError) }}
        </template>
        <template #cell(estado)="data">
          <span :class="estadoClass(data.item.estado)">
            {{ data.item.estado }}
          </span>
        </template>
        <template #cell(accion)="data">
            <b-button variant="warning" @click="notificarError(data.item)">
                <b-icon icon="exclamation-octagon"></b-icon>Notificar 
            </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalErrores"
        :per-page="perPage"
        aria-controls="errores-table"
      ></b-pagination>
    </b-card>
  </template>
  
<script>
import Errores from '@/helpers/Estado.service';  
export default {
    data() {
      return {
        errores: [],
        fields: [
          { key: 'tablaAfectada', label: 'Tabla Afectada' },
          { key: 'etiquetaAfectada', label: 'Etiqueta Afectada' },
          { key: 'tipoError', label: 'Tipo Error' },
          { key: 'fechaDeteccionError', label: 'Fecha Detección Error' },
          { key: 'horaDeteccionError', label: 'Hora Detección Error' },
          { key: 'estado', label: 'Estado' },
          { key: 'accion', label: 'Acción'}
        ],
        perPage: 10,
        currentPage: 1,
        totalErrores: 0,
      };
    },
    mounted() {
        this.fetchErrores();
    },
    methods: {
        async fetchErrores() {
            const data = await Errores.ObtenerErrores();
            if (data) {
                this.errores = data;
                this.totalErrores = data.length;
            }
            console.log("errores:", data);
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        formatTime(timespan) {
            if (!timespan) return '';
            const [hours, minutes, seconds] = timespan.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);
            return date.toLocaleTimeString();
        },
        estadoClass(estado) {
            if (estado === 'No Solucionado') {
                return 'font-weight-bold text-danger'; 
            } else if (estado === 'Solucionado') {
                return 'font-weight-bold text-success'; 
            }     
            return 'font-weight-bold'; 
        },
        notificarError(errorItem) {    
            console.log('Notificar error:', errorItem);    
        },
    },
    };
</script>

<style scoped>
.b-table {
  text-align: center;
}

.b-table th,
.b-table td {
  vertical-align: middle; 
}
</style>
 
  