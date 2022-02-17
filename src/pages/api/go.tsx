import { TOKEN } from "@static/constants";
import cookie from "cookie";

export default function handler(req, res) {
  res.setHeader(
    "set-cookie",
    cookie.serialize(TOKEN.BATOKEN, req.query.t, {
      maxAge: 60 * 60 * 24 * 7, // 1 Week
      path: "/"
    })
  );

  res.redirect(302, req.query.u);

  res.end();
}
