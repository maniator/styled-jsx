import generateElement from './generateElement';
import { StyledElementType, StyledJSX } from './types';

const elementTypes = Object.keys(StyledElementType);

const typeMethods = elementTypes.reduce((memo, type) => ({
  ...memo,
  [type]: generateElement(type),
}), {});

const styledJsx: StyledJSX = Object.assign(generateElement, typeMethods) as unknown as StyledJSX;

export default styledJsx;
