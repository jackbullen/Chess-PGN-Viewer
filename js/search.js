// JavaScript function to display a search bar and autocomplete based on the name field
// and use several TSV files. The function returns the ECO, name, and PGN when the search
// is submitted.
const searchBar = document.getElementById('search-bar');

// An array to store the data from the TSV files
const data = [];

// Load the TSV files and store the data in the array
Promise.all([
    fetch('./data/a.tsv').then(response => response.text()),
    fetch('./data/b.tsv').then(response => response.text()),
    fetch('./data/c.tsv').then(response => response.text()),
    fetch('./data/d.tsv').then(response => response.text()),
    fetch('./data/e.tsv').then(response => response.text())
  ]).then(tsvs => {
    // Split the TSV strings into rows
    const rows = tsvs.map(tsv => tsv.split('\n'));
    // Split each row into columns and store the resulting arrays in the data array
    rows.forEach(row => {
      row.forEach(col => {
        data.push(col.split('\t'));
      });
    });
  
    searchBar.addEventListener('input', e => {
      // Get the search term
  
      const searchTerm = e.target.value.toLowerCase();
    
      // Filter the data based on the search term
      const searchResults = data.filter(row => {
        return row[1] && row[1].toLowerCase().includes(searchTerm);
      });
    
      // Clear the list of search results
      document.getElementById('search-results').innerHTML = '';
  //   console.log('g');
      if (searchResults.length > 0) {

        console.log(searchResults);
        // Display the search results as a list
        for (const result of searchResults) {
            const li = document.createElement('li');
            li.textContent = result[1];
            document.getElementById('search-results').appendChild(li);
            li.addEventListener('click', e => {
                const selectedRow = data.find(row => row[1] === e.target.textContent);
                const pgn = selectedRow[2];
                //   Set the value of the 'pgninput' textarea to the PGN value
                document.getElementById('pgn-input').value = pgn;
                document.getElementById('search-results').innerHTML = '';
                document.getElementById('search-results').style.display = 'none';
                document.getElementById('search-bar').value = selectedRow[1];
                // Hide the search results list
                // searchResultsList.style.display = 'none';
            });
        }

  

    
        // Show the search results box
        document.getElementById('search-results').style.display = 'block';
      } else {
        // Hide the search results box
        document.getElementById('search-results').style.display = 'none';
      }
    });
    
  
    searchBar.addEventListener('blur', e => {
        // Clear the list of search results
        // document.getElementById('search-results').innerHTML = '';
      
        // Hide the search results box
        // document.getElementById('search-results').style.display = 'none';
      });
      
    
      // Handle the search submission
      document.getElementById('search-form').addEventListener('submit', e => {
        e.preventDefault();
        

        // Clear any previous search results
        document.getElementById('search-results').innerHTML = '';
    
        // Get the search term
        const searchTerm = searchBar.value;
     

        // Find the row in the 'data' array that corresponds to the clicked 'li' element
        const selectedRow = data.find(row => row[1] === searchTerm);

        // Get the PGN value from the selected row
        const pgn = selectedRow[2];

        console.log(selectedRow);
        // Set the value of the 'pgninput' textarea to the PGN value
        document.getElementById('pgn-input').value = pgn;
    
        // Clear the search bar
        searchBar.value = '';
      
        // Hide the search results box
        document.getElementById('search-results').style.display = 'none';
    
        // // Display the search results
        // searchResults.forEach(result => {
        //   const p = document.createElement('p');
        //   p.textContent = `ECO: ${result[0]}, Name: ${result[1]}, PGN: ${result[2]}`;
        //   document.getElementById('search-results').appendChild(p);
        // });
      });
    });
  
            // console.log('g');
        // // // Add a 'click' event listener to each 'li' element in the search results list
        // // const searchResultsList = document.getElementById('search-results');
        // document.getElementById('search-results').addEventListener('click', e => {
        //     console.log(e.target);
        //     if (e.target === 'li') {
        //       // Set the value of the search bar to the text content of the clicked 'li' element
        //       searchBar.value = e.target.textContent;
    
        //       // Find the row in the 'data' array that corresponds to the clicked 'li' element
        //       const selectedRow = data.find(row => row[1] === e.target.textContent);
    
        //       // Get the PGN value from the selected row
        //       const pgn = selectedRow[2];
    
        //       // Set the value of the 'pgninput' textarea to the PGN value
        //       document.getElementById('pgninput').value = pgn;
    
        //       // Hide the search results list
        //       searchResultsList.style.display = 'none';
        //     }
        //   });