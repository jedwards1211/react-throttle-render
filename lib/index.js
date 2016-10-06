'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getDisplayName(component) {
  return component.displayName || component.name;
}

function throttleProps(component, wait, options) {
  var Throttle = function (_Component) {
    _inherits(Throttle, _Component);

    function Throttle(props, context) {
      _classCallCheck(this, Throttle);

      var _this = _possibleConstructorReturn(this, (Throttle.__proto__ || Object.getPrototypeOf(Throttle)).call(this, props, context));

      _this.state = {};
      _this.throttledSetState = (0, _lodash2.default)(function (nextState) {
        return _this.setState(nextState);
      }, wait, options);
      return _this;
    }

    _createClass(Throttle, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.throttledSetState({ props: this.props });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.throttledSetState({ props: nextProps });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.throttledSetState.cancel();
      }
    }, {
      key: 'render',
      value: function render() {
        return (0, _react.createElement)(component, this.state.props);
      }
    }]);

    return Throttle;
  }(_react.Component);

  Throttle.displayName = getDisplayName(component);

  return (0, _hoistNonReactStatics2.default)(Throttle, component);
}

exports.default = throttleProps;