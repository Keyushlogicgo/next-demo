import About from "@components/About";
import Contact from "@components/Contact";
import Service from "@components/Service";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <section className="w-full h-full bg-gradient-to-r from-indigo-500 ">
      <Link href="/api/user/add">API</Link>
    </section>
  );
};

export default Home;
