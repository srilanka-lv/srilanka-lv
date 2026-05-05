const fontUrl = new URL('./Comme-Bold.woff', import.meta.url);

export const commeBoldData = await fetch(fontUrl).then((response) => response.arrayBuffer());
