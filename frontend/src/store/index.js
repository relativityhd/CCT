import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // location 'rw' === Other Country
  /**
   * locations: de, ch, at, fr, it, gb, rw
   * languages: de, en, fr, it
   */
  state: {
    lang: "en",
    location: "gb"
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang;
    },
    setLocation(state, location) {
      state.location = location;
    }
  },
  actions: {},
  modules: {}
});
