import * as React from 'react';
import { MotionPath } from './motionPath';

function LogoSM(props) {
  return (
    <svg
      width={199}
      height={205}
      viewBox="0 0 199 205"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <MotionPath
        initial={{ x: -62 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100.961 4.843h-31.1v131.509c0 35.661 28.908 64.57 64.569 64.57S199 172.013 199 136.352V4.843h-39.216c0 16.244-13.168 29.412-29.411 29.412-16.244 0-29.412-13.168-29.412-29.412z"
        fill="#FF2D63"
        fillOpacity={0.8}
      />

      <g filter="url(#filter0_d_13_13)">
        <path
          d="M2.922 4.843h129.14v131.509c0 35.661-28.909 64.57-64.57 64.57-35.661 0-64.57-28.909-64.57-64.57V4.843z"
          fill="#FF2D63"
        />
      </g>

      <defs>
        <filter
          id="filter0_d_13_13"
          x={0.92157}
          y={0.84314}
          width={137.14}
          height={204.078}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={2} />
          <feGaussianBlur stdDeviation={2} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_13_13" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_13_13"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default LogoSM;
