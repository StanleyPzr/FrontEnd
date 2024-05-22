<template>
    <div class="container">
      <h1><strong>Archivos XML</strong></h1>
      <div class=" mt-3">
        <b-dropdown id="dropdown-1" text="Seleccionar Archivo">
          <b-dropdown-item @click="handleSelect('Worker')">Worker</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Structures')">Structures</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Lookups')">Lookups</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="mt-3">
        <b-button class="mt-3" @click="showRequestModal">Solicitar XML</b-button>
      </div>
  
      <b-modal id="modal-1" ref="modal1" title="Información del Archivo" hide-footer>
        <p class="my-4">{{ modalMessage }}</p>
        <div class="d-flex justify-content-end">
          <b-button class="mt-3 ml-2" variant="success" @click="hideModal('modal1')">Sí</b-button>
          <b-button class="mt-3 ml-2" variant="danger" @click="hideModal('modal1')">No</b-button>
        </div>
      </b-modal>
  
      <b-modal id="modal-2" ref="modal2" title="Solicitud de Archivos" hide-footer>
        <p class="my-4">¿Solicitar nuevos archivos a HCM?</p>
        <div class="d-flex justify-content-end">
          <b-button class="mt-3 ml-2" variant="success" @click="hideModal('modal2')">Sí</b-button>
          <b-button class="mt-3 ml-2" variant="danger" @click="hideModal('modal2')">No</b-button>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        modalMessage: ''
      };
    },
    methods: {
      handleSelect(item) {
        this.modalMessage = `Traer información desde el servidor del archivo "${item}.xml"`;
        this.$refs.modal1.show();
      },
      showRequestModal() {
        this.$refs.modal2.show();
      },
      hideModal(modalId) {
        this.$refs[modalId].hide();
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  </style>
  