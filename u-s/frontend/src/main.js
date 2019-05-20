import Vue from 'vue';
import App from './App';
import router from './router';
import axios from "axios";
import {ServerTable, ClientTable} from 'vue-tables-2';
import Vuebar from 'vuebar';
import Multiselect from 'vue-multiselect';
import Steps from './components/Steps';


// Require the main Sass manifest file
require('./assets/sass/main.scss');

window.Event = new Vue();
window.Axios = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 3000,
  crossDomain: true,
});

Vue.config.productionTip = false;


Vue.component('term-list', {
  props: ['terms'],
  template: `
    <div class="field is-grouped is-grouped-multiline">
      <term v-for="term in terms" :term="term" :key="term.id"></term>
    </div>
  `,
});

Vue.component('term', {
  props: ['term'],
  template: `
    <div class="control">
      <div class="tags has-addons">
        <span class="tag" :class="colorClass">{{ term.text }}</span>
        <a class="tag is-delete" :class="colorClass" @click="this.window.Event.$emit('delete-term', term.id)"></a>
      </div>
    </div>
  `,
  data() {
    return {
      colorClass: 'is-info'
    }
  },
  mounted() {
    if (this.term.hasOwnProperty('color')) {
      this.colorClass = this.term.color;
    }
  }

});

Vue.component('concept-list', {
  props: ['concepts'],
});

Vue.component('steps', Steps);
Vue.component('multiselect', Multiselect);

Vue.use(require('vue-shortkey'));
Vue.use(ServerTable, {}, false, 'bulma');
Vue.use(Vuebar);
Vue.use(ClientTable, {}, false, 'bulma');

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});



