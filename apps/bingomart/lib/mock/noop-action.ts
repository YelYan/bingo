"use server";

/** Lets a Panel's form submit to nothing yet, for screens with no backend behind them yet. */
export async function noopAction() {
  return null;
}
