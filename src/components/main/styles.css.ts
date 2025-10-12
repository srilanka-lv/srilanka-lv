import { keyframes, style } from "@vanilla-extract/css";

export const imageStyles = style({
  width: "100%",
  height: "auto",
});

export const mainStyle = style({
  backgroundColor: "#fff",
});

export const mainContentStyle = style({
  width: "100%",
  maxWidth: "968px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
});

export const contentContainerStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr minmax(0, 400px)",
  gap: ".5rem",

  "@media": {
    "screen and (min-width: 700px)": {
      gridTemplateColumns: "1fr minmax(0, 400px)",
      gridTemplateRows: "1fr",
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
  },
});

export const h1Style = style({
  fontSize: "1.5rem",
  fontWeight: "700",
  lineHeight: "1.2",

  "@media": {
    "screen and (min-width: 700px)": {
      top: "2rem",
    },
  },
});

export const h2Style = style({
  position: "absolute",
  top: "-1rem",
  left: "0",
  width: "100%",
  fontSize: "1.5rem",
  fontWeight: "700",
  lineHeight: "1.2",
  margin: "0 auto",
  textAlign: "center",

  "@media": {
    "screen and (min-width: 700px)": {
      top: "2rem",
    },
  },
});

export const h3Style = style({
  fontSize: "1.5rem",
  fontWeight: "700",
  lineHeight: "1.2",
  marginTop: "3rem",
  zIndex: "3",
  textAlign: "center",

  "@media": {
    "screen and (min-width: 700px)": {
      top: "2rem",
    },
  },
});

export const contentStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontWeight: "400",
  fontSize: "1rem",
  lineHeight: "1.5",

  "@media": {
    "screen and (min-width: 600px)": {
      fontSize: "1rem",
      lineHeight: "1.525",
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export const strongStyle = style({
  fontWeight: "800",
});

export const imageStyle = style({
  position: "relative",
  justifySelf: "center",
  transform: "translateX(-50px) rotate(-2deg)",
  transition: "all 625ms cubic-bezier(0.000, 1.215, 0.015, 1.010)",

  "@media": {
    "screen and (min-width: 600px)": {
      transform: "translateY(.5rem) rotate(4deg)",
    },
  },
});

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

export const discountTagContainerStyle = style({
  position: "absolute",
  top: "-2rem",
  left: "16rem",
});

export const discountedTagTextStyle = style({
  position: "absolute",
  top: "2.5rem",
  left: "1.5rem",
  fontSize: "1rem",
  fontWeight: "600",
  zIndex: "2",
  color: "white",
  textDecoration: "line-through",
});

export const discountTagTextStyle = style({
  position: "absolute",
  top: "3.4rem",
  left: ".625rem",
  fontSize: "2.2rem",
  fontWeight: "600",
  zIndex: "2",
  color: "white",
});

export const discountTagStyle = style({
  transform: "translate(-50%, -50%)",
  animation: `${spin} 50s linear infinite`,
});

export const videoContainerStyle = style({
  position: "relative",
  width: "100%",
  minHeight: "500px",
});

export const previewContainerStyle = style({
  position: "relative",
  width: "100%",
  zIndex: "1",
});

export const payButtonLargeStyle = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  margin: "-8rem auto 0",
  gap: ".5rem",
  width: "auto",
  padding: "1rem 1.5rem",
  backgroundColor: "white",
  color: "#e67e22",
  textAlign: "center",
  fontSize: "1.75rem",
  fontWeight: "600",
  border: "1px solid #e67e22",
  borderRadius: "0.75rem",
  transition: "all 1000ms cubic-bezier(0.000, 1.215, 0.015, 1.010)",
  willChange: "transform",
  zIndex: "2",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  "@media": {
    "screen and (min-width: 600px)": {
      gridTemplateColumns: "1fr 1fr",
      marginTop: "-14rem",
    },
  },
});

export const payButtonLargeTwoStyle = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  margin: "3rem auto",
  gap: ".5rem",
  width: "auto",
  padding: "1rem 1.5rem",
  backgroundColor: "white",
  color: "#e67e22",
  textAlign: "center",
  fontSize: "1.75rem",
  fontWeight: "600",
  border: "1px solid #e67e22",
  borderRadius: "0.75rem",
  transition: "all 1000ms cubic-bezier(0.000, 1.215, 0.015, 1.010)",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});

export const reviewsStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(1fr)",
  gap: "1rem",
  zIndex: "2",

  "@media": {
    "screen and (min-width: 600px)": {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const reviewStarsStyle = style({
  color: "#f1c40f",
});

export const reviewStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  maxWidth: "600px",
  margin: "0 auto",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "0.75rem",
  padding: "1rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  fontWeight: "600",
  backgroundColor: "white",
});

export const reviewAuthorStyle = style({
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  fontSize: "0.825rem",
  fontWeight: "400",
});
