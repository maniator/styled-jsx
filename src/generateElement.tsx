import React, {
  useEffect, ReactElement, ReactNode, Component,
} from 'react';
import createCss from './createCss';
import { Fn, StyledProps, StyleGenerator } from './types';
import useClassName from './useClassName';

export default function generateElement(
  ElementType: typeof Component | string,
): StyleGenerator {
  return function generator(strings: TemplateStringsArray, ...fns: Fn[]) {
    return function Element({ children, className: elementClassName = '', ...props }: StyledProps):
     ReactElement<{ children: ReactNode, className?: string }> | null {
      const className = useClassName(ElementType, { className: elementClassName, ...props });

      useEffect(() => {
        if (className && className !== elementClassName) {
          const style = document.createElement('style');
          const cssJson = createCss(className, props, strings, ...fns);
          style.textContent = cssJson;
          style.setAttribute('data-styles', className);

          document.head.appendChild(style);
        }

        return () => {
          if (className && typeof className === 'string') {
            const style = document.head.querySelector(`[data-styles="${className}"]`);
            if (style) {
              style.remove();
            }
          }
        };
      }, [className, props]);

      if (!className) {
        return null;
      }

      const filteredProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.startsWith('$')));

      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ElementType {...filteredProps} className={className}>{children}</ElementType>
      );
    };
  };
}
