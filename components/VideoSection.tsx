import { videos } from "@/content/videos";

export function VideoSection() {
  return (
    <section className="section recordings-section" id="nagrania">
      <div className="container">
        <div className="section-header recordings-header">
          <h2 className="section-title recordings-title">
            Posłuchaj nagrań hałasu z Toru Poznań wykonanych na Ławicy, os. Bajkowym,
            w Przeźmierowie, Smochowicach.
          </h2>
        </div>

        {videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video) => (
              <article className="video-card" key={video.youtubeId}>
                <div className="video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="video-copy video-copy-title-only">
                  <h3>{video.title}</h3>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className="recordings-intro">
          <p>
            Tak brzmi praca, odpoczynek, rozmowa przy otwartym oknie albo sen dziecka — nagrania
            te pokazują gwałtowność, powtarzalność i dewastujący charakter hałasu. Ciągły hałas
            środowiskowy bezpowrotnie niszczy zdrowie: dewastuje układ krążenia, wywołuje
            przewlekły stres i odbiera prawo do głębokiego snu.
          </p>
          <ul className="recordings-impact-list">
            <li>
              <strong>Dzieciom</strong> niszczy koncentrację i zaburza prawidłowy rozwój.
            </li>
            <li>
              <strong>Młodym ludziom</strong> – wykończonym po ciężkim dniu w pracy – uniemożliwia
              jakąkolwiek regenerację i odpoczynek.
            </li>
            <li>
              <strong>Osobom starszym</strong> bezpośrednio zagraża, potęgując problemy z sercem i
              ciśnieniem.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
