"use client"; 

import { useEffect, useState } from "react";

type HealthStatus = {
  status: string;
  message: string;
} | null;

export default function Home() {
  const [apiStatus, setApiStatus] = useState<HealthStatus>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch data
    const getHealth = async () => {
      try {
        const res = await fetch("http://localhost:3001/health");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setApiStatus(data);
      } catch (e: any) {
        // This is where you'll catch the CORS error
        console.error("Fetch error:", e);
        setError(e.message);
      }
    };

    getHealth();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Read-it Client</h1>
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl mb-4">API Status:</h2>
        {error && (
          <p className="text-red-400">
            <strong>Error:</strong> {error}
          </p>
        )}
        {apiStatus ? (
          <pre className="text-green-300">{JSON.stringify(apiStatus, null, 2)}</pre>
        ) : (
          !error && <p className="text-yellow-300">Fetching status...</p>
        )}
      </div>
    </main>
  );
}