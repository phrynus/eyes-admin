<script setup>
import { ref, inject, watch } from 'vue'

const keyId = inject('keyId')
const account = inject('account')
</script>

<template>
  <div class="box">
    <el-descriptions title="User Info">
      <el-descriptions-item :span="3" label="余额"
        >{{ account.totalWalletBalance }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<style lang="scss">
.el-descriptions__header {
  margin-bottom: 8px;
}
</style>
<style lang="scss" scoped>
.box {
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
}
</style>
