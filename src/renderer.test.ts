import { renderMaze } from "./renderer";

describe("renderMaze integration test", () => {
  let ctx: CanvasRenderingContext2D;
  beforeEach(() => {
    // Create a mock CanvasRenderingContext2D
    ctx = {
      fillStyle: "",
      strokeStyle: "",
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
  });

  it("should draw background, clear inner area and draw a blue wall line", () => {
    renderMaze(ctx);

    // Background fill
    expect(ctx.fillStyle).toBe("black");
    expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 200, 200);

    // Clear inner maze path
    expect(ctx.clearRect).toHaveBeenCalledWith(10, 10, 180, 180);

    // Wall line drawing
    expect(ctx.strokeStyle).toBe("blue");
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(180, 20);
    expect(ctx.stroke).toHaveBeenCalled();
  });
});
