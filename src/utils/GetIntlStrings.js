import store from '@/store';

const getIntlString = function (object, intlCollection, defaultValue) {
  return object[intlCollection] && object[intlCollection][store.state.options.localeShort]
    ? object[intlCollection][store.state.options.localeShort]
    : defaultValue;
};

const getIntlName = function (object) {
  return object.intlNames && object.intlNames[store.state.options.localeShort]
    ? object.intlNames[store.state.options.localeShort]
    : object.defaultName;
};

const getIntlComment = function (object) {
  return object.intlComments && object.intlComments[store.state.options.localeShort]
    ? object.intlComments[store.state.options.localeShort]
    : object.defaultComment;
};

export {getIntlName, getIntlComment, getIntlString};
