export const sizesDigits = {
  small: "text_type_digits-default",
  medium: "text_type_digits-medium",
  large: "text_type_digits-large",
}

//цвет для текста и цифр
export const colorsText = {
  error: "text_color_error",
  primary: "text_color_primary",
  accent: "text_color_accent",
  success: "text_color_success",
  inactive: "text_color_inactive",
}

//__textMobile__ - small
//__textDesktop__ - default,
//__displaySmall__ - medium,
//__displayLarge__ - large,
export const sizesText = {
  textMobile: "text_type_main-small",
  textDesktop: "text_type_main-default",
  displaySmall: "text_type_main-medium",
  displayLarge: "text_type_main-large",
}

export const pagePath = {
  home: "/",
  ingredientsInfo: "/ingredients/:id",
  login: "login",
  loginAbsolut: "/login",
  register: "register",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
  profile: "profile",
  profileFull: "/profile",
  profileOrdersFull: "profile/orders",
  profileOrdersShort: "orders",
  feed: "/feed",
  orderInfoFeed: "/feed/:id",
  orderInfoProfile: "/profile/orders/:id",
  otherPages: "*",
}

/**
 * Возвращает строку с пробелами через каждый 3-й символ с конца (справа)
 * @param str
 */
export function format(str: string): string {
  const s = str.length;
  const chars = str.split('');
  const strWithSpaces = chars.reduceRight((acc, char, i) => {
    const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
    return (spaceOrNothing + char + acc);
  }, '');

  return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces);
}