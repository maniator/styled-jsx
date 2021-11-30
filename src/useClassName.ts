/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Component, useEffect, useState } from 'react';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

interface UseClassNameOptions {
  readonly className?: string;
  readonly props?: unknown;
}

export default function useClassName(
  type: string | typeof Component,
  { className: elementClassName, ...props }: UseClassNameOptions = {},
): string | undefined {
  const [className, setClassName] = useState<string>(elementClassName ?? '');
  const [toReplace, setToReplace] = useState<RegExpMatchArray | null>();
  const styledName = `styled_${String(type)}_`;
  const strProps = JSON.stringify(props);

  useEffect(() => {
    const hashDigest: string = Base64.stringify(sha256(`${
      type.toString()
    }${
      className
    }${
      strProps
    }`)).substr(0, 6);
    const styledDigest = `${styledName}${hashDigest.substr(0, 6)}`;

    if (className) {
      setToReplace(className.match(RegExp(` ${styledName}.*`, 'gi')));
      setClassName(`${className} ${styledDigest}`);
    } else {
      setClassName(styledDigest);
    }
  }, [elementClassName, strProps]);
  useEffect(() => {
    if (toReplace && toReplace.length) {
      setTimeout(() => {
        const newClassName = toReplace.reduce((str, replaceValue) => str.replace(replaceValue, ''), className);

        setClassName(newClassName);
      }, 0);
    }
  }, [toReplace]);

  return className;
}
