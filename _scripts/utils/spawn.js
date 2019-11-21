const { spawn } = require('child_process');

module.exports = (...args) => {
  const child = spawn(...args);
  const stdout = child.stdout;
  const stderr = child.stderr;

  if (child.stdout) {
    child.stdout.on('data', data => {
      stdout.append(data);
    });
  }

  if (child.stderr) {
    child.stderr.on('data', data => {
      stderr.append(data);
    });
  }

  const promise = new Promise((resolve, reject) => {
    child.on('error', reject);

    child.on('exit', code => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const err = new Error(`child exited with code ${code}`);
        err.code = code;
        err.stderr = stderr;
        reject(err);
      }
    });
  });

  promise.child = child;

  return promise;
};
