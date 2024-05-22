<template>
    <div>
      <h1>Tabla de la BD</h1>
      <b-table striped hover :items="tablaItems" :fields="tablaCampos"></b-table>
  
      <b-button class="mr-2" @click="abrirModalAgregar">Agregar tabla a la BD</b-button>
      <b-button class="ml-2" @click="abrirModalEditar">Editar tabla de la BD</b-button>  
     
      <b-modal ref="modalAgregar" title="Agregar Tabla a la BD">
        <b-form @submit="agregarTabla">
            <b-form-group label="Nombre de la tabla" label-for="nombreTabla">
                <b-form-input id="nombreTabla" v-model="nombreTabla"></b-form-input>
            </b-form-group>

            <b-form-group label="Nombre del atributo" v-for="(atributo, index) in atributos" :key="index">
            <b-input-group>
                <b-form-input v-model="atributos[index]"></b-form-input>
                <b-input-group-append>
                <b-button @click="eliminarAtributo(index)" variant="danger">-</b-button>
                </b-input-group-append>
            </b-input-group>
            </b-form-group>    
                <b-button @click="agregarAtributo">+</b-button>                   
        </b-form>
       </b-modal>

      <b-modal ref="modalEditar" title="Editar Tabla de la BD">
        <b-form @submit="editarTabla">
    <b-form-select v-model="tipoTabla" :options="tiposTabla"></b-form-select>

    <b-form-group label="Nombre de la tabla" label-for="nombreTablaEditar">
      <b-form-input id="nombreTablaEditar" v-model="nombreTablaEditar"></b-form-input>
    </b-form-group>

    
    <b-button type="submit">Enviar Solicitud</b-button>
  </b-form>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tablaItems: [],
        tablaCampos: [],
        nombreTabla: '',
        nombreAtributo: '',
        relacionTabla: '',
        etiquetaXML: '',
        atributos: [],
        tipoTabla: '',
        nombreTablaEditar: '',
        tiposTabla: ['Jobs', 'Departaments', 'Locations'] 
    };
    },
    methods: {
      abrirModalAgregar() {
        this.$refs.modalAgregar.show();
      },
      abrirModalEditar() {
        this.$refs.modalEditar.show();
      },
      agregarAtributo() {
      this.atributos.push('');
    },
    agregarTabla() {
      
      this.$refs.modalAgregar.hide();
    },
    editarTabla() {
     
      this.$refs.modalEditar.hide();
    }
    }

    
  };
  </script>
  