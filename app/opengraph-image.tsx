import { ImageResponse } from "next/og";

export const alt = "Tor Poznań: hałas, fakty i głos mieszkańców";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#111111",
          background: "#f4f1ea",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "26px", fontWeight: 800 }}>
          <span style={{ color: "#d52222" }}>●</span>
          TOR POZNAŃ: HAŁAS
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1040px" }}>
          <div style={{ fontSize: "68px", fontWeight: 900, lineHeight: 1.05 }}>
            Tor Poznań przekraczał normy.
          </div>
          <div style={{ color: "#d52222", fontSize: "68px", fontWeight: 900, lineHeight: 1.05 }}>
            Potem ruszyła walka o zmianę zasad.
          </div>
        </div>
        <div style={{ fontSize: "24px" }}>torpoznanhalas.pl · nagrania · fakty · poparcie</div>
      </div>
    ),
    size
  );
}
