import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center h-24">
      <h1 className="text-2xl font-bold text-white">Wallet Lottery</h1>
      <Image src="/icon.png" alt="icon" width={40} height={40} />
    </div>
  );
};

export default Header;
