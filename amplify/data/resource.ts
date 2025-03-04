import { a, type ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  notification: a.model({
    id: a.id().required(),
    title: a.string(),
    description: a.string(),
    datecreated: a.timestamp().required(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  report: a.model({
    id: a.id().required(),
    comments: a.string(),
    datecreated: a.timestamp().required(),
    datereported: a.timestamp().required(),
    datelastupdated: a.timestamp(),
    latitude: a.float(),
    longitude: a.float(),
    status: a.enum(['NOT_VERIFIED', 'VERIFIED']),
    estimatedcount: a.string(),
    reportername: a.string(),
    reporteremail: a.string(),
    locationname: a.string(),
    zoom: a.integer(),
    token: a.string(),
    accuracy: a.float(),
    deleted: a.boolean(),
    assessorname: a.string(),
    assessorcomments: a.string(),
    reportedspecies: a.string(),
    dateverified: a.timestamp(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  reportingextent: a.model({
    id: a.id().required(),
    geom: a.customType({
      id: a.id(),
      location: a.string(),
    }),
    CMA_NO: a.integer(),
    CMANAME: a.string(),
    AREASQM: a.float(),
    HECTARES: a.float(),
  }).secondaryIndexes((index) => [index['geom']]).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  reportphoto: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('Report', 'id'),
    filepath: a.string(),
    filesize: a.integer(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  reportsound: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('Report', 'id'),
    filepath: a.string(),
    soundstarttime: a.timestamp(),
    soundendtime: a.timestamp(),
    filesize: a.integer(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  reportspecies: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('Report', 'id'),
    speciesid: a.integer(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  reportweatherdata: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('Report', 'id'),
    airtemp: a.float(),
    rainfallamount: a.float(),
    timesincelastrainfall: a.string(),
    relativehumidity: a.float(),
    windspeed: a.float(),
    weathercomments: a.string(),
    stationname: a.string(),
    stationid: a.string(),
    failurereason: a.string(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  spatial_ref_sys: a.model({
    srid: a.integer().required(),
    auth_name: a.string(),
    auth_srid: a.integer(),
    srtext: a.string(),
    proj4text: a.string(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  spatialarea: a.model({
    geom: a.customType({
      id: a.id(),
      location: a.string(),
    }),
    id: a.integer(),
    name: a.string(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  species: a.model({
    id: a.integer().required(),
    category: a.string(),
    description: a.string(),
    name: a.string(),
    photo: a.string(),
    scientificname: a.string(),
    subcategory: a.string(),
    url1: a.string(),
    url2: a.string(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),

  userfeedback: a.model({
    id: a.id().required(),
    rating: a.integer().required(),
    comments: a.string(),
    reportername: a.string(),
    reporteremail: a.string(),
  }).authorization(allow => [allow.owner(), allow.publicApiKey(), allow.authenticated()]),
});
