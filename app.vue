<template>
  <div class="layout-default">
    <Header />
    <main>
     <NuxtPage />
    </main>
    <Footer />
    <BackTop></BackTop>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
export default {
  layout: false,
}
</script>