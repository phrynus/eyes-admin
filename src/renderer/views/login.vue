<script setup>
import { ref, onMounted } from 'vue'
import { useConfigStore } from '../stores/config'
import { ElMessageBox, ElNotification, ElLoading } from 'element-plus'
import store2 from 'store2'
import axios from 'axios'

const store = useConfigStore()
const myUser = ref('myUser')
const myTotp = ref('myTotp')

let iconUser = ref('')
let iconTotp = ref('')
let inputUser = ref('')
let inputTotp = ref('folded')
let title = ref('EYES - USER')
let totpText = ref('')

let isLogin = false
let isRed = false

const login = () => {
  isLogin = true
  const loadingInstance = ElLoading.service({ fullscreen: true })
  axios
    .post('https://bot.phrynus.cn/user/login', {
      name: myUser.value.value,
      totp: myTotp.value.value
    })
    .then((res) => {
      console.log(res)
      //   保存到本地存储空间
      store2.set('accessToken', res.data.accessToken)
      store2.set('key', res.data.key)
      store2.set('name', res.data.name)
      store2.set('ploy', res.data.ploy)
      ElNotification({
        title: '登录成功',
        message: '欢迎回来' + res.data.name,
        type: 'success'
      })
      loadingInstance.close()
      // 刷新页面
      window.location.reload()
    })
    .catch((err) => {
      ElNotification({
        title: '登录失败',
        message: err.response.data,
        type: 'error'
      })
      console.log(err)
      loadingInstance.close()
      inputUser.value = ''
      inputTotp.value = 'folded'
      iconUser.value = ''
      totpText = ref('')
      myUser.value.value = ''
      myUser.value.focus()
      title.value = 'EYES - USER'
      isLogin = false
    })
}
const red = () => {
  isRed = true
  const loadingInstance = ElLoading.service({ fullscreen: true })

  axios
    .post('https://bot.phrynus.cn/user/reg', {
      name: myUser.value.value
    })
    .then((res) => {
      // console.log(res.data.totp)
      //   保存到本地存储空间
      store2.set('accessToken', res.data.accessToken)
      store2.set('name', res.data.name)
      loadingInstance.close()
      ElNotification({
        title: '注册成功',
        message: '请保存好您的TOTP二维码',
        type: 'success'
      })
      ElMessageBox.alert(`<img src="${res.data.totp}" alt="">`, `请保存好您的TOTP二维码`, {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'OK',
        callback: () => {
          window.location.reload()
        }
      })

      // 刷新页面
      // window.location.reload()
    })
    .catch((err) => {
      console.log(err)
      loadingInstance.close()
      ElNotification({
        title: '注册失败',
        message: err.response.datac,
        type: 'error'
      })
      isRed = false
    })
}

const totpOnKeyup = (e) => {
  if (isLogin || isRed) {
    return
  }
  if (totpText?.value?.length === 6) {
    if (totpText?.value === '000000') {
      red()
      return
    }
    login()
    return
  }
  if (e.key === 'Escape') {
    inputUser.value = ''
    inputTotp.value = 'folded'
    iconUser.value = ''
    totpText = ref('')
    myUser.value.value = ''
    myUser.value.focus()
    title.value = 'EYES - USER'
  }
}
const userOnKeyup = (e) => {
  if (myUser.value.value.length >= 3) {
    iconUser.value = 'next'
    if (e.key === 'Enter') {
      inputUser.value = 'folded'
      inputTotp.value = ''
      myTotp.value.focus()
      title.value = 'EYES - TOTP'
    }
  } else {
    iconUser.value = ''
  }
}
const userOnclick = () => {
  inputUser.value = 'folded'
  inputTotp.value = ''
  myTotp.value.focus()
  title.value = 'EYES - TOTP'
}

onMounted(() => {
  myUser.value.focus()
})
</script>

<template>
  <div class="login">
    <div class="back"></div>
    <div class="registration-form">
      <header>
        <h1>{{ title }}</h1>
        <p>TOTP输入000000注册账户</p>
      </header>
      <form>
        <div :class="inputUser" class="input-section email-section">
          <input
            ref="myUser"
            autocomplete="off"
            class="email"
            placeholder="ENTER YOUR USER HERE"
            type="text"
            @keyup="userOnKeyup"
          />
          <div class="animated-button">
            <span :class="iconUser" class="icon-paper-plane"><i class="icon icon-user"></i></span>
            <span class="next-button email" @click="userOnclick">
              <i class="icon icon-navigation"></i>
            </span>
          </div>
        </div>
        <div :class="inputTotp" class="input-section password-section">
          <input
            ref="myTotp"
            v-model="totpText"
            class="password"
            maxlength="6"
            type="password"
            @keyup="totpOnKeyup"
          />
          <div class="totpSub">
            <span>{{ totpText.length >= 1 ? '·' : null }}</span>
            <span>{{ totpText.length >= 2 ? '·' : null }}</span>
            <span>{{ totpText.length >= 3 ? '·' : null }}</span>
            <span>{{ totpText.length >= 4 ? '·' : null }}</span>
            <span>{{ totpText.length >= 5 ? '·' : null }}</span>
            <span>{{ totpText.length >= 6 ? '·' : null }}</span>
          </div>
          <!--<div class="animated-button">-->
          <!--  <span :class="iconTotp" class="icon-lock"><i class="icon icon-keyboard-9"></i></span>-->
          <!--  <span class="next-button password"><i class="icon icon-navigation"></i></span>-->
          <!--</div>-->
        </div>
      </form>
    </div>
  </div>
  <!--Login-->
</template>

<style lang="scss" scoped>
$input-height: 75px;
//.icon {
//  color: #fff;
//}

.login {
  .back {
    background: linear-gradient(120grad, rgb(100, 57, 134), rgb(152, 174, 213));
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .registration-form {
    width: 400px;
    position: absolute;
    left: 50%;
    top: calc(50% - 40px);
    transform: translate(-50%, -50%);
    background: transparent;

    header {
      position: relative;
      z-index: 4;
      background: white;
      padding: 20px 40px;
      border-radius: 15px 15px 0 0;

      h1 {
        font-weight: 900;
        letter-spacing: 1.5px;
        color: #333;
        font-size: 23px;
        text-transform: uppercase;
        margin: 0;
      }

      p {
        word-spacing: 0px;
        color: rgb(159, 172, 182);
        font-size: 15px;
        margin: 5px 0 0;
      }
    }

    form {
      position: relative;
    }

    .input-section {
      width: 100%;
      position: absolute;
      display: flex;
      left: 50%;
      transform: translate(-50%, 0);
      height: $input-height;
      border-radius: 0 0 15px 15px;
      overflow: hidden;
      z-index: 2;
      box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.2);
      transition: all 0.1s ease-in;

      .totpSub {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(225, 188, 239);
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        span {
          display: block;
          width: 12%;
          height: 60px;
          background-color: #fff;
          border-radius: 4px;
          color: rgb(225, 188, 239);
          line-height: 60px;
          text-align: center;
          font-weight: 600;
          font-size: 37px;
          //transition: 0;
        }
      }

      &.folded {
        width: 95%;
        margin-top: 10px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 1;

        //input {
        //  background-color: rgb(233, 226, 192);
        //}

        //span {
        //  background-color: rgb(233, 226, 192);
        //}
      }

      &.folded + .folded {
        width: 90%;
        margin-top: 20px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 0;

        input {
          background-color: rgb(225, 188, 239);
        }

        span {
          background-color: rgb(225, 188, 239);
        }
      }
    }

    form input {
      background: lighten(rgb(243, 243, 251), 5%);
      color: rgb(143, 143, 214);
      width: 80%;
      border: 0;
      padding: 20px 40px;
      margin: 0;

      &.password {
        position: relative;
        z-index: 2;
        width: 100%;
        background-color: #fff0;
        padding: 0 7.5%;
        //font-size: 54px;
        //letter-spacing: 45px;
        opacity: 0;
      }

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: rgb(143, 143, 214);
        font-weight: 100;
      }
    }
  }

  .animated-button {
    width: 20%;
    background-color: rgb(212, 212, 255);

    span {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      line-height: $input-height;
      text-align: center;
      height: $input-height;
      transition: all 0.2s ease-in;

      i {
        font-size: 25px;
        //color: rgb(153, 153, 248);
        color: #fff;
      }
    }

    .next-button {
      background: transparent;
      color: rgb(153, 153, 248);
      font-weight: 100;
      width: 100%;
      border: 0;
      cursor: pointer;
    }
  }

  .next {
    margin-top: -$input-height;
  }

  .success {
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    transform: translate(-50%, 0);
    height: $input-height;
    border-radius: 0 0 15px 15px;
    overflow: hidden;
    z-index: 2;
    box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in;
    background: limegreen;
    margin-top: -$input-height;

    p {
      color: white;
      font-weight: 900;
      letter-spacing: 2px;
      font-size: 18px;
      width: 100%;
      text-align: center;
    }
  }
}

.container {
  padding: 2em;
  background-color: #fff;
  width: 400px;
  border-radius: 12px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  .title {
    font-size: 24px;
    font-weight: 900;
    text-align: center;
  }
}
</style>
