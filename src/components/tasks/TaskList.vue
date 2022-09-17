<template>
  <article class="task-item">
    <header class="task-header">
      <h5 class="task-title">
        <slot name="content" />
      </h5>
    </header>
    <aside class="sidebar">
      <slot
        name="buttons"
      />
    </aside>
  </article>
</template>

<style scoped>
.task-item {
    display: flex;
    min-width: 23rem;
    justify-content: space-between;
    min-height: 3rem;
    align-items: center;
    margin: 20px 0px;
    border: 1px solid black;
    padding-right: 10px;
}

.task-header {
    grid-area: hd;
}

.sidebar {
    display: flex;
    min-width: 50%;
    justify-content: space-between;
}
.task-title {
    margin: 0;
    padding: 0.5rem;
}

</style>