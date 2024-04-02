<script setup>
import { ref, inject } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage, ElMessageBox } from 'element-plus'
// 取父级数据
const keyId = inject('keyId')
</script>

<template>
  <div class="box">
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
