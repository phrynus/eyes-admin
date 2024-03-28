<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './component/Header.vue'
import Nav from './component/Nav.vue'
import store2 from 'store2'
import { useConfigStore } from '../stores/config'
import axios from '../components/CommonAxios'
import { ElMessageBox, ElNotification, ElLoading } from 'element-plus'

const store = useConfigStore()
const loadingInstance = ElLoading.service({ fullscreen: true })

onMounted(async () => {
  await axios
    .post('/user/info')
    .then((res) => {
      store.setName(res.data.name)
      store.setKey(res.data.key)
      store.setPolicy(res.data.ploy)
      ElNotification({
        title: '登录成功',
        message: '欢迎回来' + store2.get('name'),
        type: 'success'
      })
      loadingInstance.close()
    })
    .catch((err) => {
      store.setToken(null)
      store.setName(null)
      store.setKey(null)
      store.setPolicy(null)
      window.location.reload()
    })
})
</script>

<template>
  <Header />
  <div class="container">
    <div class="nav">
      <Nav />
    </div>
    <div class="content">
      <el-scrollbar>
        <RouterView />
      </el-scrollbar>
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
