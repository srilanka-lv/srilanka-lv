import { style } from "@vanilla-extract/css";

export const headerStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingBottom: "1rem",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
});

export const headerContentStyle = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  maxWidth: "968px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "2rem",
  fontSize: "1.5rem",
  backgroundColor: "#fff",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
});

export const payButtonStyle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
  width: "auto",
  padding: ".5rem",
  backgroundColor: "white",
  color: "#00b894",
  textAlign: "center",
  fontSize: "0.825rem",
  fontWeight: "600",
  border: "1px solid #00b894",
  borderRadius: "0.325rem",
  transition: "all 1000ms cubic-bezier(0.000, 1.215, 0.015, 1.010)",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});
