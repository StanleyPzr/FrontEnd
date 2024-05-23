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
          <b-form @submit.prevent="submitModifyForm" v-if="selectedModelProperties.length > 0">
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
              <b-button type="submit" class="ml-2" variant="success">Enviar</b-button>
            </div>
          </b-form>
        </b-tab>

      </b-tabs>
    </b-card>
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
      nombreTablaCrear: '',
      nombreAtributo: '',
      RelacionTabla: '',
      EtiquetaXML: ''
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
        this.formData[property.name] = '';
      });
    },
    submitModifyForm() {      
      console.log('Formulario de Solicitud Modificar Tabla enviado');
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

.card-lg {
  width: 100%; /* Ancho completo */
  max-width: 800px; /* O el tamaño deseado */
}
</style>

