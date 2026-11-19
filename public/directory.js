(function () {
  function norm(value) {
    return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function readJson(id) {
    var node = document.getElementById(id);
    if (!node) return null;
    try {
      return JSON.parse(node.textContent || '');
    } catch (error) {
      return null;
    }
  }

  function fill(template, vars) {
    return String(template || '').replace(/\{(\w+)\}/g, function (_, key) {
      return vars[key] == null ? '' : String(vars[key]);
    });
  }

  function initLookup(root, catalog, copy, localePrefix) {
    var year = root.querySelector('[data-year]');
    var make = root.querySelector('[data-make]');
    var model = root.querySelector('[data-model]');
    var message = root.querySelector('[data-lookup-msg]');
    var go = root.querySelector('[data-lookup-go]');
    if (!year || !make || !model) return;

    var years = [];
    catalog.forEach(function (vehicle) {
      vehicle.years.forEach(function (value) {
        if (years.indexOf(value) === -1) years.push(value);
      });
    });
    years.sort(function (a, b) { return a - b; });
    years.forEach(function (value) {
      var option = document.createElement('option');
      option.value = String(value);
      option.textContent = String(value);
      year.appendChild(option);
    });

    function reset(select) {
      select.innerHTML = '';
      var blank = document.createElement('option');
      blank.value = '';
      blank.textContent = copy.choose;
      select.appendChild(blank);
      select.disabled = true;
    }

    function showMiss() {
      message.hidden = false;
      message.textContent = copy.notCovered;
      go.hidden = true;
    }

    function hideResult() {
      message.hidden = true;
      go.hidden = true;
    }

    year.addEventListener('change', function () {
      reset(make);
      reset(model);
      hideResult();
      if (!year.value) return;
      var makes = [];
      catalog.forEach(function (vehicle) {
        if (vehicle.years.indexOf(Number(year.value)) === -1) return;
        if (!makes.some(function (item) { return item.slug === vehicle.makeSlug; })) {
          makes.push({ slug: vehicle.makeSlug, name: vehicle.make });
        }
      });
      if (!makes.length) {
        showMiss();
        return;
      }
      makes.forEach(function (item) {
        var option = document.createElement('option');
        option.value = item.slug;
        option.textContent = item.name;
        make.appendChild(option);
      });
      make.disabled = false;
    });

    make.addEventListener('change', function () {
      reset(model);
      hideResult();
      if (!make.value) return;
      var models = catalog.filter(function (vehicle) {
        return vehicle.makeSlug === make.value && vehicle.years.indexOf(Number(year.value)) !== -1;
      });
      if (!models.length) {
        showMiss();
        return;
      }
      models.forEach(function (vehicle) {
        var option = document.createElement('option');
        option.value = vehicle.path;
        option.textContent = vehicle.model;
        model.appendChild(option);
      });
      model.disabled = false;
    });

    model.addEventListener('change', function () {
      if (!model.value) {
        hideResult();
        return;
      }
      message.hidden = true;
      go.hidden = false;
      go.href = localePrefix + model.value + '/';
    });
  }

  function typeMatches(selected, keyTypes) {
    if (selected === 'unsure') return true;
    if (selected === 'remote-head' || selected === 'flip-key') {
      return keyTypes.indexOf('remote-head-key') !== -1 || keyTypes.indexOf('flip-key') !== -1;
    }
    return keyTypes.indexOf(selected) !== -1;
  }

  function initQuiz(root) {
    if (root.dataset.bound) return;
    root.dataset.bound = '1';
    var factsNode = root.querySelector('[data-facts]');
    var out = root.querySelector('[data-quiz-result]');
    if (!factsNode || !out) return;
    var facts = JSON.parse(factsNode.textContent || '{}');
    var copy = JSON.parse(root.getAttribute('data-copy') || '{}');
    root.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('change', function () {
        var ign = root.querySelector('input[name$="-ign"]:checked');
        var keys = root.querySelector('input[name$="-keys"]:checked');
        var push = root.querySelector('input[name$="-push"]:checked');
        var kind = root.querySelector('input[name$="-kind"]:checked');
        if (!ign || !keys || !push || !kind) return;
        var lines = [];
        if (ign.value === 'no' && facts.ignitionKeyInCylinder === 'required') {
          if (facts.ignitionBlade && facts.ignitionTransponder === 'none') {
            lines.push(fill(copy.resultCutKeyNoChip, { blade: facts.ignitionBlade }));
          } else {
            lines.push(copy.resultKeyRequiredUnknown);
          }
        } else if (ign.value === 'no' && facts.ignitionKeyInCylinder !== 'not-required') {
          lines.push(copy.resultKeyUnknown);
        }
        if (push.value === 'yes' && facts.pushButtonProcedure !== 'covered') {
          lines.push(copy.resultPush);
        } else if (!typeMatches(kind.value, facts.keyTypes || [])) {
          lines.push(copy.resultType);
        } else if (facts.onboardStatus === 'unknown' || facts.minimumWorkingKeys === 'unknown') {
          lines.push(copy.resultUnknown);
        } else {
          var count = keys.value === '2' ? 2 : Number(keys.value);
          var min = facts.minimumWorkingKeys;
          if (facts.onboardStatus === 'yes') {
            lines.push(count >= min ? copy.resultDiy : fill(copy.resultShop, { min: min }));
          } else if (facts.onboardStatus === 'needs-tool') {
            lines.push(count < min ? copy.resultToolShop : copy.resultTool);
          } else {
            lines.push(fill(copy.resultShop, { min: min }));
          }
        }
        if (push.value === 'unsure') lines.push(copy.resultUnsurePush);
        out.hidden = false;
        out.textContent = lines.join(' ');
      });
    });
  }

  function initFcc(root, rows, copy) {
    var input = root.querySelector('[data-fcc-input]');
    var list = root.querySelector('[data-fcc-results]');
    var status = root.querySelector('[data-fcc-status]');
    var tableRows = document.querySelectorAll('[data-fcc-row]');
    if (!input || !list) return;
    input.addEventListener('input', function () {
      var query = norm(input.value);
      tableRows.forEach(function (row) {
        var id = row.getAttribute('data-fcc-norm') || '';
        row.hidden = Boolean(query) && id !== query && id.indexOf(query) === -1;
      });
      if (!query) {
        status.hidden = true;
        list.hidden = true;
        return;
      }
      var matches = rows.filter(function (row) {
        return row.fcc.some(function (item) { return item.norm === query || item.norm.indexOf(query) !== -1; });
      });
      list.hidden = false;
      list.innerHTML = '';
      if (!matches.length) {
        status.hidden = false;
        status.textContent = copy.fccNone;
        return;
      }
      status.hidden = false;
      status.textContent = fill(copy.fccCount, { n: matches.length });
      matches.forEach(function (vehicle) {
        var item = document.createElement('li');
        var link = document.createElement('a');
        link.href = vehicle.href;
        link.textContent = vehicle.label;
        item.appendChild(link);
        var parts = document.createElement('div');
        parts.textContent = vehicle.parts.length ? vehicle.parts.join(', ') : copy.batteryUnknown;
        item.appendChild(parts);
        list.appendChild(item);
      });
    });
  }

  var catalog = readJson('directory-catalog');
  var copy = readJson('directory-copy');
  if (catalog && copy) {
    document.querySelectorAll('[data-lookup]').forEach(function (root) {
      initLookup(root, catalog.vehicles, copy, catalog.prefix);
    });
    document.querySelectorAll('[data-fcc-search]').forEach(function (root) {
      initFcc(root, catalog.vehicles.map(function (vehicle) {
        return { label: vehicle.label, href: catalog.prefix + vehicle.path + '/', fcc: vehicle.fcc, parts: vehicle.parts };
      }), copy);
    });
  }
  document.querySelectorAll('[data-quiz]').forEach(initQuiz);
})();
