import { describe, it, expect, vi } from "vitest";
import { authorize } from "./authorize.js";

describe("authorize middleware", () => {
  it("should return 403 when user role is not in allowed roles", () => {
    const req = { user: { role: "member" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const middleware = authorize("admin");
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Forbidden",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() when user role is in allowed roles", () => {
    const req = { user: { role: "admin" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const middleware = authorize("admin");
    middleware(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should allow multiple roles", () => {
    const req = { user: { role: "moderator" } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    const middleware = authorize("admin", "moderator");
    middleware(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });
});
