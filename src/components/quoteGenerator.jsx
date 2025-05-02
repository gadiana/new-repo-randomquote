import React, { useState, useEffect } from "react";  // Import React hooks for state and effects
import { motion } from "framer-motion"
import { FaQuoteLeft } from "react-icons/fa";  // Import the quote icon
import axios from "axios";  // Import axios for making API requests

function QuoteGenerator() {
  // State to hold the current quote and author
  const [quote, setQuote] = useState("");  
  const [author, setAuthor] = useState("");  
  // State to manage the loading state of the quote request
  const [loading, setLoading] = useState(false);  

  // Function to fetch a random quote from the API
  const quoteApi = async () => {
    setLoading(true);  // Set loading to true when fetching the quote
    try {
      // Make an API call to fetch a random quote from the new API
      const response = await axios.get("https://dummyjson.com/quotes/random");
      const quoteData = response.data;  // Extract the quote data from the response
      setQuote(quoteData.quote);  // Update state with the quote
      setAuthor(quoteData.author);  // Update state with the author
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching quote:", error);
      setQuote("Could not fetch quote.");  // Set fallback text if fetching fails
      setAuthor("System");  // Set fallback author
    }
    setLoading(false);  // Set loading to false after the request completes
  };
  

  // useEffect hook to fetch a quote on initial component mount
  useEffect(() => {
    quoteApi();  // Call quoteApi to load a quote on component mount
  }, []);  // Empty dependency array means this effect runs only once after the first render


  return (
    <div className="w-screen h-screen bg-blue-700 flex items-center justify-center overflow-hidden">
      


      <motion.div
            style={{
                cursor: "grab"
            }}
            drag
            dragConstraints={{ top: -125, right: 125, bottom: 125, left: -125 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            dragElastic={1}
            whileTap={{ cursor: "grabbing" }}
            className="w-[600px] bg-white py-5 px-10 border border-white rounded-3xl"
      >





        {/* Header with the quote icon */}
        <div className="text-blue-700 mb-8 mt-8 text-center">
          <p className="text-xl uppercase flex justify-center items-center gap-2">
            <FaQuoteLeft size={24} />
            Generated Quote
          </p>
        </div>
        {/* Display the quote and author */}
        <div className="text-blue-700 mb-4">
          {/* Show loading text if the quote is not available yet */}
          {!quote ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <>
              <p className="text-3xl text-center font-light leading-relaxed">
                {quote}  {/* Display the quote */}
              </p>
              <p className="text-lg font-thin text-end mt-5">- {author}</p>  {/* Display the author */}
            </>
          )}
        </div>
        {/* Button to fetch a new quote */}
        <div className="flex justify-end">
          <button
            onClick={quoteApi}  // When the button is clicked, fetch a new quote
            disabled={loading}  // Disable the button while loading
            className={`p-2 rounded-xl text-sm transition ${  // Apply dynamic styles based on loading state
              loading
                ? "bg-blue-300 cursor-not-allowed"  // Styles when loading
                : "bg-blue-500 hover:bg-blue-600 text-white"  // Styles when not loading
            }`}
          >
            {loading ? "Loading..." : "New Quote"}  {/* Button text changes based on loading state */}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default QuoteGenerator;  
