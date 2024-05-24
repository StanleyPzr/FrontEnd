<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center"><strong>Archivos XML</strong></h1>
    <b-card>
      <b-card-header>
        <h4>Gestión de Archivos XML</h4>
      </b-card-header>
      <b-card-body>
        <div v-if="section === ''">
          <b-button class="mr-2" @click="showSection('select')">Seleccionar Archivo</b-button>
          <b-button class="ml-2" @click="showSection('request')">Solicitar XML</b-button>
        </div>
        <div v-else-if="section === 'select'">
          <h5>Seleccionar Archivo</h5>
          <b-list-group>
            <b-list-group-item @click="handleSelect('Worker')" action>Worker</b-list-group-item>
            <b-list-group-item @click="handleSelect('Structures')" action>Structures</b-list-group-item>
            <b-list-group-item @click="handleSelect('Lookups')" action>Lookups</b-list-group-item>
          </b-list-group>
          <b-button class="mt-3" @click="showSection('')">Volver</b-button>
        </div>
        <div v-else-if="section === 'request'">
          <h5>Solicitar XML</h5>
          <p class="my-4">¿Solicitar nuevos archivos a HCM?</p>
          <div class="d-flex justify-content-end">
            <b-button class="ml-2" variant="success" @click="requestFiles('Sí')">Sí</b-button>
            <b-button class="ml-2" variant="danger" @click="requestFiles('No')">No</b-button>
          </div>
          <b-button class="mt-3" @click="showSection('')">Volver</b-button>
        </div>
        <div v-else-if="section === 'info'">
          <h5>Información del Archivo</h5>
          <p class="my-4">{{ modalMessage }}</p>
          <b-button class="mt-3" @click="showSection('')">Cerrar</b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      section: '',
      modalMessage: ''
    };
  },
  methods: {
    showSection(type) {
      this.section = type;
    },
    handleSelect(item) {
      this.modalMessage = `Traer información desde el servidor del archivo "${item}.xml"`;
      this.section = 'info';
    },
    requestFiles(response) {
      this.modalMessage = `Solicitud de nuevos archivos a HCM: ${response}`;
      this.section = 'info';
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
