import Layout from "../components/Layout";
import "./css/history.css";

export default function History() {

  const outfits = [
    { id: 1, score: 92, occasion: "Formal", date: "12 Feb 2026" },
    { id: 2, score: 85, occasion: "Casual", date: "10 Feb 2026" },
    { id: 3, score: 78, occasion: "Party", date: "8 Feb 2026" },
    { id: 4, score: 88, occasion: "Office", date: "5 Feb 2026" },
    { id: 5, score: 81, occasion: "Casual", date: "2 Feb 2026" },
  ];

  return (
    <Layout>
      <div className="history-container">
        <h1 className="history-title">Outfit History</h1>

        <div className="bento-grid">
          {outfits.map((outfit, index) => (
            <div
              key={outfit.id}
              className={`history-card ${
                index === 0 ? "featured-card" : ""
              }`}
            >
              <div className="history-card-content">
                <h3>{outfit.occasion} Look</h3>
                <p>Score: {outfit.score}%</p>
                <p>{outfit.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}