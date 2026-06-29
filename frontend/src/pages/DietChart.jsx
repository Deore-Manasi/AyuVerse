// import { useState, useRef } from "react";
// import { useLanguage } from "../context/LanguageContext";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useState, useRef, useEffect } from "react";
// import { t } from "../utils/translate";
// import "./DietChart.css";

// const mealIcons = {
//   breakfast: "🌅",
//   midMorning: "🍵",
//   lunch: "☀️",
//   evening: "🌿",
//   dinner: "🌙",
// };

// const doshaInfo = {
//   Vata: {
//     emoji: "💨",
//     color: "#7c9e87",
//     desc: "Air & Space — warm, grounding foods",
//   },
//   Pitta: {
//     emoji: "🔥",
//     color: "#c97b3a",
//     desc: "Fire — cooling, soothing foods",
//   },
//   Kapha: {
//     emoji: "🌊",
//     color: "#4a7fa5",
//     desc: "Earth & Water — light, energizing foods",
//   },
// };

// const DietChart = () => {
//   const [formData, setFormData] = useState({
//     dosha: "",
//     age: "",
//     weight: "",
//     healthGoal: "",
//     allergies: "",
//     season: "Summer",
//   });

//   const [dietChart, setDietChart] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [savedCharts, setSavedCharts] = useState([]);
//   const [loadingSaved, setLoadingSaved] = useState(true);
//   const [activeChartIndex, setActiveChartIndex] = useState(null);

//   const { language } = useLanguage();
//   const txt = t[language];

//   const resultRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDoshaSelect = (dosha) => {
//     setFormData({ ...formData, dosha });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.dosha) {
//       setError(txt.doshaRequired);
//       return;
//     }
//     setError("");
//     setLoading(true);
//     setSubmitted(true);
//     setDietChart(null);

//     try {
//       const response = await fetch("http://localhost:8080/api/diet/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setDietChart(data.dietChart);
//       } else {
//         setError(data.message || txt.generateFailed);
//       }
//     } catch (err) {
//       setError(txt.serverError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       dosha: "",
//       age: "",
//       weight: "",
//       healthGoal: "",
//       allergies: "",
//       season: "Summer",
//     });
//     setDietChart(null);
//     setSubmitted(false);
//     setError("");
//   };

//   const handleSave = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/diet/save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ formData, dietChart }),
//       });
//       const data = await res.json();
//       alert(data.message);
//       fetchSavedCharts(); // ✅ refresh sidebar
//     } catch {
//       alert("Failed to save. Please login first.");
//     }
//   };

//   const handleDeleteSaved = async (e, index) => {
//     e.stopPropagation();
//     try {
//       await fetch(`http://localhost:8080/api/diet/saved/${index}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//       setSavedCharts((prev) => prev.filter((_, i) => i !== index));
//       if (activeChartIndex === index) setActiveChartIndex(null);
//     } catch {
//       alert("Failed to delete.");
//     }
//   };

//   const fetchSavedCharts = async () => {
//     try {
//       const res = await fetch("http://localhost:8080/api/diet/saved", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success) setSavedCharts(data.charts);
//     } catch {
//       console.error("Failed to load saved charts");
//     } finally {
//       setLoadingSaved(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedCharts();
//   }, []);

//   const handleDownloadPDF = async () => {
//     const element = resultRef.current;
//     const canvas = await html2canvas(element, { scale: 2 });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${formData.dosha}-diet-chart.pdf`);
//   };

//   const handleLoadSaved = (chart, index) => {
//     setActiveChartIndex(index);
//     setDietChart(chart.dietChart);
//     setFormData({
//       dosha: chart.dosha,
//       age: chart.age,
//       weight: chart.weight,
//       healthGoal: chart.healthGoal,
//       allergies: chart.allergies,
//       season: chart.season,
//     });
//     setSubmitted(true);
//   };

//   return (
//     <div className="diet-chart-page">
//       <div className="diet-sidebar">
//         <div className="diet-sidebar-header">
//           <h2>🌿 Saved Charts</h2>
//           <hr />
//         </div>
//         <div className="diet-sidebar-list">
//           {loadingSaved ? (
//             <p className="sidebar-empty">Loading...</p>
//           ) : savedCharts.length === 0 ? (
//             <p className="sidebar-empty">No saved charts yet.</p>
//           ) : (
//             savedCharts.map((chart, i) => (
//               <div
//                 key={i}
//                 className={`diet-sidebar-item ${activeChartIndex === i ? "sidebar-active" : ""}`}
//                 onClick={() => handleLoadSaved(chart, i)}
//               >
//                 <div className="sidebar-item-info">
//                   <span className="sidebar-dosha">
//                     {doshaInfo[chart.dosha]?.emoji} {chart.dosha}
//                   </span>
//                   <span className="sidebar-meta">
//                     {chart.healthGoal || "General"} · {chart.season}
//                   </span>
//                   <span className="sidebar-date">
//                     {new Date(chart.savedAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <button
//                   className="sidebar-delete-btn"
//                   onClick={(e) => handleDeleteSaved(e, i)}
//                   title="Delete"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//         {/* Hero Section */}
//         <div className="diet-hero">
//           <div className="diet-hero-content">
//             <span className="diet-hero-badge">{txt.dietBadge}</span>
//             <h1 className="diet-hero-title">{txt.dietTitle}</h1>
//             <p className="diet-hero-subtitle">{txt.dietSubtitle}</p>
//           </div>
//           <div className="diet-hero-leaves">
//             <span className="leaf leaf-1">🍃</span>
//             <span className="leaf leaf-2">🌱</span>
//             <span className="leaf leaf-3">🍃</span>
//           </div>
//         </div>

//         <div className="diet-main">
//           {/* Form Section */}
//           <div
//             className={`diet-form-wrapper ${submitted && dietChart ? "form-shrink" : ""}`}
//           >
//             <form className="diet-form" onSubmit={handleSubmit}>
//               <h2 className="form-section-title">{txt.yourProfile}</h2>

//               {/* Dosha Selector */}
//               <div className="form-group">
//                 <label className="form-label">
//                   {txt.selectDosha} <span className="required">*</span>
//                 </label>
//                 <div className="dosha-selector">
//                   {Object.entries(doshaInfo).map(([key, val]) => (
//                     <button
//                       type="button"
//                       key={key}
//                       className={`dosha-card ${formData.dosha === key ? "dosha-active" : ""}`}
//                       style={{ "--dosha-color": val.color }}
//                       onClick={() => handleDoshaSelect(key)}
//                     >
//                       <span className="dosha-emoji">{val.emoji}</span>
//                       <span className="dosha-name">{key}</span>
//                       <span className="dosha-desc">{val.desc}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Age & Weight */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">{txt.age}</label>
//                   <input
//                     type="number"
//                     name="age"
//                     className="form-input"
//                     placeholder="e.g. 28"
//                     value={formData.age}
//                     onChange={handleChange}
//                     min="1"
//                     max="100"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">{txt.weight}</label>
//                   <input
//                     type="number"
//                     name="weight"
//                     className="form-input"
//                     placeholder="e.g. 65"
//                     value={formData.weight}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Health Goal */}
//               <div className="form-group">
//                 <label className="form-label">{txt.healthGoal}</label>
//                 <select
//                   name="healthGoal"
//                   className="form-input"
//                   value={formData.healthGoal}
//                   onChange={handleChange}
//                 >
//                   <option value="">{txt.selectGoal}</option>
//                   <option value="Weight Loss">{txt.weightLoss}</option>
//                   <option value="Weight Gain">{txt.weightGain}</option>
//                   <option value="Improve Digestion">{txt.digestion}</option>
//                   <option value="Boost Immunity">{txt.immunity}</option>
//                   <option value="Stress Relief">{txt.stress}</option>
//                   <option value="Better Sleep">{txt.sleep}</option>
//                   <option value="General Wellness">{txt.wellness}</option>
//                 </select>
//               </div>

//               {/* Season */}
//               <div className="form-group">
//                 <label className="form-label">{txt.season}</label>
//                 <div className="season-pills">
//                   {["Spring", "Summer", "Monsoon", "Autumn", "Winter"].map(
//                     (s) => (
//                       <button
//                         type="button"
//                         key={s}
//                         className={`season-pill ${formData.season === s ? "season-active" : ""}`}
//                         onClick={() => setFormData({ ...formData, season: s })}
//                       >
//                         {s}
//                       </button>
//                     ),
//                   )}
//                 </div>
//               </div>

//               {/* Allergies */}
//               <div className="form-group">
//                 <label className="form-label">{txt.allergies}</label>
//                 <input
//                   type="text"
//                   name="allergies"
//                   className="form-input"
//                   placeholder={txt.allergiesPlaceholder}
//                   value={formData.allergies}
//                   onChange={handleChange}
//                 />
//               </div>

//               {error && <p className="form-error">⚠️ {error}</p>}

//               <button type="submit" className="generate-btn" disabled={loading}>
//                 {loading ? (
//                   <span className="btn-loading">
//                     <span className="spinner"></span> {txt.generating}
//                   </span>
//                 ) : (
//                   txt.generateBtn
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Results Section */}
//           {loading && (
//             <div className="loading-section">
//               <div className="loading-animation">
//                 <div className="loading-leaf">🌿</div>
//                 <p>{txt.crafting}</p>
//                 <div className="loading-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {dietChart && !loading && (
//             <div className="result-section" ref={resultRef}>
//               <div className="result-header">
//                 <div className="result-title-row">
//                   <h2 className="result-title">
//                     {doshaInfo[formData.dosha]?.emoji} Your {formData.dosha}{" "}
//                     Diet Plan
//                   </h2>
//                   <button className="reset-btn" onClick={handleReset}>
//                     {txt.newChart}
//                   </button>
//                   <button className="save-btn" onClick={handleSave}>
//                     💾 Save
//                   </button>
//                   <button className="download-btn" onClick={handleDownloadPDF}>
//                     ⬇️ Download Chart PDF
//                   </button>
//                 </div>
//                 {formData.healthGoal && (
//                   <span className="result-goal-tag">
//                     Goal: {formData.healthGoal}
//                   </span>
//                 )}
//                 {formData.season && (
//                   <span className="result-goal-tag season-tag">
//                     Season: {formData.season}
//                   </span>
//                 )}
//               </div>

//               {/* Overview */}
//               {dietChart.overview && (
//                 <div className="overview-card">
//                   <p>{dietChart.overview}</p>
//                 </div>
//               )}

//               {/* Meal Cards */}
//               <div className="meals-grid">
//                 {dietChart.meals &&
//                   Object.entries(dietChart.meals).map(([mealKey, meal]) => (
//                     <div className="meal-card" key={mealKey}>
//                       <div className="meal-card-header">
//                         <span className="meal-icon">
//                           {mealIcons[mealKey] || "🍽️"}
//                         </span>
//                         <h3 className="meal-title">{meal.name || mealKey}</h3>
//                         {meal.time && (
//                           <span className="meal-time">{meal.time}</span>
//                         )}
//                       </div>
//                       <ul className="meal-items">
//                         {meal.items?.map((item, i) => (
//                           <li key={i} className="meal-item">
//                             <span className="meal-dot">•</span> {item}
//                           </li>
//                         ))}
//                       </ul>
//                       {meal.tip && (
//                         <div className="meal-tip">
//                           <span>💡</span> {meal.tip}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//               </div>

//               {/* Foods to Avoid */}
//               {dietChart.avoid && dietChart.avoid.length > 0 && (
//                 <div className="avoid-section">
//                   <h3 className="section-subtitle">{txt.foodsToAvoid}</h3>
//                   <div className="avoid-tags">
//                     {dietChart.avoid.map((item, i) => (
//                       <span key={i} className="avoid-tag">
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Herbs & Spices */}
//               {dietChart.herbs && dietChart.herbs.length > 0 && (
//                 <div className="herbs-section">
//                   <h3 className="section-subtitle">{txt.herbsSpices}</h3>
//                   <div className="herbs-tags">
//                     {dietChart.herbs.map((herb, i) => (
//                       <span key={i} className="herb-tag">
//                         {herb}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Daily Tips */}
//               {dietChart.dailyTips && dietChart.dailyTips.length > 0 && (
//                 <div className="tips-section">
//                   <h3 className="section-subtitle">{txt.dailyTips}</h3>
//                   <div className="tips-list">
//                     {dietChart.dailyTips.map((tip, i) => (
//                       <div key={i} className="tip-card">
//                         <span className="tip-number">{i + 1}</span>
//                         <p>{tip}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DietChart;

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { t } from "../utils/translate";
import "./DietChart.css";

const mealIcons = {
  breakfast: "🌅",
  midMorning: "🍵",
  lunch: "☀️",
  evening: "🌿",
  dinner: "🌙",
};

const doshaInfo = {
  Vata: {
    emoji: "💨",
    color: "#7c9e87",
    desc: "Air & Space — warm, grounding foods",
  },
  Pitta: {
    emoji: "🔥",
    color: "#c97b3a",
    desc: "Fire — cooling, soothing foods",
  },
  Kapha: {
    emoji: "🌊",
    color: "#4a7fa5",
    desc: "Earth & Water — light, energizing foods",
  },
};

const DietChart = () => {
  const [formData, setFormData] = useState({
    dosha: "",
    age: "",
    weight: "",
    healthGoal: "",
    allergies: "",
    season: "Summer",
  });

  const [dietChart, setDietChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [savedCharts, setSavedCharts] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [activeChartIndex, setActiveChartIndex] = useState(null);

  const { language } = useLanguage();
  const txt = t[language];

  const resultRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoshaSelect = (dosha) => {
    setFormData({ ...formData, dosha });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dosha) {
      setError(txt.doshaRequired);
      return;
    }
    setError("");
    setLoading(true);
    setSubmitted(true);
    setDietChart(null);

    try {
      const response = await fetch("http://localhost:8080/api/diet/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setDietChart(data.dietChart);
      } else {
        setError(data.message || txt.generateFailed);
      }
    } catch (err) {
      setError(txt.serverError);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      dosha: "",
      age: "",
      weight: "",
      healthGoal: "",
      allergies: "",
      season: "Summer",
    });
    setDietChart(null);
    setSubmitted(false);
    setError("");
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/diet/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ formData, dietChart }),
      });
      const data = await res.json();
      alert(data.message);
      fetchSavedCharts(); // ✅ refresh sidebar
    } catch {
      alert("Failed to save. Please login first.");
    }
  };

  const handleDeleteSaved = async (e, index) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/api/diet/saved/${index}`, {
        method: "DELETE",
        credentials: "include",
      });
      setSavedCharts((prev) => prev.filter((_, i) => i !== index));
      if (activeChartIndex === index) setActiveChartIndex(null);
    } catch {
      alert("Failed to delete.");
    }
  };

  const fetchSavedCharts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/diet/saved", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setSavedCharts(data.charts);
    } catch {
      console.error("Failed to load saved charts");
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    fetchSavedCharts();
  }, []);

  const handleDownloadPDF = async () => {
    const element = resultRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formData.dosha}-diet-chart.pdf`);
  };

  const handleLoadSaved = (chart, index) => {
    setActiveChartIndex(index);
    setDietChart(chart.dietChart);
    setFormData({
      dosha: chart.dosha,
      age: chart.age,
      weight: chart.weight,
      healthGoal: chart.healthGoal,
      allergies: chart.allergies,
      season: chart.season,
    });
    setSubmitted(true);
  };

  return (
    <div className="diet-chart-page">
      <div className="diet-sidebar">
        <div className="diet-sidebar-header">
          <h2>🌿 Saved Charts</h2>
          <hr />
        </div>
        <div className="diet-sidebar-list">
          {loadingSaved ? (
            <p className="sidebar-empty">Loading...</p>
          ) : savedCharts.length === 0 ? (
            <p className="sidebar-empty">No saved charts yet.</p>
          ) : (
            savedCharts.map((chart, i) => (
              <div
                key={i}
                className={`diet-sidebar-item ${activeChartIndex === i ? "sidebar-active" : ""}`}
                onClick={() => handleLoadSaved(chart, i)}
              >
                <div className="sidebar-item-info">
                  <span className="sidebar-dosha">
                    {doshaInfo[chart.dosha]?.emoji} {chart.dosha}
                  </span>
                  <span className="sidebar-meta">
                    {chart.healthGoal || "General"} · {chart.season}
                  </span>
                  <span className="sidebar-date">
                    {new Date(chart.savedAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  className="sidebar-delete-btn"
                  onClick={(e) => handleDeleteSaved(e, i)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div
        className="diet-content"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Hero Section */}
        <div
          className="diet-hero"
          style={{ width: "100%", boxSizing: "border-box" }}
        >
          <div className="diet-hero-content">
            <span className="diet-hero-badge">{txt.dietBadge}</span>
            <h1
              className="diet-hero-title"
              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {txt.dietTitle}
            </h1>
            <p className="diet-hero-subtitle">{txt.dietSubtitle}</p>
          </div>
          <div className="diet-hero-leaves">
            <span className="leaf leaf-1">🍃</span>
            <span className="leaf leaf-2">🌱</span>
            <span className="leaf leaf-3">🍃</span>
          </div>
        </div>

        <div className="diet-main">
          {/* Form Section */}
          <div
            className={`diet-form-wrapper ${submitted && dietChart ? "form-shrink" : ""}`}
          >
            <form className="diet-form" onSubmit={handleSubmit}>
              <h2 className="form-section-title">{txt.yourProfile}</h2>

              {/* Dosha Selector */}
              <div className="form-group">
                <label className="form-label">
                  {txt.selectDosha} <span className="required">*</span>
                </label>
                <div className="dosha-selector">
                  {Object.entries(doshaInfo).map(([key, val]) => (
                    <button
                      type="button"
                      key={key}
                      className={`dosha-card ${formData.dosha === key ? "dosha-active" : ""}`}
                      style={{ "--dosha-color": val.color }}
                      onClick={() => handleDoshaSelect(key)}
                    >
                      <span className="dosha-emoji">{val.emoji}</span>
                      <span className="dosha-name">{key}</span>
                      <span className="dosha-desc">{val.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age & Weight */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{txt.age}</label>
                  <input
                    type="number"
                    name="age"
                    className="form-input"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{txt.weight}</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-input"
                    placeholder="e.g. 65"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Health Goal */}
              <div className="form-group">
                <label className="form-label">{txt.healthGoal}</label>
                <select
                  name="healthGoal"
                  className="form-input"
                  value={formData.healthGoal}
                  onChange={handleChange}
                >
                  <option value="">{txt.selectGoal}</option>
                  <option value="Weight Loss">{txt.weightLoss}</option>
                  <option value="Weight Gain">{txt.weightGain}</option>
                  <option value="Improve Digestion">{txt.digestion}</option>
                  <option value="Boost Immunity">{txt.immunity}</option>
                  <option value="Stress Relief">{txt.stress}</option>
                  <option value="Better Sleep">{txt.sleep}</option>
                  <option value="General Wellness">{txt.wellness}</option>
                </select>
              </div>

              {/* Season */}
              <div className="form-group">
                <label className="form-label">{txt.season}</label>
                <div className="season-pills">
                  {["Spring", "Summer", "Monsoon", "Autumn", "Winter"].map(
                    (s) => (
                      <button
                        type="button"
                        key={s}
                        className={`season-pill ${formData.season === s ? "season-active" : ""}`}
                        onClick={() => setFormData({ ...formData, season: s })}
                      >
                        {s}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Allergies */}
              <div className="form-group">
                <label className="form-label">{txt.allergies}</label>
                <input
                  type="text"
                  name="allergies"
                  className="form-input"
                  placeholder={txt.allergiesPlaceholder}
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="form-error">⚠️ {error}</p>}

              <button type="submit" className="generate-btn" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> {txt.generating}
                  </span>
                ) : (
                  txt.generateBtn
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          {loading && (
            <div className="loading-section">
              <div className="loading-animation">
                <div className="loading-leaf">🌿</div>
                <p>{txt.crafting}</p>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          {dietChart && !loading && (
            <div className="result-section" ref={resultRef}>
              <div className="result-header">
                <div className="result-title-row">
                  <h2 className="result-title">
                    {doshaInfo[formData.dosha]?.emoji} Your {formData.dosha}{" "}
                    Diet Plan
                  </h2>
                  <button className="reset-btn" onClick={handleReset}>
                    {txt.newChart}
                  </button>
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button className="download-btn" onClick={handleDownloadPDF}>
                    ⬇️ Download Chart PDF
                  </button>
                </div>
                {formData.healthGoal && (
                  <span className="result-goal-tag">
                    Goal: {formData.healthGoal}
                  </span>
                )}
                {formData.season && (
                  <span className="result-goal-tag season-tag">
                    Season: {formData.season}
                  </span>
                )}
              </div>

              {/* Overview */}
              {dietChart.overview && (
                <div className="overview-card">
                  <p>{dietChart.overview}</p>
                </div>
              )}

              {/* Meal Cards */}
              <div className="meals-grid">
                {dietChart.meals &&
                  Object.entries(dietChart.meals).map(([mealKey, meal]) => (
                    <div className="meal-card" key={mealKey}>
                      <div className="meal-card-header">
                        <span className="meal-icon">
                          {mealIcons[mealKey] || "🍽️"}
                        </span>
                        <h3 className="meal-title">{meal.name || mealKey}</h3>
                        {meal.time && (
                          <span className="meal-time">{meal.time}</span>
                        )}
                      </div>
                      <ul className="meal-items">
                        {meal.items?.map((item, i) => (
                          <li key={i} className="meal-item">
                            <span className="meal-dot">•</span> {item}
                          </li>
                        ))}
                      </ul>
                      {meal.tip && (
                        <div className="meal-tip">
                          <span>💡</span> {meal.tip}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Foods to Avoid */}
              {dietChart.avoid && dietChart.avoid.length > 0 && (
                <div className="avoid-section">
                  <h3 className="section-subtitle">{txt.foodsToAvoid}</h3>
                  <div className="avoid-tags">
                    {dietChart.avoid.map((item, i) => (
                      <span key={i} className="avoid-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Herbs & Spices */}
              {dietChart.herbs && dietChart.herbs.length > 0 && (
                <div className="herbs-section">
                  <h3 className="section-subtitle">{txt.herbsSpices}</h3>
                  <div className="herbs-tags">
                    {dietChart.herbs.map((herb, i) => (
                      <span key={i} className="herb-tag">
                        {herb}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Daily Tips */}
              {dietChart.dailyTips && dietChart.dailyTips.length > 0 && (
                <div className="tips-section">
                  <h3 className="section-subtitle">{txt.dailyTips}</h3>
                  <div className="tips-list">
                    {dietChart.dailyTips.map((tip, i) => (
                      <div key={i} className="tip-card">
                        <span className="tip-number">{i + 1}</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietChart;
