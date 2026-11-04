import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { sendContactEmail } from "./contact-email.ts";

const message = {
  name: "Aye\nAye",
  email: "aye@example.com",
  company: "",
  siteUrl: "",
  brief: "We need a new website for our shop.",
  interests: ["Web Design", "Local SEO"],
};
const TO = "owner@example.com";

afterEach(() => mock.restoreAll());

test("sends the message to the owner, with replies going to the visitor", async () => {
  const fetchMock = mock.method(globalThis, "fetch", async () =>
    Response.json({ id: "1" }),
  );

  assert.equal(await sendContactEmail(message, "re_test", TO), true);

  const [url, init] = fetchMock.mock.calls[0].arguments as [string, RequestInit];
  const body = JSON.parse(String(init.body));
  assert.equal(url, "https://api.resend.com/emails");
  assert.deepEqual(init.headers && (init.headers as Record<string, string>).Authorization, "Bearer re_test");
  assert.deepEqual(body.to, [TO]);
  assert.equal(body.reply_to, "aye@example.com");
  assert.equal(body.subject, "New enquiry from Aye Aye");
  assert.match(body.text, /Interested in: Web Design, Local SEO/);
  assert.match(body.text, /We need a new website/);
});

test("fails when the provider rejects the message", async () => {
  mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => new Response("nope", { status: 403 }));
  assert.equal(await sendContactEmail(message, "re_test", TO), false);
});

test("fails when the network call throws", async () => {
  mock.method(console, "error", () => {});
  mock.method(globalThis, "fetch", async () => {
    throw new Error("offline");
  });
  assert.equal(await sendContactEmail(message, "re_test", TO), false);
});

test("fails without calling the provider when the key is missing", async () => {
  mock.method(console, "error", () => {});
  const fetchMock = mock.method(globalThis, "fetch", async () => Response.json({}));
  assert.equal(await sendContactEmail(message, undefined, TO), false);
  assert.equal(fetchMock.mock.callCount(), 0);
});
