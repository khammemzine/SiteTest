import { useEffect, useState } from "react";

export default function Drawings() {
  const [drawings, setDrawings] = useState([]);
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    // التحقق من حالة تسجيل الدخول
    fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setIsMember(data.isMember));

    // جلب قائمة الرسومات
    fetch(`${import.meta.env.VITE_API_URL}/drawings`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setDrawings(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎨 رسوماتي</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {drawings.map((drawing, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <img
              src={`${import.meta.env.VITE_API_URL}${drawing.url}`}
              alt={drawing.name}
              style={{ maxWidth: "200px", borderRadius: "8px" }}
            />
            <p>{drawing.name}</p>
            {isMember && (
              <a
                href={`${import.meta.env.VITE_API_URL}/drawings/file/${drawing.name}`}
                download
              >
                تحميل
              </a>
            )}
          </div>
        ))}
      </div>
      {!isMember && (
        <p style={{ marginTop: "20px", color: "red" }}>
          يجب تسجيل الدخول لتحميل الرسومات
        </p>
      )}
    </div>
  );
}
