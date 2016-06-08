
import { CONFIG } from '../config/config';
export default class DdpProvider {

  isConnected() {
    return new Promise(function(resolve, reject) {
      try {

        this.sendAsync({
            id: 9999999999,
            jsonrpc: '2.0',
            method: 'net_listening',
            params: []
        }, processResult);

        function processResult (error, result) {
          if(error) return reject(error, false);
          return resolve(true);
        }

      } catch(err) {
        return reject(err, false);
      }
    });
  }

  sendAsync (payload, callback) {
      //We only whitelist some methods
      const checkIfMethodIsAllowed = (payload) => {
        if (CONFIG.__ALLOWED_METHODS__.indexOf(payload.method) === -1) {
          throw new Error("This provider doesn't support that method");
        }
      };

      try {

        if(payload instanceof Array) {
          payload.map(checkIfMethodIsAllowed);
        } else {
          checkIfMethodIsAllowed(payload);
        }

        Meteor.call('web3DdpProviderExec', JSON.stringify(payload), function(err, res) {
          var error, result;
          try {
              result = JSON.parse(res.content);
              console.log('result: ', result);
          } catch (e) {
              error = e;
          }

          callback(error, result);
        });

      } catch (error) {
        return callback(error);
      }
  }
}
