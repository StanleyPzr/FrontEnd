<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center"><strong>Solicitudes de Tablas</strong></h1>
    <b-card class="card-lg">
      <b-tabs>
        <b-tab title="Solicitud Crear Tabla">
          <b-form @submit.prevent="submitCrearTablaForm">
            <b-form-group label="Nombre de la tabla">
              <b-form-input v-model="nombreTablaCrear" placeholder="Ingrese el nombre de la tabla"></b-form-input>
            </b-form-group>
            <b-form-group label="Ingrese el atributo">
              <b-form-input v-model="nombreAtributo" placeholder="Ingrese el atributo"></b-form-input>
            </b-form-group>
            <b-form-group label="Relacion con otra tabla">
              <b-form-input v-model="RelacionTabla" placeholder="Relacion con otra tabla"></b-form-input>
            </b-form-group>
            <b-form-group label="Vinculación etiqueta XML">
              <b-form-input v-model="EtiquetaXML" placeholder="Vinculación etiqueta XML"></b-form-input>
            </b-form-group>
            <div class="d-flex justify-content-end">
              <b-button type="submit" class="ml-2" variant="success">Enviar</b-button>
            </div>
          </b-form>
        </b-tab>

        <b-tab title="Solicitud Modificar Tabla">
          <b-dropdown id="dropdown-models-modify" text="Seleccionar Modelo">
            <b-dropdown-item 
              v-for="(model, index) in Object.keys(modelsStructure)"
              :key="index"
              @click="selectModel(model)"
            >{{ model }}</b-dropdown-item>
          </b-dropdown>
          <b-form @submit.prevent="openSummaryModal" v-if="selectedModelProperties.length > 0" class="d-flex flex-wrap">
            <b-form-group
              v-for="(column, index) in selectedModelProperties"
              :key="index"
              :label="`Atributo${index + 1}`"
              class="mr-3"
            >
              <b-form-input v-model="formData[column.name]" :placeholder="`Ingresar ${column.name}`"></b-form-input>
            </b-form-group>
            <div class="w-100 d-flex justify-content-end mt-2">
              <b-button variant="info" type="submit">Revisar Cambios</b-button>
            </div>
          </b-form>
        </b-tab>
      </b-tabs>
    </b-card>

    <!-- Modal de resumen de cambios -->
    <b-modal v-model="showSummaryModal" title="Resumen de Cambios">
      <b-table :items="tableItems" :fields="tableFields" bordered>
        <template #cell(attribute)="data">
          <span>{{ data.item.attribute }}</span>
        </template>
        <template #cell(originalValue)="data">
          <span>{{ data.item.originalValue }}</span>
        </template>
        <template #cell(newValue)="data">
          <span>{{ data.item.newValue }}</span>
        </template>
      </b-table>
      <template #modal-footer>
        <div class="d-flex justify-content-between w-100">
          <b-button variant="primary" @click="showSummaryModal = false">Cerrar</b-button>
          <b-button variant="success" @click="submitModifyForm">Enviar</b-button>
        </div>
      </template>
    </b-modal>

    <!-- Toast de notificación -->
    <b-toast
      id="toast-success"
      variant="success"
      :visible="showToast"
      @hidden="showToast = false"
      solid
      auto-hide-delay="5000"
    >
      Solicitud enviada correctamente.
    </b-toast>
  </div>
</template>

<script>
import EstadoService from '@/helpers/Estado.service';

export default {
  data() {
    return {
      modelsStructure: {},
      selectedModelProperties: [],
      formData: {},
      originalData: {},
      showSummaryModal: false,
      filteredChanges: [],
      showToast: false,
      nombreTablaCrear: '',
      nombreAtributo: '',
      RelacionTabla: '',
      EtiquetaXML: '',
      tableFields: [
        { key: 'attribute', label: 'Atributo' },
        { key: 'originalValue', label: 'Valor Original' },
        { key: 'newValue', label: 'Valor Nuevo' }
      ],
      tableItems: []
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
      this.originalData = {};
      this.selectedModelProperties.forEach(property => {
        this.formData[property.name] = property.name;
        this.originalData[property.name] = property.name; // Esto es solo un ejemplo, reemplázalo con los datos reales
      });
    },
    openSummaryModal() {
      this.filteredChanges = [];
      for (const key in this.formData) {
        if (this.formData[key] !== this.originalData[key]) {
          this.filteredChanges.push({
            attribute: key,
            originalValue: this.originalData[key],
            newValue: this.formData[key]
          });
        }
      }
      this.tableItems = this.filteredChanges;
      this.showSummaryModal = true;
    },
    submitModifyForm() {
      console.log('Formulario de Solicitud Modificar Tabla enviado', this.formData);
      this.showSummaryModal = false;
      this.showToast = true; // Mostrar el toast de notificación
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

.card-lg {
  width: 100%;
  max-width: 800px;
}

.b-form-group {
  min-width: 200px;
  flex: 1;
}

@media (max-width: 768px) {
  .b-form-group {
    width: 100%;
  }
}
</style>
