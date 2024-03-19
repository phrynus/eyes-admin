<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../src/views/home/component/Header.vue'
import Nav from '../src/views/home/component/Nav.vue'
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
