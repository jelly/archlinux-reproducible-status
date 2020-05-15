function displayBadPackages(suites) {
  const packagesList = document.getElementById("packagesul");
  const fragment = document.createDocumentFragment();

  for (let suite of Object.values(suites).sort()) {
    for (let pkg of suite) {
      if (pkg.status == 'GOOD') {
        continue
      }

      const li = document.createElement('li');
      const p = document.createElement('p');
      p.className = 'subtitle is-6 has-text-white';
      p.textContent = `${pkg.suite} - ${pkg.name}-${pkg.version}`;

      li.appendChild(p);
      fragment.appendChild(li);
    }
  }

  packagesList.appendChild(fragment);
}

function calculateSuiteStats(data) {
  let good = 0;
  let bad = 0;
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

  reproPercentage = (good / data.length * 100).toFixed(1);
  return {good, bad, unknown, reproPercentage};
}

function displayStats(suites) {
  const elem = document.getElementById("status");
  const fragment = document.createDocumentFragment();
  for (let suite of Object.values(suites).sort()) {
    const {good, bad, unknown, reproPercentage} = calculateSuiteStats(suite);

    const h2 = document.createElement('h2');
    const suiteName = suite[0].suite; 
    h2.textContent = `[${suiteName}] repository is ${reproPercentage}% reproducible with ${bad} bad and ${unknown} unknown packages.`;

    fragment.appendChild(h2);
  }

  elem.appendChild(fragment);
}

fetch(`/api/v0/pkgs/list`).then((response) => {
  return response.json();
}).then((data) => {
  const suites = {};

  for (pkg of data) {
    if (pkg.suite in suites) {
      suites[pkg.suite].push(pkg);
    } else {
      suites[pkg.suite] = [pkg];
    }
  }

  displayStats(suites);
  displayBadPackages(suites);
}).catch(() => {
  const elem = document.getElementById('status');
  const div = document.createElement('div');
  div.textContent = 'An unexpected erorr occurred fetching the rebuild status';
  div.className = 'notification is-danger';

  elem.appendChild(div);
  const bad = document.getElementById('bad');
  bad.innerHTML = '';
});
