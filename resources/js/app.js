
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import jquery from 'jquery'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/sortable';
import 'foundation-sites/dist/js/foundation'
import 'select2/dist/js/select2.full.min';
require('./bootstrap');
import 'es6-promise/auto'
import axios from 'axios'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import Index from './Index'
import auth from './auth'
import router from './routes'


// Set Vue globally
window.Vue = Vue

// Create eventbus
Vue.prototype.$eventBus = new Vue()

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
Vue.use(VueAuth, auth)

// Load Index
Vue.component('index', Index)

window.$ = window.jQuery = jquery

// init foundation
$(document).foundation();

/**
 * The following block of code will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    el: '#app'
  });

  /*
 * Content-Type:text/javascript
 *
 * A bridge between iPad and iPhone touch events and jquery draggable, 
 * sortable etc. mouse interactions.
 * @author Oleg Slobodskoi  
 * 
 * modified by John Hardy to use with any touch device
 * fixed breakage caused by jquery.ui so that mouseHandled internal flag is reset 
 * before each touchStart event
 * 
 */
(function( $ ) {

  $.support.touch = typeof Touch === 'object';

  if (!$.support.touch) {
      return;
  }

  var proto =  $.ui.mouse.prototype,
  _mouseInit = proto._mouseInit;

  $.extend( proto, {
      _mouseInit: function() {
          this.element
          .bind( "touchstart." + this.widgetName, $.proxy( this, "_touchStart" ) );
          _mouseInit.apply( this, arguments );
      },

      _touchStart: function( event ) {
          if ( event.originalEvent.targetTouches.length != 1 ) {
              return false;
          }

          this.element
          .bind( "touchmove." + this.widgetName, $.proxy( this, "_touchMove" ) )
          .bind( "touchend." + this.widgetName, $.proxy( this, "_touchEnd" ) );

          this._modifyEvent( event );

          $( document ).trigger($.Event("mouseup")); //reset mouseHandled flag in ui.mouse
          this._mouseDown( event );

          return false;           
      },

      _touchMove: function( event ) {
          this._modifyEvent( event );
          this._mouseMove( event );   
      },

      _touchEnd: function( event ) {
          this.element
          .unbind( "touchmove." + this.widgetName )
          .unbind( "touchend." + this.widgetName );
          this._mouseUp( event ); 
      },

      _modifyEvent: function( event ) {
          event.which = 1;
          var target = event.originalEvent.targetTouches[0];
          event.pageX = target.clientX;
          event.pageY = target.clientY;
      }

  });

})( jQuery );