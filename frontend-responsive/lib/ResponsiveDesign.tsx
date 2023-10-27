export const widthBreakPoints = {
  mobileMin: "360px",
  mobileMax: "640px",
  // tailwind has a breakpoint for 640px: sm
  desktopMin: "640px",
  desktopMax: "1024px",
};

export const ResponsiveDesign = {
  iconSize: " w-6 h-6 sm:w-12 sm:h-12 ",
  minWidth: ` min-w-[${widthBreakPoints.mobileMin}] sm:min-w-[${widthBreakPoints.desktopMin}] `,
  maxWidth: ` max-w-[${widthBreakPoints.mobileMax}] sm:max-w-[${widthBreakPoints.desktopMax}] `,
};
