import { describe, it, expect, vi } from "vitest";
import jwt from "jsonwebtoken";
import authenticate from "./authenticate.js";

describe("authenticate middleware", () => {
  it("should call next() with req.user when token is valid", () => {
    const fakeUser = { id: 1, role: "member", email: "test@test.com" };
    vi.spyOn(jwt, "verify").mockReturnValue(fakeUser);

    const req = {
      headers: { authorization: "Bearer valid-token" },
    };
    const res = {};
    const next = vi.fn();

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("valid-token", process.env.JWT_SECRETA);
    expect(req.user).toEqual(fakeUser);
    expect(next).toHaveBeenCalledOnce();
  });

  it("should return 401 when no token is provided", () => {
    const req = { headers: {} };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Unauthorized",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 500 when token is invalid", () => {
    vi.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("jwt malformed");
    });

    const req = {
      headers: { authorization: "Bearer bad-token" },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    const next = vi.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
