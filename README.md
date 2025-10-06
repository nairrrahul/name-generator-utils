Some name generation utilities for regen names, particularly for FIFA/FC and FM. Currently only supports male names. Makes use of the `fifa-name-generator` library.

Contains three utilities:

#### User-Customizable Name Generation

Allows the user to submit a primary and optional secondary nationality of their choice, and generates a name based off that.

Can toggle to `BATCH MODE`, where the user can submit 3-letter abbreviations of countries (either a singular country or 2 if a second nationality is desired) line-by-line. Valid 3-letter abbreviations can be found in `data/nations.json`

#### Demographic-Realistic Name Generation

Generate a set number of names from a country such that the names generated follow some reasonable demographic trends. Second nationalities are based on both immigration statistics and general groups of second nationalities present in male soccer players in the selected country

#### Team Generator

Given a user-submitted country, generate a starting eleven of regen players. Nationalities and second nationalities are shown by flag. Hover over the flag to see what country it is for.