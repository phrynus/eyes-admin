import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import store2 from 'store2'
import axios from '../components/CommonAxios'

// 设置基础配置项
export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    // 网站标题
    title: 'EYES-PROXY',
    name: null,
    token: null,
    key: null,
    policy: null,
    nav: {
      links: {
        Dashboard: [
          {
            icon: 'icon-home',
            name: 'Home',
            on: true,
            active: false,
            path: '/home'
          }
        ],
        Config: [
          {
            icon: 'icon-code',
            name: 'Key',
            path: '',
            on: false,
            active: false,
            links: []
          },
          {
            icon: 'icon-code',
            name: 'Policy',
            path: '',
            on: false,
            active: false,
            links: []
          }
        ]
        // // 设置
        // Setting: [
        //   {
        //     icon: 'icon-setting',
        //     name: 'Setting',
        //     path: '/setting',
        //     on: false,
        //     active: false
        //   }
        // ]
      }
    }
  }),
  getters: {
    getTitle() {
      return this.title
    },
    getToken() {
      const token = this.token || store2.get('token') || ''

      return token
    },
    getName() {
      return this.name || store2.get('name') || []
    },
    getKey() {
      return this.key || store2.get('key') || []
    },
    getPolicy() {
      return this.policy || store2.get('policy') || []
    },
    getNavLinks() {
      return this.nav.links
    }
  },
  actions: {
    // 设置网站标题
    setTitle(title) {
      this.title = title
    },
    setToken(token) {
      this.token = token
      if (token) {
        store2.set('token', token)
      } else {
        store2.remove('token')
      }
    },
    setName(name) {
      this.name = name
      if (name) {
        store2.set('name', name)
      } else {
        store2.remove('name')
      }
    },
    setKey(key) {
      this.key = key
      if (key) {
        store2.set('key', key)
        if (key.length > 0) {
          this.nav.links.Config[0].path = '/keyId/' + key[0]._id
          this.nav.links.Config[0].links = []
          // this.nav.links.Config[0].active = true
          key.map((item) => {
            this.nav.links.Config[0].links.push({
              icon: 'icon-code',
              name: item.name,
              on: false,
              path: '/keyId/' + item._id
            })
          })
          this.nav.links.Config[0].links.push({
            icon: 'icon-code',
            name: 'Add Key',
            on: false,
            path: '/keyAdd'
          })
        } else {
          this.nav.links.Config[0].path = '/keyAdd'
        }
      } else {
        this.nav.links.Config[1].links = []
        store2.remove('key')
      }
    },
    setKeyActive(keyId) {
      this.nav.links.Config[0].links.map((item) => {
        if (item.path === '/keyId/' + keyId) {
          item.on = true
        } else {
          item.on = false
        }
      })
    },
    setPolicy(policy) {
      this.policy = policy
      if (policy) {
        store2.set('policy', policy)
        if (policy.length > 0) {
          this.nav.links.Config[1].path = '/policyId/' + policy[0]._id
          this.nav.links.Config[1].links = []
          policy.map((item) => {
            this.nav.links.Config[1].links.push({
              icon: 'icon-code',
              name: item.name,
              on: false,
              path: '/policyId/' + item._id
            })
          })
          this.nav.links.Config[1].links.push({
            icon: 'icon-code',
            name: 'Add Policy',
            on: false,
            path: '/policyAdd'
          })
        } else {
          this.nav.links.Config[1].path = '/policyAdd'
        }
      } else {
        this.nav.links.Config[1].links = []
        store2.remove('policy')
      }
    }
  }
})
