<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './component/Header.vue'
import Nav from './component/Nav.vue'
</script>

<template>
  <Header />
  <div class="container">
    <div class="nav">
      <Nav />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: calc(100vh - 70px);
  display: flex;

  .nav {
    width: 200px;
    background: #fff;
  }

  .content {
    flex: 1;
  }
}
</style>
