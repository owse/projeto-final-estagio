<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="logo-owse img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4">{{ $t('home.title') }}</h1>

      <div>
        <div v-if="authenticated">
          <div class="alert alert-warning">
            <span v-if="username">{{ $t('home.logged.message', { username: username }) }}</span>
          </div>
          <hr />
          <p>{{ $t('home.project-tasks') }}</p>
        </div>

        <div v-if="!authenticated">
          <div class="alert alert-warning">
            <span>{{ $t('global.messages.info.authenticated.prefix') }}</span>
            <a class="alert-link" @click="openLogin()">{{ $t('global.messages.info.authenticated.link') }}</a>
            <span v-html="$t('global.messages.info.authenticated.suffix')"></span>
          </div>
          <hr />
          <h2>{{ $t('home.considerations') }}:</h2>
          <p v-html="$t('home.courses-roadmap')"></p>
          <p v-html="$t('home.data-flow')"></p>
          <p v-html="$t('home.prototype') + ' (A imagem de protótipo ainda será disponibilizada)'"></p>
          <p>{{ $t('home.what-practice') }}</p>
          <ul>
            <li>{{ $t('home.create-screens') }}</li>
            <li>{{ $t('home.crud-apply') }}</li>
            <li>{{ $t('home.maintenance-components') }}</li>
            <li>{{ $t('home.maintenance-services') }}</li>
            <li>{{ $t('home.maintenance-routes-apis') }}</li>
          </ul>
          <p v-html="$t('home.code-todos')"></p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
