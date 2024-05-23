<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center"><strong>Archivos XML</strong></h1>
    <b-card>
      <b-card-header>
        <h4>Gestión de Archivos XML</h4>
      </b-card-header>
      <b-card-body>
        <b-button class="mr-2" @click="showModal('select')">Seleccionar Archivo</b-button>
        <b-button class="ml-2" @click="showModal('request')">Solicitar XML</b-button>
      </b-card-body>
    </b-card>

    <!-- Modal Genérico -->
    <b-modal id="generic-modal" ref="genericModal" :title="modalTitle" hide-footer>
      <div v-if="modalType === 'select'">
        <b-list-group>
          <b-list-group-item @click="handleSelect('Worker')" action>Worker</b-list-group-item>
          <b-list-group-item @click="handleSelect('Structures')" action>Structures</b-list-group-item>
          <b-list-group-item @click="handleSelect('Lookups')" action>Lookups</b-list-group-item>
        </b-list-group>
      </div>
      <div v-else-if="modalType === 'request'">
        <p class="my-4">¿Solicitar nuevos archivos a HCM?</p>
        <div class="d-flex justify-content-end">
          <b-button class="ml-2" variant="success" @click="requestFiles('Sí')">Sí</b-button>
          <b-button class="ml-2" variant="danger" @click="requestFiles('No')">No</b-button>
        </div>
      </div>
      <div v-else-if="modalType === 'info'">
        <p class="my-4">{{ modalMessage }}</p>
        <div class="d-flex justify-content-end">
          <b-button class="ml-2" variant="primary" @click="hideModal">Cerrar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalTitle: '',
      modalType: '',
      modalMessage: ''
    };
  },
  methods: {
    showModal(type) {
      this.modalType = type;
      this.modalTitle = type === 'select' ? 'Seleccionar Archivo' : 'Solicitud de Archivos';
      this.$refs.genericModal.show();
    },
    hideModal() {
      this.$refs.genericModal.hide();
    },
    handleSelect(item) {
      this.modalMessage = `Traer información desde el servidor del archivo "${item}.xml"`;
      this.modalType = 'info';
      this.modalTitle = 'Información del Archivo';
    },
    requestFiles(response) {
      this.modalMessage = `Solicitud de nuevos archivos a HCM: ${response}`;
      this.modalType = 'info';
      this.modalTitle = 'Resultado de la Solicitud';
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
