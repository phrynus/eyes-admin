<script setup>
import { ref, inject, watch } from 'vue'
import { useConfigStore } from '../../../stores/config'
import axios from '../../../components/CommonAxios'
import { ElMessage } from 'element-plus'

const store = useConfigStore()

// 取父级数据
const keyId = inject('keyId')
const getBinIcon = (str) => {
  let bin = str.replace(/USDT|USD/g, '')
  return `https://o-web.s3.bitiful.net/eyes/ico/${bin}.svg`
}
const getBinLogo = (str) => {
  return `https://o-web.s3.bitiful.net/eyes/logo/${str}.png`
}
const loadin = ref(false)
const switchData = ref(false)
switchData.value = keyId.value.safe_trade
watch(keyId, (value) => {
  switchData.value = keyId.value.safe_trade
})
const trade = async () => {
  loadin.value = true
  await axios
    .post('/api/key/update', {
      keyId: keyId.value._id,
      safe_trade: switchData.value
    })
    .then((res) => {
      loadin.value = false
      keyId.value.safe_trade = switchData.value
      ElMessage({
        type: 'success',
        message: `设置成功`
      })
    })
    .catch((err) => {
      loadin.value = false
      switchData.value = !switchData.value
      ElMessage({
        type: 'info',
        message: '设置失败'
      })
    })
}
</script>

<template>
  <div class="box">
    <div class="top">
      <div class="title">
        <el-avatar :src="getBinLogo(keyId.exchange)" class="ico" />
        <h3>{{ keyId.name }}</h3>
      </div>
      <el-switch v-model="switchData" :loadin="loadin" size="large" @change="trade" />
    </div>
    <p>Account Master Switch</p>
  </div>
</template>

<style lang="scss" scoped>
.ico {
  background-color: #fff;
}

.box {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #fff;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    padding-bottom: 8px;

    .title {
      display: flex;
      align-items: center;
      flex: 1;

      h3 {
        font-weight: bold;
        font-size: 18px;
        margin: 0 12px;
        flex: 1;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
