<script setup>
import { ref, inject } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage, ElMessageBox } from 'element-plus'
// 取父级数据
const keyId = inject('keyId')

const tv = {
  markId: inject('keyId').value.markId,
  ticker: '{{ticker}}',
  market_position: '{{strategy.market_position}}',
  prev_market_position: '{{strategy.prev_market_position}}',
  action: '{{strategy.order.action}}',
  position_size: '{{strategy.position_size}}',
  market_position_size: '{{strategy.market_position_size}}',
  prev_market_position_size: '{{strategy.prev_market_position_size}}',
  contracts: '{{strategy.order.contracts}}',
  price: '{{strategy.order.price}}',
  comment: '{{strategy.order.comment}}'
}
const tvJSON = JSON.stringify(tv)
const tvUrl = 'https://bot.phrynus.cn/trade/tv'
const dialogFormVisible = ref(false)

function copy(e, t) {
  // dialogFormVisible.value = false
  const clipboard = new Clipboard(e.target, {
    text: () => t
  })
  clipboard.on('success', () => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    ElMessage({
      message: '复制失败,请手动复制',
      type: 'error'
    })
    clipboard.destroy()
  })
  clipboard.onClick(e)
}
</script>

<template>
  <div class="box" @click="dialogFormVisible = true">
    <div class="top">
      <div class="title">
        <h3>TV</h3>
      </div>
      <i class="icon icon-link"></i>
    </div>
    <p>Click to copy TV alarm</p>
  </div>
  <!--  -->
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form>
      <el-form-item label="WebHooks">
        <el-input v-model="tvUrl" />
      </el-form-item>
      <el-form-item>
        <el-button class="ml-a" type="primary" @click="copy($event, tvUrl)">Copy</el-button>
      </el-form-item>
      <el-form-item label="Message">
        <el-input v-model="tvJSON" :rows="6" type="textarea" />
      </el-form-item>
      <el-form-item>
        <div class="ml-a" @click="copy($event, tvJSON)">
          <el-button type="primary">Copy</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
.ml-a {
  margin-left: auto;
}

.box {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #fff;
  cursor: pointer;

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
        flex: 1;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .icon {
      font-size: 20px;
      line-height: 23px;
      color: rgb(94, 53, 177);
    }
  }
}
</style>
