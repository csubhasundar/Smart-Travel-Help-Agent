import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

export default function TravelNewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsdata.io/api/1/latest?apikey=pub_a9b4ef8457154e18845b075439f7ecf4&q=Travel%2C%20Famous%20places%2C%20Famous%20foods%2C%20Tourism`
        );
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          setNews(data.results);
        } else {
          setError(data.message || "Unexpected API response");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    const interval = setInterval(fetchNews, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400 animate-pulse">
        Loading travel news...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <h3>⚠️ Failed to load travel news. Try again! </h3>
      </div>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          
          <Typography variant="h5" fontWeight="bold">
            🌍 Daily Travel Inspirations
          </Typography>
        </Box>
	
	    <CardContent>
            <div className="bg-gradient-to-b from-yellow-50 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto p-4 md:p-8">
                    {/* your news cards */}
                    {news.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No travel news available at the moment.
                    </p>
                    ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                        {item.image_url && (
                        <div className="overflow-hidden w-full h-64">
                            <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                                {item.pubDate
                                    ? new Date(item.pubDate).toLocaleString()
                                    : "No date"}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 leading-relaxed">
                                {expanded[index]
                                ? item.description || "No description available."
                                : (item.description || "").slice(0, 120) + "..."}
                            </p>
                            {item.description && item.description.length > 120 && (
                            <button
                                onClick={() => toggleExpand(index)}
                                className="mt-3 text-orange-600 dark:text-yellow-400 hover:underline text-sm font-medium"
                            >
                            {expanded[index] ? "Show Less" : "Show More"}
                            </button>
                        )}
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 hover:from-orange-600 hover:via-yellow-600 hover:to-pink-600 text-white text-center py-2 px-4 rounded-xl shadow-md transition duration-300"
                        >
                            Read Full Article
                        </a>
                    </div>
                </div>
            ))}
            </div>
        )}
        </div>

        </div>
        
	    </CardContent>
        
      </Card>
    </Box>
  );
}
