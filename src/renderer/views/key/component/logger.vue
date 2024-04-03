<script setup>
import { ref, inject, watch } from 'vue'

const keyId = inject('keyId')
const account = inject('account')
</script>

<template>
  <div class="box">
    <div class="title">
      <h3>Trade list</h3>
      <el-button size="small" type="primary" @click="">Refresh</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;

  .title {
    display: flex;
    //align-items: center;

    h3 {
      font-weight: bold;
      font-size: 18px;
      flex: 1;
      line-height: 2;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
