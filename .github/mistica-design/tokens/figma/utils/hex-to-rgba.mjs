export function hexToRgba(hex, alpha = 1) {
  // Remove the leading # if it's present
  hex = hex.replace(/^#/, "");

  // Expand shorthand form (e.g., "03F") to full form (e.g., "0033FF")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  // Return the RGBA object with normalized values
  return {
    r,
    g,
    b,
    a: alpha,
  };
}

export default hexToRgba;
