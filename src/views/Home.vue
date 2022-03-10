<template>
  <div class="home">
    <!-- <Bookstore msg="Welcome to Your Vue.js App"/> -->
    <Note v-if="pageA == 'note'" :closeIcon='true' />
    <About v-if="pageA == 'about'" :closeIcon='true'/>
  </div>
</template>

<script setup>
import Bookstore from '@/components/Bookstore.vue'
import Note from '@/views/Note.vue'
import About from '@/views/About.vue'
import { onMounted, ref } from 'vue'

const pageA = ref('')

onMounted(() => {
  const pageAction = localStorage.getItem('pageAction')
  if (pageAction) {
    pageA.value = pageAction
  }
})
</script>
<style scoped>
.home {
  min-width: 1366px;
}
</style>