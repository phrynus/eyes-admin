<script setup>
import { ref, inject, watch, defineExpose } from 'vue'
import axios from '../../../components/CommonAxios'
import { ElLoading, ElMessage } from 'element-plus'
// 取父级数据
const keyId = inject('keyId')
const account = inject('account')
const refreshAccount = inject('refreshAccount')

const tableData = ref([])
const usdtSwitch = ref(true)
// 写一个方法精简到小数点后两位
const toFixed = (num) => {
  return Number(num).toFixed(3)
}

const close = async (data) => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  await axios
    .post('/api/close', {
      keyId: keyId.value._id,
      symbol: data.symbol,
      type: 'MARKET',
      positionSide: data.positionSide,
      side: data.positionSide === 'LONG' ? 'SELL' : 'BUY',
      quantity: data.positionAmt
    })
    .then((res) => {
      loadingInstance.close()
      ElMessage({
        type: 'success',
        message: `操作成功`
      })
      refreshAccount()
    })
    .catch((err) => {
      loadingInstance.close()
      ElMessage({
        type: 'info',
        message: '操作失败'
      })
    })
  console.log(data)
}

//监听account变化
watch(account, (value) => {
  tableData.value = account.value.positions?.filter((item) => item.positionAmt > 0) || []
  console.log(tableData.value)
})
</script>

<template>
  <div class="box">
    <div class="title">
      <h3>Position list</h3>
      <el-switch
        v-model="usdtSwitch"
        active-text="USDT"
        class="usdtSwitch"
        inactive-text="币"
        size="small"
      ></el-switch>
      <el-button size="small" type="primary" @click="refreshAccount">Refresh</el-button>
    </div>
    <el-table :data="tableData" height="320" style="width: 100%">
      <el-table-column label="交易对" prop="symbol"></el-table-column>
      <el-table-column label="杠杆" prop="leverage" width="60"></el-table-column>
      <el-table-column label="方向" prop="positionSide" width="90"></el-table-column>
      <el-table-column label="数量" prop="positionAmt" width="110">
        <template #default="scope">
          <el-text class="mx-1">
            {{
              toFixed(
                usdtSwitch ? scope.row.positionAmt * scope.row.entryPrice : scope.row.positionAmt
              )
            }}
          </el-text>
        </template>
      </el-table-column>

      <el-table-column label="盈亏" prop="unrealizedProfit" width="110">
        <template #default="scope">
          <el-text :type="scope.row.unrealizedProfit > 0 ? 'success' : 'danger'" class="mx-1">
            {{ toFixed(scope.row.unrealizedProfit) }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column label="保证金" prop="initialMargin" width="110">
        <template #default="scope">
          {{ toFixed(scope.row.initialMargin) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="OPER" width="60">
        <template #default="scope">
          <el-button link size="small" type="primary" @click="close(scope.row)">CLOSE</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.mx-1 {
  overflow-wrap: initial;
}

.usdtSwitch {
  margin-right: 12px;
}

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
