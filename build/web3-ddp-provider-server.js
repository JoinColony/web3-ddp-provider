'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  Meteor.methods({
    'web3DdpProviderExec': function web3DdpProviderExec(call) {
      //We only whitelist some methods
      var checkIfMethodIsAllowed = function checkIfMethodIsAllowed(payload) {
        if (_config.CONFIG.__ALLOWED_METHODS__.indexOf(payload.method) === -1) {
          throw new Error("This provider doesn't support that method");
        }
      };

      if (call instanceof Array) {
        call.map(checkIfMethodIsAllowed);
      } else {
        checkIfMethodIsAllowed(call);
      }

      var gethAddress = process.env.GETH_ADDRESS || '127.0.0.1';
      var gethPort = process.env.GETH_PORT || '8545';

      return Meteor.http.call("POST", "http://" + gethAddress + ":" + gethPort, {
        content: call
      });
    }
  });
};

var _config = require('../config/config');