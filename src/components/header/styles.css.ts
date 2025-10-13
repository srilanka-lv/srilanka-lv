import { style } from "@vanilla-extract/css";

export const headerStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingBottom: "1rem",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
});

export const headerContentStyle = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  width: "100%",
  maxWidth: "968px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: "1rem",
  fontSize: "1rem",
  backgroundColor: "#fff",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
});

export const payButtonStyle = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: ".25rem",
  width: "auto",
  padding: ".625rem .825rem",
  backgroundColor: "white",
  color: "#00b894",
  textAlign: "center",
  fontSize: "1rem",
  fontWeight: "600",
  border: "1px solid #00b894",
  borderRadius: "0.5rem",
  transition: "all 1000ms cubic-bezier(0.000, 1.215, 0.015, 1.010)",
  willChange: "transform",
  whiteSpace: "nowrap",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});
