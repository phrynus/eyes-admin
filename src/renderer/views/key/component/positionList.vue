<script setup>
import { ref, inject, watch } from 'vue'
// 取父级数据
const keyId = inject('keyId')
const account = inject('account')

const tableData = ref([])
//监听account变化
watch(account, (value) => {
  tableData.value = account.value.positions?.filter((item) => item.positionAmt > 0) || []
})
</script>

<template>
  <div class="box">
    <div class="title">
      <h3>Position list</h3>
      <el-button size="small" type="primary" @click="">Refresh</el-button>
    </div>
    <el-table :data="tableData" height="320" style="width: 100%">
      <el-table-column label="交易对" prop="symbol" width="120"></el-table-column>
      <el-table-column label="杠杆" prop="leverage" width="70"></el-table-column>
      <el-table-column label="持仓方向" prop="positionSide"></el-table-column>
      <el-table-column label="持仓数量" prop="positionAmt"></el-table-column>
      <el-table-column label="保证金" prop="initialMargin"></el-table-column>
      <el-table-column label="盈亏" prop="unrealizedProfit"></el-table-column>
      <el-table-column fixed="right" label="OPER" width="80">
        <template #default>
          <el-button link size="small" type="primary" @click="">CLOSE</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
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
