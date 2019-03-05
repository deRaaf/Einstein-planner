(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/NewItem.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/NewItem.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios_dist_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios/dist/axios */ "./node_modules/axios/dist/axios.js");
/* harmony import */ var axios_dist_axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios_dist_axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      form: [{
        name: '',
        date: '',
        allDay: '',
        description: '',
        type: '',
        from: '',
        till: ''
      }]
    };
  },
  methods: {
    formSubmit: function formSubmit() {
      var self = this;

      if (this.form.allDay == 0 || this.form.allDay == "" || this.form.allDay == null) {
        this.form.allDay = "false";
      } else {
        this.form.allDay = "true";
      }

      if (this.form.from) {
        var start = this.form.date + 'T' + this.form.from;
      }

      if (this.form.till) {
        var end = this.form.date + 'T' + this.form.till;
      }

      axios.post('api/agenda_items?api_token=123', {
        title: this.form.name,
        start: start,
        end: end,
        allDay: this.form.allDay,
        description: this.form.description,
        type: this.form.type
      }).then(function (response) {
        if (response.status == '201') {
          self.$router.push({
            path: '/'
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.form = [{
        name: '',
        date: '',
        allDay: '',
        description: '',
        type: '',
        from: '',
        till: ''
      }];
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "newitem" }, [
    _c("h2", [_vm._v("Nieuw agenda item")]),
    _vm._v(" "),
    _c("p", [_vm._v("Voeg een nieuw item toe")]),
    _vm._v(" "),
    _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault()
            return _vm.formSubmit($event)
          }
        }
      },
      [
        _c("label", { attrs: { for: "name" } }, [_vm._v("Naam")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.form.name,
              expression: "form.name"
            }
          ],
          attrs: { type: "text", name: "name", id: "name" },
          domProps: { value: _vm.form.name },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.form, "name", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "date" } }, [_vm._v("Datum")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.form.date,
              expression: "form.date"
            }
          ],
          attrs: { type: "date", name: "date", id: "date" },
          domProps: { value: _vm.form.date },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.form, "date", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("label", { attrs: { for: "allDay" } }, [_vm._v("Hele dag")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.form.allDay,
              expression: "form.allDay"
            }
          ],
          attrs: { type: "checkbox", name: "allDay", id: "allDay" },
          domProps: {
            checked: Array.isArray(_vm.form.allDay)
              ? _vm._i(_vm.form.allDay, null) > -1
              : _vm.form.allDay
          },
          on: {
            change: function($event) {
              var $$a = _vm.form.allDay,
                $$el = $event.target,
                $$c = $$el.checked ? true : false
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v)
                if ($$el.checked) {
                  $$i < 0 && _vm.$set(_vm.form, "allDay", $$a.concat([$$v]))
                } else {
                  $$i > -1 &&
                    _vm.$set(
                      _vm.form,
                      "allDay",
                      $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                    )
                }
              } else {
                _vm.$set(_vm.form, "allDay", $$c)
              }
            }
          }
        }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.form.allDay))]),
        _vm._v(" "),
        _c("label", { attrs: { for: "type" } }, [_vm._v("Type")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.type,
                expression: "form.type"
              }
            ],
            attrs: { name: "type", id: "type" },
            on: {
              change: function($event) {
                var $$selectedVal = Array.prototype.filter
                  .call($event.target.options, function(o) {
                    return o.selected
                  })
                  .map(function(o) {
                    var val = "_value" in o ? o._value : o.value
                    return val
                  })
                _vm.$set(
                  _vm.form,
                  "type",
                  $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                )
              }
            }
          },
          [
            _c("option", { attrs: { disabled: "" } }, [
              _vm._v("Kies een type")
            ]),
            _vm._v(" "),
            _c("option", [_vm._v("SO")]),
            _vm._v(" "),
            _c("option", [_vm._v("REP")])
          ]
        ),
        _vm._v(" "),
        _c("label", { attrs: { for: "description" } }, [
          _vm._v("Beschrijving")
        ]),
        _vm._v(" "),
        _c("textarea", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.form.description,
              expression: "form.description"
            }
          ],
          attrs: { id: "description" },
          domProps: { value: _vm.form.description },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.form, "description", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "from" }, [
          _c("label", { attrs: { for: "from" } }, [_vm._v("Van")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.from,
                expression: "form.from"
              }
            ],
            attrs: { type: "time", name: "from", id: "from" },
            domProps: { value: _vm.form.from },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.form, "from", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "till" }, [
          _c("label", { attrs: { for: "till" } }, [_vm._v("Tot")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.form.till,
                expression: "form.till"
              }
            ],
            attrs: { type: "time", name: "till", id: "till" },
            domProps: { value: _vm.form.till },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.$set(_vm.form, "till", $event.target.value)
              }
            }
          })
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "button button-primary" }, [
          _vm._v("Toevoegen")
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/NewItem.vue":
/*!****************************************!*\
  !*** ./resources/js/pages/NewItem.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewItem.vue?vue&type=template&id=e463804c& */ "./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c&");
/* harmony import */ var _NewItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewItem.vue?vue&type=script&lang=js& */ "./resources/js/pages/NewItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/NewItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/NewItem.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/NewItem.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./NewItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/NewItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NewItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c&":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./NewItem.vue?vue&type=template&id=e463804c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/NewItem.vue?vue&type=template&id=e463804c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewItem_vue_vue_type_template_id_e463804c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);