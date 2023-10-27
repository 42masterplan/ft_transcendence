import {forwardRef} from 'react';
import {Button} from '../shadcn/button';
import Image from 'next/image';
import * as React from 'react';

interface ImageBtnProps {
  btn_type: 'HeaderBtn';
  file: string;
  width: number;
  height: number;
}

function ImageBtn(
  {btn_type, file, width, height, ...props}: ImageBtnProps,
  ref: any
) {
  return (
    <Button variant={btn_type} size={btn_type} {...props} ref={ref}>
      <Image
        src={`/icon/${file}.svg`}
        alt={file}
        width={width}
        height={height}
      />
    </Button>
  );
}
export default forwardRef(ImageBtn);
