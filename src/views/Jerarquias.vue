<template>     
    <div>
      <b-form-checkbox v-model="mostrarFilasSinDatos">Mostrar filas sin datos</b-form-checkbox>
      <b-table
        :items="jerarquiasFiltrados"
        :fields="camposTabla"
        striped
        hover
        responsive="sm"
      >                 
      </b-table>
      <b-pagination
        v-model="paginaActual"
        :total-rows="totalJerarquias"
        :per-page="10"
        aria-controls="mi-tabla"
      ></b-pagination>
    </div>
</template>

<script>
import Estado from '@/helpers/Estado.service.js';

export default {
  data() {
    return {
      jerarquias: [],
      camposTabla: [
        { key: 'id', label: 'Id' },
        { key: 'cod_Jerarquia', label: 'Código de Jerarquía' },
        { key: 'nom_Jerarquia', label: 'Nombre de Jerarquía' },            
      ],     
      mostrarFilasSinDatos: false,
      paginaActual: 1,
      totalJerarquias: 0,
    };
  },
  computed: {
    jerarquiasFiltrados() {
      // Filtrar jerarquías según el estado del checkbox
      let jerarquiasFiltrados = this.mostrarFilasSinDatos ? this.jerarquias.filter(jerarquia => {
        // Verificar si alguna de las propiedades está vacía o es nula
        return Object.values(jerarquia).some(valor => valor === '' || valor === null);
      }) : this.jerarquias;

      // Aplicar paginación
      const inicio = (this.paginaActual - 1) * 10;
      const fin = this.paginaActual * 10;
      return jerarquiasFiltrados.slice(inicio, fin);
    },
  },
  mounted() {
    this.obtenerJerarquias();
  },
  methods: {
    async obtenerJerarquias() {
      const data = await Estado.ObtenerJuegosComunes();
      if (data && data.jerarquias) {
        console.log('Jerarquias obtenidas:', data.jerarquias);
        this.jerarquias = data.jerarquias;
        this.totalJerarquias = data.jerarquias.length;
      }
    },
    debeAgregarDato(item, columna) {
      return item[columna] === '' || item[columna] === null;
    },
    agregarDato(item, columna) {      
      console.log('Agregar dato para:', columna, 'de', item);      
      item[columna] = '01234567890123'; 
    },
  },
};
</script>
