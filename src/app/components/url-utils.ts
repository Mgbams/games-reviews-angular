export class UrlUtils {

  public static buildPageableParams(page: number, size: number, sort: string, desc: boolean): string {
    return 'page=' + page + '&size=' + size + '&sort=' + sort + ',' + (desc ? 'DESC' : 'ASC');
  }

}
