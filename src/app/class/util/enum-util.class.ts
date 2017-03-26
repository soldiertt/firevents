export default class EnumUtil {

  static getNames(e: any): Array<string> {
    return this._getObjValues(e).filter(v => typeof v === 'string') as string[];
  }

  private static _getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map(k => e[k]);
  }

}
