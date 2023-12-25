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
export const objectPropType = PropTypes.object.isRequired;
export const arrayNodeElementOptional = PropTypes.arrayOf(nodeElementPropType);
export const stringOptional = PropTypes.string;
export const functionOptional = PropTypes.func;
export const arrayStringOptional = PropTypes.arrayOf(stringOptional);
export const arrayOptional = PropTypes.array;
export const numOptional = PropTypes.number;
export const mapOptional = PropTypes.instanceOf(Map);
export const functionPropType = PropTypes.func.isRequired;
export const arrayOfIngredientsPropType = PropTypes.arrayOf(ingredientPropType).isRequired;
export const selectedOtherIngredientsPropType = PropTypes.arrayOf(PropTypes.shape({
  numberIngredient: stringPropType,
  ingredient: ingredientPropType,
}))

export const nodeOptional = PropTypes.node;

export const selectedIngredientsPropType = PropTypes.shape({
  bun: ingredientPropType,
  other: selectedOtherIngredientsPropType,
})

export const otherIngredientPropType = PropTypes.shape({
  bun: ingredientPropType,
  other: selectedOtherIngredientsPropType,
})

export const stringOrArrayOptional = stringOptional || arrayOptional;

/*
function tested() {

  type TMap = Map<string, number>

  const testMap: TMap = new Map

  testMap.set("T", 10)
  testMap.set("e", 25)
  testMap.set("s", 37)
  testMap.set("t", 48)

  if (testMap.has("s")) {
    const number1 = testMap.get("s")
    console.log("number1", number1)
  }

  const key = "e"

  if (!!testMap.get(key)) {
    const number = testMap.get(key)
    return console.log("number", number)
  }


}*/
