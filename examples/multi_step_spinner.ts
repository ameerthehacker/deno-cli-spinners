import Spinner from '../mod.ts';

const spinner = Spinner.getInstance();

spinner.start('running step 1');

setTimeout(() => {
  spinner.setText('running step 2');
  setTimeout(() => {
    spinner.stop();
  }, 2000);
}, 2000);
