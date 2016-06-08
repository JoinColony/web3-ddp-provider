'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config/config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DdpProvider = function () {
  function DdpProvider() {
    _classCallCheck(this, DdpProvider);
  }

  _createClass(DdpProvider, [{
    key: 'isConnected',
    value: function isConnected() {
      return new Promise(function (resolve, reject) {
        try {
          var processResult = function processResult(error, result) {
            if (error) return reject(error, false);
            return resolve(true);
          };

          this.sendAsync({
            id: 9999999999,
            jsonrpc: '2.0',
            method: 'net_listening',
            params: []
          }, processResult);
        } catch (err) {
          return reject(err, false);
        }
      });
    }
  }, {
    key: 'sendAsync',
    value: function sendAsync(payload, callback) {
      //We only whitelist some methods
      var checkIfMethodIsAllowed = function checkIfMethodIsAllowed(payload) {
        if (_config.CONFIG.__ALLOWED_METHODS__.indexOf(payload.method) === -1) {
          throw new Error("This provider doesn't support that method");
        }
      };

      try {

        if (payload instanceof Array) {
          payload.map(checkIfMethodIsAllowed);
        } else {
          checkIfMethodIsAllowed(payload);
        }

        Meteor.call('web3DdpProviderExec', JSON.stringify(payload), function (err, res) {
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
  }]);

  return DdpProvider;
}();

exports.default = DdpProvider;