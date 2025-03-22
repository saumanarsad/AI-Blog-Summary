import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [blogUrl, setBlogUrl] = useState("")
  const handleGenerateSummary = () => {
    console.log(blogUrl)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      <h1 className='text-4xl font-bold'>AI Powered Blog Summary</h1>
      <p className="text-lg mt-2">Paste a blog link, and let AI generate a summary!</p>

      {/** User Input */}
      <input type='text' placeholder='Enter Blog Url' value={blogUrl}
        onChange={(e) => setBlogUrl(e.target.value)}
        className="mt-4 w-full max-w-md px-4 py-2
         text-black rounded-lg border
        border-gray-300
         focus:ring-blue-500"
      ></input>

      {/**Submit Button */}
      <button
        className="mt-4 px-6 py-2 bg-blue-600
       hover:bg-blue-700 text-white 
       font-semibold rounded-lg transition">
        Generate Summary
      </button>
    </div>
  );
}

export default App;
