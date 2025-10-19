// src/components/ProductCount.js
import React, { useEffect, useState } from "react";

export default function ProductCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch("http://localhost:8000/api/product_count/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCount(data.product_count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, []);

  if (loading) return '...';
  if (error) return 'Not Found';

  return count;
}