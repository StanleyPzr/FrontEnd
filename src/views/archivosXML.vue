<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center"><strong>Archivos XML</strong></h1>
    <b-card>
      <b-card-header>
        <h4>Gestión de Archivos XML</h4>
      </b-card-header>
      <b-card-body>
        <div v-if="mainSection === ''">
          <b-button class="mr-2" @click="showMainSection('select')">Seleccionar Archivo</b-button>
          <b-button class="ml-2" @click="showMainSection('request')">Solicitar XML</b-button>
        </div>
      </b-card-body>
    </b-card>

    <div v-if="mainSection !== ''" class="mt-4">
      <b-card>
        <b-card-body>
          <div v-if="mainSection === 'select'">
            <h5>Seleccionar Archivo</h5>
            <b-list-group>
              <b-list-group-item @click="confirmSelect('Worker')" action>Worker</b-list-group-item>
              <b-list-group-item @click="confirmSelect('Structures')" action>Structures</b-list-group-item>
              <b-list-group-item @click="confirmSelect('Lookups')" action>Lookups</b-list-group-item>
            </b-list-group>
            <b-button class="mt-3" @click="resetMainSection">Volver</b-button>
          </div>
          <div v-else-if="mainSection === 'request'">
            <h5>Solicitar XML</h5>
            <p class="my-4">¿Solicitar nuevos archivos a HCM?</p>
            <div class="d-flex justify-content-end">
              <b-button class="ml-2" variant="success" @click="requestFiles('Sí')">Sí</b-button>
              <b-button class="ml-2" variant="danger" @click="requestFiles('No')">No</b-button>
            </div>
            <b-button class="mt-3" @click="resetMainSection">Volver</b-button>
          </div>
          <div v-else-if="mainSection === 'confirm'">
            <h5>Confirmación</h5>
            <p class="my-4">¿Está seguro de solicitar el archivo {{ selectedFile }}.xml?</p>
            <div class="d-flex justify-content-end">
              <b-button class="ml-2" variant="success" @click="handleConfirm('Sí')">Sí</b-button>
              <b-button class="ml-2" variant="danger" @click="handleConfirm('No')">No</b-button>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <b-toast
      id="toast-success"
      :variant="toastVariant"
      :visible="showToast"
      @hidden="hideToast"
      solid
      auto-hide-delay="5000"
    >
      {{ toastMessage }}
    </b-toast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mainSection: '',
      selectedFile: '',
      showToast: false,
      toastMessage: '',
      toastVariant: 'success' // Default variant
    };
  },
  methods: {
    showMainSection(type) {
      this.mainSection = type;
    },
    confirmSelect(file) {
      this.selectedFile = file;
      this.mainSection = 'confirm';
    },
    requestFiles() {
      this.showToastNotification('success', `Solicitando de nuevos archivos a HCM`);      
      this.resetMainSection();
    },
    handleConfirm(response) {
      if (response === 'Sí') {
        this.showToastNotification('success', `Archivo "${this.selectedFile}.xml" solicitado correctamente.`);
      }
      this.resetMainSection();
    },
    resetMainSection() {
      this.mainSection = '';
      this.selectedFile = '';
    },
    showToastNotification(variant, message) {
      this.toastVariant = variant;
      this.toastMessage = message;
      this.showToast = true;
    },
    showWarningToast(message) {
      this.showToastNotification('warning', message);
    },
    hideToast() {
      this.showToast = false;
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
