<template>
    <div>
        <b-card no-body>            
            <b-nav tabs>
                <b-nav-item @click="mostrarPestana('Person')">Personas</b-nav-item>
                
            </b-nav>
            <component :is="componenteActivo"></component>            
        </b-card>
    </div>
</template>

<script>


export default {
  data() {
      return {
          componenteActivo: 'Departamentos', 
      };
  },
  components: {
      
  },
  methods: {
      mostrarPestana(pestana) {
          this.componenteActivo = pestana;
      },
  },
};
</script>