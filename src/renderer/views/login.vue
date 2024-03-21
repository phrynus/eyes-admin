<script setup>
import { useConfigStore } from '../stores/config'

const store = useConfigStore()
console.log('store', store)
</script>

<template>
  <div class="login">
    <div class="left">
      <div class="box">
        <div class="inputBox">
          <span>USER:</span>
          <input type="text" />
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
  <!--Login-->
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  //background-color: #f4f4f4;

  .left {
    flex: 1;

    .box {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .inputBox {
        display: flex;
        //flex-direction: column;
        //margin-bottom: 1em;
        width: 200px;
        background-color: #fff;
        padding: 0.5em;
        border-radius: 8px;

        span {
          font-size: 14px;
          color: #999;
          //font-weight: 900;
          //margin-bottom: 0.5em;
        }

        input {
          padding: 0.5em;
          border: 0;
          border-bottom: 1px solid #409eff;
          border-radius: 0;
          outline: none;
        }
      }
    }
  }

  .right {
    width: 50%;
    display: none;
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
