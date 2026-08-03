import { videos } from "@/content/videos";

export function VideoSection() {
  return (
    <section className="section" id="nagrania">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Najpierw posłuchaj</p>
          <h2 className="section-title">Tak brzmi „zwykły dzień” przy Torze Poznań.</h2>
          <p className="section-lead">
            Nagrania nie zastępują urzędowych pomiarów. Pokazują jednak to, czego nie oddaje
            uśredniona liczba: charakter dźwięku, jego powtarzalność i czas trwania.
          </p>
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
                <div className="video-copy">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  {(video.date || video.location) && (
                    <p>
                      {[video.date, video.location].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="video-empty">
            <div>
              <strong>Miejsce na pierwsze nagrania.</strong>
              <p>
                Po otrzymaniu linków YouTube dodamy datę, miejsce i krótki opis warunków
                nagrania. Filmy nie będą uruchamiały się automatycznie.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
