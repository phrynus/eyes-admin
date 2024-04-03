<script setup>
import { ref, inject } from 'vue'
// 取父级数据
const keyId = inject('keyId')

// 取keyId.value.safe_tradeList里面的对象名称

const tableData = Object.keys(keyId.value.safe_tradeList).map((key) => {
  return { name: key, ...keyId.value.safe_tradeList[key] }
})
</script>

<template>
  <div class="box">
    <div class="title">
      <h3>Trade list</h3>

      <el-button size="small" type="primary" @click="">Add symbol</el-button>
    </div>
    <el-table :data="tableData" height="320" style="width: 100%">
      <el-table-column label="Symbol" prop="name"></el-table-column>
      <el-table-column label="Lever" prop="lever" width="70"></el-table-column>
      <el-table-column label="Side" prop="type" width="90"></el-table-column>
      <el-table-column fixed="right" label="OPER" width="105">
        <template #default>
          <el-button link size="small" type="primary" @click="">Delete</el-button>
          <el-button link size="small" type="primary">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
.el-table .cell {
  overflow-wrap: initial;
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
