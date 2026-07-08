export const ORDER_PLATFORMS = [
  {
    id: "ubereats",
    name: "Uber Eats",
    url: "https://www.ubereats.com/ch-de/store/flatties-smashburger/feLnc1GhUJCqThv9DpFTMw",
  },
  {
    id: "justeat",
    name: "Just Eat",
    url: "https://www.just-eat.ch/speisekarte/flatties",
  },
] as const;

export type OrderPlatformId = (typeof ORDER_PLATFORMS)[number]["id"];
