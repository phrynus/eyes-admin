<script setup>
import { ref, onMounted } from 'vue'
import { useConfigStore } from '../../stores/config'
import store2 from 'store2'
import { ElMessage, ElMessageBox, ElLoading, ElNotification } from 'element-plus'
import axios from '../../components/CommonAxios'

const store = useConfigStore()
const links = ref(store.getNavLinks)
const openLink = (time, section) => {
  // 遍历links对象把对象里面的数组，将active和on都设置为false
  Object.keys(links.value).forEach((sectionName) => {
    links.value[sectionName].forEach((item) => {
      item.active = false
      item.on = false
      if (item.links) {
        item.links.forEach((subItem) => {
          subItem.active = false
          subItem.on = false
        })
      }
    })
  })
  time.active = true
  time.on = true
  if (time.links?.length > 0) {
    time.links[0].on = true
  }
}
const openLinSub = (time, list) => {
  list.forEach((item) => {
    item.on = false
  })
  time.on = !time.on
}
// 更新links

const keyDrawer = ref(false)
const keyFormRef = ref('keyFormRef')
const keyRuleForm = ref({
  exchange: 'binance',
  name: '',
  key: '',
  secret: '',
  password: ''
})
const keyAdd = () => {
  keyDrawer.value = true
}
const keySubmit = async () => {
  // 校验
  if (!keyRuleForm.value.name) {
    ElMessage({
      type: 'error',
      message: '请输入名称'
    })
    return
  }
  if (!keyRuleForm.value.key) {
    ElMessage({
      type: 'error',
      message: '请输入key'
    })
    return
  }
  if (!keyRuleForm.value.secret) {
    ElMessage({
      type: 'error',
      message: '请输入secret'
    })
    return
  }
  if (keyRuleForm.value.exchange === 'bitget' && !keyRuleForm.value.password) {
    ElMessage({
      type: 'error',
      message: '请输入密码'
    })
    return
  }
  const loadingInstance = ElLoading.service({ fullscreen: true })
  await axios
    .post('/api/key/add', keyRuleForm.value)
    .then((res) => {
      ElMessage({
        type: 'success',
        message: '添加成功'
      })
      keyDrawer.value = false
      keyRuleForm.value = {
        exchange: 'binance',
        name: '',
        key: '',
        secret: '',
        password: ''
      }
      let keys = store.getKey
      keys.push(res.data)
      store.setKey(keys)
    })
    .catch((err) => {
      ElMessage({
        type: 'error',
        message: err.response.data
      })
    })
  loadingInstance.close()
}
const policyAdd = () => {
  ElMessageBox.prompt('Please enter the policy name', 'Add Policy', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^[\u4e00-\u9fa5\w\d]{3,16}$/,
    inputErrorMessage: '名称必须由3到16个字符组成，只能包含字母、数字、下划线、中文'
  }).then(async ({ value }) => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    await axios
      .post('/api/ploy/add', { name: value })
      .then((res) => {
        ElMessage({
          type: 'success',
          message: '添加成功, Name：' + res.data.name
        })
        let policys = store.getPolicy
        console.log(policys)
        policys.push(res.data)
        store.setPolicy(policys)
        links.value = store.getNavLinks
      })
      .catch((err) => {
        console.log(err)

        ElMessage({
          type: 'error',
          message: '添加失败' + err.response.data
        })
      })
    loadingInstance.close()
  })
}
</script>

<template>
  <el-scrollbar>
    <nav>
      <div v-for="(section, sectionName) in links" class="tabs">
        <span>{{ sectionName }}</span>
        <div v-for="(time, index) in section" class="link">
          <RouterLink
            :class="time.on ? 'on' : null"
            :to="time.path === '/keyAdd' || time.path === '/policyAdd' ? '' : time.path"
            @click="
              time.path === '/keyAdd'
                ? keyAdd()
                : time.path === '/policyAdd'
                  ? policyAdd()
                  : openLink(time, section)
            "
          >
            <i :class="time.icon" class="icon"></i>
            <span>{{ time.name }}</span>
            <i v-if="time.links" class="down icon icon-arrow-down"></i>
          </RouterLink>
          <div v-show="time.active" class="link">
            <RouterLink
              v-for="(timeSub, index) in time.links"
              :class="timeSub.on ? 'on' : null"
              :to="
                time.links[index].path === '/keyAdd' || time.links[index].path === '/policyAdd'
                  ? ''
                  : time.links[index].path
              "
              @click.prevent="
                time.links[index].path === '/keyAdd'
                  ? keyAdd()
                  : time.links[index].path === '/policyAdd'
                    ? policyAdd()
                    : openLinSub(timeSub, time.links)
              "
            >
              <i :class="timeSub.icon" class="icon"></i>
              <span>{{ timeSub.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </el-scrollbar>

  <el-drawer v-model="keyDrawer" direction="ltr">
    <template #header>
      <h3>Add your key</h3>
    </template>
    <el-form ref="keyFormRef" :model="keyRuleForm" label-position="left">
      <!--选择交易所-->
      <el-form-item label="Exchange">
        <el-select v-model="keyRuleForm.exchange" placeholder="Binance1">
          <el-option default label="Binance" value="binance" />
          <el-option :disabled="true" label="Bitget" value="bitget" />
        </el-select>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="keyRuleForm.name" placeholder="Please enter the key name" />
      </el-form-item>
      <el-form-item label="Key">
        <el-input v-model="keyRuleForm.key" placeholder="Please enter the key" />
      </el-form-item>
      <el-form-item label="Secret">
        <el-input v-model="keyRuleForm.secret" placeholder="Please enter the secret" />
      </el-form-item>
      <el-form-item v-if="keyRuleForm.exchange === 'bitget'" label="Password">
        <el-input v-model="keyRuleForm.password" placeholder="Please enter the password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="keySubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
nav {
  background: #fff;
  width: 240px;
  padding-left: 16px;
  padding-right: 16px;

  .tabs {
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(237, 231, 246);

    &:last-child {
      border-bottom: none;
    }

    > span {
      margin: 10px 0px 0.35em;
      line-height: 1.66;
      display: block;
      color: rgb(18, 25, 38);
      font-size: 1em;
      padding: 6px;
      font-weight: 600;
      text-transform: uppercase;
    }

    > .link {
      > .link {
        a {
          padding: 8px 14px 8px 24px;
        }
      }

      a {
        margin: 0px 0px 4px;
        padding: 8px 8px 8px 14px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        transition: 0.3s;

        &:hover,
        &.on {
          background-color: rgb(237, 231, 246);

          span {
            color: rgb(94, 53, 177);
          }

          i {
            color: rgb(94, 53, 177);
          }
        }

        .down {
          margin: 0;
          padding: 6px;
          font-size: 1em;
        }

        i {
          //min-width: 36px;
          font-size: 1.2em;
          margin-right: 12px;
        }

        span {
          flex: 1 1 auto;
          margin-top: 4px;
          margin-bottom: 4px;
          font-size: 0.875rem;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
