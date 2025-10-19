import React, { useEffect, useState } from "react";
import { getProductCount } from "../api/api";

export default function ProductCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function loadCount() {
      const value = await getProductCount();
      setCount(value || 0);
    }
    loadCount();
  }, []);
  return <>{count}</>;
}
