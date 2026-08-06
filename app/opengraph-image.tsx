import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

const fontDirectory = path.join(process.cwd(), "app", "fonts");
const barlowBold = readFile(path.join(fontDirectory, "Barlow-Bold.otf"));
const barlowExtraBold = readFile(path.join(fontDirectory, "Barlow-ExtraBold.otf"));

export const alt = "Posłuchaj nagrań hałasu z Toru Poznań";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [boldFont, extraBoldFont] = await Promise.all([barlowBold, barlowExtraBold]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          color: "#111111",
          background: "#f4f1ea",
          fontFamily: "Barlow",
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "1060px",
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.05 }}>
            Posłuchaj nagrań hałasu z Toru Poznań!
          </div>
          <div
            style={{
              width: "110px",
              height: "7px",
              margin: "28px 0 24px",
              background: "#d52222"
            }}
          />
          <div style={{ maxWidth: "980px", color: "#514c45", fontSize: "31px", fontWeight: 700, lineHeight: 1.3 }}>
            Poznaj fakty i historię o torze, zobacz jak Automobilklub Wielkopolski próbuje zmieniać
            prawo i poprzyj okolicznych mieszkańców!
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "64px",
            bottom: "48px",
            left: "64px",
            display: "flex",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 700
          }}
        >
          torpoznanhalas.pl · nagrania · fakty · poparcie
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Barlow", data: boldFont, style: "normal", weight: 700 },
        { name: "Barlow", data: extraBoldFont, style: "normal", weight: 800 }
      ]
    }
  );
}
