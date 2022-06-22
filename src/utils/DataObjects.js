import i18n from '@/i18n';

const yesNoFilterChoices = [
  {id: 1, name: i18n.t('Yes')},
  {id: 2, name: i18n.t('No')},
];

const presentOrNotFilterChoices = [
  {id: 1, name: i18n.t('Present')},
  {id: 2, name: i18n.t('Not present')},
];

const incomingClientFilterChoices = [
  {id: 1, name: i18n.t('Incoming')},
  {id: 2, name: i18n.t('Not incoming')},
];

const includingExcludingFilterChoices = [
  {id: 1, name: i18n.t('Including')},
  {id: 2, name: i18n.t('Excluding')},
];

const unitSystems = [
  {text: i18n.t('Metric'), value: 'si'},
  {text: 'US', value: 'im'},
];

const cargoStackableChoices = [
  {id: 1, name: i18n.t('Yes')},
  {id: 2, name: i18n.t('No')},
  {id: 3, name: i18n.t('cargoMixed')},
];

const cargoStackableDataObject = {
  1: i18n.t('Yes'),
  2: i18n.t('No'),
  3: i18n.t('cargoMixed'),
};

const statusTypes = [
  {text: i18n.t('Paid'), value: 'paid'},
  {text: i18n.t('Not Paid'), value: 'notPaid'},
];

const financeControlStatuses = [
  {
    value: 'NOT_READY',
    text: i18n.t('financeControlStatuses.NOT_READY'),
  },
  {
    value: 'READY',
    text: i18n.t('financeControlStatuses.READY'),
  },
  {
    value: 'ACCEPTED',
    text: i18n.t('financeControlStatuses.ACCEPTED'),
  },
  {
    value: 'REJECTED',
    text: i18n.t('financeControlStatuses.REJECTED'),
  },
];

const financeControlStatusColors = {
  ACCEPTED: 'success',
  REJECTED: 'error',
  NOT_READY: '',
  READY: 'warning',
};

const financeControlStatusTextColors = {
  ACCEPTED: 'success--text',
  REJECTED: 'error--text',
  NOT_READY: 'text--faded',
  READY: 'warning--text',
};

export {
  yesNoFilterChoices,
  presentOrNotFilterChoices,
  incomingClientFilterChoices,
  includingExcludingFilterChoices,
  unitSystems,
  cargoStackableChoices,
  cargoStackableDataObject,
  financeControlStatuses,
  financeControlStatusColors,
  financeControlStatusTextColors,
  statusTypes,
};
