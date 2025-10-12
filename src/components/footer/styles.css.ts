import { style } from "@vanilla-extract/css";

export const footerStyle = style({
  paddingTop: "1rem",
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
  fontWeight: "600",
  fontSize: ".75rem",
  lineHeight: "1.125",
  paddingBottom: "100vh",
});

export const listStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.325rem",
});

export const footerImageStyle = style({
  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundImage: "url('/srilanka-lv_footer-bg.jpg')",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  zIndex: "-1",
});
