'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web3DdpProviderMethods = exports.Web3DdpProvider = undefined;

var _web3DdpProviderServer = require('./src/web3-ddp-provider-server');

var _web3DdpProviderServer2 = _interopRequireDefault(_web3DdpProviderServer);

var _web3DdpProviderClient = require('./src/web3-ddp-provider-client');

var _web3DdpProviderClient2 = _interopRequireDefault(_web3DdpProviderClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Web3DdpProvider = _web3DdpProviderClient2.default;
exports.Web3DdpProviderMethods = _web3DdpProviderServer2.default;