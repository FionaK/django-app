<style>

</style>
<template>
  <div id="app" class="hero is-fullheight">
    <div class="hero-head">
    <nav class="navbar has-shadow is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
        <a class="navbar-item" href="#">
          <img src="../build/pharma_evidence_logo.png" alt="logo"/>
        </a>
        <div class="navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
    </div>
      <div class="hero-body" style="align-items: flex-start; padding: 0;">
          <router-view/>
      </div>
    <div class="hero-footer" style="padding-bottom: 48px"><router-view name="footer"/></div>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
