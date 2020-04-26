require('./style.scss');

const apiPrefix = require('Config').apiPrefix;

function displayBadPackages(data) {
  const packagesList = document.getElementById("packagesul");
  const fragment = document.createDocumentFragment();

  for (pkg of data) {
    if (pkg.status == 'GOOD') {
      continue
    }

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.className = 'subtitle is-6 has-text-white';
    p.textContent = `${pkg.name}-${pkg.version}`;

    li.appendChild(p);
    fragment.appendChild(li);
  }

  packagesList.appendChild(fragment);
}

function displayStats(data) {
  let bad = 0;
  let good = 0;
  let unknown = 0;

  for (pkg of data) {
    switch (pkg.status) {
      case 'GOOD':
        good++;
        break
      case 'BAD':
        bad++;
        break
      case 'UNKWN':
        unknown++;
        break
    }
  }

  reproPercentage = Math.round(good / data.length * 100);

  const elem = document.getElementById("status");
  elem.textContent = `The core repository is ${reproPercentage}% reproducible with ${bad} bad and ${unknown} unknown packages.`;
}

fetch(`${apiPrefix}/api/v0/pkgs/list`).then((response) => {
  return response.json();
}).then((data) => {
  displayStats(data);
  displayBadPackages(data);
});
