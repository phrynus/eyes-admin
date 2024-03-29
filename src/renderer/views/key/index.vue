<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElLoading, ElMessage } from 'element-plus'
import { useConfigStore } from '../../stores/config'
import axios from '../../components/CommonAxios'

const store = useConfigStore()
const router = useRouter()
const route = useRoute()
const keys = store.getKey
const keyId = ref({
  _id: ''
})

// 去除USDT USD字符方法
const getBinIcon = (str) => {
  let bin = str.replace(/USDT|USD/g, '')
  return `https://o-web.s3.bitiful.net/eyes/ico/${bin}.svg`
}

const init = async (id) => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  try {
    // 获取仓位
    const account = await axios
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
        throw new Error('获取仓位失败')
      })

    loadingInstance.close()
  } catch (error) {
    console.log(error)
    // window.location.reload()
  }
}

// 监听route.params.id发生变化，每次变化都输出一次
watchEffect(() => {
  if (keyId.value._id !== route.params.id) {
    keyId.value = keys.find((item) => item._id === route.params.id)
    console.log(route.params.id)
    init(route.params.id)
  } else {
    return
  }
})

// 判断
</script>

<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <div class="w colBox">
          <div class="topLogo">
            <div class="icons">
              <el-avatar :src="getBinIcon('BTC')" />
              <h3>{{ keyId.name }}</h3>
            </div>

            <el-switch size="large" />
          </div>
          <p>Account Master Switch</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="w colBox min">
          <div class="topLogo">
            <div class="icons">
              <h3>Position</h3>
            </div>
            <div class="num">
              <h3>{{ keyId.safe_num }}</h3>
            </div>
          </div>
          <p>The number of positions exceeds the prohibition of placing orders</p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="w colBox min"></div>
      </el-col>
      <el-col :span="4">
        <div class="w colBox min"></div>
      </el-col>
      <el-col :span="4">
        <div class="w colBox min"></div>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="12">
        <div class="w colBox"></div>
      </el-col>
    </el-row>
  </div>
  {{ keyId }}
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 12px;
  width: 100%;
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

//白色背景
.w {
  background: #fff;
}

//padding
.colBox {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 100%;

  &.min {
    cursor: pointer;

    .topLogo {
      padding-top: 0;
      padding-bottom: 8px;

      .icons {
        h3 {
          //margin: 0;
          margin-left: 0;
          font-size: 20px;
        }
      }
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      white-space: normal;
    }
  }

  .topLogo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;

    .icons {
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

  p {
    display: block;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .num {
    h3 {
      font-size: 30px;
      font-weight: bold;
      line-height: 23px;
      color: rgb(94, 53, 177);
    }
  }
}
</style>
