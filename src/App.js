import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

function App() {

  const [blogContent, setBlogContent] = useState("") // Stores user-entered text
  const [summary, setSummary] = useState("") // Stores AI-generated summary
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleGenerateSummary = async () => {
    if (!blogContent.trim()) {
      alert("Enter a blog url");
    }

    setLoading(true)
    setError("")
    setSummary("")


    try {
      console.log(API_KEY)
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // You can use "gpt-3.5-turbo" for a cheaper option
          messages: [{ role: "user", content: `Summarize this: ${blogContent}` }],
          max_tokens: 100, // Limit the response length
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary.");
      }

      const data = await response.json();
      console.log(data)
      if (data.choices && data.choices.length > 0) {
        setSummary(data.choices[0].message.content);
      } else {
        setError("No summary generated. Try again.");
      }
    } catch (error) {
      setError("Error generating summary. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      <h1 className='text-4xl font-bold'>AI Powered Blog Summary</h1>
      <p className="text-lg mt-2">Paste Any Text, and let AI generate a summary!</p>

      {/** User Input */}
      <input type='text' placeholder='Enter Blog Url' value={blogContent}
        onChange={(e) => setBlogContent(e.target.value)}
        className="mt-4 w-full max-w-md px-4 py-2
         text-black rounded-lg border
        border-gray-300
         focus:ring-blue-500"
      ></input>

      {/**Submit Button */}
      <button
        onClick={handleGenerateSummary}
        className="mt-4 px-6 py-2 bg-blue-600
       hover:bg-blue-700 text-white 
       font-semibold rounded-lg transition">
        Generate Summary
      </button>
    </div>
  );
}

export default App;
