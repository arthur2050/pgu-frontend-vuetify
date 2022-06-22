<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
  <table-view :propHeaders="headers"
              :propEditedItem="editedItem"
              :propElementsTable="items"
              :handlers="exampleHandlers"
              :propDefaultItem="defaultItem"
              :replaceViewingElementsItem="replaceAvatars"
              v-if="loaded">
    <template v-slot:crudTitle>
     Lecturers
    </template>
  </table-view>
  </v-container>
</template>

<script>
  import TableView from './Parts/TableView';
  import {FormDataHelper} from '@/services/FormDataHelper';
  export default {
    components: {
      TableView
    },
    name: 'EditedTables',
    async created () {
      this.loaded = false;
      this.$store.dispatch('app/setOverlay', true);
      await this.API.get(`lecturer/all/`).then((success) => {
              let dataLecturers = success.data.lecturers;
              let lecturers = [];
              for(const keyLecturer in dataLecturers) {
                let tempObject = Object.assign({}, dataLecturers[keyLecturer]);
                let tempUser = Object.assign({}, dataLecturers[keyLecturer].user);
                delete(tempUser.id);
                lecturers.push(Object.assign(tempObject ,tempUser));
              }
              console.log(success);
              console.log(lecturers);
              this.items = lecturers;
            }).catch((error)  => {
              console.log(error);
                this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedGetLecturers'});
            });
            console.log(this.items);
            this.loaded = true;
      this.$store.dispatch('app/setOverlay', false);
    },
    data() {
      return {
        loaded: false,
        headers: [
          { text: this.$t('name') , value: 'name' },
          { text: this.$t('surName') , value: 'surname' },
          { text: this.$t('patronymic') , value: 'patronymic' },
          { text: this.$t('email') , value: 'email' },
          { text: this.$t('phone') , value: 'phone' },
          { text: this.$t('avatarPath') , value: 'avatarPath' },
          { text: this.$t('slug') , value: 'slug' },
          { text: this.$t('position') , value: 'position' },
          { text: this.$t('cardImage') , value: 'cardImage' },
          { text: this.$t('professionalInterests') , value: 'professionalInterests' },
          { text: this.$t('publicationsCount') , value: 'publicationsCount' },
          { text: this.$t('projectsCount') , value: 'projectsCount' },
          { text: this.$t('conferencesCount') , value: 'conferencesCount' },
          { text: this.$t('diplomaProjectsCount') , value: 'diplomaProjectsCount' },
          { text: this.$t('actions'), value: 'actions', sortable: false },
        ],
        items: undefined,
        editedItem: {
          properties: [
            { value : '' , label: this.$t('name') , name: 'name' },
            { value : '' , label: this.$t('surName') , name: 'surname'  },
            { value : '' , label: this.$t('patronymic') , name: 'patronymic'  },
            { value : '' , label: this.$t('email') , name: 'email'  },
            { value : '' , label: this.$t('password') , name: 'password'  },
            { value : '' , label: this.$t('phone') , name: 'phone'  },
            { value : null , label: this.$t('avatarPath'), name: 'avatarPath', type: 'avatar'  },
            { value : '' , label: this.$t('slug') , name: 'slug' },
            { value : '' , label: this.$t('position') , name: 'position'  },
            { value : null , label: this.$t('cardImage') , name: 'cardImage', type: 'avatar'    },
            { value : '' , label: this.$t('professionalInterests') , name: 'professionalInterests'  },
            { value : null , label: this.$t('publicationsCount') , name: 'publicationsCount'  },
            { value : null , label: this.$t('projectsCount') , name: 'projectsCount'  },
            { value : null , label: this.$t('conferencesCount') , name: 'conferencesCount'  },
            { value : null , label: this.$t('diplomaProjectsCount') , name: 'diplomaProjectsCount'  },
          ]
        },
         defaultItem: {
          properties: [
            { value : '' , label: this.$t('name') , name: 'name' },
            { value : '' , label: this.$t('surName') , name: 'surname'  },
            { value : '' , label: this.$t('patronymic') , name: 'patronymic'  },
            { value : '' , label: this.$t('email') , name: 'email'  },
            { value : '' , label: this.$t('password') , name: 'password'  },
            { value : '' , label: this.$t('phone') , name: 'phone'  },
            { value : null , label: this.$t('avatarPath'), name: 'avatarPath', type: 'avatar'  },
            { value : '' , label: this.$t('slug') , name: 'slug' },
            { value : '' , label: this.$t('position') , name: 'position'  },
            { value : null , label: this.$t('cardImage') , name: 'cardImage', type: 'avatar' },
            { value : '' , label: this.$t('professionalInterests') , name: 'professionalInterests'  },
            { value : null , label: this.$t('publicationsCount') , name: 'publicationsCount'  },
            { value : null , label: this.$t('projectsCount') , name: 'projectsCount'  },
            { value : null , label: this.$t('conferencesCount') , name: 'conferencesCount'  },
            { value : null , label: this.$t('diplomaProjectsCount') , name: 'diplomaProjectsCount'  },
          ]
        },
        replaceAvatars: [
          {"objectName": "avatarPath", "objectProperty":"name", "objectType":"avatar"},
          {"objectName": "cardImage", "objectProperty":"name", "objectType":"avatar" }
        ],
        exampleHandlers: {
          deleteItem: async function(lecturerId, context) {
            await context.API.delete(`lecturer/delete/${lecturerId}`).then((success) => {
              console.log(success);
            }).catch(()  => {
                context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedDeleteLecturer'});
                context.stop();
            });
            console.log(lecturerId);
            console.log("delete item");
          },
          editItem: async function(lecturer, lecturerId, context) {
            context.veeErrors.clear();
            console.log(lecturer);
            let form = FormDataHelper.createFromObject(lecturer);
            console.log(form);
            form.set('position', form.get('position') !== 'null' ? form.get('position') : 0);
            form.set('publicationsCount', form.get('publicationsCount') !== 'null' ? form.get('publicationsCount') : 0);
            form.set('projectsCount', form.get('projectsCount') !== 'null' ? form.get('projectsCount') : 0);
            form.set('conferencesCount', form.get('conferencesCount') !== 'null' ? form.get('conferencesCount') : 0);
            form.set('diplomaProjectsCount', form.get('diplomaProjectsCount') !== 'null' ? form.get('diplomaProjectsCount') : 0);
            console.log(form.get('publicationsCount'));
            await context.API.post(`lecturer/edit/${lecturerId}`, form).then((response) => {
              console.log(response);
              if (response.data.success == true) {
                context.close()
              }
            }).catch((error)  => {
                context.$validationParser(error, context.veeErrors);
                context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedAddLecturer'});
                context.stop();
            });
            console.log("edit item");
          },
          addItem: async function(lecturer, context) {
            context.veeErrors.clear();
            console.log(lecturer);
            let form = FormDataHelper.createFromObject(lecturer);
            console.log(form);
            form.set('publicationsCount', form.get('publicationsCount') !== 'null' ? form.get('publicationsCount') : 0);
            form.set('projectsCount', form.get('projectsCount') !== 'null' ? form.get('projectsCount') : 0);
            form.set('conferencesCount', form.get('conferencesCount') !== 'null' ? form.get('conferencesCount') : 0);
            form.set('diplomaProjectsCount', form.get('diplomaProjectsCount') !== 'null' ? form.get('diplomaProjectsCount') : 0);
            console.log(form.get('publicationsCount'));
            await context.API.post(`lecturer/add/`, form).then((response) => {
              if (response.data.success == true) {
                context.close()
              }
            }).catch((error)  => {
                context.$validationParser(error, context.veeErrors);
                context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedAddLecturer'});
                context.stop();
            });
            console.log("add item");
          }
        }
      }
    }
  }
</script>
