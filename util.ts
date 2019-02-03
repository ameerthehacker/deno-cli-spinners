import * as deno from 'deno';

export const clearCurrentLine = async (
  textEncoder: TextEncoder,
  cols: number
) => {
  await deno.stdout.write(textEncoder.encode(`\x1b[${cols}D \x1b[K`));
};

export const printOnCurrentLine = async (
  textEncoder: TextEncoder,
  cols: number,
  message: string
) => {
  await deno.stdout.write(
    textEncoder.encode(`\x1b[${cols}D \x1b[K ${message}`)
  );
};

export const printNewLine = async (textEncoder: TextEncoder, cols: number) => {
  await deno.stdout.write(textEncoder.encode(`\x1b[${cols}D`));
  await deno.stdout.write(textEncoder.encode(`\x1b[1B`));
};
