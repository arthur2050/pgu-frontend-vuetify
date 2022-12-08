<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
    >
<!--      <v-tab-->
<!--          v-for="(item,index) in items"-->
<!--          :key="index"-->
<!--      >-->
<!--        t+{{index}}-->
<!--      </v-tab>-->
      <v-tab
      >
        Lecturers
      </v-tab>
      <v-tab
      >
        USERS
      </v-tab>
      <v-tab-item>
        <lecturers-table></lecturers-table>
      </v-tab-item>
      <v-tab-item>
        <users-table></users-table>
      </v-tab-item>
    </v-tabs>

<!--      <v-tab-item-->
<!--          v-for="(item,index) in items"-->
<!--          :key="index"-->
<!--      >-->

<!--&lt;!&ndash;          <component v-bind:is="item.name"></component>&ndash;&gt;-->
<!--      </v-tab-item>-->


<!--    <v-sheet elevation="6">-->
<!--      <v-tabs-->
<!--          background-color="cyan"-->
<!--          dark-->
<!--          next-icon="mdi-arrow-right-bold-box-outline"-->
<!--          prev-icon="mdi-arrow-left-bold-box-outline"-->
<!--          show-arrows-->
<!--      >-->
<!--        <v-tabs-slider color="yellow"></v-tabs-slider>-->
<!--        <v-tab-->
<!--            :key="1"-->
<!--        >-->
<!--          <lecturers-table></lecturers-table>-->
<!--        </v-tab>-->
<!--        <v-tab-->
<!--            :key="2"-->
<!--        >-->
<!--          <users-table></users-table>-->
<!--        </v-tab>-->
<!--      </v-tabs>-->
<!--    </v-sheet>-->
  </v-container>
</template>

<script>
  import LecturersTable from './LecturersTable';
  import UsersTable from "./UsersTable";

  export default {
    name: 'EditedTables',
    components: {LecturersTable, UsersTable},
    data() {
      return {
        tab: null,
        items: null,
      }
    },
    created() {

      // console.log(this.items);
      console.log(this);
    }
  }
</script>
