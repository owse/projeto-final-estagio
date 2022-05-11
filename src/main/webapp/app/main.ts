// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import ConfigurationService from '@/admin/configuration/configuration.service';
import TranslationService from '@/locale/translation.service';
import { setupAxiosInterceptors } from '@/shared/config/axios-interceptor';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import Vue2Filters from 'vue2-filters';
import '../content/scss/global.scss';
import '../content/scss/vendor.scss';
import AccountService from './account/account.service';
import ActivateService from './account/activate/activate.service';
import LoginService from './account/login.service';
import RegisterService from './account/register/register.service';
import HealthService from './admin/health/health.service';
import LogsService from './admin/logs/logs.service';
import MetricsService from './admin/metrics/metrics.service';
import UserManagementService from './admin/user-management/user-management.service';
import App from './app.vue';
import router from './router';
import AlertService from './shared/alert/alert.service';
import * as config from './shared/config/config';
import * as bootstrapVueConfig from './shared/config/config-bootstrap-vue';
import JhiItemCountComponent from './shared/jhi-item-count.vue';
import JhiSortIndicatorComponent from './shared/sort/jhi-sort-indicator.vue';

// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.use(Vue2Filters);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ToastPlugin);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('jhi-item-count', JhiItemCountComponent);
Vue.component('jhi-sort-indicator', JhiSortIndicatorComponent);
Vue.component('infinite-loading', InfiniteLoading);
const i18n = config.initI18N(Vue);
const store = config.initVueXStore(Vue);

const translationService = new TranslationService(store, i18n);
const loginService = new LoginService();
const accountService = new AccountService(store, translationService, router);

router.beforeEach(async (to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  } else if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities).then(value => {
      if (!value) {
        sessionStorage.setItem('requested-url', to.fullPath);
        next('/forbidden');
      } else {
        next();
      }
    });
  } else {
    // no authorities, so just proceed
    next();
  }
});

/* tslint:disable */
const vue = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userManagementService: () => new UserManagementService(),
    healthService: () => new HealthService(),
    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),

    translationService: () => translationService,
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
    alertService: () => new AlertService(),
  },
  i18n,
  store,
});

setupAxiosInterceptors(
  error => {
    const url = error.response?.config?.url;
    const status = error.status || error.response.status;
    if (status === 401) {
      // Store logged out state.
      store.commit('logout');
      if (!url.endsWith('api/account') && !url.endsWith('api/authenticate')) {
        // Ask for a new authentication
        loginService.openLogin(vue);
        return;
      }
    }
    console.log('Unauthorized!');
    return Promise.reject(error);
  },
  error => {
    console.log('Server error!');
    return Promise.reject(error);
  }
);
