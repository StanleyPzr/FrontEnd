<template>
    <div>
      <h1><strong>Agregar nuevos datos a Homologar</strong></h1>
  
      <div class="mt-3">
        <b-dropdown id="dropdown-1" text="WorkStructure">
          <b-dropdown-item @click="openModal('Departments')">Departments</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Jobs')">Jobs</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Business Units')">Business Units</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Positions')">Positions</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Locations')">Locations</b-dropdown-item>
          <b-dropdown-item @click="handleSelect('Legal Entities')">Legal Entities</b-dropdown-item>
        </b-dropdown>
      </div>
  
      <div class="mt-3">
        <b-dropdown id="dropdown-2" text="Worker">
          <b-dropdown-item @click="handleSelect('Person')">Person</b-dropdown-item>
        </b-dropdown>
      </div>  
      
      <b-modal id="modal-departments" ref="modalDepartments" title="Agregar nuevo Departmento" hide-footer>
        <form @submit.prevent="submitForm">
          <b-form-group label="DeptID" label-for="deptID">
            <b-form-input id="deptID" v-model="form.deptID"></b-form-input>
          </b-form-group>
  
          <b-form-group label="DeptName" label-for="deptName">
            <b-form-input id="deptName" v-model="form.deptName"></b-form-input>
          </b-form-group>
  
          <b-form-group label="Cod_Unidad_Orgánica" label-for="codUnidadOrganica">
            <b-form-input id="codUnidadOrganica" v-model="form.codUnidadOrganica"></b-form-input>
          </b-form-group>
  
          <b-form-group label="DeptEffectiveStartDate" label-for="deptEffectiveStartDate">
            <b-form-datepicker id="deptEffectiveStartDate" v-model="form.deptEffectiveStartDate"></b-form-datepicker>
          </b-form-group>
  
          <b-form-group label="DeptEffectiveEndDate" label-for="deptEffectiveEndDate">
            <b-form-datepicker id="deptEffectiveEndDate" v-model="form.deptEffectiveEndDate"></b-form-datepicker>
          </b-form-group>
  
          <b-form-group label="DeptStatus" label-for="deptStatus">
            <b-form-input id="deptStatus" v-model="form.deptStatus"></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary" class="mr-3">Crear</b-button>
          <b-button variant="danger" @click="hideModal">Cancelar</b-button>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          deptID: '',
          deptName: '',
          codUnidadOrganica: '',
          deptEffectiveStartDate: '',
          deptEffectiveEndDate: '',
          deptStatus: ''
        }
      };
    },
    methods: {
      openModal(item) {
        if (item === 'Departments') {
          this.$refs.modalDepartments.show();
        }
      },
      hideModal() {
        this.$refs.modalDepartments.hide();
      },
      submitForm() {        
        console.log('Form data:', this.form);
        this.hideModal();
      }
    }
  };
  </script>
  
  <style scoped>
  </style>  