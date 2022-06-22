import {connect as mqttConnect} from 'mqtt';
import {MQ_OPTIONS} from '@/config';

let client;
const subscriptions = {};

function connect () {
  client = mqttConnect(MQ_OPTIONS.uri, {
    username: MQ_OPTIONS.username,
    password: MQ_OPTIONS.password,
  });

  client.on('connect', function () {
    for (const key in subscriptions) {
      if (Object.prototype.hasOwnProperty.call(subscriptions, key)) {
        client.subscribe(key, function (err) {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  });

  client.on('message', (topic, message) => {
    if (Object.prototype.hasOwnProperty.call(subscriptions, topic)) {
      subscriptions[topic].forEach((subscription) => {
        subscription.callback(JSON.parse(message.toString()));
      });
    }
  });
}

const MQTT = {
  subscribe (routingKey, callback) {
    const subscription = {
      key: routingKey,
      callback: callback,
    };
    if (Object.prototype.hasOwnProperty.call(subscriptions, routingKey)) {
      subscriptions[routingKey].push(subscription);
    } else {
      subscriptions[routingKey] = [];
      subscriptions[routingKey].push(subscription);
    }
    if (client === undefined) {
      connect();
    } else {
      client.subscribe(routingKey, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
    return subscription;
  },
  unsubscribe (subscription) {
    if (Object.prototype.hasOwnProperty.call(subscriptions, subscription.key)) {
      const index = subscriptions[subscription.key].indexOf(subscription);
      if (index >= 0) {
        subscriptions.splice(index, 1);
      }
      if (subscriptions[subscription.key].length < 1) {
        client.unsubscribe(subscription.key, function (err) {
          if (err) {
            console.error(err);
          }
        });
        delete subscriptions[subscription.key];
      }
    }
  },
};

export default MQTT;
