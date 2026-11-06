export type Member = {
  name: "Jimmy" | "Jerry" | "Jason" | "Nick" | "Noah";
  /** Everyone is a founder; `roles` is what they actually do. */
  roles: string[];
  line: string;
};

export const team: Member[] = [
  {
    name: "Jimmy",
    roles: ["AI Developer"],
    line: "Builds the AI behind Bingo: chatbots, automations and smart tools that take repetitive work off your plate.",
  },
  {
    name: "Jerry",
    roles: ["Brand Strategist", "Branding"],
    line: "Works out who you are and who you are for, so the brand says one clear thing everywhere it shows up.",
  },
  {
    name: "Jason",
    roles: ["Software Engineer", "System Designer", "DevOps"],
    line: "Designs the systems under the product and keeps them fast, secure and online after launch.",
  },
  {
    name: "Nick",
    roles: ["Full-Stack Developer", "Digital Marketer", "Product Owner"],
    line: "Takes a product from idea to live to found, and decides what gets built next.",
  },
  {
    name: "Noah",
    roles: ["Brand Strategist", "Graphic Designer", "Logo Designer"],
    line: "Turns the strategy into the logo, colours and graphics people actually remember.",
  },
];
