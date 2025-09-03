<template>
  <div>
    <fieldset>
      <legend>Dialogs</legend>
      <cw-button @click="dialogUserSettings?.open()">User Settings</cw-button>
    </fieldset>
    <cw-dialog-create-user ref="dialogUserSettings" />
  </div>
</template>

<script lang="ts" setup>
import CwDialogCreateUser from '@cuby-world/app/components/dialogs/CreateUser.vue';
import CwButton from '@cuby-world/app/components/Button.vue';

import { ref } from 'vue';
const dialogUserSettings = ref<InstanceType<typeof CwDialogCreateUser> | null>(
  null
);
</script>

<style lang="postcss" scoped>
div {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

fieldset {
  padding: 10px 15px;
  border-radius: 3px;

  & legend {
    padding: 0 5px;
    font-family: var(--font-base);
    font-size: 14px;
    font-weight: bold;
    color: var(--color-white);
  }
}
</style>
