<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 取pinia的
import { useConfigStore } from '../../stores/config'

const store = useConfigStore()
console.log('store', store)
</script>

<template>
  <div class="tooltip">
    <div class="logo">
      <div class="piece ico">{{ store.title }}</div>
      <!--<div class="piece rounded">-->
      <!--  <i class="icon icon-toggle-left"></i>-->
      <!--</div>-->
    </div>
    <div class="container">
      <div class="piece night sun">
        <i class="icon icon-sun"></i>
        <i class="icon icon-moon"></i>
      </div>
      <div class="piece language">
        <i class="icon icon-language"></i>
      </div>
      <div class="user">
        <div class="image">
          <img src="https://o-web.s3.bitiful.net/eyes/ETH.svg" alt="" />
        </div>
        <div class="setting">
          <i class="icon icon-setting"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
  width: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;

  .logo {
    width: 200px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .ico {
      font-size: 24px;
      font-weight: 900;
    }

    .rounded {
      width: 2em;
      height: 2em;
      background: rgb(237, 231, 246);
      border-radius: 8px;
      cursor: pointer;

      i {
        font-size: 1.3em;
        color: #7e57c2;
        line-height: 1.8em;
        text-align: center;
      }
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 18px;

    .piece {
      width: 2em;
      height: 2em;
      background: rgb(237, 231, 246);
      border-radius: 8px;
      cursor: pointer;
      margin-left: 18px;
      cursor: pointer;

      &.night {
        &.sun {
          .icon-moon {
            display: none;
          }
        }

        &.moon {
          .icon-sun {
            display: none;
          }
        }
      }

      i {
        font-size: 1.3em;
        color: #7e57c2;
        line-height: 1.8em;
        text-align: center;
      }
    }

    .user {
      cursor: pointer;

      height: 3em;
      background-color: #e3f2fd;
      display: flex;
      margin-left: 18px;
      border-radius: 1.5em;
      align-items: center;
      padding: 0 0.5em;

      .image {
        width: 2em;
        height: 2em;
        background-color: #fff;
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .setting {
        width: 2em;
        height: 2em;

        border-radius: 8px;
        cursor: pointer;
        margin-left: 1em;

        i {
          font-size: 1.3em;
          color: #1e88e5;
          line-height: 1.8em;
          text-align: center;
        }
      }
    }
  }
}
</style>
