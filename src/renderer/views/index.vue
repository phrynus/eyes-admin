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
  //   定时更新token
  let tokenTimer = setInterval(
    async () => {
      const token = store.getToken
      const tokenArr = token.split('.')
      const payload = JSON.parse(atob(tokenArr[1]))
      const diff = (payload.exp * 1000 - new Date().getTime()) / 1000 / 60
      if (diff < 15) {
        await axios
          .post('/user/refresh')
          .then((res) => {
            store.setToken(res.data)
          })
          .catch((err) => {
            store.setToken(null)
            store.setName(null)
            store.setKey(null)
            store.setPolicy(null)
            clearInterval(tokenTimer)
            tokenTimer = null
            window.location.reload()
          })
      }
    },
    1000 * 60 * 2
  )
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
    .el-scrollbar {
      //padding: 12px 6px 12px 12px;
    }

    flex: 1;
  }
}
</style>
