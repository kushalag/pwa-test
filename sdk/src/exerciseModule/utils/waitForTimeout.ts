export default async function waitForTimeout(milliseconds: number): Promise<void> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}
