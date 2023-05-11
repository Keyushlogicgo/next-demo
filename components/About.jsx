import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div>
      About
      <Link href="/privacy">Click about</Link>
      <Link href="/privacy/123">Details</Link>
    </div>
  );
};

export default About;
