<template>
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
</template>

<script>
import TableView from "@/views/Tables/Parts/TableView";
import {FormDataHelper} from "@/services/FormDataHelper";

export default {
  name: "LecturersTable",
  components: {
    TableView
  },
  async created () {
    console.log(this);
    this.inititalize();
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
        { text: this.$t('roles') , value: 'roles' },
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
          { value : null , label: this.$t('roles') , name: 'roles', type: 'select', items: []  },
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
          { value : null, label: this.$t('roles') , name: 'roles', type: 'select', items: []   },
        ]
      },
      replaceAvatars: [
        {"objectName": "avatarPath", "objectProperty":"name", "objectType":"avatar"},
        {"objectName": "cardImage", "objectProperty":"name", "objectType":"avatar" }
      ],
      exampleHandlers: {
        parentContext: this,
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
          console.log(context.veeErrors);
          console.log('this contesxt');
          console.log(context);
          context.veeErrors.clear();
          console.log(lecturerId);
          console.log(lecturer);
          let form = FormDataHelper.createFromObject(lecturer);
          console.log(form);

          form.set('lang', context.$store.state.user.user.lang);
          console.log(form.get('publicationsCount'));
          console.log(this);
          // console.log("edit item");
          return await context.API.post(`lecturer/edit/${arguments[1]}`, form).then((response) => {
            console.log(response);
            if (response.data.success == true) {
              console.log("response good");
              // context.close()
              // this.parentContext.inititalize();
              // context.clearEditedItem(); //очистили редактируемый this.editedItem элемент
              // context.close();//только потом закрыли диалог
              return new Promise(resolve => resolve(response));
            }
          }).catch((error)  => {
            context.$validationParser(error, context.veeErrors);
            context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedAddLecturer'});
            context.stop();//стоп чтоб дальше не шло редактирование
          });
        },
        addItem: async function(lecturer, context) {
          context.veeErrors.clear();
          console.log(lecturer);
          let form = FormDataHelper.createFromObject(lecturer);
          console.log(form);
          console.log(form.get('publicationsCount'));
          // let thisComponentInit = this.inititalize.bind(this);
          console.log("add item");
          return await context.API.post(`lecturer/add/`, form).then((response) => {
            if (response.data.success == true) {
              console.log(this);
              // this.parentContext.inititalize();
              //рано закрывать диалог поскольку ещё служебные действия для очистки текущего элемента не завершились
              //id терялась редактируемого элемента поскольку в close метоеде this.editedItem присваивались default значения
              //id нового элемента не было добавлено потомучто  я его не возращал полагаясь что оно такое же как и в таблица элемента(просто порядковый номер на фронте)
              //закрытие можно убрать отсюда потомучто если будет ошибка мы просто стопнем
              //элемент this.editedItem и закрыть диалог
              //Но не просто закрыть а сначала сделать доп действия
              // context.close()
              // context.clearEditedItem(); //очистили редактируемый this.editedItem элемент
              // context.close();//только потом закрыли диалог

            }
            return new Promise(resolve => resolve(response));
          }).catch((error)  => {
            context.$validationParser(error, context.veeErrors);
            context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedAddLecturer'});
            context.stop();
          });

        }
      }
    }
  },
  methods: {
    async inititalize () {
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

      await this.API.get('api/lazy/roles').then((success) => {
        this.defaultItem.properties[this.defaultItem.properties.length-1].items = success.data.item;
        this.editedItem.properties[this.editedItem.properties.length-1].items = success.data.item;
        console.log(this.defaultItem.properties[this.editedItem.properties.length-1]);
      }).catch((error)  => {
        console.log(error);
        this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedGetRoles'});
      });
      console.log(this.items);
      this.loaded = true;
      this.$store.dispatch('app/setOverlay', false);
    }
  },
  async roles() {

  }
}
</script>

<style scoped>

</style>