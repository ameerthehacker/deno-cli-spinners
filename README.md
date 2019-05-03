# CLI Spinners for Deno

> Awesome deno terminal spinners

![example screenshot](https://i.imgur.com/RBsL1k9.gif)

> This package is inspired from [ora](https://github.com/sindresorhus/ora) and [cli-spinners](https://github.com/sindresorhus/cli-spinners) 

## Usage

```typescript
import Spinner from 'https://raw.githubusercontent.com/ameerthehacker/cli-spinners/master/mod.ts';

const spinner = Spinner.getInstance();

spinner.start('running step 1');
// Perform long running step 1
spinner.setText('running step 2');
// Perform long running step 2
spinner.stop();
```

## API

```typescript
Spinner.getInstance();
```

This will return a singleton instance for the `Spinner` class.

```typescript
await spinner.start(text: string);
```

This will start a spinner with the given text.

```typescript
await spinner.stop();
```

This will stop the spinner and clears the line.

```typescript
spinner.setText(text: string);
```

Updates the `text` shown with the spinner.

```typescript
spinner.setSpinnerType(type: string);
```

- This is used to update the spinner type
- The detault spinner type is `dots2`
- To see list of all available spinner types please refer [here](https://github.com/ameerthehacker/deno-cli-spinner/blob/master/spinners.ts)

```typescript
await spinner.succeed([text]: string);
```

Stop the spinner, change it to a green `✔` and persist the current text, or `text` if provided.

```typescript
await spinner.fail([text]: string);
```

Stop the spinner, change it to a red `✖` and persist the current text, or `text` if provided.

```typescript
await spinner.warn([text]: string)
```

Stop the spinner, change it to a yellow `⚠` and persist the current text, or `text` if provided.

```typescript
await spinner.info([text]: string)
```

Stop the spinner, change it to a blue `ℹ` and persist the current text, or `text` if provided.

```typescript
await spinner.isRunning();
```

Returns true if the spinner is running.

## License

MIT © [Ameer Jhan](mailto:ameerjhanprof@gmail.com)
