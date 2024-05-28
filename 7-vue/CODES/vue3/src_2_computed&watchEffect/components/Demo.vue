<template>
  <h1>姓名案例</h1>
  First Name：<input type="text" v-model="person.firstName" /> <br />
  Last Name：<input type="text" v-model="person.lastName" /> <br />
  Full Name：<input type="text" v-model="person.fullName" />
</template>

<script>
import { reactive, computed, watchEffect } from "vue";

export default {
  name: "Demo",

  setup() {
    let person = reactive({
      firstName: "",
      lastName: "",
    });

    // person.fullName = computed(() => {
    //   return person.firstName + "-" + person.lastName;
    // });

    watchEffect(() => {
      console.log("哈哈哈");
    });

    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName;
      },

      set(value) {
        [person.firstName, person.lastName] = value.split("-");
      },
    });

    return { person };
  },
};
</script>

<style>
</style>