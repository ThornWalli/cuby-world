import type icons from '@cuby-world/app/utils/icons';
import type { FunctionalComponent } from 'vue';

export type Icon = keyof typeof icons | FunctionalComponent;

export enum IconSize {
  VERY_SMALL = 'very-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  VERY_LARGE = 'very-large'
}
