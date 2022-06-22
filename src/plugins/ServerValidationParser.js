import i18n from '@/i18n';
import Vue from 'vue';
import {getValue} from '@/utils/PathAccessor';

const ServerErrorBag = function () {
  return {
    children: {},
    errors: {},
    clear () {
      this.children = {};
      this.errors   = [];
    },
    addError (message) {
      this.errors[message[0]] = message[1];
    },
    addChild (field, errorBag) {
      Vue.set(this.children, field, errorBag);
    },
    getChild (path) {
      if (typeof path === 'undefined' || path.length === 0) {
        return this;
      } else {
        if (!(path instanceof Array)) {
          path = path.split('.');
        } else {
          path = [...path];
        }
        const key = path.shift();
        if (typeof this.children[key] === 'undefined') {
          return new ServerErrorBag();
        }
        return this.children[key]
          .getChild(path);
      }
    },
    collect (path) {
      return this.getChild(path).errors;
    },
    get (path) {
      return this.getChild(path).errors;
    },
    hasErrorsRecursive (path) {
      function recursiveChecker (bag) {
        if (bag.errors.length > 0) return true;

        for (const child in bag.children) {
          if (
            Object.prototype.hasOwnProperty.call(bag.children, child)
            && recursiveChecker(bag.children[child])
          ) {
            return true;
          }
        }
        return false;
      }

      const bag = this.getChild(path);
      return recursiveChecker(bag);
    },
  };
};

function recursiveParser (serverErrors, errorBag) {
  if (serverErrors.children) {
    for (const child in serverErrors.children) {
      if (Object.prototype.hasOwnProperty.call(serverErrors.children, child)) {
        const recursiveErrorBag = new ServerErrorBag();
        errorBag.addChild(child, recursiveErrorBag);
        recursiveParser(serverErrors.children[child], recursiveErrorBag);
      }
    }
  }
  console.log(Object.prototype.hasOwnProperty.call(serverErrors, 'errors'));
  
  // if (Object.prototype.hasOwnProperty.call(serverErrors, 'errors')) {
    console.log(serverErrors);
    for (const key in serverErrors.errors) {
      console.log(Object.prototype.hasOwnProperty.call(serverErrors.errors, key));
      if (Object.prototype.hasOwnProperty.call(serverErrors.errors, key)) {
        console.log(serverErrors.errors[key]);
        errorBag.addError(
          [key,i18n.te(serverErrors.errors[key])
            ? i18n.t(serverErrors.errors[key])
            : serverErrors.errors[key]]
        );
      }
    }
  // }
}

function validationParser (error, bag = new ServerErrorBag()) {
  if (getValue(error, 'response.data.message') === 'Validation Failed') {
    console.log(error.response.data);
    recursiveParser(error.response.data, bag);
  } else if (typeof error !== 'undefined' && getValue(error, 'response.data') === undefined) {
    throw error;
  }
  return bag;
}

const install = {
  install: function (Vue) {
    Vue.prototype.$serverValidationParser = validationParser;
  },
};

Vue.use(install);
