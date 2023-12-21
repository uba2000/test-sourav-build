export default class ClipboardHelper {
  static async writeToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);

      return text;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.toString();
    }
  }
}
