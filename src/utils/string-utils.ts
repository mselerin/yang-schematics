export class StringUtils {
  static findLast(str: string, re = /[a-z0-9]/i, startNdx: number = -1): number {
    if (startNdx < 0 || startNdx > str.length) {
      startNdx = str.length - 1;
    }

    let found = false;
    while (!found && startNdx >= 0) {
      found = re.test(str.charAt(startNdx));
      if (!found)
        startNdx--;
    }

    return startNdx;
  }


  static findLastLetterOrDigit(str: string, startNdx: number = -1): number {
    return StringUtils.findLast(str, /[a-z0-9]/i, startNdx)
  }
}
