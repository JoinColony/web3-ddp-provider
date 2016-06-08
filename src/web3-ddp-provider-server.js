
import { CONFIG } from '../config/config';
export default function () {
  Meteor.methods({
    'web3DdpProviderExec': function(call) {
      //We only whitelist some methods
      const checkIfMethodIsAllowed = (payload) => {
        if (CONFIG.__ALLOWED_METHODS__.indexOf(payload.method) === -1) {
          throw new Error("This provider doesn't support that method");
        }
      };

      if(call instanceof Array) {
        call.map(checkIfMethodIsAllowed);
      } else {
        checkIfMethodIsAllowed(call);
      }

      const gethAddress = process.env.GETH_ADDRESS || '127.0.0.1';
      const gethPort = process.env.GETH_PORT || '8545';

      return Meteor.http.call("POST", "http://" + gethAddress + ":" + gethPort, {
          content: call
      });
    }
  });
}
