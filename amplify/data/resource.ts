import { a, ClientSchema, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  notification: a.model({
    id: a.id().required(),
    title: a.string(),
    description: a.string(),
    datecreated: a.timestamp().required(),
  }).identifier(['id']),

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
    photos: a.hasMany('reportphoto', 'id'),
    sound: a.hasOne('reportsound', 'id'),
    species: a.hasMany('species', 'id'),
  }).identifier(['id']),

  // reportingextent: a.model({
  //   id: a.id().required(),
  //   geom: a.customType({
  //     id: a.id(),
  //     location: a.string(),
  //   }),
  //   CMA_NO: a.integer(),
  //   CMANAME: a.string(),
  //   AREASQM: a.float(),
  //   HECTARES: a.float(),
  // })
  //   .identifier(['id'])
  //   .authorization(allow => [allow.owner()]),
    // .secondaryIndexes((index) => [index['geom']]),

  reportphoto: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('report', 'id'),
    filepath: a.string(),
    filesize: a.integer(),
  }).identifier(['id']),

  reportsound: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('report', 'id'),
    filepath: a.string(),
    soundstarttime: a.timestamp(),
    soundendtime: a.timestamp(),
    filesize: a.integer(),
  }).identifier(['id']),

  // reportspecies: a.model({
  //   id: a.id().required(),
  //   reportid: a.belongsTo('report', 'id'),
  //   speciesid: a.integer(),
  // })
  //   .identifier(['id'])
  //   .authorization(allow => [allow.owner()]),

  // reportweatherdata: a.model({
  //   id: a.id().required(),
  //   // reportid: a.belongsTo('report', 'id'),
  //   airtemp: a.float(),
  //   rainfallamount: a.float(),
  //   timesincelastrainfall: a.string(),
  //   relativehumidity: a.float(),
  //   windspeed: a.float(),
  //   weathercomments: a.string(),
  //   stationname: a.string(),
  //   stationid: a.string(),
  //   failurereason: a.string(),
  // })
  //   .identifier(['id'])
  //   .authorization(allow => [allow.owner()]),

  // spatial_ref_sys: a.model({
  //   srid: a.integer().required(),
  //   auth_name: a.string(),
  //   auth_srid: a.integer(),
  //   srtext: a.string(),
  //   proj4text: a.string(),
  // }).authorization(allow => [allow.owner()]),
  //
  // spatialarea: a.model({
  //   geom: a.customType({
  //     id: a.id(),
  //     location: a.string(),
  //   }),
  //   id: a.integer(),
  //   name: a.string(),
  // }).authorization(allow => [allow.owner()]),

  species: a.model({
    id: a.id().required(),
    reportid: a.belongsTo('report', 'id'),
    category: a.string(),
    description: a.string(),
    name: a.string(),
    photo: a.string(),
    scientificname: a.string(),
    subcategory: a.string(),
    url1: a.string(),
    url2: a.string(),
  }).identifier(['id']),

  userfeedback: a.model({
    id: a.id().required(),
    rating: a.integer().required(),
    comments: a.string(),
    reportername: a.string(),
    reporteremail: a.string(),
  }).identifier(['id']),

  UserActivity: a.model({
    email: a.string().required(),
    activityType: a.enum(['startUp', 'reportSubmission', 'reportSubmissionWithSpeciesIdentified', 'reportSubmissionInPeakMonths', 'reportSubmissionWithSpeciesIdentifiedInPeakMonths']),
    reportId: a.string(),
    createdAt: a.timestamp(),
  }).identifier(['email']),

  ActivityType: a.model({
    id: a.id().required(),
    activityTypeId: a.enum(['startUp', 'reportSubmission', 'reportSubmissionWithSpeciesIdentified', 'reportSubmissionInPeakMonths', 'reportSubmissionWithSpeciesIdentifiedInPeakMonths']),
    points: a.integer(),
  }).identifier(['id']),

  Badge: a.model({
    id: a.id().required(),
    name: a.string(),
    points: a.integer(),
    icon: a.string(),
  }).identifier(['id']),
}).authorization(allow => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema
});
