// App.tsx
import React from 'react';
import image from "./Components/Images/2.jpg"
import Link from 'next/link';

const App: React.FC = () => {

    const imageUrl = image.src;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      <div className="text-center lg:text-left lg:w-1/2 p-6 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-[#243a69] mb-4">Oooops!</h1>
        <p className="text-gray-600 mb-6">
          We can’t seem to find a page you are looking for
        </p>
        <Link href="/" className="px-4 py-2 bg-[#243a69] text-white rounded-lg shadow-md hover:bg-[#3d5a85]">
          Back to home
        </Link>
      </div>
      <div className="lg:w-1/2 p-6">
        <img
          src={imageUrl} 
          alt="404 Error Illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default App;
