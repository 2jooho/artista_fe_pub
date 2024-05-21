const FIGMA_WINDOW_WIDTH = 2490;
const FIGMA_WINDOW_HEIGHT = 1156;

export function widthPercentage(width: number): number {
  const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
  return percentage;
}

export function widthPercentageCp(width: number, CpWidth: number): number {
  const percentage = (width / CpWidth) * 100;
  return percentage;
}

export function heightPercentage(height: number): number {
  const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
  return percentage;
}

export function heightPercentageCp(height: number, cpHeight: number): number {
  const percentage = (height / cpHeight) * 100;
  return percentage;
}

export function fontPercentage(size: number): number {
  const percentage = size * 0.135;
  return percentage;
}
export function widthPercentage2(width: number): number {
  const percentage = (width / FIGMA_WINDOW_WIDTH) * 80;
  return percentage;
}
