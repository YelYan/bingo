export type Member = {
  name: "Jimmy" | "Jerry" | "Jason" | "Nick" | "Noah";
  /** Everyone is a founder; `roles` is what they actually do. */
  roles: string[];
  line: string;
  /** shortcut: demo placeholder URLs; swap for real profiles when we have them. */
  linkedin: string;
};

export const team: Member[] = [
  {
    name: "Jimmy",
    roles: ["AI Developer"],
    line: "Builds the AI behind Bingo: chatbots, automations and smart tools that take repetitive work off your plate.",
    linkedin: "https://www.linkedin.com/in/jimmy-bingo",
  },
  {
    name: "Jerry",
    roles: ["Brand Strategist", "UI/UX Designer"],
    line: "Works out who you are and who you are for, so the brand says one clear thing everywhere it shows up.",
    linkedin: "https://www.linkedin.com/in/jerry-bingo",
  },
  {
    name: "Jason",
    roles: ["Software Engineer", "System Designer", "DevOps"],
    line: "Designs the systems under the product and keeps them fast, secure and online after launch.",
    linkedin: "https://www.linkedin.com/in/jason-bingo",
  },
  {
    name: "Nick",
    roles: ["Full-Stack Developer", "Digital Marketer", "Product Owner"],
    line: "Takes a product from idea to live to found, and decides what gets built next.",
    linkedin: "https://www.linkedin.com/in/nick-bingo",
  },
  {
    name: "Noah",
    roles: ["Brand Strategist", "Graphic Designer", "Logo Designer"],
    line: "Turns the strategy into the logo, colours and graphics people actually remember.",
    linkedin: "https://www.linkedin.com/in/noah-bingo",
  },
];
