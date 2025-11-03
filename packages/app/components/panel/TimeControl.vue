<template>
  <cw-panel class="cw-panel-time-control" hide-title title="Time Control">
    <span class="time">
      <input
        size="5"
        :value="preparedTime"
        @focus="pause()"
        @blur="onBlurInput" />
      Uhr
    </span>

    <cw-button @click="onClickSpeed">
      {{ availableSpeeds[lastSpeedIndex]?.title }}
    </cw-button>
    <cw-button @click="onClickTogglePlayPause">
      <base-icon size="very-small" :name="paused ? 'play' : 'pause'" />
    </cw-button>
  </cw-panel>
</template>

<script lang="ts" setup>
import CwPanel from '../Panel.vue';
import CwButton from '../Button.vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { concatMap, Subscription } from 'rxjs';
import type App from '../../lib/classes/App';
import { detectHour12 } from '@cuby-world/app/lib/utils/date';
import BaseIcon from '../base/Icon.vue';

const speed = ref(1);
const availableSpeeds = [
  {
    title: 'x1',
    value: 1
  },
  {
    title: 'x2',
    value: 20
  },
  { title: 'x4', value: 40 },
  { title: 'x8', value: 80 },
  { title: 'x16', value: 160 },
  { title: 'x32', value: 320 },
  { title: 'x64', value: 640 },
  { title: 'x128', value: 1280 }
];

const $props = defineProps<{
  app: App;
}>();
const dayTime = ref(0);
const paused = ref(false);
const subscription = new Subscription();

const preparedTime = computed(() => {
  const totalMinutes = dayTime.value * 24 * 60;

  const date = new Date();
  date.setHours(Math.floor(totalMinutes / 60));
  date.setMinutes(Math.floor(totalMinutes % 60));
  date.setSeconds(0);

  const formatter = new Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: detectHour12()
  });

  return formatter.format(date);
});

// eslint-disable-next-line complexity
function onBlurInput(event: FocusEvent) {
  const input = event.target as HTMLInputElement;
  const value = input.value.trim();

  const isHour12 = detectHour12();
  const locale = navigator.language;

  // eslint-disable-next-line security/detect-unsafe-regex
  const match = value.match(/(\d{1,2})[:.,]?(\d{0,2})?\s*(AM|PM|am|pm)?/);
  if (!match) {
    input.value = preparedTime.value;
    return;
  }

  let hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const ampm = match[3]?.toLowerCase();

  if (isHour12) {
    if (ampm === 'pm' && hours < 12) hours += 12;
    if (ampm === 'am' && hours === 12) hours = 0;
  }

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours >= 24 ||
    minutes < 0 ||
    minutes >= 60
  ) {
    input.value = preparedTime.value;
    return;
  }

  const newDayTime = (hours * 60 + minutes) / (24 * 60);
  $props.app.modules.time.setDayTime(newDayTime);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  const formatter = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: isHour12
  });

  input.value = formatter.format(date);
}

onMounted(() => {
  subscription.add(
    $props.app.modules.time.observables.dayTime$
      .pipe(
        concatMap(async value => {
          dayTime.value = value;
        })
      )
      .subscribe(void 0)
  );
  subscription.add(
    $props.app.modules.time.observables.speed$
      .pipe(
        concatMap(async value => {
          speed.value = value;
        })
      )
      .subscribe(void 0)
  );
  subscription.add(
    $props.app.modules.time.observables.paused$
      .pipe(
        concatMap(async value => {
          paused.value = value;
        })
      )
      .subscribe(void 0)
  );

  //#region debug

  console.warn('Setting time to noon for debug purposes');
  $props.app.modules.time.setDayTime(0.62);

  //#endregion
});

onUnmounted(() => {
  subscription.unsubscribe();
});

//#region methods

function getCurrentSpeedIndex() {
  return availableSpeeds.findIndex(({ value }) => speed.value === value) || 0;
}

function onClickSpeed() {
  $props.app.modules.time.setSpeed(
    availableSpeeds[(getCurrentSpeedIndex() + 1) % availableSpeeds.length]!
      .value
  );
  lastSpeedIndex.value = getCurrentSpeedIndex();
}

function pause() {
  lastSpeedIndex.value = getCurrentSpeedIndex();
  $props.app.modules.time.pause();
}

function play() {
  $props.app.modules.time.play();
}

const lastSpeedIndex = ref(0);
function onClickTogglePlayPause() {
  if (paused.value) {
    play();
    return;
  }
  pause();
}

//#endregion
</script>

<style lang="postcss" scoped>
.cw-panel-time-control {
  & :deep(.content) {
    display: flex;
    flex-direction: row;
    gap: var(--cw-spacing-medium);
  }

  & .time {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;

    & input {
      padding: 0;
      font-family: var(--font-base);
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      color: white;
      text-align: center;
      appearance: none;
      outline: none;
      background: none;
      border: none;
    }
  }
}
</style>
