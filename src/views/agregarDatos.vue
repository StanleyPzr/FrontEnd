<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center"><strong>Formulario Dinámico</strong></h1>
    <b-card>
      <b-card-header>
        <h4>Seleccionar Modelo</h4>
      </b-card-header>
      <b-card-body>
        <b-dropdown id="dropdown-models" text="Seleccionar Modelo">
          <b-dropdown-item 
            v-for="(model, index) in Object.keys(modelsStructure)"
            :key="index"
            @click="selectModel(model)"
          >{{ model }}</b-dropdown-item>
        </b-dropdown>
      </b-card-body>
    </b-card>

    <!-- Modal Genérico -->
    <b-modal id="dynamic-form-modal" ref="dynamicFormModal" title="Agregar Datos" hide-footer size="xl">
      <b-form @submit.prevent="submitForm">
        <b-form-group
          v-for="(column, index) in selectedModelProperties"
          :key="index"
          :label="column.name"
        >
          <template v-if="isTextField(column.dataType)">
            <b-form-input v-model="formData[column.name]" :placeholder="`Ingresar ${column.name}`"></b-form-input>
          </template>
          <template v-else-if="isNumberField(column.dataType)">
            <b-form-input type="number" v-model="formData[column.name]" :placeholder="`Ingresar ${column.name}`"></b-form-input>
          </template>
          <template v-else-if="isDateField(column.dataType)">
            <b-form-datepicker v-model="formData[column.name]" :placeholder="`Ingresar ${column.name}`"></b-form-datepicker>
          </template>
          <template v-else-if="isBooleanField(column.dataType)">
            <b-form-group>
              <b-form-radio
                name="booleanField"
                value="true"
                v-model="formData[column.name]"
              >Sí</b-form-radio>
              <b-form-radio
                name="booleanField" 
                value="false"
                v-model="formData[column.name]"
              >No</b-form-radio>
            </b-form-group>
          </template>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <b-button type="submit" class="ml-2" variant="success">Agregar</b-button>
          <b-button class="ml-2" variant="danger" @click="hideModal">Cancelar</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import EstadoService from '@/helpers/Estado.service';

export default {
  data() {
    return {
      modelsStructure: {},
      selectedModelProperties: [],
      formData: {}
    };
  },
  mounted() {
    this.fetchModelsStructure();
  },
  methods: {
    async fetchModelsStructure() {
      try {
        const modelos = await EstadoService.ObtenerModelosTabla();
        if (modelos) {
          this.modelsStructure = modelos;
        } else {
          console.error('Error al obtener los modelos de tabla.');
        }
      } catch (error) {
        console.error('Error al obtener los modelos de tabla:', error);
      }
    },
    selectModel(modelName) {
      this.selectedModelProperties = this.modelsStructure[modelName];
      this.formData = {};
      this.selectedModelProperties.forEach(property => {
        this.formData[property.name] = ''; // Cambia a "name" en lugar de "Name"
      });
      this.$refs.dynamicFormModal.show();
    },
    hideModal() {
      this.$refs.dynamicFormModal.hide();
    },
    async submitForm() {
      try {        
        //await axios.post('/api/frontend/add-data', this.formData);
        this.hideModal();
        alert('Datos agregados exitosamente');
      } catch (error) {
        console.error('Error adding data:', error);
      }
    },
    isTextField(dataType) {
      return ['String'].includes(dataType);
    },
    isNumberField(dataType) {
      return ['Int32', 'Int64', 'Double', 'Decimal'].includes(dataType);
    },
    isDateField(dataType) {
      return ['DateTime'].includes(dataType);
    },
    isBooleanField(dataType) {
      return ['Boolean'].includes(dataType);
    },
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
