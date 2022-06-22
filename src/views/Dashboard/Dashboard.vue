<template>
  <v-container
    id="dashboard-view"
    fluid
    tag="section"
  >
    <v-row>
        This is Dashboard
    </v-row>
  </v-container>
</template>

<script>
  // Utilities
  import Vue from 'vue'

  const lineSmooth = Vue.chartist.Interpolation.cardinal({
    tension: 0,
  })

  export default {
    name: 'DashboardView',

    data: () => ({}),

    computed: {
    },
  }
</script>
