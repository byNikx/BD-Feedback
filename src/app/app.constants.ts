import { InjectionToken } from "@angular/core";

enum RATING_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XL = 'xl'
}

enum FLEX_LAYOUT_ALIGN {
  NONE = 'none',
  START = 'start',
  END = 'end',
  CENTER = 'center',
  STRETCH = 'stretch',
  BOTTOM = 'bottom',
  SPACE_AROUND = 'space-around',
  SPACE_BETWEEN = 'space-between',
  SPACE_EVENLY = 'space-evenly',
}

export const APP_CONSTANT = new InjectionToken('APP_CONSTANT');
export const CONSTANT_VALUES = {
	RATING_SIZE,
	FLEX_LAYOUT_ALIGN
};

export const ConstantsProvider = {
	provide: APP_CONSTANT,
	useValue: CONSTANT_VALUES
}