interface CredlyBadge {
  issuer: string;
  name: string;
  imageUrl: string;
  shareUrl: string;
}

interface BadgeGroup {
  issuer: string;
  badges: CredlyBadge[];
}

const CREDLY_BADGES: CredlyBadge[] = [
  {
    issuer: "ICAgile",
    name: "Enterprise Agile Coaching",
    imageUrl:
      "https://images.credly.com/size/128x128/images/5df071ef-1f25-4375-9790-5cb925e4470f/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/13326838-2128-4b0b-8de1-1efe9dcc75c7",
  },
  {
    issuer: "ICAgile",
    name: "Coaching Agile Transformations",
    imageUrl:
      "https://images.credly.com/size/128x128/images/a53c6eee-4ec1-4481-99a8-ae75ef88c67a/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/c373b985-a6ca-42d6-a6aa-6059a1e50c35",
  },
  {
    issuer: "ICAgile",
    name: "Agile Coaching",
    imageUrl:
      "https://images.credly.com/size/128x128/images/5c50a643-ef0f-4bea-9c90-6fe2e785a1c8/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/7beeace9-a560-44b5-93f8-689f58501bfa",
  },
  {
    issuer: "ICAgile",
    name: "Agile Team Facilitation",
    imageUrl:
      "https://images.credly.com/size/128x128/images/a0094e49-3070-4c3b-b538-452320be93c1/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/06741e48-254f-4ba0-a830-8475a34d6d95",
  },
  {
    issuer: "Scrum.org",
    name: "Professional Scrum Master II (PSM II)",
    imageUrl:
      "https://images.credly.com/size/128x128/images/d90cc9bc-3e9a-49b2-ac09-7930db400e32/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/4fd1bb98-6f0d-4d09-9248-debd48eb4634",
  },
  {
    issuer: "Scrum.org",
    name: "Professional Scrum Master I (PSM I)",
    imageUrl:
      "https://images.credly.com/size/128x128/images/a2790314-008a-4c3d-9553-f5e84eb359ba/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/945bd674-2dce-4e53-aeda-b622aa0d1a27",
  },
  {
    issuer: "Scrum.org",
    name: "Professional Scrum Product Owner I (PSPO I)",
    imageUrl:
      "https://images.credly.com/size/128x128/images/591762c5-fae7-49c6-b326-e1756979928d/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/3ade3eeb-d257-4f05-ab3a-baf25d17efac",
  },
  {
    issuer: "Scrum.org",
    name: "Professional Scrum with Kanban I (PSK I)",
    imageUrl:
      "https://images.credly.com/size/128x128/images/78c2bf96-9468-40ac-aee7-3eac9d79a6d5/image.png",
    shareUrl:
      "https://www.credly.com/earner/earned/share/5073ef86-fc81-4c70-9504-81a2d394c54b",
  },
];

function groupByIssuer(badges: CredlyBadge[]): BadgeGroup[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const badge of badges) {
    if (!seen.has(badge.issuer)) {
      seen.add(badge.issuer);
      order.push(badge.issuer);
    }
  }
  return order.map((issuer) => ({
    issuer,
    badges: badges.filter((b) => b.issuer === issuer),
  }));
}

export function useCredentials() {
  const grouped = groupByIssuer(CREDLY_BADGES);
  return { grouped };
}
