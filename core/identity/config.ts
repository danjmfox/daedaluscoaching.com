export interface IdentityConfig {
  photo: {
    enabled: boolean;
    src: string;
    alt: string;
  };
}

export const identityConfig: IdentityConfig = {
  photo: {
    enabled: false,
    src: "/images/headshot.jpg",
    alt: "Dan Fox, Daedalus Coaching",
  },
};
