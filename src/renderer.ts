/**
 * Simple maze renderer for integration testing.
 * Draws a black background, clears an inner rectangle, and draws a single blue wall line.
 */
export function renderMaze(ctx: CanvasRenderingContext2D): void {
  // Fill background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 200, 200);

  // Clear inner area (maze path)
  ctx.clearRect(10, 10, 180, 180);

  // Draw a simple wall line
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(20, 20);
  ctx.lineTo(180, 20);
  ctx.stroke();
}
