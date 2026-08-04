import { videos } from "@/content/videos";

export function VideoSection() {
  return (
    <section className="section recordings-section" id="nagrania">
      <div className="container">
        <div className="section-header recordings-header">
          <h2 className="section-title recordings-title">
            Posłuchaj nagrań hałasu z Toru Poznań w domach i ogrodach na Ławicy, os. Bajkowym,
            w Przeźmierowie i Smochowicach
          </h2>
          <div className="recordings-intro">
            <p>
              Włącz nagrania i wyobraź sobie, że tak brzmi praca, odpoczynek, rozmowa przy otwartym
              oknie albo sen małego dziecka — nie zastępują one pomiarów akustycznych, ale pokazują
              gwałtowność, powtarzalność i czas trwania hałasu. Długotrwała ekspozycja na hałas
              środowiskowy może zaburzać sen, wpływać na układ krążenia i pogarszać koncentrację,
              szczególnie u dzieci.
            </p>
          </div>
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
      </div>
    </section>
  );
}
