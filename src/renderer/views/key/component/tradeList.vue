<script setup>
import { ref, inject, watch } from 'vue'
import axios from '../../../components/CommonAxios'
import { ElLoading, ElMessage } from 'element-plus'
import { useConfigStore } from '../../../stores/config'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const store = useConfigStore()

// 取父级数据
const keyId = inject('keyId')
const exchangeInfo = inject('exchangeInfo')

const tableData = ref([])
const symbolArr = ref([])

// 取keyId.value.safe_tradeList里面的对象名称
const init = () => {
  if (keyId.value.safe_tradeList) {
    tableData.value = Object.keys(keyId.value.safe_tradeList).map((key) => {
      return { name: key, ...keyId.value.safe_tradeList[key] }
    })
  } else {
    tableData.value = []
  }

  symbolArr.value = exchangeInfo.value.symbols?.map((item) => item.symbol)
  let s = tableData.value.map((item) => item.name)
  symbolArr.value = symbolArr.value?.filter((item) => !s.includes(item))
}

const addDialog = ref(false)
const addForm = ref({
  symbol: [],
  lever: 20,
  type: 'MARKET',
  split: false,
  must: false
})
const addTrade = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true })

  let _data = {}
  addForm.value.symbol.map((item) => {
    _data[item] = {
      lever: addForm.value.lever,
      split: addForm.value.split,
      type: addForm.value.type,
      must: addForm.value.must
    }
  })
  if (_data == {}) {
    return
  }

  await axios
    .post('/api/key/tradeList', {
      keyId: keyId.value._id,
      tradeList: _data
    })
    .then((res) => {
      ElMessage({
        type: 'success',
        message: `设置成功`
      })
      addForm.value = {
        symbol: [],
        lever: 20,
        type: 'MARKET',
        split: false,
        must: false
      }
      store.setKey(res.data)
      keyId.value = res.data.find((item) => item._id === route.params.id)
      init()
      addDialog.value = false
      loadingInstance.close()
    })
    .catch((err) => {
      ElMessage({
        type: 'info',
        message: '设置失败'
      })
      addDialog.value = false
      loadingInstance.close()
    })
}

const addArrowDialog = ref(false)
const addArrowForm = ref({
  symbol: '',
  lever: 20,
  type: 'MARKET',
  split: false,
  must: false
})
const addArrow = async () => {
  const loadingInstance = ElLoading.service({ fullscreen: true })

  let _data = {}
  let symbols = addArrowForm.value.symbol.split(',').filter((item) => item !== '') || []
  symbols.map((item) => {
    _data[item] = {
      lever: addArrowForm.value.lever,
      split: addArrowForm.value.split,
      type: addArrowForm.value.type,
      must: addArrowForm.value.must
    }
  })
  if (_data == {}) {
    return
  }
  await axios
    .post('/api/key/tradeList', {
      keyId: keyId.value._id,
      tradeList: _data
    })
    .then((res) => {
      ElMessage({
        type: 'success',
        message: `设置成功`
      })
      addForm.value = {
        symbol: [],
        lever: 20,
        type: 'MARKET',
        split: false,
        must: false
      }
      store.setKey(res.data)
      keyId.value = res.data.find((item) => item._id === route.params.id)
      init()
      addArrowDialog.value = false
      loadingInstance.close()
    })
    .catch((err) => {
      ElMessage({
        type: 'info',
        message: '设置失败'
      })
      addArrowDialog.value = false
      loadingInstance.close()
    })
}
const deleteTrade = async (time = []) => {
  const loadingInstance = ElLoading.service({ fullscreen: true })
  await axios
    .post('/api/key/tradeList/delete', {
      keyId: keyId.value._id,
      tradeListName: time,
      all: time.length <= 0
    })
    .then((res) => {
      ElMessage({
        type: 'success',
        message: `设置成功`
      })
      addForm.value = {
        symbol: [],
        lever: 20,
        type: 'MARKET',
        split: false,
        must: false
      }
      store.setKey(res.data)
      keyId.value = res.data.find((item) => item._id === route.params.id)
      init()
      addDialog.value = false
      loadingInstance.close()
    })
    .catch((err) => {
      ElMessage({
        type: 'info',
        message: '设置失败'
      })
      addDialog.value = false
      loadingInstance.close()
    })
}

const edit = (data) => {
  addForm.value = {
    symbol: [data.name],
    lever: data.lever,
    type: data.type,
    split: data.split,
    must: data.must
  }
  addDialog.value = true
}

init()
watch(keyId, (value) => {
  init()
})
watch(exchangeInfo, (value) => {
  init()
})
</script>

<template>
  <div class="box">
    <div class="title">
      <h3>Trade list</h3>
      <el-button size="small" type="primary" @click="deleteTrade()">Delete All</el-button>
      <el-button size="small" type="primary" @click="addArrowDialog = true">Add Arrow</el-button>
      <el-button size="small" type="primary" @click="addDialog = true">Add</el-button>
    </div>
    <el-table :data="tableData" height="320" style="width: 100%">
      <el-table-column label="Symbol" prop="name"></el-table-column>
      <el-table-column label="Lever" prop="lever" width="65"></el-table-column>
      <el-table-column label="Split" prop="split" width="60"></el-table-column>
      <el-table-column label="type" prop="type" width="90"></el-table-column>
      <el-table-column fixed="right" label="OPER" width="105">
        <template #default="scope">
          <el-button link size="small" type="primary" @click="deleteTrade([scope.row.name])">
            Delete
          </el-button>
          <el-button link size="small" type="primary" @click="edit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog v-model="addDialog" title="Shipping address" width="500">
    <el-form v-model="addForm" label-width="auto">
      <el-form-item label="Symbol">
        <!--<el-input v-model="addForm.symbol" />-->
        <el-select v-model="addForm.symbol" filterable multiple>
          <el-option v-for="item in symbolArr" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Lever">
        <el-input v-model="addForm.lever" type="number" />
      </el-form-item>
      <el-form-item label="split">
        <el-switch v-model="addForm.split" />
      </el-form-item>
      <el-form-item label="type">
        <el-radio-group v-model="addForm.type">
          <el-radio value="MARKET">MARKET</el-radio>
          <el-radio :disabled="true" value="TICKER">TICKER</el-radio>
          <el-radio value="LIMIT">LIMIT</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addTrade()">OK</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="addArrowDialog" title="Shipping address" width="500">
    <el-form v-model="addArrowForm" label-width="auto">
      <el-form-item label="Symbol">
        <el-input
          v-model="addArrowForm.symbol"
          :rows="3"
          placeholder="BTCUSDT,ETHUSDT"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="Lever">
        <el-input v-model="addArrowForm.lever" type="number" />
      </el-form-item>
      <el-form-item label="split">
        <el-switch v-model="addArrowForm.split" />
      </el-form-item>
      <el-form-item label="type">
        <el-radio-group v-model="addArrowForm.type">
          <el-radio value="MARKET">MARKET</el-radio>
          <el-radio value="TICKER">TICKER</el-radio>
          <el-radio value="LIMIT">LIMIT</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addArrowDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addArrow()">OK</el-button>
      </div>
    </template>
  </el-dialog>
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
