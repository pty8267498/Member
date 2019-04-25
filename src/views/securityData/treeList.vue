<template>
  <div>
    <ul>
        <li v-for = "(item,index) in folder" :key="index">
            <span @click="select(item)">{{ item.label }}</span>
            <tree v-if="item.children" :folder="item.children" :select="select"></tree>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
