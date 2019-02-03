import Spinner from '../mod.ts';

const spinner = Spinner.getInstance();

spinner.start('Installing dependecies...');

setTimeout(async () => {
  await spinner.warn('Some dependecies failed to install');
  spinner.setSpinnerType('weather');
  spinner.start('Contacting the server...');

  setTimeout(async () => {
    await spinner.fail('Server did not respond');
    spinner.setSpinnerType('clock');
    spinner.start('Updating cache...');

    setTimeout(async () => {
      await spinner.succeed();
    }, 2000);
  }, 2000);
}, 2000);
