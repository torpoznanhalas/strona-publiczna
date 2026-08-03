export type VideoItem = {
  title: string;
  description: string;
  youtubeId: string;
  date?: string;
  location?: string;
};

export const videos: VideoItem[] = [
  {
    title: "20 minut skumulowanego ryku z Toru Poznań",
    description:
      "Nagranie dokumentuje długotrwały i powtarzalny hałas słyszany przez mieszkańców Przeźmierowa.",
    youtubeId: "ZphZ4yrO7o8",
    location: "Przeźmierowo"
  },
  {
    title: "Głośny piątek przy Torze Poznań",
    description:
      "Nagranie pokazuje charakter dźwięku i jego natężenie podczas aktywności prowadzonej na Torze Poznań.",
    youtubeId: "7tBEH7kiY-Y"
  },
  {
    title: "Ryk z Toru Poznań od rana w dzień roboczy",
    description:
      "Nagranie dokumentuje hałas emitowany od godzin porannych w poniedziałek.",
    youtubeId: "wCMn91YEfbQ"
  }
];
