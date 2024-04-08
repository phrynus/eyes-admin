<script setup>
import { ref, watchEffect, provide, inject, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useConfigStore } from '../../stores/config'
import axios from '../../components/CommonAxios'

import CopyTv from './component/copyTv.vue'
import Position from './component/position.vue'
import User from './component/user.vue'
import TradeList from './component/tradeList.vue'
import PositionList from './component/positionList.vue'
import Logger from './component/logger.vue'
import Account from './component/account.vue'

const exchangeInfo = inject('exchangeInfo')
provide('exchangeInfo', exchangeInfo)

const store = useConfigStore()
const router = useRouter()
const route = useRoute()

const keys = store.getKey
const keyId = ref({
  _id: ''
})
const account = ref({})
//

// 去除USDT USD字符方法

const refreshAccount = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  try {
    // 获取仓位
    account.value = await axios
      .post('/api/custom', { method: 'GET', url: '/fapi/v2/account', keyId: keyId.value._id })
      .then((res) => {
        ElMessage({
          message: '获取仓位成功',
          type: 'success'
        })
        return res.data
      })
      .catch((err) => {
        ElMessage({
          message: '获取仓位失败',
          type: 'error'
        })
        return {}
      })

    loadingInstance.close()
  } catch (error) {
    console.log(error)
    loadingInstance.close()
    // window.location.reload()
  }
}

const init = async (id) => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  try {
    // 获取仓位
    await refreshAccount()

    loadingInstance.close()
  } catch (error) {
    console.log(error)
    loadingInstance.close()
    // window.location.reload()
  }
}
// 监听route.params.id发生变化，每次变化都输出一次
watchEffect(() => {
  if (keyId.value._id !== route.params.id) {
    keyId.value = keys.find((item) => item._id === route.params.id)
    init(route.params.id)
  }
})

provide('keyId', keyId)
provide('account', account)
provide('refreshAccount', refreshAccount)
</script>

<template>
  <div class="container">
    <el-row :gutter="12">
      <el-col :span="5">
        <User />
      </el-col>
      <el-col :span="5">
        <Position />
      </el-col>
      <el-col :span="3">
        <CopyTv />
      </el-col>
      <el-col :span="11">
        <Account />
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="9">
        <TradeList />
      </el-col>
      <el-col :span="15">
        <PositionList />
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <Logger />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 12px;
  //width: calc(100% + 6px);
}

.container {
  padding: 12px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  display: flex;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
