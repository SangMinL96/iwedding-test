export const OnlyNumberRegex = /[0-9]+/;
export const ImageFileTypes = new RegExp(/\.(jpg|jpeg|png)$/, 'i');
export const escSpecialCharacters = (str: string) => str.replace(/[-[\]{}()*+!<=:?\.\/\\^$|#\s,]/g, match => '\\' + match);
