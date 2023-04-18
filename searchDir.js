const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the directory to search: ', (dir) => {
  rl.question('Enter the search pattern: ', (pattern) => {
    search(dir, pattern);
    rl.close();
  });
});

function search(dir, pattern) {
  const regex = new RegExp(pattern);

  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      const filepath = path.join(dir, file);

      fs.stat(filepath, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          search(filepath, pattern);
        } else if (stats.isFile() && regex.test(file)) {
          console.log(filepath);
        }
      });
    }
  });
}