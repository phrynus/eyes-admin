<script setup>
import { ref, inject } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '../../../components/CommonAxios'

// 取父级数据
const keyId = inject('keyId')
const setNum = () => {
  ElMessageBox.prompt('设置可持仓数量', 'Position', {
    inputPattern: /^[\d]{1,3}$/,
    inputErrorMessage: '请输入数字1-3位'
  })
    .then(async ({ value }) => {
      await axios
        .post('/api/key/update', {
          keyId: keyId.value._id,
          safe_num: value
        })
        .then((res) => {
          keyId.value.safe_num = value
          ElMessage({
            type: 'success',
            message: `设置成功`
          })
        })
        .catch((err) => {
          ElMessage({
            type: 'info',
            message: '设置失败'
          })
        })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: '已取消'
      // })
    })
}
</script>

<template>
  <div class="box" @click="setNum">
    <div class="top">
      <div class="title">
        <h3>Position</h3>
      </div>
      <span>
        {{ keyId.safe_num }}
      </span>
    </div>
    <p>The number of positions exceeds the prohibition of placing orders</p>
  </div>
</template>

<style lang="scss" scoped>
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

    span {
      font-size: 30px;
      font-weight: bold;
      line-height: 23px;
      color: rgb(94, 53, 177);
    }
  }
}
</style>
