<template>
  <table-view :propHeaders="headers"
              :propEditedItem="editedItem"
              :propElementsTable="items"
              :handlers="exampleHandlers"
              :propDefaultItem="defaultItem"
              :replaceViewingElementsItem="replaceAvatars"
              v-if="loaded">
    <template v-slot:crudTitle>
      Users
    </template>
  </table-view>
</template>

<script>

import TableView from "@/views/Tables/Parts/TableView";
import {FormDataHelper} from "@/services/FormDataHelper";

export default {
  name: "UsersTable",
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
        ]
      },
      replaceAvatars: [
        {"objectName": "avatarPath", "objectProperty":"name", "objectType":"avatar"},
      ],
      exampleHandlers: {
        parentContext: this,
        deleteItem: async function(userId, context) {
          await context.API.delete(`user/delete/${userId}`).then((success) => {
            console.log(success);
          }).catch(()  => {
            context.$store.dispatch('snackbar/add', {color: 'error', content: 'failedDeleteLecturer'});
            context.stop();
          });
          console.log(userId);
          console.log("delete item");
        },
        editItem: async function(user, userId, context) {
          console.log(context.veeErrors);
          console.log('this contesxt');
          console.log(context);
          context.veeErrors.clear();
          console.log(userId);
          console.log(user);
          let form = FormDataHelper.createFromObject(user);
          console.log(form);
          console.log(this);
          // console.log("edit item");
          return await context.API.post(`user/edit/${arguments[1]}`, form).then((response) => {
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
        addItem: async function(user, context) {
          context.veeErrors.clear();
          console.log(user);
          let form = FormDataHelper.createFromObject(user);
          console.log(form);
          // let thisComponentInit = this.inititalize.bind(this);
          console.log("add item");
          return await context.API.post(`user/add/`, form).then((response) => {
            if (response.data.success == true) {
              console.log(this);

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
      await this.API.get(`user/all/`).then((success) => {
        let users = success.data.users;
        this.items = users;
      }).catch((error)  => {
        console.log(error);
        this.$store.dispatch('snackbar/add', {color: 'error', content: 'failedGetLecturers'});
      });
      console.log(this.items);
      this.loaded = true;
      this.$store.dispatch('app/setOverlay', false);
    }
  }
}
</script>

<style scoped>

</style>