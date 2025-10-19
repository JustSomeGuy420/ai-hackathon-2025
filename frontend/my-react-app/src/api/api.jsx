// src/api/api.jsx
const WITS_BASE = "https://wits.worldbank.org/API/V1";

// Generic fetch wrapper
async function apiFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    return null;
  }
}

// === WITS endpoints ===
// 1. List of products
export const getProducts = () =>
  apiFetch(`${WITS_BASE}/wits/datasource/trn/product/all?format=JSON`);

// 2. Global trade metrics (example: export value)
export const getDashboardMetrics = () =>
  apiFetch(
    `${WITS_BASE}/SDMX/V21/datasource/tradestats-trade/reporter/usa/year/2020/partner/wld/product/fuels/indicator/XPRT-TRD-VL?format=JSON`
  );

// 3. Tariff indicators as alerts (example: average simple tariff)
export const getAlerts = () =>
  apiFetch(
    `${WITS_BASE}/SDMX/V21/datasource/tradestats-tariff/reporter/usa/year/2020/partner/wld/product/fuels/indicator/AHS-SMPL-AVRG?format=JSON`
  );

// 4. Product count
export const getProductCount = async () => {
  const data = await getProducts();
  return data?.length || 0;
};
