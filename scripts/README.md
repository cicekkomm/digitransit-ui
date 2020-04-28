## Scripts

### Update Covid-19 icons
This script updates all the Covid-19 layer icons in the `sprite.hb.svg` file according to the [caresteouvert GitHub repo](https://github.com/osmontrouge/caresteouvert).
#### Prerequisites
Install the svgpathtools Python module: `pip3 install svgpathtools`
#### Execute
`./scripts/update-covid-icons`

### Update Covid-19 translations
This script updates all the Covid-19 layer category German and English translations in the `translations.js` file according to the [caresteouvert GitHub repo](https://github.com/osmontrouge/caresteouvert).
#### Prerequisites
Install the fileinput Python module: `pip3 install fileinput`
#### Execute
`./scripts/update-covid-translations`