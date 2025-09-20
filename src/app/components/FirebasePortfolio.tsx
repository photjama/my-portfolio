"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // ใช้แทน <img>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function FirebasePortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const items: PortfolioItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<PortfolioItem, "id">;
          items.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
          });
        });
        setPortfolioItems(items);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <p>Loading portfolio...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <div key={item.id} className="border rounded p-4 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="relative w-full h-64">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
