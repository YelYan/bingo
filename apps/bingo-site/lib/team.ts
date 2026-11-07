export type Member = {
  name: "Jimmy" | "Jerry" | "Jason" | "Nick" | "Noah";
  /** Everyone is a founder; `roles` is what they actually do. */
  roles: string[];
  line: string;
  /** Short line the avatar "says" — in that founder's own voice. */
  says: string;
  /** shortcut: demo placeholder URLs; swap for real profiles when we have them. */
  linkedin: string;
};

export const team: Member[] = [
  {
    name: "Jimmy",
    roles: ["AI Developer"],
    line: "Builds the AI behind Bingo: chatbots, automations and smart tools that take repetitive work off your plate.",
    says: "Beep boop — I taught a robot to do your busywork.",
    linkedin: "https://www.linkedin.com/in/jimmy-bingo",
  },
  {
    name: "Jerry",
    roles: ["Brand Strategist", "UI/UX Designer"],
    line: "Works out who you are and who you are for, so the brand says one clear thing everywhere it shows up.",
    says: "I make people trust you in about three seconds.",
    linkedin: "https://www.linkedin.com/in/jerry-bingo",
  },
  {
    name: "Jason",
    roles: ["Software Engineer", "System Designer", "DevOps"],
    line: "Designs the systems under the product and keeps them fast, secure and online after launch.",
    says: "If it's slow or down at 3am, that's my problem.",
    linkedin: "https://www.linkedin.com/in/jason-bingo",
  },
  {
    name: "Nick",
    roles: ["Full-Stack Developer", "Business Analyst", "Digital Marketer", "Product Owner"],
    line: "Takes a product from idea to live to found, reads the numbers, and decides what gets built next.",
    says: "I turn ideas into things people actually buy.",
    linkedin: "https://www.linkedin.com/in/nick-bingo",
  },
  {
    name: "Noah",
    roles: ["Brand Strategist", "Graphic Designer", "Logo Designer"],
    line: "Turns the strategy into the logo, colours and graphics people actually remember.",
    says: "I design logos you won't be able to unsee.",
    linkedin: "https://www.linkedin.com/in/noah-bingo",
  },
];
