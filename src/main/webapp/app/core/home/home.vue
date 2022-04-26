<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="logo-owse img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4" v-text="$t('home.title')">Welcome, Java Hipster!</h1>

      <div>
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username" v-text="$t('home.logged.message', { username: username })">You are logged in as user "{{ username }}"</span>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span v-text="$t('global.messages.info.authenticated.prefix')">If you want to </span>
          <a class="alert-link" v-on:click="openLogin()" v-text="$t('global.messages.info.authenticated.link')">sign in</a>
          <span v-html="$t('global.messages.info.authenticated.suffix')"
            >, you can try the default accounts:<br />- Administrator (login="admin" and password="admin") <br />- User (login="user" and
            password="user").</span
          >
        </div>

        <div v-if="!authenticated">
          <h2>Considerações:</h2>
          <p>
            Se você já realizou todos os cursos do nosso <a href="https://whimsical.com/desenvolvedor-estagiario-Pj42td5imWJ4rL4VVzhBcC">Roadmap</a>, agora é
            hora de colocar em prática as habilidades que você aprendeu. Aqui utilizaremos o mesmo
            <a href="https://whimsical.com/fluxo-log-ai-TxvqSGyrcnSUJSTHJ7WHxF">Fluxo de Dados</a> utilizado nos principais projetos da empresa.
          </p>
          <p>No código, você encontrará alguns <b>TODO</b> e terá de resolve-los. É esperado que você faça isso sem ajuda de outras pessoas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
