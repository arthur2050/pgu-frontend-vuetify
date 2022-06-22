import i18n from '@/i18n';

function getValidationLangMess(valMessage) {
  return i18n.te('validationMesaages[\'' + valMessage + '\']')
            ? i18n.t('validationMesaages[\'' + valMessage + '\']')
            : valMessage;
}
function recursiveParser (serverErrors, veeErrors, field) {
  if (serverErrors.children) {
    for (const key in serverErrors.children) {
      if (Object.prototype.hasOwnProperty.call(serverErrors.children, key)) {
        recursiveParser(serverErrors.children[key], veeErrors, field ? field + '.' + key : key);
      }
    }
  }
  if (serverErrors.errors) {
    for (const key in serverErrors.errors) {
      if (Object.prototype.hasOwnProperty.call(serverErrors.errors, key)) {
        let msg = '';
        if(Array.isArray(serverErrors.errors[key])){
           for(const keyMsgError in  serverErrors.errors[key]) {
            msg += getValidationLangMess(serverErrors.errors[key][keyMsgError]);
           }
        } else msg = getValidationLangMess(serverErrors.errors[key]);
        console.log(key);
        veeErrors.add({
          field: field || key || '_' ,
          msg: msg,
        });
      }
    }
  }
}

function validationParser (error, veeErrors) {
  if (!error.response) throw error;
  if (!error.response.data || error.response.data.message !== 'Validation Failed') return;
  console.log(error.response.data);
  recursiveParser(error.response.data, veeErrors);
}

export default {
  install: function (Vue) {
    Vue.prototype.$validationParser = validationParser;
  },
};
