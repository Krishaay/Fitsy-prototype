import { useState } from "react";
import Layout from "../components/Layout";
import "./css/upload.css";

export default function Upload() {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    type: "",
    color: "",
    occasion: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { type, color, occasion, image } = formData;

    if (!type || !color || !occasion || !image) {
      setError("Please complete all fields including image.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("type", type);
      formDataToSend.append("color", color);
      formDataToSend.append("occasion", occasion);
      formDataToSend.append("image", image);

      const response = await fetch("http://localhost:5000/api/wardrobe", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Item added successfully");
        setPreview(null);
        setFormData({
          type: "",
          color: "",
          occasion: "",
          image: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <Layout>
      <div className="upload-container">
        <h1 className="upload-title">Add to Your Wardrobe</h1>

        {error && <p className="upload-error">{error}</p>}

        <div className="upload-content">

          <div className="image-upload">
            <label className="image-placeholder">
              {preview ? (
                <div className="preview-wrapper">
                  <img src={preview} alt="preview" className="preview-image" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                "Click to Upload Image"
              )}

              <input
                type="file"
                id="image-upload"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setFormData({ ...formData, image: file });
                  }
                }}
              />
            </label>
          </div>

          <form className="upload-form" onSubmit={handleSubmit}>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option>Top</option>
              <option>Bottom</option>
              <option>Shoes</option>
              <option>Accessory</option>
            </select>

            <div className="color-options">
              {["Black", "White", "Red", "Blue", "Green", "Beige"].map((clr) => (
                <button
                  type="button"
                  key={clr}
                  className={`color-circle ${formData.color === clr ? "active" : ""}`}
                  style={{ backgroundColor: clr.toLowerCase() }}
                  onClick={() =>
                    setFormData({ ...formData, color: clr })
                  }
                />
              ))}
            </div>

            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleChange}
              required
            >
              <option value="">Select Occasion</option>
              <option>Casual</option>
              <option>Formal</option>
              <option>Party</option>
              <option>Office</option>
            </select>

            <button type="submit">Add Item</button>
          </form>

        </div>
      </div>
    </Layout>
  );
}