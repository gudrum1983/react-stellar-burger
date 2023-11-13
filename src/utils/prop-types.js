import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const nodeElementPropType = PropTypes.node.isRequired;
export const numPropType = PropTypes.number.isRequired;
export const booleanPropType = PropTypes.bool.isRequired;
export const booleanOptional = PropTypes.bool;
export const stringPropType = PropTypes.string.isRequired;
export const arrayNodeElementOptional = PropTypes.arrayOf(nodeElementPropType);

export const stringOptional = PropTypes.string;
export const functionOptional = PropTypes.func;
export const functionPropType = PropTypes.func.isRequired;
export const arrayOfIngredientsPropType = PropTypes.arrayOf(ingredientPropType).isRequired;
export const selectedOtherIngredientsPropType = PropTypes.arrayOf(PropTypes.shape({
  numberIngredient: stringPropType,
  ingredient: ingredientPropType,
}))

export const selectedIngredientsPropType = PropTypes.shape({
  bun: ingredientPropType,
  other: selectedOtherIngredientsPropType,
})

export const otherIngredientPropType = PropTypes.shape({
  bun: ingredientPropType,
  other: selectedOtherIngredientsPropType,
})

/*
export const imputPropType = PropTypes.shape({
  placeholder: stringOptional,
  isEdit: booleanPropType,
})*/
