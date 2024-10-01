let currentData = '';  // To store the raw search result

// Search function
function search() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  
  // Clear previous results
  resultsDiv.innerHTML = '';
  document.getElementById('view-buttons').style.display = 'none';

  // Load the game data from the allscripts.txt file
  fetch('allscripts.txt')
    .then(response => response.text())
    .then(gameData => {
      // Search logic
      const foundData = gameData.split('\n').filter(line => line.toLowerCase().includes(query));

      if (foundData.length > 0) {
        currentData = foundData.join('\n');  // Save the current data
        resultsDiv.innerHTML = `<pre>${currentData}</pre>`;
        document.getElementById('view-buttons').style.display = 'block';  // Show the view toggle buttons
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

// Function to show the formatted view (for non-coders)
function showFormattedView() {
  const formattedData = formatReadable(currentData);
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<pre>${formattedData}</pre>`;
}

// Function to convert code-like content into readable text
function formatReadable(data) {
  // Basic formatting example (this can be expanded as needed)
  return data
    .replace(/ItemId/g, 'Item')
    .replace(/Catagory/g, 'Category')
    .replace(/Weight = ([\d.]+)/g, (_, weight) => `Drop Rate = ${(weight * 100).toFixed(2)}%`)
    .replace(/return require.+?\}/g, 'Item Definition')  // Strips long require lines for simplicity
    .replace(/rbxassetid:\/\/\d+/g, '[Asset ID]');  // Replaces asset IDs with a generic label
}
