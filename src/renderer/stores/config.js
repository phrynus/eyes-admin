import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 设置基础配置项
export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    // 网站标题
    title: 'EYES-PROXY'
  }),
  getters: {
    getTitle() {
      return this.title
    }
  },
  actions: {
    // 设置网站标题
    setTitle(title) {
      this.title = title
    }
  }
})
