import { SPINNERS, SpinnerType } from './spinners.ts';
import { clearCurrentLine, printOnCurrentLine, printNewLine } from './util.ts';
import { red, green, bold, yellow } from 'https://deno.land/std/fmt/colors.ts';

export class Spinner {
  private static instance: Spinner;
  private currentText: string;
  private currentTimer: number | null;
  private spinner: any;
  private cols: number;
  private textEncoder: TextEncoder;
  private spinnerType: SpinnerType

  private constructor() {
    this.spinnerType = 'dots2';
    this.spinner = SPINNERS[this.spinnerType];
    this.cols = 0;
    this.textEncoder = new TextEncoder();
    this.currentTimer = null;
    this.currentText = '';
  }

  public static getInstance() {
    if (Spinner.instance === undefined) {
      return new Spinner();
    } else {
      return Spinner.instance;
    }
  }

  public setSpinnerType(type: SpinnerType) {
    if (SPINNERS[type]) {
      this.spinner = SPINNERS[type];
    } else {
      throw new Error(`unknown spinner type ${type}`);
    }
  }

  public async start(text: string) {
    if (this.isRunning()) {
      throw new Error(
        "Can't start a new spinner while a spinner is already running!"
      );
    }

    this.currentText = text;
    let currentFrame = 0;
    let totalFrames = this.spinner.frames.length;

    this.currentTimer = setInterval(async () => {
      let message = `${this.spinner.frames[currentFrame]} ${this.currentText}`;
      let lastMessage;

      if (lastMessage !== message) {
        await clearCurrentLine(this.textEncoder, this.cols);
      }

      await this.print(message);

      lastMessage = message;
      currentFrame = (currentFrame + 1) % totalFrames;
    }, this.spinner.interval);
  }

  public async setText(text: string) {
    this.currentText = text;
  }

  public async stop() {
    this.stopSpinner();
    await clearCurrentLine(this.textEncoder, this.cols);
    await this.printNewLine();
  }

  private async stopSpinner(text?: string) {
    if (this.currentTimer) {
      clearInterval(this.currentTimer);
    }

    if (text) {
      await this.print(text);
    }

    this.currentTimer = null;
  }

  private async print(text: string) {
    if (text.length > this.cols) {
      this.cols = text.length;
    }

    await printOnCurrentLine(this.textEncoder, this.cols, text);
  }

  private async printNewLine() {
    await printNewLine(this.textEncoder, this.cols);
  }

  public isRunning() {
    if (this.currentTimer !== null) {
      return true;
    } else {
      return false;
    }
  }

  private async stopSpinnerWithStatus(status: string, text?: string) {
    if (text) {
      this.setText(text);
    }

    let message = `${status} ${this.currentText}`;

    await this.stopSpinner(message);

    await this.print(message);
    await this.printNewLine();
  }

  public async succeed(text?: string) {
    await this.stopSpinnerWithStatus(bold(green('√')), text);
  }

  public async fail(text?: string) {
    await this.stopSpinnerWithStatus(bold(red('×')), text);
  }

  public async warn(text?: string) {
    await this.stopSpinnerWithStatus(bold(yellow('!!')), text);
  }

  public async info(text?: string) {
    await this.stopSpinnerWithStatus(bold(yellow('i')), text);
  }
}
