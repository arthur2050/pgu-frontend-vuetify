<template>
	<v-data-table
    :headers="headers"
    :items="elementsTable"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>
			<slot name="crudTitle">
				Crud Title
			</slot>
        </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(editedPieceOfItem,index) in editedItem.properties"
                    v-bind:key="index"
                  >
					<v-text-field
						v-if="editedPieceOfItem.type == undefined || editedPieceOfItem.type == 'text'"
						v-model="editedPieceOfItem.value"
            :error-messages="veeErrors.collect(`${editedPieceOfItem.name}`)"
						:label="editedPieceOfItem.label"
						></v-text-field>
					<v-file-input
						v-else-if="editedPieceOfItem.type == 'avatar'"
						v-model="editedPieceOfItem.value"
            :error-messages="veeErrors.collect(`${editedPieceOfItem.name}`)"
						:rules="avatarRules"
						accept="image/png, image/jpeg, image/bmp"
						placeholder="Pick an avatar"
						prepend-icon="mdi-camera"
						:label="editedPieceOfItem.label"
						></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                {{$t('cancel')}}
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                :loading="loading"
              >
                {{$t('save')}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

                <v-btn color="primary" text @click="closeDelete">{{$t('cancel')}}</v-btn>
                <v-btn color="primary" text @click="deleteItemConfirm" :loading="loading">{{$t('confirm')}}</v-btn>

              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <!-- <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn> -->

      No lecturers found
    </template>
  </v-data-table>

</template>

<script>
  import {ObjectHelper} from '@/services/ObjectHelper';
  export default {
    name: 'TableView',
    props: {
		propHeaders: {
			type: Array,
			default: undefined
		},
		propElementsTable: {
			type: Array,
			default: undefined
		},
		propEditedItem: {
			type: Object,
			default: function () {
				return {
					properties : [
						{ value : '' , label: '' , name: '' },
						{ value : '' , label: '' , name: ''  },
						{ value : '' , label: '' , name: ''  },
						{ value : '' , label: '' , name: ''  },
						{ value : '' , label: '' , name: ''  },
						{ value : '' , label: '' , name: ''  },
					]
				}
			}
		},
		propDefaultItem: {
			type: Object,
			default: undefined
		},
		handlers: {
			type: Object,
			default: undefined
		},
		lablesButtons: {
			type: Object,
			default: function () {
				return {
					save: this.$t('save'),
					delete: this.$t('confirm'),
					confirm: this.$t('delete'),
					cancel: this.$t('cancel')
				}
			}
		},
    replaceViewingElementsItem: {
        type: Array,
        default: undefined
      }
    },
    data() {
		return {
			avatarRules: [
				value => !value || typeof value == 'string' || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
			],
			dialog: false,
			dialogDelete: false,
			editedIndex: -1,
			headers: [],
			elementsTable: [],
			editedItem: {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0,
			},
			defaultItem: {
				name: '',
				calories: 0,
				fat: 0,
				carbs: 0,
				protein: 0,
			},
      loading: false
		}
	},
	computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        this.headers = this.propHeaders;
        this.elementsTable = this.propElementsTable;
        this.editedItem = this.copyObjectsFromArray(this.propEditedItem.properties);
        this.defaultItem = this.copyObjectsFromArray(this.propDefaultItem.properties);	
        window.defaultItem = this.defaultItem;
        window.propDefaultItem = this.propDefaultItem;
      },

      async editItem (item) {
        //polifil for supporting another older browsers
        //------------------------
        if (!Array.prototype.find) {
              Object.defineProperty(Array.prototype, 'find', {
                value: function(predicate) {
                 // 1. Let O be ? ToObject(this value).
                  if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                  }

                  var o = Object(this);

                  // 2. Let len be ? ToLength(? Get(O, "length")).
                  var len = o.length >>> 0;

                  // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                  if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                  }

                  // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                  var thisArg = arguments[1];

                  // 5. Let k be 0.
                  var k = 0;

                  // 6. Repeat, while k < len
                  while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                      return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                  }

                  // 7. Return undefined.
                  return undefined;
                },
                configurable: true,
                writable: true
              });
            }
//---------------------------------------
        console.log(item);
        this.editedIndex = this.elementsTable.indexOf(item)
        //поскольку написан редактируемый элемент по-другому тут для показа преобразовываем как надо а при сохранении делаем обратную
        //операцию
        let tempObject = this.copyObjectsFromArray(this.defaultItem.properties);
        
        for(const obj of tempObject.properties) {
          obj.value = item[obj.name];
        }
        this.editedItem =  tempObject;
         if (this.editedIndex > -1) {  //знаем что это редактируемый элемент
          for(const repItem of this.replaceViewingElementsItem) { //для каждого объекта которое нужно заменить на свойство
            //на самом деле чтоб не было ошибки при редактировании обнуляем avatarPath и cardImage но в данном случае 
            //надо проверить что свойство типа avatar иначе может быть баг
            
            this.editedItem.properties.find(function(element, index){
              if(element['name'] == repItem["objectName"]) {
                element['value'] = null;
                console.log(index);
                return index;
              }
            });
            // if(repItem['objectType'] == 'avatar') 
            // this.editedItem.properties[indexNecessaryProperty]['value'] = undefined;
          }
        } 
        console.log(this.editedItem);
        this.dialog = true;
      },

      deleteItem (item) {
        this.editedIndex = this.elementsTable.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        this.loading = true;
        try {
          await this.handlers.deleteItem(this.editedItem.id, this);
          this.elementsTable.splice(this.editedIndex, 1)
          this.closeDelete()
        } finally {
          this.loading = false;
        }
      },

      close () {
        console.log(this.editedItem);
        console.log(this.defaultItem);
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = this.copyObjectsFromArray(this.defaultItem.properties)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = this.copyObjectsFromArray(this.defaultItem.properties)
          this.editedIndex = -1
        })
      },
      async save () {
        this.loading = true;
        try{
            let tempObject = {};
          for(const obj of this.editedItem.properties) {
             Object.assign(tempObject ,{ [obj.name]: obj.value });
          }
          let copyItemEdited = tempObject;
          // this.editedItem = tempObject;
          console.log(this.editedItem);
          if (this.editedIndex > -1) { //знаем что это редактирование
            console.log(this.editedIndex);
            await this.handlers.editItem(copyItemEdited, this.elementsTable[this.editedIndex].id, this);
            console.log(this.editedIndex);
            for(const repItem of this.replaceViewingElementsItem) {
              ObjectHelper.replaceObjectOnPropertyByName(copyItemEdited, repItem["objectName"],repItem["objectProperty"]);
            }
            console.log(copyItemEdited);

            Object.assign(this.elementsTable[this.editedIndex], copyItemEdited)
          } else {
            await this.handlers.addItem(copyItemEdited, this);
            for(const repItem of this.replaceViewingElementsItem) {
              ObjectHelper.replaceObjectOnPropertyByName(copyItemEdited, repItem["objectName"],repItem["objectProperty"]);
            }
            this.elementsTable.push(copyItemEdited)
          } 
        } finally {
          this.loading = false;
        }
      },
      copyObjectsFromArray(array) {
        let tempObject = { properties: []};
        for(const obj of array) { //скопировали все объекты в массив properties нового объекта
           tempObject.properties.push(Object.assign({}, obj));
        }
        return tempObject;
      },
      stop() {
        this.loading = false;
        throw "stop";
      }
    },
  }
</script>