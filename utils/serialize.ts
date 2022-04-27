export const serialize = (obj: any) => {
  if (obj) {
    const str: string[] = [];
    Object.keys(obj).forEach((p) => !p && delete obj[p]);
    Object.keys(obj).forEach((p) =>
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    );
    return str.join("&");
  }

  return "";
};
