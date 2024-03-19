<script setup>
import { ref } from 'vue'

const links = ref({
  Dashboard: [
    {
      icon: 'icon-code',
      name: 'Home',
      on: true,
      active: false,
      path: '/'
    }
  ],
  Config: [
    {
      icon: 'icon-code',
      name: 'Key',
      path: '',
      on: false,
      active: false,
      links: [
        {
          icon: 'icon-code',
          name: '123',
          on: false,

          path: '/65f9088d52859f6e463ffcb5'
        },
        {
          icon: 'icon-code',
          name: '123',
          on: false,
          path: '/65f9088d52859f6e463ffcb5'
        }
      ]
    },
    {
      icon: 'icon-code',
      name: 'Policy',
      path: '',
      on: false,
      active: false,
      links: [
        {
          icon: 'icon-code',
          name: 'Policy',
          on: false,
          path: '/65f8fd0d47440a640ed94841'
        }
      ]
    }
  ],
  // 设置
  Setting: [
    {
      icon: 'icon-setting',
      name: 'Setting',
      path: '/setting',
      on: false,
      active: false
    }
  ]
})
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

  section.forEach((items) => {
    items.active = false
    items.on = false
  })
  if (time.links) {
    time.links.forEach((items) => {
      items.on = false
    })
  }

  time.active = true
  time.on = true
  time.links[0].on = true
}
const openLinSub = (time, list) => {
  list.forEach((item) => {
    item.on = false
  })
  time.on = !time.on
}
</script>

<template>
  <nav>
    <div v-for="(section, sectionName) in links" class="tabs">
      <span>{{ sectionName }}</span>
      <div class="link" v-for="(time, index) in section">
        <RouterLink
          :class="time.on ? 'on' : null"
          :to="time.path === '' ? time.links[0].path : time.path"
          @click="openLink(time, section)"
        >
          <i class="icon" :class="time.icon"></i>
          <span>{{ time.name }}</span>
          <i v-if="time.links" class="down icon icon-arrow-down"></i>
        </RouterLink>
        <div class="link" v-show="time.active">
          <RouterLink
            :class="timeSub.on ? 'on' : null"
            v-for="(timeSub, index) in time.links"
            :to="time.links[index].path"
            @click.prevent="openLinSub(timeSub, time.links)"
          >
            <i class="icon" :class="timeSub.icon"></i>
            <span>{{ timeSub.name }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background: #fff;
  width: 200px;
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
        }
      }
    }
  }
}
</style>
