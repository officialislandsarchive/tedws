let currentData = '';  // Stores raw search results
let formattedData = ''; // Stores formatted results

function search() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  
  // Clear previous results
  resultsDiv.innerHTML = '';
  document.getElementById('view-buttons').style.display = 'none';

  // Fetch the allscripts.txt file data
  fetch('allscripts.txt')
    .then(response => response.text())
    .then(gameData => {
      // Search logic
      const foundData = gameData.split('\n').filter(line => line.toLowerCase().includes(query));

      if (foundData.length > 0) {
        currentData = foundData.join('\n');  // Save the raw search results
        formattedData = formatReadable(currentData); // Format the data for normal users

        resultsDiv.innerHTML = `<pre>${currentData}</pre>`;
        document.getElementById('view-buttons').style.display = 'block';  // Show the toggle buttons
      } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
      }
    });
}

// Function to show the raw code view
function showCodeView() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<pre>${currentData}</pre>`;
}

// Function to show the formatted view for normal users
function showFormattedView() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<pre>${formattedData}</pre>`;
}

// Function to convert code-like content into readable text
function formatReadable(data) {
  // Simplify and translate common patterns for normal players
  return data
    .replace(/ItemId/g, 'Item')
    .replace(/Weight = ([\d.]+)/g, (_, weight) => `Drop Rate = ${(weight * 100).toFixed(2)}%`)
    .replace(/return require.+?\}/g, 'Item Definition')  // Strips long require lines for simplicity
    .replace(/rbxassetid:\/\/\d+/g, '[Asset ID]')  // Replaces asset IDs with a generic label
    .replace(/local/g, 'Variable')
    .replace(/function/g, 'Function')
    .replace(/\s*--.+/g, '')  // Remove comments for clarity
    .replace(/\{(.+)\}/g, '[$1]') // Format Lua-like tables as readable lists
    .replace(/\[\]/g, 'Empty List');
}
