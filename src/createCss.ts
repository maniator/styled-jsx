import { Fn } from './types';

const createCss = (
  className: string,
  props: unknown,
  strings: TemplateStringsArray,
  ...fns: Fn[]
): string => {
  let [css] = strings;

  if (fns.length) {
    const lastString = strings[strings.length - 1];

    css = fns.reduce((str: string, fn: Fn, index: number) => {
      const value = `${str}${strings[index]}`;

      if (typeof fn === 'function') {
        return value + fn(props);
      }

      return value + (fn as string);
    }, '') + lastString;
  }

  return `.${className.split(' ').join('.')} { ${css} }`;
};

export default createCss;
