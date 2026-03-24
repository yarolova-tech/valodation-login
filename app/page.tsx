"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [connected, setConnected] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const isConnected = localStorage.getItem("connecter") === "true";
    setConnected(isConnected);
    if (!connected) {
      router.push("/login");
    }
  }, [connected, router]);

  const handleLogout = () => {
    localStorage.setItem("connecter", "true");
    setConnected(false);
  };
  return (
    <div className="flex justify-center items-center flex-col gap-3">
      <h1 className="font-bold text-center mt-10 text-primary">
        Bienvenue sur Yaro Tech
      </h1>
      <button onClick={handleLogout} className="bg-primary cursor-pointer hover:scale-105 transition-all duration-500 text-white font-bold py-2 px-4 rounded">
        Se déconnecter
      </button>
    </div>
  );
};

export default Home;
