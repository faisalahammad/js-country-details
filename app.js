const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search countries api and filter()
search.addEventListener("input", () => searchCountries(search.value));

const searchCountries = async searchText => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  // get matches to current text input
  let matches = countries.filter(country => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return (
      country.name.match(regex) ||
      country.alpha2Code.match(regex) ||
      country.capital.match(regex)
    );
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputCountry(matches);
};

// ---------- Show result in html ---------- //
const outputCountry = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
            <div class="card">
                <div class="row">

                    <div class="col-md-6 my-auto">
                        <img src="${match.flag}" alt="${match.name}" class="card-img-top"/>
                    </div>

                    <div class="col-md-6 my-auto">
                        <div class="card-body">
                            <h5 class="card-title">${match.name} (${match.alpha2Code})
                                <span class="text-primary">${match.capital}</span>
                            </h5>
                            <div class="card-text">
                                <ul>
                                    <li>Nationality: ${match.demonym}</li>
                                    <li>Timezone: ${match.timezones}</li>
                                    <li>Region: ${match.region}</li>
                                    <li>Population: ${match.population}</li>
                                    <li>Currency: ${match.currencies[0].name} (${match.currencies[0].code})</li>
                                    <li>Language: ${match.languages[0].name} / ${match.languages[0].nativeName}</li>
                                    <li>Border Countries: ${match.borders}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `
      )
      .join();

    matchList.innerHTML = html;
  }
};
