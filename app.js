async function compareJSONs() {
  const inputA = document.getElementById("inputA").value.trim();
  const inputB = document.getElementById("inputB").value.trim();
  const resultContainer = document.getElementById("resultContainer");

  resultContainer.innerHTML = `<p>⏳ Comparing...</p>`;

  try {
    const response = await fetch("https://json-diff-backend.onrender.com/compare", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input_a: inputA, input_b: inputB }),
    });

    const result = await response.json();

    if (response.ok) {
      resultContainer.innerHTML = renderDiff(result);
    } else {
      resultContainer.innerHTML = `<div class="error-box">❌ Error: ${result.detail || "Something went wrong."}</div>`;
    }
  } catch (err) {
    resultContainer.innerHTML = `<div class="error-box">❌ Error comparing JSONs: ${err.message}</div>`;
  }
}

function renderDiff(result) {
  let html = `<div class="diff-result">`;

  if (result.modified?.length) {
    html += `<h3>🟡 Modified Fields:</h3>`;
    result.modified.forEach(entry => {
      html += `
        <div class="diff-item modified">
          <div><strong>${entry.field}</strong></div>
          <div><span class="label">JSON A:</span> ${JSON.stringify(entry.json_a)}</div>
          <div><span class="label">JSON B:</span> ${JSON.stringify(entry.json_b)}</div>
        </div>
      `;
    });
  }

  if (result.added?.length) {
    html += `<h3>🟢 Added in JSON B:</h3>`;
    result.added.forEach(entry => {
      html += `
        <div class="diff-item added">
          <div><strong>${entry.field}</strong></div>
          <div><span class="label">JSON B:</span> ${entry.json_b}</div>
        </div>
      `;
    });
  }

  if (result.removed?.length) {
    html += `<h3>🔴 Removed from JSON B:</h3>`;
    result.removed.forEach(entry => {
      html += `
        <div class="diff-item removed">
          <div><strong>${entry.field}</strong></div>
          <div><span class="label">JSON A:</span> ${entry.json_a}</div>
        </div>
      `;
    });
  }

  if (!result.modified?.length && !result.added?.length && !result.removed?.length) {
    html += `<p>✅ No differences found.</p>`;
  }

  html += `</div>`;
  return html;
}

// ✅ Fixed dark mode toggle (now matches CSS)
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
});






// async function compareJSONs() {
//   const inputA = document.getElementById("inputA").value.trim();
//   const inputB = document.getElementById("inputB").value.trim();
//   const resultContainer = document.getElementById("resultContainer");

//   resultContainer.innerHTML = `<p>⏳ Comparing...</p>`;

//   try {
//     const response = await fetch("http://127.0.0.1:8000/compare", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ input_a: inputA, input_b: inputB }),
//     });

//     const result = await response.json();

//     if (response.ok) {
//       resultContainer.innerHTML = renderDiff(result);
//     } else {
//       resultContainer.innerHTML = `<div class="error-box">❌ Error: ${result.detail || "Something went wrong."}</div>`;
//     }
//   } catch (err) {
//     resultContainer.innerHTML = `<div class="error-box">❌ Error comparing JSONs: ${err.message}</div>`;
//   }
// }

// function renderDiff(result) {
//   let html = `<div class="diff-result">`;

//   if (result.modified?.length) {
//     html += `<h3>🟡 Modified Fields:</h3>`;
//     result.modified.forEach(entry => {
//       html += `
//         <div class="diff-item modified">
//           <div><strong>${entry.field}</strong></div>
//           <div><span class="label">JSON A:</span> ${JSON.stringify(entry.json_a)}</div>
//           <div><span class="label">JSON B:</span> ${JSON.stringify(entry.json_b)}</div>
//         </div>
//       `;
//     });
//   }

//   if (result.added?.length) {
//     html += `<h3>🟢 Added in JSON B:</h3>`;
//     result.added.forEach(entry => {
//       html += `
//         <div class="diff-item added">
//           <div><strong>${entry.field}</strong></div>
//           <div><span class="label">JSON B:</span> ${entry.json_b}</div>
//         </div>
//       `;
//     });
//   }

//   if (result.removed?.length) {
//     html += `<h3>🔴 Removed from JSON B:</h3>`;
//     result.removed.forEach(entry => {
//       html += `
//         <div class="diff-item removed">
//           <div><strong>${entry.field}</strong></div>
//           <div><span class="label">JSON A:</span> ${entry.json_a}</div>
//         </div>
//       `;
//     });
//   }

//   if (!result.modified?.length && !result.added?.length && !result.removed?.length) {
//     html += `<p>✅ No differences found.</p>`;
//   }

//   html += `</div>`;
//   return html;
// }

// // Toggle dark mode
// document.getElementById("darkModeToggle").addEventListener("change", function () {
//   document.body.classList.toggle("dark-mode", this.checked);
// });









// // // Enable dark mode toggle
// // document.getElementById('darkModeToggle').addEventListener('change', function () {
// //   document.body.classList.toggle('dark', this.checked);
// // });

// // // Compare JSONs or cURLs
// // function compareJSONs() {
// //   const inputA = document.getElementById('inputA').value;
// //   const inputB = document.getElementById('inputB').value;
// //   const resultContainer = document.getElementById('resultContainer');

// //   resultContainer.textContent = '⏳ Comparing...';

// //   fetch('http://127.0.0.1:8000/compare', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({
// //       input_a: inputA,
// //       input_b: inputB
// //     })
// //   })
// //     .then(response => response.json())
// //     .then(data => {
// //       resultContainer.textContent = data.result || JSON.stringify(data, null, 2);
// //     })
// //     .catch(error => {
// //       resultContainer.textContent = '❌ Error comparing JSONs: ' + error;
// //     });
// // }
