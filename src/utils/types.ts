
import {MouseEventHandler} from "react";


export type TPropsTextElement = {
  size?: TSizesText;
  extraClass?: string;
  color?: TColorsText;
};

export type TPropsDigitsElement = {
  size?: TSizesDigits;
  extraClass?: string;
  color?: TColorsText;
};

export type TPropsDate = {
  value: string;
};

export type TPropsModal = {
  header: string;
  onClose: () => MouseEventHandler<HTMLDivElement> ;
};

export type TPropsOrdersBoard = {
  header: string;
  items: Array<string>;
  done?: boolean;
};

export type TPropsCountCompleted = {
  header: string;
  value: number;
};

export type TPropsIngredientPreview = {
  image: string;
  count?: number;
};

export type TPropsIngredients = {
  ingredient: string;
  index: number;
  count?: number;
};

export type TPropsCardOrder = {
  order: TOrder;
};

export type TSelectorOrders = Array<TOrder> | undefined;

export type TOrder = {
  _id: string;
  status: TStatusOrder;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number
  ingredients: Array<string>
};

export type TPropsModalOverlay = {
  onClose: () => MouseEventHandler<HTMLDivElement> ;
};

export type TKeyEv = (e: KeyboardEvent) => void;

type TSizesText =
  typeof TEXT_MOBILE
  | typeof TEXT_DESKTOP
  | typeof DISPLAY_SMALL
  | typeof DISPLAY_LARGE;

type TSizesDigits =
  typeof DIGITS_SMALL
  | typeof DIGITS_MEDIUM
  | typeof DIGITS_LARGE;

export type TColorsText =
  typeof COLOR_ERROR
  | typeof COLOR_ACCENT
  | typeof COLOR_SUCCESS
  | typeof COLOR_INACTIVE
  | typeof COLOR_PRIMARY;


// figma - /* desktop/digits small */
export const DIGITS_SMALL = "text_type_digits-default"
// figma - /* desktop/digits medium */
export const DIGITS_MEDIUM = "text_type_digits-medium"
// figma - /* desktop/digits large */
export const DIGITS_LARGE = "text_type_digits-large"
export const COLOR_ERROR = "text_color_error"
export const COLOR_ACCENT = "text_color_accent"
export const COLOR_SUCCESS = "text_color_success"
export const COLOR_INACTIVE = "text_color_inactive"
export const COLOR_PRIMARY = "text_color_primary"

// figma - /* mobile/text */
export const TEXT_MOBILE = "text_type_main-small"
// figma - /* desktop/text */
export const TEXT_DESKTOP = "text_type_main-default"
// figma - /* desktop/display small */
export const DISPLAY_SMALL = "text_type_main-medium"
// figma - /* desktop/display large */
export const DISPLAY_LARGE = "text_type_main-large"

export enum STATUS_ORDER {
  done,
  pending,
  created ,
}

type TStatusOrder = keyof typeof STATUS_ORDER;
