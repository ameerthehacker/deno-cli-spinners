export const clearCurrentLine = async (
  textEncoder: TextEncoder,
  cols: number
) => {
  await Deno.stdout.write(textEncoder.encode(`\x1b[${cols}D \x1b[K`));
};

export const printOnCurrentLine = async (
  textEncoder: TextEncoder,
  cols: number,
  message: string
) => {
  await Deno.stdout.write(
    textEncoder.encode(`\x1b[${cols}D \x1b[K ${message}`)
  );
};

export const printNewLine = async (textEncoder: TextEncoder, cols: number) => {
  await Deno.stdout.write(textEncoder.encode(`\x1b[${cols}D`));
  await Deno.stdout.write(textEncoder.encode(`\x1b[1B`));
};
