import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="col-xl-10 offset-xl-1">
        <a href="/">Copyright © 2021. All Rights Reserved by CasperPad</a>
        <span>v1.1.6</span>
        <div>
          <Link to="/privacypolicy">Privacy Policy</Link>
          <Link to="/impress">Impress</Link>
        </div>
      </div>
    </footer>
  );
}
