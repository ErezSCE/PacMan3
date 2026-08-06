import { renderMaze } from "./renderer";

describe("renderMaze integration test", () => {
  let ctx: CanvasRenderingContext2D;
  let callOrder: string[];
  beforeEach(() => {
    callOrder = [];
    // Create a mock CanvasRenderingContext2D with order tracking
    ctx = {
      // fillStyle setter tracks assignment
      set fillStyle(value: string) {
        callOrder.push(`fillStyle:${value}`);
      },
      get fillStyle() {
        return "";
      },
      // strokeStyle setter tracks assignment
      set strokeStyle(value: string) {
        callOrder.push(`strokeStyle:${value}`);
      },
      get strokeStyle() {
        return "";
      },
      fillRect: jest.fn(() => callOrder.push("fillRect")),
      clearRect: jest.fn(() => callOrder.push("clearRect")),
      beginPath: jest.fn(() => callOrder.push("beginPath")),
      moveTo: jest.fn(() => callOrder.push("moveTo")),
      lineTo: jest.fn(() => callOrder.push("lineTo")),
      stroke: jest.fn(() => callOrder.push("stroke")),
    } as unknown as CanvasRenderingContext2D;
  });

  it("should draw background, clear inner area and draw a blue wall line in correct order", () => {
    renderMaze(ctx);

    // Verify the order of operations
    expect(callOrder).toEqual([
      "fillStyle:black",
      "fillRect",
      "clearRect",
      "strokeStyle:blue",
      "beginPath",
      "moveTo",
      "lineTo",
      "stroke",
    ]);
  });
});
