function search() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  
  // Clear previous results
  resultsDiv.innerHTML = '';

  // Load the game data from the allscripts.txt file
  fetch('allscripts.txt')
    .then(response => response.text())
    .then(gameData => {
      // Search logic
      const foundData = gameData.split('\n').filter(line => line.toLowerCase().includes(query));
      
      if (foundData.length > 0) {
        resultsDiv.innerHTML = `<pre>${foundData.join('\n')}</pre>`;
      } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
      }
    });
}
