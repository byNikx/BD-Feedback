import { InjectionToken } from "@angular/core";

enum RATING_SIZE {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XL = 'xl'
}

export const APP_CONSTANT = new InjectionToken('APP_CONSTANTS');
export const CONSTANT_VALUES = {
	RATING_SIZE
};

export const ConstantsProvider = {
	provide: APP_CONSTANT,
	useValue: CONSTANT_VALUES
}