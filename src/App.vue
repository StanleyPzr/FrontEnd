<template>
  <div>
    <b-row>
      <b-col cols="3">
        <b-nav vertical class="bg-custom" style="height: 100vh">
          <div class="d-flex justify-content-center">
            <b-img alt="ucn logo" id="icon" class="pulsate-fwd mt-3" :src="require('@/adm/components/assets/escudo_ucn.png')" animation="cylon" fluid style="width: 100px; height: auto;" />
          </div>
          <b-nav-item>
            <router-link to="/" class="nav-link">Inicio</router-link>
          </b-nav-item>          
          <b-nav-item @click="toggleCollapse('func1')">
            <span class="nav-link">Homologación</span>
          </b-nav-item>
          <b-collapse v-model="collapses.func1">
            <b-nav vertical>
              <b-nav-item>
                <router-link to="/about" class="nav-link">Ver Registro de los cambios</router-link>
              </b-nav-item>
              
            </b-nav>
          </b-collapse>
          <b-nav-item @click="toggleCollapse('func2')">
            <span class="nav-link">Tablas</span>
          </b-nav-item>
          <b-collapse v-model="collapses.func2">
            <b-nav vertical>
              <b-nav-item>
                <router-link to="/tablas" class="nav-link white-text">Work - Structures</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link to="/" class="nav-link white-text">Worker</router-link>
              </b-nav-item>
            </b-nav>
          </b-collapse>
          <!-- Otras funcionalidades -->
        </b-nav>
      </b-col>
      <b-col cols="9">
        
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapses: {
        func1: false,
        func2: false       
      },
    };
  },
  methods: {
    toggleCollapse(collapseKey) {
      this.collapses[collapseKey] = !this.collapses[collapseKey];
    },
    accion1() {
      // Acciones para Funcionalidad 1 - Acción 1
    },
    accion2() {
      // Acciones para Funcionalidad 1 - Acción 2
    },
    // Otros métodos de acción
  },
};
</script>

<style scoped>
.bg-custom {
  background-color: #001c57 !important;
}

.nav-link {
  color: white !important;
}

.white-text {
  color: white !important;
}
</style>
