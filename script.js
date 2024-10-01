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
      // Search logic for relevant lines containing the query
      const foundData = gameData.split('\n').filter(line => line.toLowerCase().includes(query));
      
      if (foundData.length > 0) {
        // Combine all relevant results
        currentData = foundData.join('\n');
        formattedData = formatReadable(currentData); // Format for display

        resultsDiv.innerHTML = `<pre>${currentData}</pre>`;
        document.getElementById('view-buttons').style.display = 'block';  // Show toggle buttons
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
  const lines = data.split('\n').filter(line => !line.startsWith('--')); // Exclude metadata lines

  let formatted = '';

  // Add readable content
  for (const line of lines) {
    if (line.includes('new')) {
      formatted += '### Crop Definition\n';
    } else if (line.includes('ItemId')) {
      const [itemId, category] = extractItemData(line);
      formatted += `- **Item**: ${itemId}, **Category**: ${category}\n`;
    } else if (line.includes('Weight')) {
      const weightMatch = line.match(/Weight = ([\d.]+)/);
      if (weightMatch) {
        formatted += `- **Drop Rate**: ${(weightMatch[1] * 100).toFixed(2)}%\n`;
      }
    } else if (line.includes('SellPrice')) {
      const sellPriceMatch = line.match(/SellPrice = (\d+)/);
      if (sellPriceMatch) {
        formatted += `- **Sell Price**: ${sellPriceMatch[1]} coins\n`;
      }
    } else {
      formatted += line + '\n'; // Add any other relevant line
    }
  }

  return formatted;
}

// Helper function to extract item information
function extractItemData(line) {
  const itemIdMatch = line.match(/ItemId = "(.+?)";/);
  const categoryMatch = line.match(/Catagory = "(.+?)";/);
  
  const itemId = itemIdMatch ? itemIdMatch[1] : 'Unknown Item';
  const category = categoryMatch ? categoryMatch[1] : 'Unknown Category';
  
  return [itemId, category];
}
