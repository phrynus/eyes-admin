<script setup>
import { ref, inject, watch } from 'vue'

const keyId = inject('keyId')
const account = inject('account')
const toFixed = (num) => {
  return Number(num).toFixed(3)
}
</script>

<template>
  <div class="box">
    <el-descriptions column="4" title="User Info">
      <el-descriptions-item label="余额"
        >{{ toFixed(account.totalWalletBalance) }}
      </el-descriptions-item>
      <el-descriptions-item label="盈亏">
        <el-text :type="account.totalCrossUnPnl >= 0 ? 'success' : 'danger'">
          {{ toFixed(account.totalUnrealizedProfit) }}
        </el-text>
      </el-descriptions-item>
      <el-descriptions-item label="可用">
        {{ toFixed(account.availableBalance) }}
      </el-descriptions-item>
      <el-descriptions-item label="保证金">
        {{ toFixed(account.totalInitialMargin) }}
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
