<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './component/Header.vue'
import Nav from './component/Nav.vue'
import store2 from 'store2'

import { ElMessageBox, ElNotification, ElLoading } from 'element-plus'

const loadingInstance = ElLoading.service({ fullscreen: true })
ElNotification({
  title: '登录成功',
  message: '欢迎回来' + store2.get('name'),
  type: 'success'
})
loadingInstance.close()
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
    width: 240px;
    background: #fff;
  }

  .content {
    flex: 1;
    padding: 12px;
  }
}
</style>
