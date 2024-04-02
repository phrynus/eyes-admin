<script setup>
import { ref, inject } from 'vue'
// 取父级数据
const keyId = inject('keyId')
const getBinIcon = (str) => {
  let bin = str.replace(/USDT|USD/g, '')
  return `https://o-web.s3.bitiful.net/eyes/ico/${bin}.svg`
}
</script>

<template>
  <div class="box">
    <div class="top">
      <div class="title">
        <el-avatar :src="getBinIcon('BTC')" />
        <h3>{{ keyId.name }}</h3>
      </div>
      <el-switch size="large" />
    </div>
    <p>Account Master Switch</p>
  </div>
</template>

<style lang="scss" scoped>
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
