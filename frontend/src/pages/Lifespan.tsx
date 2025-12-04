import React, { useState, useEffect } from "react";

interface CropData {
  cropname: string;
  totalDays: number;
  remainingDays: number;
  message: string;
  startDate: string; // store as string
}

// ---------------------------
// Crop recipes with emojis
// ---------------------------
const CROP_RECIPES: { [key: string]: { day: number; msg: string; emoji: string }[] } = {
  Wheat: [
    { day: 120, msg: "Sow seeds", emoji: "🌱" },
    { day: 60, msg: "Irrigate your crops", emoji: "💧" },
    { day: 30, msg: "Fertilize crops", emoji: "🌿" },
    { day: 5, msg: "Prepare for harvest", emoji: "🔨" },
    { day: 0, msg: "Harvested!", emoji: "🎉" },
  ],
  Rice: [
    { day: 150, msg: "Sow rice seeds", emoji: "🌾" },
    { day: 100, msg: "Water daily", emoji: "💦" },
    { day: 50, msg: "Apply fertilizer", emoji: "🌱" },
    { day: 10, msg: "Check for pests", emoji: "🐛" },
    { day: 0, msg: "Harvest ready!", emoji: "🎊" },
  ],
  Maize: [
    { day: 100, msg: "Plant maize seeds", emoji: "🌽" },
    { day: 50, msg: "Irrigate crops", emoji: "💧" },
    { day: 20, msg: "Fertilize crops", emoji: "🌿" },
    { day: 5, msg: "Prepare harvest tools", emoji: "🔨" },
    { day: 0, msg: "Harvested!", emoji: "🎉" },
  ],
  // Add others similarly...
};

// ---------------------------
// Default lifespans
// ---------------------------
const PREDEFINED_CROPS: { [key: string]: number } = {
  Wheat: 120,
  Rice: 150,
  Maize: 100,
  Tomato: 90,
  Potato: 120,
  Carrot: 70,
  Onion: 130,
  Cabbage: 85,
  Spinach: 45,
  Lettuce: 55,
  Cucumber: 60,
  Peas: 65,
  Pumpkin: 100,
  Sugarcane: 365,
  Banana: 365,
  Apple: 365,
};

// ---------------------------
// Lifespan Component
// ---------------------------
const Lifespan: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [crops, setCrops] = useState<CropData[]>([]);

  // Get logged-in userId
  const userId = localStorage.getItem("userId") || "guest";

  // Load crops from localStorage for this user
  useEffect(() => {
    const saved = localStorage.getItem(`trackedCrops_${userId}`);
    if (saved) setCrops(JSON.parse(saved));
  }, [userId]);

  // Save crops to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem(`trackedCrops_${userId}`, JSON.stringify(crops));
  }, [crops, userId]);

  // Handle crop selection
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cropName = e.target.value;
    setSelectedCrop(cropName);
    if (!cropName) return;

    // Prevent duplicates
    if (crops.find((c) => c.cropname === cropName)) return;

    const totalDays = PREDEFINED_CROPS[cropName] || 100;
    const startDate = new Date().toISOString();
    const remainingDays = totalDays;
    const initialMessage = getCropMessage(cropName, remainingDays);

    setCrops([...crops, { cropname: cropName, totalDays, remainingDays, message: initialMessage, startDate }]);
  };

  // Update remaining days and messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCrops((prevCrops) =>
        prevCrops.map((crop) => {
          const start = new Date(crop.startDate);
          const remaining = calculateRemainingDays(crop.totalDays, start);
          const msg = getCropMessage(crop.cropname, remaining);
          return { ...crop, remainingDays: remaining, message: msg };
        })
      );
    }, 60 * 1000); // update every minute

    return () => clearInterval(interval);
  }, []);

  const calculateRemainingDays = (totalDays: number, startDate: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = totalDays - diff;
    return remaining > 0 ? remaining : 0;
  };

  const getCropMessage = (cropname: string, remainingDays: number): string => {
    const recipe = CROP_RECIPES[cropname];
    if (!recipe) return "🌱 Sow seeds";

    for (let i = 0; i < recipe.length; i++) {
      if (remainingDays >= recipe[i].day) return `${recipe[i].emoji} ${recipe[i].msg}`;
    }
    return "🎉 Harvested!";
  };

  const removeCrop = (name: string) => {
    setCrops(crops.filter((c) => c.cropname !== name));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌱 Crop Lifespan Tracker</h1>

      <select style={styles.dropdown} value={selectedCrop} onChange={handleSelect}>
        <option value="">Select a crop</option>
        {Object.keys(PREDEFINED_CROPS).map((crop, i) => (
          <option key={i} value={crop}>
            {crop}
          </option>
        ))}
      </select>

      <div style={styles.cardsWrapper}>
        {crops.map((crop, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cropName}>{crop.cropname}</span>
              <span style={styles.days}>{crop.remainingDays} days</span>
            </div>
            <div style={styles.messageBubble}>{crop.message}</div>
            <button style={styles.removeButton} onClick={() => removeCrop(crop.cropname)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------
// Styles
// ---------------------------
const styles: any = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#e6f5e6",
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "#2f6e3f",
  },
  dropdown: {
    padding: "12px 25px",
    fontSize: "16px",
    borderRadius: "25px",
    border: "none",
    outline: "none",
    backgroundColor: "#dff0d8",
    cursor: "pointer",
    marginBottom: "40px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: "20px",
    borderRadius: "25px",
    backgroundColor: "#f4f8f4",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    border: "1px solid #d4e6d4",
    position: "relative",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontWeight: "bold",
    fontSize: "20px",
  },
  cropName: { color: "#2f6e3f" },
  days: {
    backgroundColor: "#dff0d8",
    padding: "5px 12px",
    borderRadius: "12px",
    fontWeight: "bold",
  },
  messageBubble: {
    backgroundColor: "#d0f0c0",
    borderRadius: "20px",
    padding: "12px",
    fontSize: "16px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  removeButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Lifespan;
