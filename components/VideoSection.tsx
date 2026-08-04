import { videos } from "@/content/videos";

export function VideoSection() {
  return (
    <section className="section recordings-section" id="nagrania">
      <div className="container">
        <div className="section-header recordings-header">
          <h2 className="section-title recordings-title">
            Tak słychać Tor Poznań w domach i ogrodach mieszkańców Ławicy, Bajkowego,
            Przeźmierowa i Smochowic
          </h2>
          <div className="recordings-intro">
            <p>
              Włącz nagrania i wyobraź sobie, że tak brzmi praca z domu, odpoczynek w ogrodzie,
              rozmowa przy otwartym oknie albo sen małego dziecka.
            </p>
            <p>
              Nagrania nie są pomiarami akustycznymi i nie zastępują ustaleń właściwych organów.
              Pokazują jednak coś, czego nie oddaje jedna uśredniona liczba: charakter dźwięku,
              jego gwałtowność, powtarzalność i czas trwania.
            </p>
            <p>
              Hałas nie jest wyłącznie kwestią komfortu. Światowa Organizacja Zdrowia wskazuje,
              że nadmierna i długotrwała ekspozycja na hałas środowiskowy wiąże się między innymi
              z zaburzeniami snu, skutkami dla układu krążenia i pogorszeniem funkcji poznawczych.
              Dzieci należą do grup szczególnie wrażliwych, a chroniczny hałas może pogarszać
              warunki nauki, koncentrację i szkolne funkcjonowanie.
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
