import type { FunctionComponent } from "react";
import { footerImageStyle, footerStyle } from "./styles.css";

export const Footer: FunctionComponent = () => {
  return (
    <>
      <footer className={footerStyle}></footer>
      <div className={footerImageStyle} />
    </>
  );
};
