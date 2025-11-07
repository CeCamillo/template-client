"use client"; 

import { useQuery } from "@tanstack/react-query";

type HealthStatus = {
  status: string;
  message: string;
} | null;

const getHealth = async () => {
  const res = await fetch("http://localhost:3001/health");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};



export default function Home() {
  const query = useQuery({ queryKey: ['status'], queryFn: getHealth })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Read-it Client</h1>
      <div className="p-6 bg-gray-800 rounded-lg">
        <h2 className="text-2xl mb-4">API Status:</h2>
        {query.error && (
          <p className="text-red-400">
            <strong>Error:</strong> {query.error.message}
          </p>
        )}
        {query.data ? (
          <pre className="text-green-300">{JSON.stringify(query.data, null, 2)}</pre>
        ) : (
          !query.error && <p className="text-yellow-300">Fetching status...</p>
        )}
      </div>
    </main>
  );
}