export const __prod__ = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 2592000,
  path: "/",
  sameSite: "Strict",
  secure: __prod__,
};
