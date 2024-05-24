<template>
  <div class="container" style="margin: 0 auto; margin-top: 20px;">
    <b-card>
      <b-card-header>
        <h4>Registros de Cambios</h4>
        <b-button variant="primary" @click="ObtenerRegistroCambio">
          <b-icon icon="arrow-clockwise"></b-icon> Actualizar
        </b-button>
      </b-card-header>
      <b-card-body>
        <b-table v-if="registrosCambios.length > 0" :items="registrosCambios" :fields="fields" class="center-table table-bordered">
          <template v-slot:cell(detallesCambio)="data">
            <span v-if="!data.item.detallesCambio.includes(',')">
              <span v-html="resaltarKey(data.item.detallesCambio)"></span>
            </span>
            <span v-else>
              Existe más de un cambio. Presione <strong>"Ver Detalles"</strong> para más información.
            </span>
          </template>
          <template v-slot:cell(detalleUnico)="data">
            <span v-if="data.item.detallesCambio.includes(',')">        
              <b-button variant="success" @click="mostrarModal(data.item.detallesCambio)">Ver Detalles</b-button>
            </span>
            <span v-else>
              Se realizó un único cambio
            </span>
          </template>      
        </b-table>
        <div v-else>
          <p>No hay registros de cambios disponibles.</p>
        </div>
      </b-card-body>
    </b-card>

    <b-modal v-model="mostrarDetallesModal" title="Detalles de Cambios" size="xl">
      <h3>Cambios realizados</h3>
      <b-table :items="cambiosModal" :fields="modalFields" class="mt-3 center-table table-bordered">
        <template v-slot:cell(KeyAfectada)="data">
          {{ data.item.KeyAfectada }}
        </template>
        <template v-slot:cell(ValorOriginal)="data">
          {{ data.item.ValorOriginal }}
        </template>
        <template v-slot:cell(ValorNuevo)="data">
          {{ data.item.ValorNuevo }}
        </template>
      </b-table>
      <template #modal-footer="{ cancel }">
        <b-button variant="danger" @click="cancel">Cerrar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Estado from '@/helpers/Estado.service.js';

export default {
  data() {
    return {
      registrosCambios: [],
      mostrarDetallesModal: false,
      cambiosModal: [],
      fields: [
        { key: 'tablaAfectada', label: 'Tabla Afectada' },
        { key: 'tipoCambio', label: 'Tipo de Cambio' },
        { key: 'detallesCambio', label: 'Detalles del Cambio' },
        { key: 'fechaCambio', label: 'Fecha de Cambio', formatter: 'formatoFecha' },
        { key: 'horaCambio', label: 'Hora de Cambio', formatter: 'formatoHora' },
        { key: 'detalleUnico', label: 'Detalles Adicionales' }
      ],
      modalFields: [
        { key: 'KeyAfectada', label: 'Key Afectada' },
        { key: 'ValorOriginal', label: 'Valor Original' },
        { key: 'ValorNuevo', label: 'Valor Nuevo' }
      ]
    };
  },
  mounted() {
    this.ObtenerRegistroCambio();
  },
  
  methods: {
    async ObtenerRegistroCambio() {
      try {
        const response = await Estado.obtenerRegistroCambios();
        if (response && Array.isArray(response)) {
          this.registrosCambios = response;
        } else {
          console.error('Error: no se recibió una respuesta válida del servicio');
        }
      } catch (error) {
        console.error('Error al llamar al servicio:', error);
      }
    },
    formatoFecha(value) {
      if (!value) return '';
      const dateParts = value.split('T')[0].split('-');
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    },
    formatoHora(value) {
      if (!value) return '';
      const timeParts = value.split(':');
      return `${timeParts[0]}:${timeParts[1]}:${timeParts[2].split('.')[0]}`;
    },
    resaltarKey(detallesCambio) {
      // Verificar si el formato es el esperado
      if (!detallesCambio.includes(':') || !detallesCambio.includes('->')) {
        return detallesCambio;
      }

      const [keyAfectada, valores] = detallesCambio.split(':');
      const [valorOriginal, valorNuevo] = valores.split('->').map(val => val.trim());
      return `<strong>${keyAfectada}:</strong> ${valorOriginal} -> ${valorNuevo}`;
    },
    mostrarModal(detallesCambio) {
      if (!detallesCambio.includes(',')) {
        this.cambiosModal = [{
          KeyAfectada: '',
          ValorOriginal: detallesCambio,
          ValorNuevo: ''
        }];
      } else {
        const cambios = detallesCambio.split(',').map(cambio => cambio.trim());
        this.cambiosModal = cambios.map(cambio => {
          const [keyAfectada, valores] = cambio.split(':');
          const [valorOriginal, valorNuevo] = valores.split('->').map(val => val.trim());
          return { KeyAfectada: keyAfectada.trim(), ValorOriginal: valorOriginal, ValorNuevo: valorNuevo };
        });
      }
      this.mostrarDetallesModal = true;
    }
  }
};
</script>

<style scoped>
.center-table {
  margin: 0 auto; 
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6; 
  padding: .75rem; 
  text-align: justify; 
}
</style>
