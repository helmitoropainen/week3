import "./styles.css";

const table = document.getElementById("population-table");
getData();

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const urlEmp =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

  const dataPromise = await fetch(url);
  const dataPromiseEmp = await fetch(urlEmp);

  const dataJSON = await dataPromise.json();
  const empJSON = await dataPromiseEmp.json();

  const dimensions = dataJSON.dataset.dimension.Alue.category.label;
  const values = dataJSON.dataset.value;
  const valuesEmp = empJSON.dataset.value;

  let i = 0;

  for (const [, value] of Object.entries(dimensions)) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = value;
    td2.innerText = values[i];
    td3.innerText = valuesEmp[i];
    let percent = Math.round((valuesEmp[i] / values[i]) * 100) / 100;
    td4.innerText = percent;
    if (percent > 0.45) {
      tr.setAttribute("class", "over45");
    } else if (percent < 0.25) {
      tr.setAttribute("class", "under25");
    }
    i++;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    table.appendChild(tr);
  }
}
