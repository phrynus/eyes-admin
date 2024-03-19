<script setup>
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

const svg = ref(`/coinSvg/${props.name}.svg`);

</script>

<template>
  <div>
    <img :src="svg" alt="">
  </div>
</template>

<style lang="scss" scoped>
div {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  margin: 0 0.5rem;
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  }
}
</style>