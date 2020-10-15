/* eslint-disable prefer-template */
const CONFIG = 'vsh';
const API_URL = process.env.API_URL || 'https://api.digitransit.im.verschwoerhaus.de';
const MAP_URL = process.env.MAP_URL || 'https://osm-demo-{s}.wheregroup.com/tiles/1.0.0/osm/webmercator/';
const APP_DESCRIPTION = 'GTFS-basierte Auskunft für Ulm, basierend auf digitransit';
const YEAR = 1900 + new Date().getYear();

const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || `${API_URL}/geocoding/v1`;

const minLat = 48.284106742914524;
const maxLat = 48.55297816440071;
const minLon = 9.743499755859375;
const maxLon = 10.2447509765625;

export default {
  CONFIG,

  URL: {
    API_URL,
    OTP: process.env.OTP_URL || `${API_URL}/routing/v1/routers/vsh/`,
    MAP_URL,
    MAP: {
      default: MAP_URL,
    },
    STOP_MAP: `${API_URL}/map/v1/stop-map/`,
    // CITYBIKE_MAP: `${MAP_URL}/map/v1/finland-citybike-map/`,
    PELIAS: `${GEOCODING_BASE_URL}/search`,
    PELIAS_REVERSE_GEOCODER: `${GEOCODING_BASE_URL}/reverse`,
    CITYBIKE_MAP: `${API_URL}/map/v1/citybike-map/`,
    DYNAMICPARKINGLOTS_MAP: `${API_URL}/map/v1/parking-map/`,
  },

  contactName: {
    de: 'VSH',
    default: 'VSH',
  },

  title: 'ulmrouting',

  availableLanguages: ['de', 'en'],
  defaultLanguage: 'de',

  timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o 00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

  favicon: './app/configurations/images/vsh/favicon.png',

  // Navbar logo
  textLogo: true,
  //logo: 'default/digitransit-logo.png',

  feedIds: ['DING', 'FLIX', 'SPNV'],

  GTMid: '',

  searchSources: ['oa', 'osm'],

  defaultMapCenter: {
    lat: 48.39653,
    lon: 9.99030,
  },

  map: {
    useRetinaTiles: false,
    tileSize: 256,
    zoomOffset: 0,
  },

  nearbyRoutes: {
    radius: 2000,
    bucketSize: 100,
  },

  maxWalkDistance: 2500,
  //itineraryFiltering: 2.5, // drops 40% worse routes

  parkAndRide: {
    showParkAndRide: false,
    parkAndRideMinZoom: 14,
  },

  ticketSales: {
    showTicketSales: false,
    ticketSalesMinZoom: 16,
  },

  showDisclaimer: true,

  stopsMinZoom: 13,

  colors: {
    primary: '#007ac9',
  },

  sprites: 'assets/svg-sprite.hb.svg',

  appBarLink: { name: 'VSH', href: 'https://verschwoerhaus.de' },

  agency: {
    show: false,
  },

  socialMedia: {
    title: 'ulmrouting',
    description: APP_DESCRIPTION,

    image: {
      url: '/img/hsl-social-share.png',
      width: 400,
      height: 400,
    },

    twitter: {
      card: 'summary',
      site: '@verschwoerhaus',
    },
  },

  dynamicParkingLots: {
    showDynamicParkingLots: true,
    dynamicParkingLotsSmallIconZoom: 14,
    dynamicParkingLotsMinZoom: 14
  },

  meta: {
    description: APP_DESCRIPTION,
  },

  useTicketIcons: false,

  transportModes: {
    airplane: {
      availableForSelection: false,
      defaultValue: false,
    },

    subway: {
      availableForSelection: false,
      defaultValue: false,
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false,
    },
    
    citybike: {
      availableForSelection: true,
      defaultValue: true,
    },
  },

  streetModes: {
    bicycle: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'biking',
    },

    car_park: {
      availableForSelection: true,
      defaultValue: false,
      icon: 'car-withoutBox',
    },

    car: {
      availableForSelection: false,
      defaultValue: false,
      icon: 'car_park-withoutBox',
    },
  },

  search: {
    /* identify searches for route numbers/labels: bus | train | metro */
    lineRegexp: new RegExp(
      '(^[0-9]+[a-z]?$|^[yuleapinkrtdz]$|(^m[12]?b?$))',
      'i',
    ),
  },

  //modesWithNoBike: ['BUS', 'TRAM'],

  useSearchPolygon: false,
  searchParams: {
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat],
  ],

  footer: {
    content: [
      { label: `vsh ❤️ digitransit` },
      {},
      {
        name: 'footer-faq',
        nameEn: 'FAQ',
        href: 'https://www.hsl.fi/ohjeita-ja-tietoja/reittiopas',
      },
      {
        name: 'about-this-service',
        nameEn: 'About the service',
        route: '/tietoja-palvelusta',
        icon: 'icon-icon_info',
      },
    ],
  },

  defaultEndpoint: {
    address: 'Verschwörhaus',
    lat: 48.39653,
    lon: 9.99030,
  },

  defaultOrigins: [
    { icon: 'icon-icon_star', label: 'Verschwörhaus', lat: 48.39653, lon: 9.99030 },
    { icon: 'icon-icon_rail', label: 'Hauptbahnhof', lat: 48.39949, lon: 9.98344 },
    { icon: 'icon-icon_tram', label: 'Uni Süd', lat: 48.42153, lon: 9.95652 },
  ],

  queryMaxAgeDays: 14, // to drop too old route request times from entry url

  aboutThisService: {
    de: [
      {
        header: 'Über diesen Service',
        paragraphs: [
          'Welcome to the Journey Planner! The Journey Planner shows you how to get to your destination fast and easy by public transport in Ulm. You can also use the planner to find fast walking and cycling routes, and to an extent, for driving directions. The Journey Planner is provided by Verschwörhaus and it is based on the Digitransit service platform.',
        ],
      },
      {
        header: 'Datenquellen',
        paragraphs: [
          'Maps, streets, buildings, stop locations etc. are provided by © OpenStreetMap contributors. Public transport routes and timetables are based on the GTFS from SWU',
        ],
      },
    ],
    en: [
      {
        header: 'About this service',
        paragraphs: [
          'Welcome to the Journey Planner! The Journey Planner shows you how to get to your destination fast and easy by public transport in Ulm. You can also use the planner to find fast walking and cycling routes, and to an extent, for driving directions. The Journey Planner is provided by Verschwörhaus and it is based on the Digitransit service platform.',
        ],
      },
      {
        header: 'Data sources',
        paragraphs: [
          'Maps, streets, buildings, stop locations etc. are provided by © OpenStreetMap contributors. Public transport routes and timetables are based on the GTFS from SWU.',
        ],
      },
    ],
  },

  showTicketInformation: true,
  ticketLink: 'https://www.swu.de/privatkunden/produkte-leistungen/mobilitaet/tickets-tarife/',

  // mapping (string, lang) from OTP fare identifiers to human readable form
  fareMapping: function mapHslFareId(fareId, lang) {
    const names = {
      de: {
        ee: 'Einzelfahrschein',
      },
      en: {
        ee: 'Single Ticket',
      },
    };
    const mappedLang = names[lang] ? lang : 'de';
    if (fareId && fareId.substring) {
      const fareSplit = fareId.split(':');
      const zone = fareSplit[fareSplit.length-1];
      return names[mappedLang][zone.toLowerCase()] || '';
    }
    return '';
  },

  staticMessages: [
    {
      id: '2',
      content: {
        en: [
          {
            type: 'text',
            content:
              'We use cookies to improve our services. By using this site, you agree to its use of cookies. Read more: ',
          },
          {
            type: 'a',
            content: 'Privacy Statement',
            href: 'https://verschwoerhaus.de/en/datenschutzerklaerung/',
          },
        ],
        de: [
          {
            type: 'text',
            content:
              'Wir nutzen Cookies um unseren Service zu verbessern. Wenn du diese Seite nutzt, stimmst du zu, dass wir Cookies verwenden dürfen. Mehr:',
          },
          {
            type: 'a',
            content: 'Datenschutzerklärung',
            href: 'https://verschwoerhaus.de/datenschutzerklaerung/',
          },
        ],
      },
    },
  ],

  themeMap: {
    vsh: 'vsh',
  },

  cityBike: {
    showCityBikes: true,
    networks: {
      openbike: {
        icon: 'citybike',
        name: {
          de: 'OpenBike',
          en: 'OpenBike',
        },
        type: 'citybike',
        url: {
          de: 'https://openbike.ulm.dev',
          en: 'https://openbike.ulm.dev'
        }
      },
      zeus: {
        icon: 'scooter',
        name: {
          de: 'Zeus',
          en: 'Zeus',
        },
        type: 'scooter',
        url: {
          de: 'https://de.zeusscooters.com',
          en: 'https://zeusscooters.com',
        },
      },
      bird: {
        icon: 'scooter',
        name: {
          de: 'Bird',
          en: 'Bird',
        },
        type: 'scooter',
        url: {
          de: 'https://www.bird.co/de/',
          en: 'https://www.bird.co',
        },
      },
    }
    
  },

  // TODO: staticIEMessage
};
