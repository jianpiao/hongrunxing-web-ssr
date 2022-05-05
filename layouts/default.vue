<template>
  <div class="layout-default">
    <Header />
    <main>
      <slot />
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