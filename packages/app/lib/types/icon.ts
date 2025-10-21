import type icons from '@cuby-world/app/utils/icons';
import type { FunctionalComponent } from 'vue';

export type Icon = keyof typeof icons | FunctionalComponent;
