// node_modules/proj4/lib/global.js
function global_default(defs2) {
  defs2("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
  defs2("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
  defs2("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
  for (var i = 1; i <= 60; ++i) {
    defs2("EPSG:" + (32600 + i), "+proj=utm +zone=" + i + " +datum=WGS84 +units=m");
    defs2("EPSG:" + (32700 + i), "+proj=utm +zone=" + i + " +south +datum=WGS84 +units=m");
  }
  defs2.WGS84 = defs2["EPSG:4326"];
  defs2["EPSG:3785"] = defs2["EPSG:3857"];
  defs2.GOOGLE = defs2["EPSG:3857"];
  defs2["EPSG:900913"] = defs2["EPSG:3857"];
  defs2["EPSG:102113"] = defs2["EPSG:3857"];
}

// node_modules/proj4/lib/constants/values.js
var PJD_3PARAM = 1;
var PJD_7PARAM = 2;
var PJD_GRIDSHIFT = 3;
var PJD_WGS84 = 4;
var PJD_NODATUM = 5;
var SRS_WGS84_SEMIMAJOR = 6378137;
var SRS_WGS84_SEMIMINOR = 6356752314e-3;
var SRS_WGS84_ESQUARED = 0.0066943799901413165;
var SEC_TO_RAD = 484813681109536e-20;
var HALF_PI = Math.PI / 2;
var SIXTH = 0.16666666666666666;
var RA4 = 0.04722222222222222;
var RA6 = 0.022156084656084655;
var EPSLN = 1e-10;
var D2R = 0.017453292519943295;
var R2D = 57.29577951308232;
var FORTPI = Math.PI / 4;
var TWO_PI = Math.PI * 2;
var SPI = 3.14159265359;

// node_modules/proj4/lib/constants/PrimeMeridian.js
var exports = {};
exports.greenwich = 0;
exports.lisbon = -9.131906111111;
exports.paris = 2.337229166667;
exports.bogota = -74.080916666667;
exports.madrid = -3.687938888889;
exports.rome = 12.452333333333;
exports.bern = 7.439583333333;
exports.jakarta = 106.807719444444;
exports.ferro = -17.666666666667;
exports.brussels = 4.367975;
exports.stockholm = 18.058277777778;
exports.athens = 23.7163375;
exports.oslo = 10.722916666667;

// node_modules/proj4/lib/constants/units.js
var units_default = {
  "mm": { to_meter: 1e-3 },
  "cm": { to_meter: 0.01 },
  "ft": { to_meter: 0.3048 },
  "us-ft": { to_meter: 1200 / 3937 },
  "fath": { to_meter: 1.8288 },
  "kmi": { to_meter: 1852 },
  "us-ch": { to_meter: 20.1168402336805 },
  "us-mi": { to_meter: 1609.34721869444 },
  "km": { to_meter: 1e3 },
  "ind-ft": { to_meter: 0.30479841 },
  "ind-yd": { to_meter: 0.91439523 },
  "mi": { to_meter: 1609.344 },
  "yd": { to_meter: 0.9144 },
  "ch": { to_meter: 20.1168 },
  "link": { to_meter: 0.201168 },
  "dm": { to_meter: 0.01 },
  "in": { to_meter: 0.0254 },
  "ind-ch": { to_meter: 20.11669506 },
  "us-in": { to_meter: 0.025400050800101 },
  "us-yd": { to_meter: 0.914401828803658 }
};

// node_modules/proj4/lib/match.js
var ignoredChar = /[\s_\-\/\(\)]/g;
function match(obj, key) {
  if (obj[key]) {
    return obj[key];
  }
  var keys = Object.keys(obj);
  var lkey = key.toLowerCase().replace(ignoredChar, "");
  var i = -1;
  var testkey, processedKey;
  while (++i < keys.length) {
    testkey = keys[i];
    processedKey = testkey.toLowerCase().replace(ignoredChar, "");
    if (processedKey === lkey) {
      return obj[testkey];
    }
  }
}

// node_modules/proj4/lib/projString.js
function projString_default(defData) {
  var self = {};
  var paramObj = defData.split("+").map(function(v2) {
    return v2.trim();
  }).filter(function(a2) {
    return a2;
  }).reduce(function(p2, a2) {
    var split = a2.split("=");
    split.push(true);
    p2[split[0].toLowerCase()] = split[1];
    return p2;
  }, {});
  var paramName, paramVal, paramOutname;
  var params2 = {
    proj: "projName",
    datum: "datumCode",
    rf: function(v2) {
      self.rf = parseFloat(v2);
    },
    lat_0: function(v2) {
      self.lat0 = v2 * D2R;
    },
    lat_1: function(v2) {
      self.lat1 = v2 * D2R;
    },
    lat_2: function(v2) {
      self.lat2 = v2 * D2R;
    },
    lat_ts: function(v2) {
      self.lat_ts = v2 * D2R;
    },
    lon_0: function(v2) {
      self.long0 = v2 * D2R;
    },
    lon_1: function(v2) {
      self.long1 = v2 * D2R;
    },
    lon_2: function(v2) {
      self.long2 = v2 * D2R;
    },
    alpha: function(v2) {
      self.alpha = parseFloat(v2) * D2R;
    },
    gamma: function(v2) {
      self.rectified_grid_angle = parseFloat(v2);
    },
    lonc: function(v2) {
      self.longc = v2 * D2R;
    },
    x_0: function(v2) {
      self.x0 = parseFloat(v2);
    },
    y_0: function(v2) {
      self.y0 = parseFloat(v2);
    },
    k_0: function(v2) {
      self.k0 = parseFloat(v2);
    },
    k: function(v2) {
      self.k0 = parseFloat(v2);
    },
    a: function(v2) {
      self.a = parseFloat(v2);
    },
    b: function(v2) {
      self.b = parseFloat(v2);
    },
    r: function(v2) {
      self.a = self.b = parseFloat(v2);
    },
    r_a: function() {
      self.R_A = true;
    },
    zone: function(v2) {
      self.zone = parseInt(v2, 10);
    },
    south: function() {
      self.utmSouth = true;
    },
    towgs84: function(v2) {
      self.datum_params = v2.split(",").map(function(a2) {
        return parseFloat(a2);
      });
    },
    to_meter: function(v2) {
      self.to_meter = parseFloat(v2);
    },
    units: function(v2) {
      self.units = v2;
      var unit = match(units_default, v2);
      if (unit) {
        self.to_meter = unit.to_meter;
      }
    },
    from_greenwich: function(v2) {
      self.from_greenwich = v2 * D2R;
    },
    pm: function(v2) {
      var pm = match(exports, v2);
      self.from_greenwich = (pm ? pm : parseFloat(v2)) * D2R;
    },
    nadgrids: function(v2) {
      if (v2 === "@null") {
        self.datumCode = "none";
      } else {
        self.nadgrids = v2;
      }
    },
    axis: function(v2) {
      var legalAxis = "ewnsud";
      if (v2.length === 3 && legalAxis.indexOf(v2.substr(0, 1)) !== -1 && legalAxis.indexOf(v2.substr(1, 1)) !== -1 && legalAxis.indexOf(v2.substr(2, 1)) !== -1) {
        self.axis = v2;
      }
    },
    approx: function() {
      self.approx = true;
    }
  };
  for (paramName in paramObj) {
    paramVal = paramObj[paramName];
    if (paramName in params2) {
      paramOutname = params2[paramName];
      if (typeof paramOutname === "function") {
        paramOutname(paramVal);
      } else {
        self[paramOutname] = paramVal;
      }
    } else {
      self[paramName] = paramVal;
    }
  }
  if (typeof self.datumCode === "string" && self.datumCode !== "WGS84") {
    self.datumCode = self.datumCode.toLowerCase();
  }
  return self;
}

// node_modules/wkt-parser/parser.js
var parser_default = parseString;
var NEUTRAL = 1;
var KEYWORD = 2;
var NUMBER = 3;
var QUOTED = 4;
var AFTERQUOTE = 5;
var ENDED = -1;
var whitespace = /\s/;
var latin = /[A-Za-z]/;
var keyword = /[A-Za-z84_]/;
var endThings = /[,\]]/;
var digets = /[\d\.E\-\+]/;
function Parser(text) {
  if (typeof text !== "string") {
    throw new Error("not a string");
  }
  this.text = text.trim();
  this.level = 0;
  this.place = 0;
  this.root = null;
  this.stack = [];
  this.currentObject = null;
  this.state = NEUTRAL;
}
Parser.prototype.readCharicter = function() {
  var char = this.text[this.place++];
  if (this.state !== QUOTED) {
    while (whitespace.test(char)) {
      if (this.place >= this.text.length) {
        return;
      }
      char = this.text[this.place++];
    }
  }
  switch (this.state) {
    case NEUTRAL:
      return this.neutral(char);
    case KEYWORD:
      return this.keyword(char);
    case QUOTED:
      return this.quoted(char);
    case AFTERQUOTE:
      return this.afterquote(char);
    case NUMBER:
      return this.number(char);
    case ENDED:
      return;
  }
};
Parser.prototype.afterquote = function(char) {
  if (char === '"') {
    this.word += '"';
    this.state = QUOTED;
    return;
  }
  if (endThings.test(char)) {
    this.word = this.word.trim();
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in afterquote yet, index ' + this.place);
};
Parser.prototype.afterItem = function(char) {
  if (char === ",") {
    if (this.word !== null) {
      this.currentObject.push(this.word);
    }
    this.word = null;
    this.state = NEUTRAL;
    return;
  }
  if (char === "]") {
    this.level--;
    if (this.word !== null) {
      this.currentObject.push(this.word);
      this.word = null;
    }
    this.state = NEUTRAL;
    this.currentObject = this.stack.pop();
    if (!this.currentObject) {
      this.state = ENDED;
    }
    return;
  }
};
Parser.prototype.number = function(char) {
  if (digets.test(char)) {
    this.word += char;
    return;
  }
  if (endThings.test(char)) {
    this.word = parseFloat(this.word);
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in number yet, index ' + this.place);
};
Parser.prototype.quoted = function(char) {
  if (char === '"') {
    this.state = AFTERQUOTE;
    return;
  }
  this.word += char;
  return;
};
Parser.prototype.keyword = function(char) {
  if (keyword.test(char)) {
    this.word += char;
    return;
  }
  if (char === "[") {
    var newObjects = [];
    newObjects.push(this.word);
    this.level++;
    if (this.root === null) {
      this.root = newObjects;
    } else {
      this.currentObject.push(newObjects);
    }
    this.stack.push(this.currentObject);
    this.currentObject = newObjects;
    this.state = NEUTRAL;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in keyword yet, index ' + this.place);
};
Parser.prototype.neutral = function(char) {
  if (latin.test(char)) {
    this.word = char;
    this.state = KEYWORD;
    return;
  }
  if (char === '"') {
    this.word = "";
    this.state = QUOTED;
    return;
  }
  if (digets.test(char)) {
    this.word = char;
    this.state = NUMBER;
    return;
  }
  if (endThings.test(char)) {
    this.afterItem(char);
    return;
  }
  throw new Error(`havn't handled "` + char + '" in neutral yet, index ' + this.place);
};
Parser.prototype.output = function() {
  while (this.place < this.text.length) {
    this.readCharicter();
  }
  if (this.state === ENDED) {
    return this.root;
  }
  throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
};
function parseString(txt) {
  var parser = new Parser(txt);
  return parser.output();
}

// node_modules/wkt-parser/process.js
function mapit(obj, key, value) {
  if (Array.isArray(key)) {
    value.unshift(key);
    key = null;
  }
  var thing = key ? {} : obj;
  var out = value.reduce(function(newObj, item) {
    sExpr(item, newObj);
    return newObj;
  }, thing);
  if (key) {
    obj[key] = out;
  }
}
function sExpr(v2, obj) {
  if (!Array.isArray(v2)) {
    obj[v2] = true;
    return;
  }
  var key = v2.shift();
  if (key === "PARAMETER") {
    key = v2.shift();
  }
  if (v2.length === 1) {
    if (Array.isArray(v2[0])) {
      obj[key] = {};
      sExpr(v2[0], obj[key]);
      return;
    }
    obj[key] = v2[0];
    return;
  }
  if (!v2.length) {
    obj[key] = true;
    return;
  }
  if (key === "TOWGS84") {
    obj[key] = v2;
    return;
  }
  if (key === "AXIS") {
    if (!(key in obj)) {
      obj[key] = [];
    }
    obj[key].push(v2);
    return;
  }
  if (!Array.isArray(key)) {
    obj[key] = {};
  }
  var i;
  switch (key) {
    case "UNIT":
    case "PRIMEM":
    case "VERT_DATUM":
      obj[key] = {
        name: v2[0].toLowerCase(),
        convert: v2[1]
      };
      if (v2.length === 3) {
        sExpr(v2[2], obj[key]);
      }
      return;
    case "SPHEROID":
    case "ELLIPSOID":
      obj[key] = {
        name: v2[0],
        a: v2[1],
        rf: v2[2]
      };
      if (v2.length === 4) {
        sExpr(v2[3], obj[key]);
      }
      return;
    case "EDATUM":
    case "ENGINEERINGDATUM":
    case "LOCAL_DATUM":
    case "DATUM":
    case "VERT_CS":
    case "VERTCRS":
    case "VERTICALCRS":
      v2[0] = ["name", v2[0]];
      mapit(obj, key, v2);
      return;
    case "COMPD_CS":
    case "COMPOUNDCRS":
    case "FITTED_CS":
    // the followings are the crs defined in
    // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
    case "PROJECTEDCRS":
    case "PROJCRS":
    case "GEOGCS":
    case "GEOCCS":
    case "PROJCS":
    case "LOCAL_CS":
    case "GEODCRS":
    case "GEODETICCRS":
    case "GEODETICDATUM":
    case "ENGCRS":
    case "ENGINEERINGCRS":
      v2[0] = ["name", v2[0]];
      mapit(obj, key, v2);
      obj[key].type = key;
      return;
    default:
      i = -1;
      while (++i < v2.length) {
        if (!Array.isArray(v2[i])) {
          return sExpr(v2, obj[key]);
        }
      }
      return mapit(obj, key, v2);
  }
}

// node_modules/wkt-parser/index.js
var D2R2 = 0.017453292519943295;
var knownTypes = [
  "PROJECTEDCRS",
  "PROJCRS",
  "GEOGCS",
  "GEOCCS",
  "PROJCS",
  "LOCAL_CS",
  "GEODCRS",
  "GEODETICCRS",
  "GEODETICDATUM",
  "ENGCRS",
  "ENGINEERINGCRS"
];
function rename(obj, params2) {
  var outName = params2[0];
  var inName = params2[1];
  if (!(outName in obj) && inName in obj) {
    obj[outName] = obj[inName];
    if (params2.length === 3) {
      obj[outName] = params2[2](obj[outName]);
    }
  }
}
function d2r(input) {
  return input * D2R2;
}
function cleanWKT(wkt) {
  var keys = Object.keys(wkt);
  for (var i = 0, ii = keys.length; i < ii; ++i) {
    var key = keys[i];
    if (knownTypes.indexOf(key) !== -1) {
      setPropertiesFromWkt(wkt[key]);
    }
    if (typeof wkt[key] === "object") {
      cleanWKT(wkt[key]);
    }
  }
}
function setPropertiesFromWkt(wkt) {
  if (wkt.AUTHORITY) {
    var authority = Object.keys(wkt.AUTHORITY)[0];
    if (authority && authority in wkt.AUTHORITY) {
      wkt.title = authority + ":" + wkt.AUTHORITY[authority];
    }
  }
  if (wkt.type === "GEOGCS") {
    wkt.projName = "longlat";
  } else if (wkt.type === "LOCAL_CS") {
    wkt.projName = "identity";
    wkt.local = true;
  } else {
    if (typeof wkt.PROJECTION === "object") {
      wkt.projName = Object.keys(wkt.PROJECTION)[0];
    } else {
      wkt.projName = wkt.PROJECTION;
    }
  }
  if (wkt.AXIS) {
    var axisOrder = "";
    for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
      var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
      if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") {
        axisOrder += "n";
      } else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") {
        axisOrder += "s";
      } else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") {
        axisOrder += "e";
      } else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") {
        axisOrder += "w";
      }
    }
    if (axisOrder.length === 2) {
      axisOrder += "u";
    }
    if (axisOrder.length === 3) {
      wkt.axis = axisOrder;
    }
  }
  if (wkt.UNIT) {
    wkt.units = wkt.UNIT.name.toLowerCase();
    if (wkt.units === "metre") {
      wkt.units = "meter";
    }
    if (wkt.UNIT.convert) {
      if (wkt.type === "GEOGCS") {
        if (wkt.DATUM && wkt.DATUM.SPHEROID) {
          wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a;
        }
      } else {
        wkt.to_meter = wkt.UNIT.convert;
      }
    }
  }
  var geogcs = wkt.GEOGCS;
  if (wkt.type === "GEOGCS") {
    geogcs = wkt;
  }
  if (geogcs) {
    if (geogcs.DATUM) {
      wkt.datumCode = geogcs.DATUM.name.toLowerCase();
    } else {
      wkt.datumCode = geogcs.name.toLowerCase();
    }
    if (wkt.datumCode.slice(0, 2) === "d_") {
      wkt.datumCode = wkt.datumCode.slice(2);
    }
    if (wkt.datumCode === "new_zealand_1949") {
      wkt.datumCode = "nzgd49";
    }
    if (wkt.datumCode === "wgs_1984" || wkt.datumCode === "world_geodetic_system_1984") {
      if (wkt.PROJECTION === "Mercator_Auxiliary_Sphere") {
        wkt.sphere = true;
      }
      wkt.datumCode = "wgs84";
    }
    if (wkt.datumCode === "belge_1972") {
      wkt.datumCode = "rnb72";
    }
    if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
      wkt.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
      if (wkt.ellps.toLowerCase().slice(0, 13) === "international") {
        wkt.ellps = "intl";
      }
      wkt.a = geogcs.DATUM.SPHEROID.a;
      wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
    }
    if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
      wkt.datum_params = geogcs.DATUM.TOWGS84;
    }
    if (~wkt.datumCode.indexOf("osgb_1936")) {
      wkt.datumCode = "osgb36";
    }
    if (~wkt.datumCode.indexOf("osni_1952")) {
      wkt.datumCode = "osni52";
    }
    if (~wkt.datumCode.indexOf("tm65") || ~wkt.datumCode.indexOf("geodetic_datum_of_1965")) {
      wkt.datumCode = "ire65";
    }
    if (wkt.datumCode === "ch1903+") {
      wkt.datumCode = "ch1903";
    }
    if (~wkt.datumCode.indexOf("israel")) {
      wkt.datumCode = "isr93";
    }
  }
  if (wkt.b && !isFinite(wkt.b)) {
    wkt.b = wkt.a;
  }
  function toMeter(input) {
    var ratio = wkt.to_meter || 1;
    return input * ratio;
  }
  var renamer = function(a2) {
    return rename(wkt, a2);
  };
  var list = [
    ["standard_parallel_1", "Standard_Parallel_1"],
    ["standard_parallel_1", "Latitude of 1st standard parallel"],
    ["standard_parallel_2", "Standard_Parallel_2"],
    ["standard_parallel_2", "Latitude of 2nd standard parallel"],
    ["false_easting", "False_Easting"],
    ["false_easting", "False easting"],
    ["false-easting", "Easting at false origin"],
    ["false_northing", "False_Northing"],
    ["false_northing", "False northing"],
    ["false_northing", "Northing at false origin"],
    ["central_meridian", "Central_Meridian"],
    ["central_meridian", "Longitude of natural origin"],
    ["central_meridian", "Longitude of false origin"],
    ["latitude_of_origin", "Latitude_Of_Origin"],
    ["latitude_of_origin", "Central_Parallel"],
    ["latitude_of_origin", "Latitude of natural origin"],
    ["latitude_of_origin", "Latitude of false origin"],
    ["scale_factor", "Scale_Factor"],
    ["k0", "scale_factor"],
    ["latitude_of_center", "Latitude_Of_Center"],
    ["latitude_of_center", "Latitude_of_center"],
    ["lat0", "latitude_of_center", d2r],
    ["longitude_of_center", "Longitude_Of_Center"],
    ["longitude_of_center", "Longitude_of_center"],
    ["longc", "longitude_of_center", d2r],
    ["x0", "false_easting", toMeter],
    ["y0", "false_northing", toMeter],
    ["long0", "central_meridian", d2r],
    ["lat0", "latitude_of_origin", d2r],
    ["lat0", "standard_parallel_1", d2r],
    ["lat1", "standard_parallel_1", d2r],
    ["lat2", "standard_parallel_2", d2r],
    ["azimuth", "Azimuth"],
    ["alpha", "azimuth", d2r],
    ["srsCode", "name"]
  ];
  list.forEach(renamer);
  if (!wkt.long0 && wkt.longc && (wkt.projName === "Albers_Conic_Equal_Area" || wkt.projName === "Lambert_Azimuthal_Equal_Area")) {
    wkt.long0 = wkt.longc;
  }
  if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === "Stereographic_South_Pole" || wkt.projName === "Polar Stereographic (variant B)")) {
    wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
    wkt.lat_ts = wkt.lat1;
  } else if (!wkt.lat_ts && wkt.lat0 && wkt.projName === "Polar_Stereographic") {
    wkt.lat_ts = wkt.lat0;
    wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
  }
}
function wkt_parser_default(wkt) {
  var lisp = parser_default(wkt);
  var type = lisp[0];
  var obj = {};
  sExpr(lisp, obj);
  cleanWKT(obj);
  return obj[type];
}

// node_modules/proj4/lib/defs.js
function defs(name) {
  var that = this;
  if (arguments.length === 2) {
    var def = arguments[1];
    if (typeof def === "string") {
      if (def.charAt(0) === "+") {
        defs[name] = projString_default(arguments[1]);
      } else {
        defs[name] = wkt_parser_default(arguments[1]);
      }
    } else {
      defs[name] = def;
    }
  } else if (arguments.length === 1) {
    if (Array.isArray(name)) {
      return name.map(function(v2) {
        if (Array.isArray(v2)) {
          defs.apply(that, v2);
        } else {
          defs(v2);
        }
      });
    } else if (typeof name === "string") {
      if (name in defs) {
        return defs[name];
      }
    } else if ("EPSG" in name) {
      defs["EPSG:" + name.EPSG] = name;
    } else if ("ESRI" in name) {
      defs["ESRI:" + name.ESRI] = name;
    } else if ("IAU2000" in name) {
      defs["IAU2000:" + name.IAU2000] = name;
    } else {
      console.log(name);
    }
    return;
  }
}
global_default(defs);
var defs_default = defs;

// node_modules/proj4/lib/parseCode.js
function testObj(code) {
  return typeof code === "string";
}
function testDef(code) {
  return code in defs_default;
}
var codeWords = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
function testWKT(code) {
  return codeWords.some(function(word) {
    return code.indexOf(word) > -1;
  });
}
var codes = ["3857", "900913", "3785", "102113"];
function checkMercator(item) {
  var auth = match(item, "authority");
  if (!auth) {
    return;
  }
  var code = match(auth, "epsg");
  return code && codes.indexOf(code) > -1;
}
function checkProjStr(item) {
  var ext = match(item, "extension");
  if (!ext) {
    return;
  }
  return match(ext, "proj4");
}
function testProj(code) {
  return code[0] === "+";
}
function parse(code) {
  if (testObj(code)) {
    if (testDef(code)) {
      return defs_default[code];
    }
    if (testWKT(code)) {
      var out = wkt_parser_default(code);
      if (checkMercator(out)) {
        return defs_default["EPSG:3857"];
      }
      var maybeProjStr = checkProjStr(out);
      if (maybeProjStr) {
        return projString_default(maybeProjStr);
      }
      return out;
    }
    if (testProj(code)) {
      return projString_default(code);
    }
  } else {
    return code;
  }
}
var parseCode_default = parse;

// node_modules/proj4/lib/extend.js
function extend_default(destination, source) {
  destination = destination || {};
  var value, property;
  if (!source) {
    return destination;
  }
  for (property in source) {
    value = source[property];
    if (value !== void 0) {
      destination[property] = value;
    }
  }
  return destination;
}

// node_modules/proj4/lib/common/msfnz.js
function msfnz_default(eccent, sinphi, cosphi) {
  var con = eccent * sinphi;
  return cosphi / Math.sqrt(1 - con * con);
}

// node_modules/proj4/lib/common/sign.js
function sign_default(x) {
  return x < 0 ? -1 : 1;
}

// node_modules/proj4/lib/common/adjust_lon.js
function adjust_lon_default(x) {
  return Math.abs(x) <= SPI ? x : x - sign_default(x) * TWO_PI;
}

// node_modules/proj4/lib/common/tsfnz.js
function tsfnz_default(eccent, phi, sinphi) {
  var con = eccent * sinphi;
  var com = 0.5 * eccent;
  con = Math.pow((1 - con) / (1 + con), com);
  return Math.tan(0.5 * (HALF_PI - phi)) / con;
}

// node_modules/proj4/lib/common/phi2z.js
function phi2z_default(eccent, ts) {
  var eccnth = 0.5 * eccent;
  var con, dphi;
  var phi = HALF_PI - 2 * Math.atan(ts);
  for (var i = 0; i <= 15; i++) {
    con = eccent * Math.sin(phi);
    dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return -9999;
}

// node_modules/proj4/lib/projections/merc.js
function init() {
  var con = this.b / this.a;
  this.es = 1 - con * con;
  if (!("x0" in this)) {
    this.x0 = 0;
  }
  if (!("y0" in this)) {
    this.y0 = 0;
  }
  this.e = Math.sqrt(this.es);
  if (this.lat_ts) {
    if (this.sphere) {
      this.k0 = Math.cos(this.lat_ts);
    } else {
      this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  } else {
    if (!this.k0) {
      if (this.k) {
        this.k0 = this.k;
      } else {
        this.k0 = 1;
      }
    }
  }
}
function forward(p2) {
  var lon = p2.x;
  var lat = p2.y;
  if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
    return null;
  }
  var x, y;
  if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    return null;
  } else {
    if (this.sphere) {
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0);
      y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
    } else {
      var sinphi = Math.sin(lat);
      var ts = tsfnz_default(this.e, lat, sinphi);
      x = this.x0 + this.a * this.k0 * adjust_lon_default(lon - this.long0);
      y = this.y0 - this.a * this.k0 * Math.log(ts);
    }
    p2.x = x;
    p2.y = y;
    return p2;
  }
}
function inverse(p2) {
  var x = p2.x - this.x0;
  var y = p2.y - this.y0;
  var lon, lat;
  if (this.sphere) {
    lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
  } else {
    var ts = Math.exp(-y / (this.a * this.k0));
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  }
  lon = adjust_lon_default(this.long0 + x / (this.a * this.k0));
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
var merc_default = {
  init,
  forward,
  inverse,
  names
};

// node_modules/proj4/lib/projections/longlat.js
function init2() {
}
function identity(pt) {
  return pt;
}
var names2 = ["longlat", "identity"];
var longlat_default = {
  init: init2,
  forward: identity,
  inverse: identity,
  names: names2
};

// node_modules/proj4/lib/projections.js
var projs = [merc_default, longlat_default];
var names3 = {};
var projStore = [];
function add(proj, i) {
  var len = projStore.length;
  if (!proj.names) {
    console.log(i);
    return true;
  }
  projStore[len] = proj;
  proj.names.forEach(function(n) {
    names3[n.toLowerCase()] = len;
  });
  return this;
}
function get(name) {
  if (!name) {
    return false;
  }
  var n = name.toLowerCase();
  if (typeof names3[n] !== "undefined" && projStore[names3[n]]) {
    return projStore[names3[n]];
  }
}
function start() {
  projs.forEach(add);
}
var projections_default = {
  start,
  add,
  get
};

// node_modules/proj4/lib/constants/Ellipsoid.js
var exports2 = {};
exports2.MERIT = {
  a: 6378137,
  rf: 298.257,
  ellipseName: "MERIT 1983"
};
exports2.SGS85 = {
  a: 6378136,
  rf: 298.257,
  ellipseName: "Soviet Geodetic System 85"
};
exports2.GRS80 = {
  a: 6378137,
  rf: 298.257222101,
  ellipseName: "GRS 1980(IUGG, 1980)"
};
exports2.IAU76 = {
  a: 6378140,
  rf: 298.257,
  ellipseName: "IAU 1976"
};
exports2.airy = {
  a: 6377563396e-3,
  b: 635625691e-2,
  ellipseName: "Airy 1830"
};
exports2.APL4 = {
  a: 6378137,
  rf: 298.25,
  ellipseName: "Appl. Physics. 1965"
};
exports2.NWL9D = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "Naval Weapons Lab., 1965"
};
exports2.mod_airy = {
  a: 6377340189e-3,
  b: 6356034446e-3,
  ellipseName: "Modified Airy"
};
exports2.andrae = {
  a: 637710443e-2,
  rf: 300,
  ellipseName: "Andrae 1876 (Den., Iclnd.)"
};
exports2.aust_SA = {
  a: 6378160,
  rf: 298.25,
  ellipseName: "Australian Natl & S. Amer. 1969"
};
exports2.GRS67 = {
  a: 6378160,
  rf: 298.247167427,
  ellipseName: "GRS 67(IUGG 1967)"
};
exports2.bessel = {
  a: 6377397155e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841"
};
exports2.bess_nam = {
  a: 6377483865e-3,
  rf: 299.1528128,
  ellipseName: "Bessel 1841 (Namibia)"
};
exports2.clrk66 = {
  a: 63782064e-1,
  b: 63565838e-1,
  ellipseName: "Clarke 1866"
};
exports2.clrk80 = {
  a: 6378249145e-3,
  rf: 293.4663,
  ellipseName: "Clarke 1880 mod."
};
exports2.clrk80ign = {
  a: 63782492e-1,
  b: 6356515,
  rf: 293.4660213,
  ellipseName: "Clarke 1880 (IGN)"
};
exports2.clrk58 = {
  a: 6378293645208759e-9,
  rf: 294.2606763692654,
  ellipseName: "Clarke 1858"
};
exports2.CPM = {
  a: 63757387e-1,
  rf: 334.29,
  ellipseName: "Comm. des Poids et Mesures 1799"
};
exports2.delmbr = {
  a: 6376428,
  rf: 311.5,
  ellipseName: "Delambre 1810 (Belgium)"
};
exports2.engelis = {
  a: 637813605e-2,
  rf: 298.2566,
  ellipseName: "Engelis 1985"
};
exports2.evrst30 = {
  a: 6377276345e-3,
  rf: 300.8017,
  ellipseName: "Everest 1830"
};
exports2.evrst48 = {
  a: 6377304063e-3,
  rf: 300.8017,
  ellipseName: "Everest 1948"
};
exports2.evrst56 = {
  a: 6377301243e-3,
  rf: 300.8017,
  ellipseName: "Everest 1956"
};
exports2.evrst69 = {
  a: 6377295664e-3,
  rf: 300.8017,
  ellipseName: "Everest 1969"
};
exports2.evrstSS = {
  a: 6377298556e-3,
  rf: 300.8017,
  ellipseName: "Everest (Sabah & Sarawak)"
};
exports2.fschr60 = {
  a: 6378166,
  rf: 298.3,
  ellipseName: "Fischer (Mercury Datum) 1960"
};
exports2.fschr60m = {
  a: 6378155,
  rf: 298.3,
  ellipseName: "Fischer 1960"
};
exports2.fschr68 = {
  a: 6378150,
  rf: 298.3,
  ellipseName: "Fischer 1968"
};
exports2.helmert = {
  a: 6378200,
  rf: 298.3,
  ellipseName: "Helmert 1906"
};
exports2.hough = {
  a: 6378270,
  rf: 297,
  ellipseName: "Hough"
};
exports2.intl = {
  a: 6378388,
  rf: 297,
  ellipseName: "International 1909 (Hayford)"
};
exports2.kaula = {
  a: 6378163,
  rf: 298.24,
  ellipseName: "Kaula 1961"
};
exports2.lerch = {
  a: 6378139,
  rf: 298.257,
  ellipseName: "Lerch 1979"
};
exports2.mprts = {
  a: 6397300,
  rf: 191,
  ellipseName: "Maupertius 1738"
};
exports2.new_intl = {
  a: 63781575e-1,
  b: 63567722e-1,
  ellipseName: "New International 1967"
};
exports2.plessis = {
  a: 6376523,
  rf: 6355863,
  ellipseName: "Plessis 1817 (France)"
};
exports2.krass = {
  a: 6378245,
  rf: 298.3,
  ellipseName: "Krassovsky, 1942"
};
exports2.SEasia = {
  a: 6378155,
  b: 63567733205e-4,
  ellipseName: "Southeast Asia"
};
exports2.walbeck = {
  a: 6376896,
  b: 63558348467e-4,
  ellipseName: "Walbeck"
};
exports2.WGS60 = {
  a: 6378165,
  rf: 298.3,
  ellipseName: "WGS 60"
};
exports2.WGS66 = {
  a: 6378145,
  rf: 298.25,
  ellipseName: "WGS 66"
};
exports2.WGS7 = {
  a: 6378135,
  rf: 298.26,
  ellipseName: "WGS 72"
};
var WGS84 = exports2.WGS84 = {
  a: 6378137,
  rf: 298.257223563,
  ellipseName: "WGS 84"
};
exports2.sphere = {
  a: 6370997,
  b: 6370997,
  ellipseName: "Normal Sphere (r=6370997)"
};

// node_modules/proj4/lib/deriveConstants.js
function eccentricity(a2, b2, rf, R_A) {
  var a22 = a2 * a2;
  var b22 = b2 * b2;
  var es = (a22 - b22) / a22;
  var e = 0;
  if (R_A) {
    a2 *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
    a22 = a2 * a2;
    es = 0;
  } else {
    e = Math.sqrt(es);
  }
  var ep2 = (a22 - b22) / b22;
  return {
    es,
    e,
    ep2
  };
}
function sphere(a2, b2, rf, ellps, sphere2) {
  if (!a2) {
    var ellipse = match(exports2, ellps);
    if (!ellipse) {
      ellipse = WGS84;
    }
    a2 = ellipse.a;
    b2 = ellipse.b;
    rf = ellipse.rf;
  }
  if (rf && !b2) {
    b2 = (1 - 1 / rf) * a2;
  }
  if (rf === 0 || Math.abs(a2 - b2) < EPSLN) {
    sphere2 = true;
    b2 = a2;
  }
  return {
    a: a2,
    b: b2,
    rf,
    sphere: sphere2
  };
}

// node_modules/proj4/lib/constants/Datum.js
var datums = {
  wgs84: {
    towgs84: "0,0,0",
    ellipse: "WGS84",
    datumName: "WGS84"
  },
  ch1903: {
    towgs84: "674.374,15.056,405.346",
    ellipse: "bessel",
    datumName: "swiss"
  },
  ggrs87: {
    towgs84: "-199.87,74.79,246.62",
    ellipse: "GRS80",
    datumName: "Greek_Geodetic_Reference_System_1987"
  },
  nad83: {
    towgs84: "0,0,0",
    ellipse: "GRS80",
    datumName: "North_American_Datum_1983"
  },
  nad27: {
    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
    ellipse: "clrk66",
    datumName: "North_American_Datum_1927"
  },
  potsdam: {
    towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
    ellipse: "bessel",
    datumName: "Potsdam Rauenberg 1950 DHDN"
  },
  carthage: {
    towgs84: "-263.0,6.0,431.0",
    ellipse: "clark80",
    datumName: "Carthage 1934 Tunisia"
  },
  hermannskogel: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Hermannskogel"
  },
  mgi: {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Militar-Geographische Institut"
  },
  osni52: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "airy",
    datumName: "Irish National"
  },
  ire65: {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "mod_airy",
    datumName: "Ireland 1965"
  },
  rassadiran: {
    towgs84: "-133.63,-157.5,-158.62",
    ellipse: "intl",
    datumName: "Rassadiran"
  },
  nzgd49: {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
    ellipse: "intl",
    datumName: "New Zealand Geodetic Datum 1949"
  },
  osgb36: {
    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
    ellipse: "airy",
    datumName: "Ordnance Survey of Great Britain 1936"
  },
  s_jtsk: {
    towgs84: "589,76,480",
    ellipse: "bessel",
    datumName: "S-JTSK (Ferro)"
  },
  beduaram: {
    towgs84: "-106,-87,188",
    ellipse: "clrk80",
    datumName: "Beduaram"
  },
  gunung_segara: {
    towgs84: "-403,684,41",
    ellipse: "bessel",
    datumName: "Gunung Segara Jakarta"
  },
  rnb72: {
    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
    ellipse: "intl",
    datumName: "Reseau National Belge 1972"
  }
};
for (key in datums) {
  datum2 = datums[key];
  datums[datum2.datumName] = datum2;
}
var datum2;
var key;
var Datum_default = datums;

// node_modules/proj4/lib/datum.js
function datum(datumCode, datum_params, a2, b2, es, ep2, nadgrids) {
  var out = {};
  if (datumCode === void 0 || datumCode === "none") {
    out.datum_type = PJD_NODATUM;
  } else {
    out.datum_type = PJD_WGS84;
  }
  if (datum_params) {
    out.datum_params = datum_params.map(parseFloat);
    if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
      out.datum_type = PJD_3PARAM;
    }
    if (out.datum_params.length > 3) {
      if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
        out.datum_type = PJD_7PARAM;
        out.datum_params[3] *= SEC_TO_RAD;
        out.datum_params[4] *= SEC_TO_RAD;
        out.datum_params[5] *= SEC_TO_RAD;
        out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
      }
    }
  }
  if (nadgrids) {
    out.datum_type = PJD_GRIDSHIFT;
    out.grids = nadgrids;
  }
  out.a = a2;
  out.b = b2;
  out.es = es;
  out.ep2 = ep2;
  return out;
}
var datum_default = datum;

// node_modules/proj4/lib/nadgrid.js
var loadedNadgrids = {};
function nadgrid(key, data) {
  var view = new DataView(data);
  var isLittleEndian = detectLittleEndian(view);
  var header = readHeader(view, isLittleEndian);
  var subgrids = readSubgrids(view, header, isLittleEndian);
  var nadgrid2 = { header, subgrids };
  loadedNadgrids[key] = nadgrid2;
  return nadgrid2;
}
function getNadgrids(nadgrids) {
  if (nadgrids === void 0) {
    return null;
  }
  var grids = nadgrids.split(",");
  return grids.map(parseNadgridString);
}
function parseNadgridString(value) {
  if (value.length === 0) {
    return null;
  }
  var optional = value[0] === "@";
  if (optional) {
    value = value.slice(1);
  }
  if (value === "null") {
    return { name: "null", mandatory: !optional, grid: null, isNull: true };
  }
  return {
    name: value,
    mandatory: !optional,
    grid: loadedNadgrids[value] || null,
    isNull: false
  };
}
function secondsToRadians(seconds) {
  return seconds / 3600 * Math.PI / 180;
}
function detectLittleEndian(view) {
  var nFields = view.getInt32(8, false);
  if (nFields === 11) {
    return false;
  }
  nFields = view.getInt32(8, true);
  if (nFields !== 11) {
    console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
  }
  return true;
}
function readHeader(view, isLittleEndian) {
  return {
    nFields: view.getInt32(8, isLittleEndian),
    nSubgridFields: view.getInt32(24, isLittleEndian),
    nSubgrids: view.getInt32(40, isLittleEndian),
    shiftType: decodeString(view, 56, 56 + 8).trim(),
    fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
    fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
    toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
    toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
  };
}
function decodeString(view, start2, end) {
  return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start2, end)));
}
function readSubgrids(view, header, isLittleEndian) {
  var gridOffset = 176;
  var grids = [];
  for (var i = 0; i < header.nSubgrids; i++) {
    var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
    var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
    var lngColumnCount = Math.round(
      1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval
    );
    var latColumnCount = Math.round(
      1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval
    );
    grids.push({
      ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
      del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
      lim: [lngColumnCount, latColumnCount],
      count: subHeader.gridNodeCount,
      cvs: mapNodes(nodes)
    });
    gridOffset += 176 + subHeader.gridNodeCount * 16;
  }
  return grids;
}
function mapNodes(nodes) {
  return nodes.map(function(r) {
    return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
  });
}
function readGridHeader(view, offset, isLittleEndian) {
  return {
    name: decodeString(view, offset + 8, offset + 16).trim(),
    parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
    lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
    upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
    lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
    upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
    latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
    longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
    gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
  };
}
function readGridNodes(view, offset, gridHeader, isLittleEndian) {
  var nodesOffset = offset + 176;
  var gridRecordLength = 16;
  var gridShiftRecords = [];
  for (var i = 0; i < gridHeader.gridNodeCount; i++) {
    var record = {
      latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
      longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
      latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
      longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian)
    };
    gridShiftRecords.push(record);
  }
  return gridShiftRecords;
}

// node_modules/proj4/lib/Proj.js
function Projection(srsCode, callback) {
  if (!(this instanceof Projection)) {
    return new Projection(srsCode);
  }
  callback = callback || function(error) {
    if (error) {
      throw error;
    }
  };
  var json = parseCode_default(srsCode);
  if (typeof json !== "object") {
    callback("Could not parse to valid json: " + srsCode);
    return;
  }
  var ourProj = Projection.projections.get(json.projName);
  if (!ourProj) {
    callback("Could not get projection name from: " + srsCode);
    return;
  }
  if (json.datumCode && json.datumCode !== "none") {
    var datumDef = match(Datum_default, json.datumCode);
    if (datumDef) {
      json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
      json.ellps = datumDef.ellipse;
      json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
    }
  }
  json.k0 = json.k0 || 1;
  json.axis = json.axis || "enu";
  json.ellps = json.ellps || "wgs84";
  json.lat1 = json.lat1 || json.lat0;
  var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
  var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
  var nadgrids = getNadgrids(json.nadgrids);
  var datumObj = json.datum || datum_default(
    json.datumCode,
    json.datum_params,
    sphere_.a,
    sphere_.b,
    ecc.es,
    ecc.ep2,
    nadgrids
  );
  extend_default(this, json);
  extend_default(this, ourProj);
  this.a = sphere_.a;
  this.b = sphere_.b;
  this.rf = sphere_.rf;
  this.sphere = sphere_.sphere;
  this.es = ecc.es;
  this.e = ecc.e;
  this.ep2 = ecc.ep2;
  this.datum = datumObj;
  this.init();
  callback(null, this);
}
Projection.projections = projections_default;
Projection.projections.start();
var Proj_default = Projection;

// node_modules/proj4/lib/datumUtils.js
function compareDatums(source, dest) {
  if (source.datum_type !== dest.datum_type) {
    return false;
  } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
    return false;
  } else if (source.datum_type === PJD_3PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
  } else if (source.datum_type === PJD_7PARAM) {
    return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
  } else {
    return true;
  }
}
function geodeticToGeocentric(p2, es, a2) {
  var Longitude = p2.x;
  var Latitude = p2.y;
  var Height = p2.z ? p2.z : 0;
  var Rn;
  var Sin_Lat;
  var Sin2_Lat;
  var Cos_Lat;
  if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
    Latitude = -HALF_PI;
  } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
    Latitude = HALF_PI;
  } else if (Latitude < -HALF_PI) {
    return { x: -Infinity, y: -Infinity, z: p2.z };
  } else if (Latitude > HALF_PI) {
    return { x: Infinity, y: Infinity, z: p2.z };
  }
  if (Longitude > Math.PI) {
    Longitude -= 2 * Math.PI;
  }
  Sin_Lat = Math.sin(Latitude);
  Cos_Lat = Math.cos(Latitude);
  Sin2_Lat = Sin_Lat * Sin_Lat;
  Rn = a2 / Math.sqrt(1 - es * Sin2_Lat);
  return {
    x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
    y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
    z: (Rn * (1 - es) + Height) * Sin_Lat
  };
}
function geocentricToGeodetic(p2, es, a2, b2) {
  var genau = 1e-12;
  var genau2 = genau * genau;
  var maxiter = 30;
  var P;
  var RR;
  var CT;
  var ST;
  var RX;
  var RK;
  var RN;
  var CPHI0;
  var SPHI0;
  var CPHI;
  var SPHI;
  var SDPHI;
  var iter;
  var X = p2.x;
  var Y = p2.y;
  var Z2 = p2.z ? p2.z : 0;
  var Longitude;
  var Latitude;
  var Height;
  P = Math.sqrt(X * X + Y * Y);
  RR = Math.sqrt(X * X + Y * Y + Z2 * Z2);
  if (P / a2 < genau) {
    Longitude = 0;
    if (RR / a2 < genau) {
      Latitude = HALF_PI;
      Height = -b2;
      return {
        x: p2.x,
        y: p2.y,
        z: p2.z
      };
    }
  } else {
    Longitude = Math.atan2(Y, X);
  }
  CT = Z2 / RR;
  ST = P / RR;
  RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
  CPHI0 = ST * (1 - es) * RX;
  SPHI0 = CT * RX;
  iter = 0;
  do {
    iter++;
    RN = a2 / Math.sqrt(1 - es * SPHI0 * SPHI0);
    Height = P * CPHI0 + Z2 * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
    RK = es * RN / (RN + Height);
    RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
    CPHI = ST * (1 - RK) * RX;
    SPHI = CT * RX;
    SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
    CPHI0 = CPHI;
    SPHI0 = SPHI;
  } while (SDPHI * SDPHI > genau2 && iter < maxiter);
  Latitude = Math.atan(SPHI / Math.abs(CPHI));
  return {
    x: Longitude,
    y: Latitude,
    z: Height
  };
}
function geocentricToWgs84(p2, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p2.x + datum_params[0],
      y: p2.y + datum_params[1],
      z: p2.z + datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    return {
      x: M_BF * (p2.x - Rz_BF * p2.y + Ry_BF * p2.z) + Dx_BF,
      y: M_BF * (Rz_BF * p2.x + p2.y - Rx_BF * p2.z) + Dy_BF,
      z: M_BF * (-Ry_BF * p2.x + Rx_BF * p2.y + p2.z) + Dz_BF
    };
  }
}
function geocentricFromWgs84(p2, datum_type, datum_params) {
  if (datum_type === PJD_3PARAM) {
    return {
      x: p2.x - datum_params[0],
      y: p2.y - datum_params[1],
      z: p2.z - datum_params[2]
    };
  } else if (datum_type === PJD_7PARAM) {
    var Dx_BF = datum_params[0];
    var Dy_BF = datum_params[1];
    var Dz_BF = datum_params[2];
    var Rx_BF = datum_params[3];
    var Ry_BF = datum_params[4];
    var Rz_BF = datum_params[5];
    var M_BF = datum_params[6];
    var x_tmp = (p2.x - Dx_BF) / M_BF;
    var y_tmp = (p2.y - Dy_BF) / M_BF;
    var z_tmp = (p2.z - Dz_BF) / M_BF;
    return {
      x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
      y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
      z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
    };
  }
}

// node_modules/proj4/lib/datum_transform.js
function checkParams(type) {
  return type === PJD_3PARAM || type === PJD_7PARAM;
}
function datum_transform_default(source, dest, point) {
  if (compareDatums(source, dest)) {
    return point;
  }
  if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
    return point;
  }
  var source_a = source.a;
  var source_es = source.es;
  if (source.datum_type === PJD_GRIDSHIFT) {
    var gridShiftCode = applyGridShift(source, false, point);
    if (gridShiftCode !== 0) {
      return void 0;
    }
    source_a = SRS_WGS84_SEMIMAJOR;
    source_es = SRS_WGS84_ESQUARED;
  }
  var dest_a = dest.a;
  var dest_b = dest.b;
  var dest_es = dest.es;
  if (dest.datum_type === PJD_GRIDSHIFT) {
    dest_a = SRS_WGS84_SEMIMAJOR;
    dest_b = SRS_WGS84_SEMIMINOR;
    dest_es = SRS_WGS84_ESQUARED;
  }
  if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
    return point;
  }
  point = geodeticToGeocentric(point, source_es, source_a);
  if (checkParams(source.datum_type)) {
    point = geocentricToWgs84(point, source.datum_type, source.datum_params);
  }
  if (checkParams(dest.datum_type)) {
    point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
  }
  point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
  if (dest.datum_type === PJD_GRIDSHIFT) {
    var destGridShiftResult = applyGridShift(dest, true, point);
    if (destGridShiftResult !== 0) {
      return void 0;
    }
  }
  return point;
}
function applyGridShift(source, inverse33, point) {
  if (source.grids === null || source.grids.length === 0) {
    console.log("Grid shift grids not found");
    return -1;
  }
  var input = { x: -point.x, y: point.y };
  var output = { x: Number.NaN, y: Number.NaN };
  var onlyMandatoryGrids = false;
  var attemptedGrids = [];
  outer:
    for (var i = 0; i < source.grids.length; i++) {
      var grid = source.grids[i];
      attemptedGrids.push(grid.name);
      if (grid.isNull) {
        output = input;
        break;
      }
      onlyMandatoryGrids = grid.mandatory;
      if (grid.grid === null) {
        if (grid.mandatory) {
          console.log("Unable to find mandatory grid '" + grid.name + "'");
          return -1;
        }
        continue;
      }
      var subgrids = grid.grid.subgrids;
      for (var j = 0, jj = subgrids.length; j < jj; j++) {
        var subgrid = subgrids[j];
        var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
        var minX = subgrid.ll[0] - epsilon;
        var minY = subgrid.ll[1] - epsilon;
        var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
        var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
        if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
          continue;
        }
        output = applySubgridShift(input, inverse33, subgrid);
        if (!isNaN(output.x)) {
          break outer;
        }
      }
    }
  if (isNaN(output.x)) {
    console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
    return -1;
  }
  point.x = -output.x;
  point.y = output.y;
  return 0;
}
function applySubgridShift(pin, inverse33, ct) {
  var val = { x: Number.NaN, y: Number.NaN };
  if (isNaN(pin.x)) {
    return val;
  }
  var tb = { x: pin.x, y: pin.y };
  tb.x -= ct.ll[0];
  tb.y -= ct.ll[1];
  tb.x = adjust_lon_default(tb.x - Math.PI) + Math.PI;
  var t = nadInterpolate(tb, ct);
  if (inverse33) {
    if (isNaN(t.x)) {
      return val;
    }
    t.x = tb.x - t.x;
    t.y = tb.y - t.y;
    var i = 9, tol = 1e-12;
    var dif, del;
    do {
      del = nadInterpolate(t, ct);
      if (isNaN(del.x)) {
        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
        break;
      }
      dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
      t.x += dif.x;
      t.y += dif.y;
    } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
    if (i < 0) {
      console.log("Inverse grid shift iterator failed to converge.");
      return val;
    }
    val.x = adjust_lon_default(t.x + ct.ll[0]);
    val.y = t.y + ct.ll[1];
  } else {
    if (!isNaN(t.x)) {
      val.x = pin.x + t.x;
      val.y = pin.y + t.y;
    }
  }
  return val;
}
function nadInterpolate(pin, ct) {
  var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
  var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
  var frct = { x: t.x - 1 * indx.x, y: t.y - 1 * indx.y };
  var val = { x: Number.NaN, y: Number.NaN };
  var inx;
  if (indx.x < 0 || indx.x >= ct.lim[0]) {
    return val;
  }
  if (indx.y < 0 || indx.y >= ct.lim[1]) {
    return val;
  }
  inx = indx.y * ct.lim[0] + indx.x;
  var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx++;
  var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx += ct.lim[0];
  var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  inx--;
  var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
  var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
  val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
  val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
  return val;
}

// node_modules/proj4/lib/adjust_axis.js
function adjust_axis_default(crs, denorm, point) {
  var xin = point.x, yin = point.y, zin = point.z || 0;
  var v2, t, i;
  var out = {};
  for (i = 0; i < 3; i++) {
    if (denorm && i === 2 && point.z === void 0) {
      continue;
    }
    if (i === 0) {
      v2 = xin;
      if ("ew".indexOf(crs.axis[i]) !== -1) {
        t = "x";
      } else {
        t = "y";
      }
    } else if (i === 1) {
      v2 = yin;
      if ("ns".indexOf(crs.axis[i]) !== -1) {
        t = "y";
      } else {
        t = "x";
      }
    } else {
      v2 = zin;
      t = "z";
    }
    switch (crs.axis[i]) {
      case "e":
        out[t] = v2;
        break;
      case "w":
        out[t] = -v2;
        break;
      case "n":
        out[t] = v2;
        break;
      case "s":
        out[t] = -v2;
        break;
      case "u":
        if (point[t] !== void 0) {
          out.z = v2;
        }
        break;
      case "d":
        if (point[t] !== void 0) {
          out.z = -v2;
        }
        break;
      default:
        return null;
    }
  }
  return out;
}

// node_modules/proj4/lib/common/toPoint.js
function toPoint_default(array) {
  var out = {
    x: array[0],
    y: array[1]
  };
  if (array.length > 2) {
    out.z = array[2];
  }
  if (array.length > 3) {
    out.m = array[3];
  }
  return out;
}

// node_modules/proj4/lib/checkSanity.js
function checkSanity_default(point) {
  checkCoord(point.x);
  checkCoord(point.y);
}
function checkCoord(num) {
  if (typeof Number.isFinite === "function") {
    if (Number.isFinite(num)) {
      return;
    }
    throw new TypeError("coordinates must be finite numbers");
  }
  if (typeof num !== "number" || num !== num || !isFinite(num)) {
    throw new TypeError("coordinates must be finite numbers");
  }
}

// node_modules/proj4/lib/transform.js
function checkNotWGS(source, dest) {
  return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== "WGS84";
}
function transform(source, dest, point, enforceAxis) {
  var wgs842;
  if (Array.isArray(point)) {
    point = toPoint_default(point);
  } else {
    point = {
      x: point.x,
      y: point.y,
      z: point.z,
      m: point.m
    };
  }
  var hasZ = point.z !== void 0;
  checkSanity_default(point);
  if (source.datum && dest.datum && checkNotWGS(source, dest)) {
    wgs842 = new Proj_default("WGS84");
    point = transform(source, wgs842, point, enforceAxis);
    source = wgs842;
  }
  if (enforceAxis && source.axis !== "enu") {
    point = adjust_axis_default(source, false, point);
  }
  if (source.projName === "longlat") {
    point = {
      x: point.x * D2R,
      y: point.y * D2R,
      z: point.z || 0
    };
  } else {
    if (source.to_meter) {
      point = {
        x: point.x * source.to_meter,
        y: point.y * source.to_meter,
        z: point.z || 0
      };
    }
    point = source.inverse(point);
    if (!point) {
      return;
    }
  }
  if (source.from_greenwich) {
    point.x += source.from_greenwich;
  }
  point = datum_transform_default(source.datum, dest.datum, point);
  if (!point) {
    return;
  }
  if (dest.from_greenwich) {
    point = {
      x: point.x - dest.from_greenwich,
      y: point.y,
      z: point.z || 0
    };
  }
  if (dest.projName === "longlat") {
    point = {
      x: point.x * R2D,
      y: point.y * R2D,
      z: point.z || 0
    };
  } else {
    point = dest.forward(point);
    if (dest.to_meter) {
      point = {
        x: point.x / dest.to_meter,
        y: point.y / dest.to_meter,
        z: point.z || 0
      };
    }
  }
  if (enforceAxis && dest.axis !== "enu") {
    return adjust_axis_default(dest, true, point);
  }
  if (point && !hasZ) {
    delete point.z;
  }
  return point;
}

// node_modules/proj4/lib/core.js
var wgs84 = Proj_default("WGS84");
function transformer(from, to, coords, enforceAxis) {
  var transformedArray, out, keys;
  if (Array.isArray(coords)) {
    transformedArray = transform(from, to, coords, enforceAxis) || { x: NaN, y: NaN };
    if (coords.length > 2) {
      if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") {
        if (typeof transformedArray.z === "number") {
          return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.slice(3));
        } else {
          return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.slice(3));
        }
      } else {
        return [transformedArray.x, transformedArray.y].concat(coords.slice(2));
      }
    } else {
      return [transformedArray.x, transformedArray.y];
    }
  } else {
    out = transform(from, to, coords, enforceAxis);
    keys = Object.keys(coords);
    if (keys.length === 2) {
      return out;
    }
    keys.forEach(function(key) {
      if (typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent") {
        if (key === "x" || key === "y" || key === "z") {
          return;
        }
      } else {
        if (key === "x" || key === "y") {
          return;
        }
      }
      out[key] = coords[key];
    });
    return out;
  }
}
function checkProj(item) {
  if (item instanceof Proj_default) {
    return item;
  }
  if (item.oProj) {
    return item.oProj;
  }
  return Proj_default(item);
}
function proj4(fromProj, toProj, coord) {
  fromProj = checkProj(fromProj);
  var single = false;
  var obj;
  if (typeof toProj === "undefined") {
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  } else if (typeof toProj.x !== "undefined" || Array.isArray(toProj)) {
    coord = toProj;
    toProj = fromProj;
    fromProj = wgs84;
    single = true;
  }
  toProj = checkProj(toProj);
  if (coord) {
    return transformer(fromProj, toProj, coord);
  } else {
    obj = {
      forward: function(coords, enforceAxis) {
        return transformer(fromProj, toProj, coords, enforceAxis);
      },
      inverse: function(coords, enforceAxis) {
        return transformer(toProj, fromProj, coords, enforceAxis);
      }
    };
    if (single) {
      obj.oProj = toProj;
    }
    return obj;
  }
}
var core_default = proj4;

// node_modules/mgrs/mgrs.js
var NUM_100K_SETS = 6;
var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
var SET_ORIGIN_ROW_LETTERS = "AFAFAF";
var A = 65;
var I = 73;
var O = 79;
var V = 86;
var Z = 90;
var mgrs_default = {
  forward: forward2,
  inverse: inverse2,
  toPoint
};
function forward2(ll, accuracy) {
  accuracy = accuracy || 5;
  return encode(LLtoUTM({
    lat: ll[1],
    lon: ll[0]
  }), accuracy);
}
function inverse2(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
}
function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}
function degToRad(deg) {
  return deg * (Math.PI / 180);
}
function radToDeg(rad) {
  return 180 * (rad / Math.PI);
}
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lon;
  var a2 = 6378137;
  var eccSquared = 669438e-8;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N2, T, C, A5, M3;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;
  if (Long === 180) {
    ZoneNumber = 60;
  }
  if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
    ZoneNumber = 32;
  }
  if (Lat >= 72 && Lat < 84) {
    if (Long >= 0 && Long < 9) {
      ZoneNumber = 31;
    } else if (Long >= 9 && Long < 21) {
      ZoneNumber = 33;
    } else if (Long >= 21 && Long < 33) {
      ZoneNumber = 35;
    } else if (Long >= 33 && Long < 42) {
      ZoneNumber = 37;
    }
  }
  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
  LongOriginRad = degToRad(LongOrigin);
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  N2 = a2 / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A5 = Math.cos(LatRad) * (LongRad - LongOriginRad);
  M3 = a2 * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
  var UTMEasting = k0 * N2 * (A5 + (1 - T + C) * A5 * A5 * A5 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 / 120) + 5e5;
  var UTMNorthing = k0 * (M3 + N2 * Math.tan(LatRad) * (A5 * A5 / 2 + (5 - T + 9 * C + 4 * C * C) * A5 * A5 * A5 * A5 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 * A5 / 720));
  if (Lat < 0) {
    UTMNorthing += 1e7;
  }
  return {
    northing: Math.round(UTMNorthing),
    easting: Math.round(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}
function UTMtoLL(utm) {
  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }
  var k0 = 0.9996;
  var a2 = 6378137;
  var eccSquared = 669438e-8;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C12, R1, D2, M3;
  var LongOrigin;
  var mu, phi1Rad;
  var x = UTMEasting - 5e5;
  var y = UTMNorthing;
  if (zoneLetter < "N") {
    y -= 1e7;
  }
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
  eccPrimeSquared = eccSquared / (1 - eccSquared);
  M3 = y / k0;
  mu = M3 / (a2 * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
  N1 = a2 / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C12 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a2 * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D2 = x / (N1 * k0);
  var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D2 * D2 / 2 - (5 + 3 * T1 + 10 * C12 - 4 * C12 * C12 - 9 * eccPrimeSquared) * D2 * D2 * D2 * D2 / 24 + (61 + 90 * T1 + 298 * C12 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C12 * C12) * D2 * D2 * D2 * D2 * D2 * D2 / 720);
  lat = radToDeg(lat);
  var lon = (D2 - (1 + 2 * T1 + C12) * D2 * D2 * D2 / 6 + (5 - 2 * C12 + 28 * T1 - 3 * C12 * C12 + 8 * eccPrimeSquared + 24 * T1 * T1) * D2 * D2 * D2 * D2 * D2 / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);
  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  } else {
    result = {
      lat,
      lon
    };
  }
  return result;
}
function getLetterDesignator(lat) {
  var LetterDesignator = "Z";
  if (84 >= lat && lat >= 72) {
    LetterDesignator = "X";
  } else if (72 > lat && lat >= 64) {
    LetterDesignator = "W";
  } else if (64 > lat && lat >= 56) {
    LetterDesignator = "V";
  } else if (56 > lat && lat >= 48) {
    LetterDesignator = "U";
  } else if (48 > lat && lat >= 40) {
    LetterDesignator = "T";
  } else if (40 > lat && lat >= 32) {
    LetterDesignator = "S";
  } else if (32 > lat && lat >= 24) {
    LetterDesignator = "R";
  } else if (24 > lat && lat >= 16) {
    LetterDesignator = "Q";
  } else if (16 > lat && lat >= 8) {
    LetterDesignator = "P";
  } else if (8 > lat && lat >= 0) {
    LetterDesignator = "N";
  } else if (0 > lat && lat >= -8) {
    LetterDesignator = "M";
  } else if (-8 > lat && lat >= -16) {
    LetterDesignator = "L";
  } else if (-16 > lat && lat >= -24) {
    LetterDesignator = "K";
  } else if (-24 > lat && lat >= -32) {
    LetterDesignator = "J";
  } else if (-32 > lat && lat >= -40) {
    LetterDesignator = "H";
  } else if (-40 > lat && lat >= -48) {
    LetterDesignator = "G";
  } else if (-48 > lat && lat >= -56) {
    LetterDesignator = "F";
  } else if (-56 > lat && lat >= -64) {
    LetterDesignator = "E";
  } else if (-64 > lat && lat >= -72) {
    LetterDesignator = "D";
  } else if (-72 > lat && lat >= -80) {
    LetterDesignator = "C";
  }
  return LetterDesignator;
}
function encode(utm, accuracy) {
  var seasting = "00000" + utm.easting, snorthing = "00000" + utm.northing;
  return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
}
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 1e5);
  var setRow = Math.floor(northing / 1e5) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }
  return setParm;
}
function getLetter100kID(column, row, parm) {
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }
  if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
    colInt++;
  }
  if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
    colInt++;
    if (colInt === I) {
      colInt++;
    }
  }
  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  } else {
    rollover = false;
  }
  if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
    rowInt++;
  }
  if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
    rowInt++;
    if (rowInt === I) {
      rowInt++;
    }
  }
  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }
  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}
function decode(mgrsString) {
  if (mgrsString && mgrsString.length === 0) {
    throw "MGRSPoint coverting from nothing";
  }
  var length = mgrsString.length;
  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;
  while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw "MGRSPoint bad conversion from: " + mgrsString;
    }
    sb += testChar;
    i++;
  }
  var zoneNumber = parseInt(sb, 10);
  if (i === 0 || i + 3 > length) {
    throw "MGRSPoint bad conversion from: " + mgrsString;
  }
  var zoneLetter = mgrsString.charAt(i++);
  if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
    throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
  }
  hunK = mgrsString.substring(i, i += 2);
  var set = get100kSetForZone(zoneNumber);
  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);
  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2e6;
  }
  var remainder = length - i;
  if (remainder % 2 !== 0) {
    throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
  }
  var sep = remainder / 2;
  var sepEasting = 0;
  var sepNorthing = 0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 1e5 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }
  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;
  return {
    easting,
    northing,
    zoneLetter,
    zoneNumber,
    accuracy: accuracyBonus
  };
}
function getEastingFromChar(e, set) {
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 1e5;
  var rewindMarker = false;
  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw "Bad character: " + e;
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 1e5;
  }
  return eastingValue;
}
function getNorthingFromChar(n, set) {
  if (n > "V") {
    throw "MGRSPoint given invalid Northing " + n;
  }
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0;
  var rewindMarker = false;
  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    if (curRow > V) {
      if (rewindMarker) {
        throw "Bad character: " + n;
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 1e5;
  }
  return northingValue;
}
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
    case "C":
      northing = 11e5;
      break;
    case "D":
      northing = 2e6;
      break;
    case "E":
      northing = 28e5;
      break;
    case "F":
      northing = 37e5;
      break;
    case "G":
      northing = 46e5;
      break;
    case "H":
      northing = 55e5;
      break;
    case "J":
      northing = 64e5;
      break;
    case "K":
      northing = 73e5;
      break;
    case "L":
      northing = 82e5;
      break;
    case "M":
      northing = 91e5;
      break;
    case "N":
      northing = 0;
      break;
    case "P":
      northing = 8e5;
      break;
    case "Q":
      northing = 17e5;
      break;
    case "R":
      northing = 26e5;
      break;
    case "S":
      northing = 35e5;
      break;
    case "T":
      northing = 44e5;
      break;
    case "U":
      northing = 53e5;
      break;
    case "V":
      northing = 62e5;
      break;
    case "W":
      northing = 7e6;
      break;
    case "X":
      northing = 79e5;
      break;
    default:
      northing = -1;
  }
  if (northing >= 0) {
    return northing;
  } else {
    throw "Invalid zone letter: " + zoneLetter;
  }
}

// node_modules/proj4/lib/Point.js
function Point(x, y, z) {
  if (!(this instanceof Point)) {
    return new Point(x, y, z);
  }
  if (Array.isArray(x)) {
    this.x = x[0];
    this.y = x[1];
    this.z = x[2] || 0;
  } else if (typeof x === "object") {
    this.x = x.x;
    this.y = x.y;
    this.z = x.z || 0;
  } else if (typeof x === "string" && typeof y === "undefined") {
    var coords = x.split(",");
    this.x = parseFloat(coords[0], 10);
    this.y = parseFloat(coords[1], 10);
    this.z = parseFloat(coords[2], 10) || 0;
  } else {
    this.x = x;
    this.y = y;
    this.z = z || 0;
  }
  console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
Point.fromMGRS = function(mgrsStr) {
  return new Point(toPoint(mgrsStr));
};
Point.prototype.toMGRS = function(accuracy) {
  return forward2([this.x, this.y], accuracy);
};
var Point_default = Point;

// node_modules/proj4/lib/common/pj_enfn.js
var C00 = 1;
var C02 = 0.25;
var C04 = 0.046875;
var C06 = 0.01953125;
var C08 = 0.01068115234375;
var C22 = 0.75;
var C44 = 0.46875;
var C46 = 0.013020833333333334;
var C48 = 0.007120768229166667;
var C66 = 0.3645833333333333;
var C68 = 0.005696614583333333;
var C88 = 0.3076171875;
function pj_enfn_default(es) {
  var en = [];
  en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
  en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
  var t = es * es;
  en[2] = t * (C44 - es * (C46 + es * C48));
  t *= es;
  en[3] = t * (C66 - es * C68);
  en[4] = t * es * C88;
  return en;
}

// node_modules/proj4/lib/common/pj_mlfn.js
function pj_mlfn_default(phi, sphi, cphi, en) {
  cphi *= sphi;
  sphi *= sphi;
  return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
}

// node_modules/proj4/lib/common/pj_inv_mlfn.js
var MAX_ITER = 20;
function pj_inv_mlfn_default(arg, es, en) {
  var k2 = 1 / (1 - es);
  var phi = arg;
  for (var i = MAX_ITER; i; --i) {
    var s = Math.sin(phi);
    var t = 1 - es * s * s;
    t = (pj_mlfn_default(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k2;
    phi -= t;
    if (Math.abs(t) < EPSLN) {
      return phi;
    }
  }
  return phi;
}

// node_modules/proj4/lib/projections/tmerc.js
function init3() {
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
  this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.ml0 = pj_mlfn_default(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
  }
}
function forward3(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var delta_lon = adjust_lon_default(lon - this.long0);
  var con;
  var x, y;
  var sin_phi = Math.sin(lat);
  var cos_phi = Math.cos(lat);
  if (!this.es) {
    var b2 = cos_phi * Math.sin(delta_lon);
    if (Math.abs(Math.abs(b2) - 1) < EPSLN) {
      return 93;
    } else {
      x = 0.5 * this.a * this.k0 * Math.log((1 + b2) / (1 - b2)) + this.x0;
      y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b2, 2));
      b2 = Math.abs(y);
      if (b2 >= 1) {
        if (b2 - 1 > EPSLN) {
          return 93;
        } else {
          y = 0;
        }
      } else {
        y = Math.acos(y);
      }
      if (lat < 0) {
        y = -y;
      }
      y = this.a * this.k0 * (y - this.lat0) + this.y0;
    }
  } else {
    var al = cos_phi * delta_lon;
    var als = Math.pow(al, 2);
    var c2 = this.ep2 * Math.pow(cos_phi, 2);
    var cs = Math.pow(c2, 2);
    var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
    var t = Math.pow(tq, 2);
    var ts = Math.pow(t, 2);
    con = 1 - this.es * Math.pow(sin_phi, 2);
    al = al / Math.sqrt(con);
    var ml = pj_mlfn_default(lat, sin_phi, cos_phi, this.en);
    x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c2 + als / 20 * (5 - 18 * t + ts + 14 * c2 - 58 * t * c2 + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
    y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c2 + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c2 - 330 * t * c2 + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse3(p2) {
  var con, phi;
  var lat, lon;
  var x = (p2.x - this.x0) * (1 / this.a);
  var y = (p2.y - this.y0) * (1 / this.a);
  if (!this.es) {
    var f = Math.exp(x / this.k0);
    var g2 = 0.5 * (f - 1 / f);
    var temp = this.lat0 + y / this.k0;
    var h2 = Math.cos(temp);
    con = Math.sqrt((1 - Math.pow(h2, 2)) / (1 + Math.pow(g2, 2)));
    lat = Math.asin(con);
    if (y < 0) {
      lat = -lat;
    }
    if (g2 === 0 && h2 === 0) {
      lon = 0;
    } else {
      lon = adjust_lon_default(Math.atan2(g2, h2) + this.long0);
    }
  } else {
    con = this.ml0 + y / this.k0;
    phi = pj_inv_mlfn_default(con, this.es, this.en);
    if (Math.abs(phi) < HALF_PI) {
      var sin_phi = Math.sin(phi);
      var cos_phi = Math.cos(phi);
      var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
      var c2 = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c2, 2);
      var t = Math.pow(tan_phi, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      var d2 = x * Math.sqrt(con) / this.k0;
      var ds = Math.pow(d2, 2);
      con = con * tan_phi;
      lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c2 * t + c2 - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c2 * t + 45 * ts + 46 * c2 - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
      lon = adjust_lon_default(this.long0 + d2 * (1 - ds / 6 * (1 + 2 * t + c2 - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c2 * t + 6 * c2 - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi);
    } else {
      lat = HALF_PI * sign_default(y);
      lon = 0;
    }
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names4 = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
var tmerc_default = {
  init: init3,
  forward: forward3,
  inverse: inverse3,
  names: names4
};

// node_modules/proj4/lib/common/sinh.js
function sinh_default(x) {
  var r = Math.exp(x);
  r = (r - 1 / r) / 2;
  return r;
}

// node_modules/proj4/lib/common/hypot.js
function hypot_default(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  var a2 = Math.max(x, y);
  var b2 = Math.min(x, y) / (a2 ? a2 : 1);
  return a2 * Math.sqrt(1 + Math.pow(b2, 2));
}

// node_modules/proj4/lib/common/log1py.js
function log1py_default(x) {
  var y = 1 + x;
  var z = y - 1;
  return z === 0 ? x : x * Math.log(y) / z;
}

// node_modules/proj4/lib/common/asinhy.js
function asinhy_default(x) {
  var y = Math.abs(x);
  y = log1py_default(y * (1 + y / (hypot_default(1, y) + 1)));
  return x < 0 ? -y : y;
}

// node_modules/proj4/lib/common/gatg.js
function gatg_default(pp, B2) {
  var cos_2B = 2 * Math.cos(2 * B2);
  var i = pp.length - 1;
  var h1 = pp[i];
  var h2 = 0;
  var h3;
  while (--i >= 0) {
    h3 = -h2 + cos_2B * h1 + pp[i];
    h2 = h1;
    h1 = h3;
  }
  return B2 + h3 * Math.sin(2 * B2);
}

// node_modules/proj4/lib/common/clens.js
function clens_default(pp, arg_r) {
  var r = 2 * Math.cos(arg_r);
  var i = pp.length - 1;
  var hr1 = pp[i];
  var hr2 = 0;
  var hr;
  while (--i >= 0) {
    hr = -hr2 + r * hr1 + pp[i];
    hr2 = hr1;
    hr1 = hr;
  }
  return Math.sin(arg_r) * hr;
}

// node_modules/proj4/lib/common/cosh.js
function cosh_default(x) {
  var r = Math.exp(x);
  r = (r + 1 / r) / 2;
  return r;
}

// node_modules/proj4/lib/common/clens_cmplx.js
function clens_cmplx_default(pp, arg_r, arg_i) {
  var sin_arg_r = Math.sin(arg_r);
  var cos_arg_r = Math.cos(arg_r);
  var sinh_arg_i = sinh_default(arg_i);
  var cosh_arg_i = cosh_default(arg_i);
  var r = 2 * cos_arg_r * cosh_arg_i;
  var i = -2 * sin_arg_r * sinh_arg_i;
  var j = pp.length - 1;
  var hr = pp[j];
  var hi1 = 0;
  var hr1 = 0;
  var hi = 0;
  var hr2;
  var hi2;
  while (--j >= 0) {
    hr2 = hr1;
    hi2 = hi1;
    hr1 = hr;
    hi1 = hi;
    hr = -hr2 + r * hr1 - i * hi1 + pp[j];
    hi = -hi2 + i * hr1 + r * hi1;
  }
  r = sin_arg_r * cosh_arg_i;
  i = cos_arg_r * sinh_arg_i;
  return [r * hr - i * hi, r * hi + i * hr];
}

// node_modules/proj4/lib/projections/etmerc.js
function init4() {
  if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
    throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
  }
  if (this.approx) {
    tmerc_default.init.apply(this);
    this.forward = tmerc_default.forward;
    this.inverse = tmerc_default.inverse;
  }
  this.x0 = this.x0 !== void 0 ? this.x0 : 0;
  this.y0 = this.y0 !== void 0 ? this.y0 : 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
  this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
  this.cgb = [];
  this.cbg = [];
  this.utg = [];
  this.gtu = [];
  var f = this.es / (1 + Math.sqrt(1 - this.es));
  var n = f / (2 - f);
  var np = n;
  this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
  this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
  np = np * n;
  this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
  this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
  np = np * n;
  this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
  this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
  np = np * n;
  this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
  this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
  np = np * n;
  this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
  this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
  np = np * n;
  this.cgb[5] = np * (601676 / 22275);
  this.cbg[5] = np * (444337 / 155925);
  np = Math.pow(n, 2);
  this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
  this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
  this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
  this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
  this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
  np = np * n;
  this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
  this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
  np = np * n;
  this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
  this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
  np = np * n;
  this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
  this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
  np = np * n;
  this.utg[5] = np * (-20648693 / 638668800);
  this.gtu[5] = np * (212378941 / 319334400);
  var Z2 = gatg_default(this.cbg, this.lat0);
  this.Zb = -this.Qn * (Z2 + clens_default(this.gtu, 2 * Z2));
}
function forward4(p2) {
  var Ce = adjust_lon_default(p2.x - this.long0);
  var Cn = p2.y;
  Cn = gatg_default(this.cbg, Cn);
  var sin_Cn = Math.sin(Cn);
  var cos_Cn = Math.cos(Cn);
  var sin_Ce = Math.sin(Ce);
  var cos_Ce = Math.cos(Ce);
  Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
  Ce = Math.atan2(sin_Ce * cos_Cn, hypot_default(sin_Cn, cos_Cn * cos_Ce));
  Ce = asinhy_default(Math.tan(Ce));
  var tmp = clens_cmplx_default(this.gtu, 2 * Cn, 2 * Ce);
  Cn = Cn + tmp[0];
  Ce = Ce + tmp[1];
  var x;
  var y;
  if (Math.abs(Ce) <= 2.623395162778) {
    x = this.a * (this.Qn * Ce) + this.x0;
    y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
  } else {
    x = Infinity;
    y = Infinity;
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse4(p2) {
  var Ce = (p2.x - this.x0) * (1 / this.a);
  var Cn = (p2.y - this.y0) * (1 / this.a);
  Cn = (Cn - this.Zb) / this.Qn;
  Ce = Ce / this.Qn;
  var lon;
  var lat;
  if (Math.abs(Ce) <= 2.623395162778) {
    var tmp = clens_cmplx_default(this.utg, 2 * Cn, 2 * Ce);
    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];
    Ce = Math.atan(sinh_default(Ce));
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);
    Cn = Math.atan2(sin_Cn * cos_Ce, hypot_default(sin_Ce, cos_Ce * cos_Cn));
    Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
    lon = adjust_lon_default(Ce + this.long0);
    lat = gatg_default(this.cgb, Cn);
  } else {
    lon = Infinity;
    lat = Infinity;
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names5 = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
var etmerc_default = {
  init: init4,
  forward: forward4,
  inverse: inverse4,
  names: names5
};

// node_modules/proj4/lib/common/adjust_zone.js
function adjust_zone_default(zone, lon) {
  if (zone === void 0) {
    zone = Math.floor((adjust_lon_default(lon) + Math.PI) * 30 / Math.PI) + 1;
    if (zone < 0) {
      return 0;
    } else if (zone > 60) {
      return 60;
    }
  }
  return zone;
}

// node_modules/proj4/lib/projections/utm.js
var dependsOn = "etmerc";
function init5() {
  var zone = adjust_zone_default(this.zone, this.long0);
  if (zone === void 0) {
    throw new Error("unknown utm zone");
  }
  this.lat0 = 0;
  this.long0 = (6 * Math.abs(zone) - 183) * D2R;
  this.x0 = 5e5;
  this.y0 = this.utmSouth ? 1e7 : 0;
  this.k0 = 0.9996;
  etmerc_default.init.apply(this);
  this.forward = etmerc_default.forward;
  this.inverse = etmerc_default.inverse;
}
var names6 = ["Universal Transverse Mercator System", "utm"];
var utm_default = {
  init: init5,
  names: names6,
  dependsOn
};

// node_modules/proj4/lib/common/srat.js
function srat_default(esinp, exp) {
  return Math.pow((1 - esinp) / (1 + esinp), exp);
}

// node_modules/proj4/lib/projections/gauss.js
var MAX_ITER2 = 20;
function init6() {
  var sphi = Math.sin(this.lat0);
  var cphi = Math.cos(this.lat0);
  cphi *= cphi;
  this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
  this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
  this.phic0 = Math.asin(sphi / this.C);
  this.ratexp = 0.5 * this.C * this.e;
  this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat_default(this.e * sphi, this.ratexp));
}
function forward5(p2) {
  var lon = p2.x;
  var lat = p2.y;
  p2.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat_default(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
  p2.x = this.C * lon;
  return p2;
}
function inverse5(p2) {
  var DEL_TOL = 1e-14;
  var lon = p2.x / this.C;
  var lat = p2.y;
  var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
  for (var i = MAX_ITER2; i > 0; --i) {
    lat = 2 * Math.atan(num * srat_default(this.e * Math.sin(p2.y), -0.5 * this.e)) - HALF_PI;
    if (Math.abs(lat - p2.y) < DEL_TOL) {
      break;
    }
    p2.y = lat;
  }
  if (!i) {
    return null;
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names7 = ["gauss"];
var gauss_default = {
  init: init6,
  forward: forward5,
  inverse: inverse5,
  names: names7
};

// node_modules/proj4/lib/projections/sterea.js
function init7() {
  gauss_default.init.apply(this);
  if (!this.rc) {
    return;
  }
  this.sinc0 = Math.sin(this.phic0);
  this.cosc0 = Math.cos(this.phic0);
  this.R2 = 2 * this.rc;
  if (!this.title) {
    this.title = "Oblique Stereographic Alternative";
  }
}
function forward6(p2) {
  var sinc, cosc, cosl, k2;
  p2.x = adjust_lon_default(p2.x - this.long0);
  gauss_default.forward.apply(this, [p2]);
  sinc = Math.sin(p2.y);
  cosc = Math.cos(p2.y);
  cosl = Math.cos(p2.x);
  k2 = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
  p2.x = k2 * cosc * Math.sin(p2.x);
  p2.y = k2 * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
  p2.x = this.a * p2.x + this.x0;
  p2.y = this.a * p2.y + this.y0;
  return p2;
}
function inverse6(p2) {
  var sinc, cosc, lon, lat, rho;
  p2.x = (p2.x - this.x0) / this.a;
  p2.y = (p2.y - this.y0) / this.a;
  p2.x /= this.k0;
  p2.y /= this.k0;
  if (rho = hypot_default(p2.x, p2.y)) {
    var c2 = 2 * Math.atan2(rho, this.R2);
    sinc = Math.sin(c2);
    cosc = Math.cos(c2);
    lat = Math.asin(cosc * this.sinc0 + p2.y * sinc * this.cosc0 / rho);
    lon = Math.atan2(p2.x * sinc, rho * this.cosc0 * cosc - p2.y * this.sinc0 * sinc);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p2.x = lon;
  p2.y = lat;
  gauss_default.inverse.apply(this, [p2]);
  p2.x = adjust_lon_default(p2.x + this.long0);
  return p2;
}
var names8 = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
var sterea_default = {
  init: init7,
  forward: forward6,
  inverse: inverse6,
  names: names8
};

// node_modules/proj4/lib/projections/stere.js
function ssfn_(phit, sinphi, eccen) {
  sinphi *= eccen;
  return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
}
function init8() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.coslat0 = Math.cos(this.lat0);
  this.sinlat0 = Math.sin(this.lat0);
  if (this.sphere) {
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
      this.k0 = 0.5 * (1 + sign_default(this.lat0) * Math.sin(this.lat_ts));
    }
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (this.lat0 > 0) {
        this.con = 1;
      } else {
        this.con = -1;
      }
    }
    this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
    if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
      this.k0 = 0.5 * this.cons * msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz_default(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
    }
    this.ms1 = msfnz_default(this.e, this.sinlat0, this.coslat0);
    this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
    this.cosX0 = Math.cos(this.X0);
    this.sinX0 = Math.sin(this.X0);
  }
}
function forward7(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var sinlat = Math.sin(lat);
  var coslat = Math.cos(lat);
  var A5, X, sinX, cosX, ts, rh;
  var dlon = adjust_lon_default(lon - this.long0);
  if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
    p2.x = NaN;
    p2.y = NaN;
    return p2;
  }
  if (this.sphere) {
    A5 = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
    p2.x = this.a * A5 * coslat * Math.sin(dlon) + this.x0;
    p2.y = this.a * A5 * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
    return p2;
  } else {
    X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
    cosX = Math.cos(X);
    sinX = Math.sin(X);
    if (Math.abs(this.coslat0) <= EPSLN) {
      ts = tsfnz_default(this.e, lat * this.con, this.con * sinlat);
      rh = 2 * this.a * this.k0 * ts / this.cons;
      p2.x = this.x0 + rh * Math.sin(lon - this.long0);
      p2.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
      return p2;
    } else if (Math.abs(this.sinlat0) < EPSLN) {
      A5 = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
      p2.y = A5 * sinX;
    } else {
      A5 = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
      p2.y = A5 * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
    }
    p2.x = A5 * cosX * Math.sin(dlon) + this.x0;
  }
  return p2;
}
function inverse7(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var lon, lat, ts, ce, Chi;
  var rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  if (this.sphere) {
    var c2 = 2 * Math.atan(rh / (2 * this.a * this.k0));
    lon = this.long0;
    lat = this.lat0;
    if (rh <= EPSLN) {
      p2.x = lon;
      p2.y = lat;
      return p2;
    }
    lat = Math.asin(Math.cos(c2) * this.sinlat0 + p2.y * Math.sin(c2) * this.coslat0 / rh);
    if (Math.abs(this.coslat0) < EPSLN) {
      if (this.lat0 > 0) {
        lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, -1 * p2.y));
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, p2.y));
      }
    } else {
      lon = adjust_lon_default(this.long0 + Math.atan2(p2.x * Math.sin(c2), rh * this.coslat0 * Math.cos(c2) - p2.y * this.sinlat0 * Math.sin(c2)));
    }
    p2.x = lon;
    p2.y = lat;
    return p2;
  } else {
    if (Math.abs(this.coslat0) <= EPSLN) {
      if (rh <= EPSLN) {
        lat = this.lat0;
        lon = this.long0;
        p2.x = lon;
        p2.y = lat;
        return p2;
      }
      p2.x *= this.con;
      p2.y *= this.con;
      ts = rh * this.cons / (2 * this.a * this.k0);
      lat = this.con * phi2z_default(this.e, ts);
      lon = this.con * adjust_lon_default(this.con * this.long0 + Math.atan2(p2.x, -1 * p2.y));
    } else {
      ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
      lon = this.long0;
      if (rh <= EPSLN) {
        Chi = this.X0;
      } else {
        Chi = Math.asin(Math.cos(ce) * this.sinX0 + p2.y * Math.sin(ce) * this.cosX0 / rh);
        lon = adjust_lon_default(this.long0 + Math.atan2(p2.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p2.y * this.sinX0 * Math.sin(ce)));
      }
      lat = -1 * phi2z_default(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
    }
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names9 = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)", "Polar_Stereographic"];
var stere_default = {
  init: init8,
  forward: forward7,
  inverse: inverse7,
  names: names9,
  ssfn_
};

// node_modules/proj4/lib/projections/somerc.js
function init9() {
  var phy0 = this.lat0;
  this.lambda0 = this.long0;
  var sinPhy0 = Math.sin(phy0);
  var semiMajorAxis = this.a;
  var invF = this.rf;
  var flattening = 1 / invF;
  var e2 = 2 * flattening - Math.pow(flattening, 2);
  var e = this.e = Math.sqrt(e2);
  this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
  this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
  this.b0 = Math.asin(sinPhy0 / this.alpha);
  var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
  var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
  var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
  this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
}
function forward8(p2) {
  var Sa1 = Math.log(Math.tan(Math.PI / 4 - p2.y / 2));
  var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p2.y)) / (1 - this.e * Math.sin(p2.y)));
  var S2 = -this.alpha * (Sa1 + Sa2) + this.K;
  var b2 = 2 * (Math.atan(Math.exp(S2)) - Math.PI / 4);
  var I2 = this.alpha * (p2.x - this.lambda0);
  var rotI = Math.atan(Math.sin(I2) / (Math.sin(this.b0) * Math.tan(b2) + Math.cos(this.b0) * Math.cos(I2)));
  var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b2) - Math.sin(this.b0) * Math.cos(b2) * Math.cos(I2));
  p2.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
  p2.x = this.R * rotI + this.x0;
  return p2;
}
function inverse8(p2) {
  var Y = p2.x - this.x0;
  var X = p2.y - this.y0;
  var rotI = Y / this.R;
  var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
  var b2 = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
  var I2 = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
  var lambda = this.lambda0 + I2 / this.alpha;
  var S2 = 0;
  var phy = b2;
  var prevPhy = -1e3;
  var iteration = 0;
  while (Math.abs(phy - prevPhy) > 1e-7) {
    if (++iteration > 20) {
      return;
    }
    S2 = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b2 / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
    prevPhy = phy;
    phy = 2 * Math.atan(Math.exp(S2)) - Math.PI / 2;
  }
  p2.x = lambda;
  p2.y = phy;
  return p2;
}
var names10 = ["somerc"];
var somerc_default = {
  init: init9,
  forward: forward8,
  inverse: inverse8,
  names: names10
};

// node_modules/proj4/lib/projections/omerc.js
var TOL = 1e-7;
function isTypeA(P) {
  var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"];
  var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
  return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1;
}
function init10() {
  var con, com, cosph0, D2, F, H2, L2, sinph0, p2, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0, AB;
  this.no_off = isTypeA(this);
  this.no_rot = "no_rot" in this;
  var alp = false;
  if ("alpha" in this) {
    alp = true;
  }
  var gam = false;
  if ("rectified_grid_angle" in this) {
    gam = true;
  }
  if (alp) {
    alpha_c = this.alpha;
  }
  if (gam) {
    gamma = this.rectified_grid_angle * D2R;
  }
  if (alp || gam) {
    lamc = this.longc;
  } else {
    lam1 = this.long1;
    phi1 = this.lat1;
    lam2 = this.long2;
    phi2 = this.lat2;
    if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
      throw new Error();
    }
  }
  var one_es = 1 - this.es;
  com = Math.sqrt(one_es);
  if (Math.abs(this.lat0) > EPSLN) {
    sinph0 = Math.sin(this.lat0);
    cosph0 = Math.cos(this.lat0);
    con = 1 - this.es * sinph0 * sinph0;
    this.B = cosph0 * cosph0;
    this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
    this.A = this.B * this.k0 * com / con;
    D2 = this.B * com / (cosph0 * Math.sqrt(con));
    F = D2 * D2 - 1;
    if (F <= 0) {
      F = 0;
    } else {
      F = Math.sqrt(F);
      if (this.lat0 < 0) {
        F = -F;
      }
    }
    this.E = F += D2;
    this.E *= Math.pow(tsfnz_default(this.e, this.lat0, sinph0), this.B);
  } else {
    this.B = 1 / com;
    this.A = this.k0;
    this.E = D2 = F = 1;
  }
  if (alp || gam) {
    if (alp) {
      gamma0 = Math.asin(Math.sin(alpha_c) / D2);
      if (!gam) {
        gamma = alpha_c;
      }
    } else {
      gamma0 = gamma;
      alpha_c = Math.asin(D2 * Math.sin(gamma0));
    }
    this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
  } else {
    H2 = Math.pow(tsfnz_default(this.e, phi1, Math.sin(phi1)), this.B);
    L2 = Math.pow(tsfnz_default(this.e, phi2, Math.sin(phi2)), this.B);
    F = this.E / H2;
    p2 = (L2 - H2) / (L2 + H2);
    J = this.E * this.E;
    J = (J - L2 * H2) / (J + L2 * H2);
    con = lam1 - lam2;
    if (con < -Math.pi) {
      lam2 -= TWO_PI;
    } else if (con > Math.pi) {
      lam2 += TWO_PI;
    }
    this.lam0 = adjust_lon_default(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p2) / this.B);
    gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon_default(lam1 - this.lam0)) / (F - 1 / F));
    gamma = alpha_c = Math.asin(D2 * Math.sin(gamma0));
  }
  this.singam = Math.sin(gamma0);
  this.cosgam = Math.cos(gamma0);
  this.sinrot = Math.sin(gamma);
  this.cosrot = Math.cos(gamma);
  this.rB = 1 / this.B;
  this.ArB = this.A * this.rB;
  this.BrA = 1 / this.ArB;
  AB = this.A * this.B;
  if (this.no_off) {
    this.u_0 = 0;
  } else {
    this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D2 * D2 - 1) / Math.cos(alpha_c)));
    if (this.lat0 < 0) {
      this.u_0 = -this.u_0;
    }
  }
  F = 0.5 * gamma0;
  this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
  this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
}
function forward9(p2) {
  var coords = {};
  var S2, T, U2, V2, W, temp, u2, v2;
  p2.x = p2.x - this.lam0;
  if (Math.abs(Math.abs(p2.y) - HALF_PI) > EPSLN) {
    W = this.E / Math.pow(tsfnz_default(this.e, p2.y, Math.sin(p2.y)), this.B);
    temp = 1 / W;
    S2 = 0.5 * (W - temp);
    T = 0.5 * (W + temp);
    V2 = Math.sin(this.B * p2.x);
    U2 = (S2 * this.singam - V2 * this.cosgam) / T;
    if (Math.abs(Math.abs(U2) - 1) < EPSLN) {
      throw new Error();
    }
    v2 = 0.5 * this.ArB * Math.log((1 - U2) / (1 + U2));
    temp = Math.cos(this.B * p2.x);
    if (Math.abs(temp) < TOL) {
      u2 = this.A * p2.x;
    } else {
      u2 = this.ArB * Math.atan2(S2 * this.cosgam + V2 * this.singam, temp);
    }
  } else {
    v2 = p2.y > 0 ? this.v_pole_n : this.v_pole_s;
    u2 = this.ArB * p2.y;
  }
  if (this.no_rot) {
    coords.x = u2;
    coords.y = v2;
  } else {
    u2 -= this.u_0;
    coords.x = v2 * this.cosrot + u2 * this.sinrot;
    coords.y = u2 * this.cosrot - v2 * this.sinrot;
  }
  coords.x = this.a * coords.x + this.x0;
  coords.y = this.a * coords.y + this.y0;
  return coords;
}
function inverse9(p2) {
  var u2, v2, Qp, Sp, Tp, Vp, Up;
  var coords = {};
  p2.x = (p2.x - this.x0) * (1 / this.a);
  p2.y = (p2.y - this.y0) * (1 / this.a);
  if (this.no_rot) {
    v2 = p2.y;
    u2 = p2.x;
  } else {
    v2 = p2.x * this.cosrot - p2.y * this.sinrot;
    u2 = p2.y * this.cosrot + p2.x * this.sinrot + this.u_0;
  }
  Qp = Math.exp(-this.BrA * v2);
  Sp = 0.5 * (Qp - 1 / Qp);
  Tp = 0.5 * (Qp + 1 / Qp);
  Vp = Math.sin(this.BrA * u2);
  Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
  if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
    coords.x = 0;
    coords.y = Up < 0 ? -HALF_PI : HALF_PI;
  } else {
    coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
    coords.y = phi2z_default(this.e, Math.pow(coords.y, 1 / this.B));
    if (coords.y === Infinity) {
      throw new Error();
    }
    coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u2));
  }
  coords.x += this.lam0;
  return coords;
}
var names11 = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
var omerc_default = {
  init: init10,
  forward: forward9,
  inverse: inverse9,
  names: names11
};

// node_modules/proj4/lib/projections/lcc.js
function init11() {
  if (!this.lat2) {
    this.lat2 = this.lat1;
  }
  if (!this.k0) {
    this.k0 = 1;
  }
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  var temp = this.b / this.a;
  this.e = Math.sqrt(1 - temp * temp);
  var sin1 = Math.sin(this.lat1);
  var cos1 = Math.cos(this.lat1);
  var ms1 = msfnz_default(this.e, sin1, cos1);
  var ts1 = tsfnz_default(this.e, this.lat1, sin1);
  var sin2 = Math.sin(this.lat2);
  var cos2 = Math.cos(this.lat2);
  var ms2 = msfnz_default(this.e, sin2, cos2);
  var ts2 = tsfnz_default(this.e, this.lat2, sin2);
  var ts0 = tsfnz_default(this.e, this.lat0, Math.sin(this.lat0));
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
  } else {
    this.ns = sin1;
  }
  if (isNaN(this.ns)) {
    this.ns = sin1;
  }
  this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
  this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
  if (!this.title) {
    this.title = "Lambert Conformal Conic";
  }
}
function forward10(p2) {
  var lon = p2.x;
  var lat = p2.y;
  if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
    lat = sign_default(lat) * (HALF_PI - 2 * EPSLN);
  }
  var con = Math.abs(Math.abs(lat) - HALF_PI);
  var ts, rh1;
  if (con > EPSLN) {
    ts = tsfnz_default(this.e, lat, Math.sin(lat));
    rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
  } else {
    con = lat * this.ns;
    if (con <= 0) {
      return null;
    }
    rh1 = 0;
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0);
  p2.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
  p2.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
  return p2;
}
function inverse10(p2) {
  var rh1, con, ts;
  var lat, lon;
  var x = (p2.x - this.x0) / this.k0;
  var y = this.rh - (p2.y - this.y0) / this.k0;
  if (this.ns > 0) {
    rh1 = Math.sqrt(x * x + y * y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(x * x + y * y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * x, con * y);
  }
  if (rh1 !== 0 || this.ns > 0) {
    con = 1 / this.ns;
    ts = Math.pow(rh1 / (this.a * this.f0), con);
    lat = phi2z_default(this.e, ts);
    if (lat === -9999) {
      return null;
    }
  } else {
    lat = -HALF_PI;
  }
  lon = adjust_lon_default(theta / this.ns + this.long0);
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names12 = [
  "Lambert Tangential Conformal Conic Projection",
  "Lambert_Conformal_Conic",
  "Lambert_Conformal_Conic_1SP",
  "Lambert_Conformal_Conic_2SP",
  "lcc",
  "Lambert Conic Conformal (1SP)",
  "Lambert Conic Conformal (2SP)"
];
var lcc_default = {
  init: init11,
  forward: forward10,
  inverse: inverse10,
  names: names12
};

// node_modules/proj4/lib/projections/krovak.js
function init12() {
  this.a = 6377397155e-3;
  this.es = 0.006674372230614;
  this.e = Math.sqrt(this.es);
  if (!this.lat0) {
    this.lat0 = 0.863937979737193;
  }
  if (!this.long0) {
    this.long0 = 0.7417649320975901 - 0.308341501185665;
  }
  if (!this.k0) {
    this.k0 = 0.9999;
  }
  this.s45 = 0.785398163397448;
  this.s90 = 2 * this.s45;
  this.fi0 = this.lat0;
  this.e2 = this.es;
  this.e = Math.sqrt(this.e2);
  this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
  this.uq = 1.04216856380474;
  this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
  this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
  this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
  this.k1 = this.k0;
  this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
  this.s0 = 1.37008346281555;
  this.n = Math.sin(this.s0);
  this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
  this.ad = this.s90 - this.uq;
}
function forward11(p2) {
  var gfi, u2, deltav, s, d2, eps, ro;
  var lon = p2.x;
  var lat = p2.y;
  var delta_lon = adjust_lon_default(lon - this.long0);
  gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
  u2 = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
  deltav = -delta_lon * this.alfa;
  s = Math.asin(Math.cos(this.ad) * Math.sin(u2) + Math.sin(this.ad) * Math.cos(u2) * Math.cos(deltav));
  d2 = Math.asin(Math.cos(u2) * Math.sin(deltav) / Math.cos(s));
  eps = this.n * d2;
  ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
  p2.y = ro * Math.cos(eps) / 1;
  p2.x = ro * Math.sin(eps) / 1;
  if (!this.czech) {
    p2.y *= -1;
    p2.x *= -1;
  }
  return p2;
}
function inverse11(p2) {
  var u2, deltav, s, d2, eps, ro, fi1;
  var ok;
  var tmp = p2.x;
  p2.x = p2.y;
  p2.y = tmp;
  if (!this.czech) {
    p2.y *= -1;
    p2.x *= -1;
  }
  ro = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  eps = Math.atan2(p2.y, p2.x);
  d2 = eps / Math.sin(this.s0);
  s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
  u2 = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d2));
  deltav = Math.asin(Math.cos(s) * Math.sin(d2) / Math.cos(u2));
  p2.x = this.long0 - deltav / this.alfa;
  fi1 = u2;
  ok = 0;
  var iter = 0;
  do {
    p2.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u2 / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
    if (Math.abs(fi1 - p2.y) < 1e-10) {
      ok = 1;
    }
    fi1 = p2.y;
    iter += 1;
  } while (ok === 0 && iter < 15);
  if (iter >= 15) {
    return null;
  }
  return p2;
}
var names13 = ["Krovak", "krovak"];
var krovak_default = {
  init: init12,
  forward: forward11,
  inverse: inverse11,
  names: names13
};

// node_modules/proj4/lib/common/mlfn.js
function mlfn_default(e0, e1, e2, e3, phi) {
  return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
}

// node_modules/proj4/lib/common/e0fn.js
function e0fn_default(x) {
  return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
}

// node_modules/proj4/lib/common/e1fn.js
function e1fn_default(x) {
  return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
}

// node_modules/proj4/lib/common/e2fn.js
function e2fn_default(x) {
  return 0.05859375 * x * x * (1 + 0.75 * x);
}

// node_modules/proj4/lib/common/e3fn.js
function e3fn_default(x) {
  return x * x * x * (35 / 3072);
}

// node_modules/proj4/lib/common/gN.js
function gN_default(a2, e, sinphi) {
  var temp = e * sinphi;
  return a2 / Math.sqrt(1 - temp * temp);
}

// node_modules/proj4/lib/common/adjust_lat.js
function adjust_lat_default(x) {
  return Math.abs(x) < HALF_PI ? x : x - sign_default(x) * Math.PI;
}

// node_modules/proj4/lib/common/imlfn.js
function imlfn_default(ml, e0, e1, e2, e3) {
  var phi;
  var dphi;
  phi = ml / e0;
  for (var i = 0; i < 15; i++) {
    dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}

// node_modules/proj4/lib/projections/cass.js
function init13() {
  if (!this.sphere) {
    this.e0 = e0fn_default(this.es);
    this.e1 = e1fn_default(this.es);
    this.e2 = e2fn_default(this.es);
    this.e3 = e3fn_default(this.es);
    this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
  }
}
function forward12(p2) {
  var x, y;
  var lam = p2.x;
  var phi = p2.y;
  lam = adjust_lon_default(lam - this.long0);
  if (this.sphere) {
    x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
    y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
  } else {
    var sinphi = Math.sin(phi);
    var cosphi = Math.cos(phi);
    var nl = gN_default(this.a, this.e, sinphi);
    var tl = Math.tan(phi) * Math.tan(phi);
    var al = lam * Math.cos(phi);
    var asq = al * al;
    var cl = this.es * cosphi * cosphi / (1 - this.es);
    var ml = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
    x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
    y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);
  }
  p2.x = x + this.x0;
  p2.y = y + this.y0;
  return p2;
}
function inverse12(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var x = p2.x / this.a;
  var y = p2.y / this.a;
  var phi, lam;
  if (this.sphere) {
    var dd = y + this.lat0;
    phi = Math.asin(Math.sin(dd) * Math.cos(x));
    lam = Math.atan2(Math.tan(x), Math.cos(dd));
  } else {
    var ml1 = this.ml0 / this.a + y;
    var phi1 = imlfn_default(ml1, this.e0, this.e1, this.e2, this.e3);
    if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
      p2.x = this.long0;
      p2.y = HALF_PI;
      if (y < 0) {
        p2.y *= -1;
      }
      return p2;
    }
    var nl1 = gN_default(this.a, this.e, Math.sin(phi1));
    var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
    var tl1 = Math.pow(Math.tan(phi1), 2);
    var dl = x * this.a / nl1;
    var dsq = dl * dl;
    phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
    lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
  }
  p2.x = adjust_lon_default(lam + this.long0);
  p2.y = adjust_lat_default(phi);
  return p2;
}
var names14 = ["Cassini", "Cassini_Soldner", "cass"];
var cass_default = {
  init: init13,
  forward: forward12,
  inverse: inverse12,
  names: names14
};

// node_modules/proj4/lib/common/qsfnz.js
function qsfnz_default(eccent, sinphi) {
  var con;
  if (eccent > 1e-7) {
    con = eccent * sinphi;
    return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
  } else {
    return 2 * sinphi;
  }
}

// node_modules/proj4/lib/projections/laea.js
var S_POLE = 1;
var N_POLE = 2;
var EQUIT = 3;
var OBLIQ = 4;
function init14() {
  var t = Math.abs(this.lat0);
  if (Math.abs(t - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
  } else if (Math.abs(t) < EPSLN) {
    this.mode = this.EQUIT;
  } else {
    this.mode = this.OBLIQ;
  }
  if (this.es > 0) {
    var sinphi;
    this.qp = qsfnz_default(this.e, 1);
    this.mmf = 0.5 / (1 - this.es);
    this.apa = authset(this.es);
    switch (this.mode) {
      case this.N_POLE:
        this.dd = 1;
        break;
      case this.S_POLE:
        this.dd = 1;
        break;
      case this.EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case this.OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz_default(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
    }
  } else {
    if (this.mode === this.OBLIQ) {
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }
  }
}
function forward13(p2) {
  var x, y, coslam, sinlam, sinphi, q2, sinb, cosb, b2, cosphi;
  var lam = p2.x;
  var phi = p2.y;
  lam = adjust_lon_default(lam - this.long0);
  if (this.sphere) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    coslam = Math.cos(lam);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      if (y <= EPSLN) {
        return null;
      }
      y = Math.sqrt(2 / y);
      x = y * cosphi * Math.sin(lam);
      y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        coslam = -coslam;
      }
      if (Math.abs(phi + this.lat0) < EPSLN) {
        return null;
      }
      y = FORTPI - phi * 0.5;
      y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
      x = y * Math.sin(lam);
      y *= coslam;
    }
  } else {
    sinb = 0;
    cosb = 0;
    b2 = 0;
    coslam = Math.cos(lam);
    sinlam = Math.sin(lam);
    sinphi = Math.sin(phi);
    q2 = qsfnz_default(this.e, sinphi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinb = q2 / this.qp;
      cosb = Math.sqrt(1 - sinb * sinb);
    }
    switch (this.mode) {
      case this.OBLIQ:
        b2 = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b2 = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b2 = HALF_PI + phi;
        q2 = this.qp - q2;
        break;
      case this.S_POLE:
        b2 = phi - HALF_PI;
        q2 = this.qp + q2;
        break;
    }
    if (Math.abs(b2) < EPSLN) {
      return null;
    }
    switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b2 = Math.sqrt(2 / b2);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b2 * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        } else {
          y = (b2 = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b2 * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q2 >= 0) {
          x = (b2 = Math.sqrt(q2)) * sinlam;
          y = coslam * (this.mode === this.S_POLE ? b2 : -b2);
        } else {
          x = y = 0;
        }
        break;
    }
  }
  p2.x = this.a * x + this.x0;
  p2.y = this.a * y + this.y0;
  return p2;
}
function inverse13(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var x = p2.x / this.a;
  var y = p2.y / this.a;
  var lam, phi, cCe, sCe, q2, rho, ab;
  if (this.sphere) {
    var cosz = 0, rh, sinz = 0;
    rh = Math.sqrt(x * x + y * y);
    phi = rh * 0.5;
    if (phi > 1) {
      return null;
    }
    phi = 2 * Math.asin(phi);
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      sinz = Math.sin(phi);
      cosz = Math.cos(phi);
    }
    switch (this.mode) {
      case this.EQUIT:
        phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
    }
    lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
  } else {
    ab = 0;
    if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
      x /= this.dd;
      y *= this.dd;
      rho = Math.sqrt(x * x + y * y);
      if (rho < EPSLN) {
        p2.x = this.long0;
        p2.y = this.lat0;
        return p2;
      }
      sCe = 2 * Math.asin(0.5 * rho / this.rq);
      cCe = Math.cos(sCe);
      x *= sCe = Math.sin(sCe);
      if (this.mode === this.OBLIQ) {
        ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
        q2 = this.qp * ab;
        y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
      } else {
        ab = y * sCe / rho;
        q2 = this.qp * ab;
        y = rho * cCe;
      }
    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
      if (this.mode === this.N_POLE) {
        y = -y;
      }
      q2 = x * x + y * y;
      if (!q2) {
        p2.x = this.long0;
        p2.y = this.lat0;
        return p2;
      }
      ab = 1 - q2 / this.qp;
      if (this.mode === this.S_POLE) {
        ab = -ab;
      }
    }
    lam = Math.atan2(x, y);
    phi = authlat(Math.asin(ab), this.apa);
  }
  p2.x = adjust_lon_default(this.long0 + lam);
  p2.y = phi;
  return p2;
}
var P00 = 0.3333333333333333;
var P01 = 0.17222222222222222;
var P02 = 0.10257936507936508;
var P10 = 0.06388888888888888;
var P11 = 0.0664021164021164;
var P20 = 0.016415012942191543;
function authset(es) {
  var t;
  var APA = [];
  APA[0] = es * P00;
  t = es * es;
  APA[0] += t * P01;
  APA[1] = t * P10;
  t *= es;
  APA[0] += t * P02;
  APA[1] += t * P11;
  APA[2] = t * P20;
  return APA;
}
function authlat(beta, APA) {
  var t = beta + beta;
  return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
}
var names15 = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
var laea_default = {
  init: init14,
  forward: forward13,
  inverse: inverse13,
  names: names15,
  S_POLE,
  N_POLE,
  EQUIT,
  OBLIQ
};

// node_modules/proj4/lib/common/asinz.js
function asinz_default(x) {
  if (Math.abs(x) > 1) {
    x = x > 1 ? 1 : -1;
  }
  return Math.asin(x);
}

// node_modules/proj4/lib/projections/aea.js
function init15() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e3 = Math.sqrt(this.es);
  this.sin_po = Math.sin(this.lat1);
  this.cos_po = Math.cos(this.lat1);
  this.t1 = this.sin_po;
  this.con = this.sin_po;
  this.ms1 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs1 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat2);
  this.cos_po = Math.cos(this.lat2);
  this.t2 = this.sin_po;
  this.ms2 = msfnz_default(this.e3, this.sin_po, this.cos_po);
  this.qs2 = qsfnz_default(this.e3, this.sin_po);
  this.sin_po = Math.sin(this.lat0);
  this.cos_po = Math.cos(this.lat0);
  this.t3 = this.sin_po;
  this.qs0 = qsfnz_default(this.e3, this.sin_po);
  if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
    this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
  } else {
    this.ns0 = this.con;
  }
  this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
  this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
}
function forward14(p2) {
  var lon = p2.x;
  var lat = p2.y;
  this.sin_phi = Math.sin(lat);
  this.cos_phi = Math.cos(lat);
  var qs = qsfnz_default(this.e3, this.sin_phi);
  var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
  var theta = this.ns0 * adjust_lon_default(lon - this.long0);
  var x = rh1 * Math.sin(theta) + this.x0;
  var y = this.rh - rh1 * Math.cos(theta) + this.y0;
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse14(p2) {
  var rh1, qs, con, theta, lon, lat;
  p2.x -= this.x0;
  p2.y = this.rh - p2.y + this.y0;
  if (this.ns0 >= 0) {
    rh1 = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    con = -1;
  }
  theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p2.x, con * p2.y);
  }
  con = rh1 * this.ns0 / this.a;
  if (this.sphere) {
    lat = Math.asin((this.c - con * con) / (2 * this.ns0));
  } else {
    qs = (this.c - con * con) / this.ns0;
    lat = this.phi1z(this.e3, qs);
  }
  lon = adjust_lon_default(theta / this.ns0 + this.long0);
  p2.x = lon;
  p2.y = lat;
  return p2;
}
function phi1z(eccent, qs) {
  var sinphi, cosphi, con, com, dphi;
  var phi = asinz_default(0.5 * qs);
  if (eccent < EPSLN) {
    return phi;
  }
  var eccnts = eccent * eccent;
  for (var i = 1; i <= 25; i++) {
    sinphi = Math.sin(phi);
    cosphi = Math.cos(phi);
    con = eccent * sinphi;
    com = 1 - con * con;
    dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi = phi + dphi;
    if (Math.abs(dphi) <= 1e-7) {
      return phi;
    }
  }
  return null;
}
var names16 = ["Albers_Conic_Equal_Area", "Albers", "aea"];
var aea_default = {
  init: init15,
  forward: forward14,
  inverse: inverse14,
  names: names16,
  phi1z
};

// node_modules/proj4/lib/projections/gnom.js
function init16() {
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
  this.infinity_dist = 1e3 * this.a;
  this.rc = 1;
}
function forward15(p2) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var ksp;
  var g2;
  var x, y;
  var lon = p2.x;
  var lat = p2.y;
  dlon = adjust_lon_default(lon - this.long0);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g2 = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g2 > 0 || Math.abs(g2) <= EPSLN) {
    x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g2;
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g2;
  } else {
    x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
    y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse15(p2) {
  var rh;
  var sinc, cosc;
  var c2;
  var lon, lat;
  p2.x = (p2.x - this.x0) / this.a;
  p2.y = (p2.y - this.y0) / this.a;
  p2.x /= this.k0;
  p2.y /= this.k0;
  if (rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y)) {
    c2 = Math.atan2(rh, this.rc);
    sinc = Math.sin(c2);
    cosc = Math.cos(c2);
    lat = asinz_default(cosc * this.sin_p14 + p2.y * sinc * this.cos_p14 / rh);
    lon = Math.atan2(p2.x * sinc, rh * this.cos_p14 * cosc - p2.y * this.sin_p14 * sinc);
    lon = adjust_lon_default(this.long0 + lon);
  } else {
    lat = this.phic0;
    lon = 0;
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names17 = ["gnom"];
var gnom_default = {
  init: init16,
  forward: forward15,
  inverse: inverse15,
  names: names17
};

// node_modules/proj4/lib/common/iqsfnz.js
function iqsfnz_default(eccent, q2) {
  var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
  if (Math.abs(Math.abs(q2) - temp) < 1e-6) {
    if (q2 < 0) {
      return -1 * HALF_PI;
    } else {
      return HALF_PI;
    }
  }
  var phi = Math.asin(0.5 * q2);
  var dphi;
  var sin_phi;
  var cos_phi;
  var con;
  for (var i = 0; i < 30; i++) {
    sin_phi = Math.sin(phi);
    cos_phi = Math.cos(phi);
    con = eccent * sin_phi;
    dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q2 / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
    phi += dphi;
    if (Math.abs(dphi) <= 1e-10) {
      return phi;
    }
  }
  return NaN;
}

// node_modules/proj4/lib/projections/cea.js
function init17() {
  if (!this.sphere) {
    this.k0 = msfnz_default(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
  }
}
function forward16(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var x, y;
  var dlon = adjust_lon_default(lon - this.long0);
  if (this.sphere) {
    x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
    y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
  } else {
    var qs = qsfnz_default(this.e, Math.sin(lat));
    x = this.x0 + this.a * this.k0 * dlon;
    y = this.y0 + this.a * qs * 0.5 / this.k0;
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse16(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var lon, lat;
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + p2.x / this.a / Math.cos(this.lat_ts));
    lat = Math.asin(p2.y / this.a * Math.cos(this.lat_ts));
  } else {
    lat = iqsfnz_default(this.e, 2 * p2.y * this.k0 / this.a);
    lon = adjust_lon_default(this.long0 + p2.x / (this.a * this.k0));
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names18 = ["cea"];
var cea_default = {
  init: init17,
  forward: forward16,
  inverse: inverse16,
  names: names18
};

// node_modules/proj4/lib/projections/eqc.js
function init18() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
  this.rc = Math.cos(this.lat_ts);
}
function forward17(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var dlon = adjust_lon_default(lon - this.long0);
  var dlat = adjust_lat_default(lat - this.lat0);
  p2.x = this.x0 + this.a * dlon * this.rc;
  p2.y = this.y0 + this.a * dlat;
  return p2;
}
function inverse17(p2) {
  var x = p2.x;
  var y = p2.y;
  p2.x = adjust_lon_default(this.long0 + (x - this.x0) / (this.a * this.rc));
  p2.y = adjust_lat_default(this.lat0 + (y - this.y0) / this.a);
  return p2;
}
var names19 = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
var eqc_default = {
  init: init18,
  forward: forward17,
  inverse: inverse17,
  names: names19
};

// node_modules/proj4/lib/projections/poly.js
var MAX_ITER3 = 20;
function init19() {
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.ml0 = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function forward18(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var x, y, el;
  var dlon = adjust_lon_default(lon - this.long0);
  el = dlon * Math.sin(lat);
  if (this.sphere) {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.a * this.lat0;
    } else {
      x = this.a * Math.sin(el) / Math.tan(lat);
      y = this.a * (adjust_lat_default(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
    }
  } else {
    if (Math.abs(lat) <= EPSLN) {
      x = this.a * dlon;
      y = -1 * this.ml0;
    } else {
      var nl = gN_default(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
      x = nl * Math.sin(el);
      y = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
    }
  }
  p2.x = x + this.x0;
  p2.y = y + this.y0;
  return p2;
}
function inverse18(p2) {
  var lon, lat, x, y, i;
  var al, bl;
  var phi, dphi;
  x = p2.x - this.x0;
  y = p2.y - this.y0;
  if (this.sphere) {
    if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
      lon = adjust_lon_default(x / this.a + this.long0);
      lat = 0;
    } else {
      al = this.lat0 + y / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var tanphi;
      for (i = MAX_ITER3; i; --i) {
        tanphi = Math.tan(phi);
        dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
        phi += dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      lon = adjust_lon_default(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat));
    }
  } else {
    if (Math.abs(y + this.ml0) <= EPSLN) {
      lat = 0;
      lon = adjust_lon_default(this.long0 + x / this.a);
    } else {
      al = (this.ml0 + y) / this.a;
      bl = x * x / this.a / this.a + al * al;
      phi = al;
      var cl, mln, mlnp, ma;
      var con;
      for (i = MAX_ITER3; i; --i) {
        con = this.e * Math.sin(phi);
        cl = Math.sqrt(1 - con * con) * Math.tan(phi);
        mln = this.a * mlfn_default(this.e0, this.e1, this.e2, this.e3, phi);
        mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
        ma = mln / this.a;
        dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
        phi -= dphi;
        if (Math.abs(dphi) <= EPSLN) {
          lat = phi;
          break;
        }
      }
      cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
      lon = adjust_lon_default(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
    }
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names20 = ["Polyconic", "poly"];
var poly_default = {
  init: init19,
  forward: forward18,
  inverse: inverse18,
  names: names20
};

// node_modules/proj4/lib/projections/nzmg.js
function init20() {
  this.A = [];
  this.A[1] = 0.6399175073;
  this.A[2] = -0.1358797613;
  this.A[3] = 0.063294409;
  this.A[4] = -0.02526853;
  this.A[5] = 0.0117879;
  this.A[6] = -55161e-7;
  this.A[7] = 26906e-7;
  this.A[8] = -1333e-6;
  this.A[9] = 67e-5;
  this.A[10] = -34e-5;
  this.B_re = [];
  this.B_im = [];
  this.B_re[1] = 0.7557853228;
  this.B_im[1] = 0;
  this.B_re[2] = 0.249204646;
  this.B_im[2] = 3371507e-9;
  this.B_re[3] = -1541739e-9;
  this.B_im[3] = 0.04105856;
  this.B_re[4] = -0.10162907;
  this.B_im[4] = 0.01727609;
  this.B_re[5] = -0.26623489;
  this.B_im[5] = -0.36249218;
  this.B_re[6] = -0.6870983;
  this.B_im[6] = -1.1651967;
  this.C_re = [];
  this.C_im = [];
  this.C_re[1] = 1.3231270439;
  this.C_im[1] = 0;
  this.C_re[2] = -0.577245789;
  this.C_im[2] = -7809598e-9;
  this.C_re[3] = 0.508307513;
  this.C_im[3] = -0.112208952;
  this.C_re[4] = -0.15094762;
  this.C_im[4] = 0.18200602;
  this.C_re[5] = 1.01418179;
  this.C_im[5] = 1.64497696;
  this.C_re[6] = 1.9660549;
  this.C_im[6] = 2.5127645;
  this.D = [];
  this.D[1] = 1.5627014243;
  this.D[2] = 0.5185406398;
  this.D[3] = -0.03333098;
  this.D[4] = -0.1052906;
  this.D[5] = -0.0368594;
  this.D[6] = 7317e-6;
  this.D[7] = 0.0122;
  this.D[8] = 394e-5;
  this.D[9] = -13e-4;
}
function forward19(p2) {
  var n;
  var lon = p2.x;
  var lat = p2.y;
  var delta_lat = lat - this.lat0;
  var delta_lon = lon - this.long0;
  var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
  var d_lambda = delta_lon;
  var d_phi_n = 1;
  var d_psi = 0;
  for (n = 1; n <= 10; n++) {
    d_phi_n = d_phi_n * d_phi;
    d_psi = d_psi + this.A[n] * d_phi_n;
  }
  var th_re = d_psi;
  var th_im = d_lambda;
  var th_n_re = 1;
  var th_n_im = 0;
  var th_n_re1;
  var th_n_im1;
  var z_re = 0;
  var z_im = 0;
  for (n = 1; n <= 6; n++) {
    th_n_re1 = th_n_re * th_re - th_n_im * th_im;
    th_n_im1 = th_n_im * th_re + th_n_re * th_im;
    th_n_re = th_n_re1;
    th_n_im = th_n_im1;
    z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
    z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
  }
  p2.x = z_im * this.a + this.x0;
  p2.y = z_re * this.a + this.y0;
  return p2;
}
function inverse19(p2) {
  var n;
  var x = p2.x;
  var y = p2.y;
  var delta_x = x - this.x0;
  var delta_y = y - this.y0;
  var z_re = delta_y / this.a;
  var z_im = delta_x / this.a;
  var z_n_re = 1;
  var z_n_im = 0;
  var z_n_re1;
  var z_n_im1;
  var th_re = 0;
  var th_im = 0;
  for (n = 1; n <= 6; n++) {
    z_n_re1 = z_n_re * z_re - z_n_im * z_im;
    z_n_im1 = z_n_im * z_re + z_n_re * z_im;
    z_n_re = z_n_re1;
    z_n_im = z_n_im1;
    th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
    th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
  }
  for (var i = 0; i < this.iterations; i++) {
    var th_n_re = th_re;
    var th_n_im = th_im;
    var th_n_re1;
    var th_n_im1;
    var num_re = z_re;
    var num_im = z_im;
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    th_n_re = 1;
    th_n_im = 0;
    var den_re = this.B_re[1];
    var den_im = this.B_im[1];
    for (n = 2; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
      den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
    }
    var den2 = den_re * den_re + den_im * den_im;
    th_re = (num_re * den_re + num_im * den_im) / den2;
    th_im = (num_im * den_re - num_re * den_im) / den2;
  }
  var d_psi = th_re;
  var d_lambda = th_im;
  var d_psi_n = 1;
  var d_phi = 0;
  for (n = 1; n <= 9; n++) {
    d_psi_n = d_psi_n * d_psi;
    d_phi = d_phi + this.D[n] * d_psi_n;
  }
  var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
  var lon = this.long0 + d_lambda;
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names21 = ["New_Zealand_Map_Grid", "nzmg"];
var nzmg_default = {
  init: init20,
  forward: forward19,
  inverse: inverse19,
  names: names21
};

// node_modules/proj4/lib/projections/mill.js
function init21() {
}
function forward20(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var dlon = adjust_lon_default(lon - this.long0);
  var x = this.x0 + this.a * dlon;
  var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse20(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var lon = adjust_lon_default(this.long0 + p2.x / this.a);
  var lat = 2.5 * (Math.atan(Math.exp(0.8 * p2.y / this.a)) - Math.PI / 4);
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names22 = ["Miller_Cylindrical", "mill"];
var mill_default = {
  init: init21,
  forward: forward20,
  inverse: inverse20,
  names: names22
};

// node_modules/proj4/lib/projections/sinu.js
var MAX_ITER4 = 20;
function init22() {
  if (!this.sphere) {
    this.en = pj_enfn_default(this.es);
  } else {
    this.n = 1;
    this.m = 0;
    this.es = 0;
    this.C_y = Math.sqrt((this.m + 1) / this.n);
    this.C_x = this.C_y / (this.m + 1);
  }
}
function forward21(p2) {
  var x, y;
  var lon = p2.x;
  var lat = p2.y;
  lon = adjust_lon_default(lon - this.long0);
  if (this.sphere) {
    if (!this.m) {
      lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
    } else {
      var k2 = this.n * Math.sin(lat);
      for (var i = MAX_ITER4; i; --i) {
        var V2 = (this.m * lat + Math.sin(lat) - k2) / (this.m + Math.cos(lat));
        lat -= V2;
        if (Math.abs(V2) < EPSLN) {
          break;
        }
      }
    }
    x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
    y = this.a * this.C_y * lat;
  } else {
    var s = Math.sin(lat);
    var c2 = Math.cos(lat);
    y = this.a * pj_mlfn_default(lat, s, c2, this.en);
    x = this.a * lon * c2 / Math.sqrt(1 - this.es * s * s);
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse21(p2) {
  var lat, temp, lon, s;
  p2.x -= this.x0;
  lon = p2.x / this.a;
  p2.y -= this.y0;
  lat = p2.y / this.a;
  if (this.sphere) {
    lat /= this.C_y;
    lon = lon / (this.C_x * (this.m + Math.cos(lat)));
    if (this.m) {
      lat = asinz_default((this.m * lat + Math.sin(lat)) / this.n);
    } else if (this.n !== 1) {
      lat = asinz_default(Math.sin(lat) / this.n);
    }
    lon = adjust_lon_default(lon + this.long0);
    lat = adjust_lat_default(lat);
  } else {
    lat = pj_inv_mlfn_default(p2.y / this.a, this.es, this.en);
    s = Math.abs(lat);
    if (s < HALF_PI) {
      s = Math.sin(lat);
      temp = this.long0 + p2.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
      lon = adjust_lon_default(temp);
    } else if (s - EPSLN < HALF_PI) {
      lon = this.long0;
    }
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names23 = ["Sinusoidal", "sinu"];
var sinu_default = {
  init: init22,
  forward: forward21,
  inverse: inverse21,
  names: names23
};

// node_modules/proj4/lib/projections/moll.js
function init23() {
}
function forward22(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var delta_lon = adjust_lon_default(lon - this.long0);
  var theta = lat;
  var con = Math.PI * Math.sin(lat);
  while (true) {
    var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
    theta += delta_theta;
    if (Math.abs(delta_theta) < EPSLN) {
      break;
    }
  }
  theta /= 2;
  if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
    delta_lon = 0;
  }
  var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
  var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse22(p2) {
  var theta;
  var arg;
  p2.x -= this.x0;
  p2.y -= this.y0;
  arg = p2.y / (1.4142135623731 * this.a);
  if (Math.abs(arg) > 0.999999999999) {
    arg = 0.999999999999;
  }
  theta = Math.asin(arg);
  var lon = adjust_lon_default(this.long0 + p2.x / (0.900316316158 * this.a * Math.cos(theta)));
  if (lon < -Math.PI) {
    lon = -Math.PI;
  }
  if (lon > Math.PI) {
    lon = Math.PI;
  }
  arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
  if (Math.abs(arg) > 1) {
    arg = 1;
  }
  var lat = Math.asin(arg);
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names24 = ["Mollweide", "moll"];
var moll_default = {
  init: init23,
  forward: forward22,
  inverse: inverse22,
  names: names24
};

// node_modules/proj4/lib/projections/eqdc.js
function init24() {
  if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
    return;
  }
  this.lat2 = this.lat2 || this.lat1;
  this.temp = this.b / this.a;
  this.es = 1 - Math.pow(this.temp, 2);
  this.e = Math.sqrt(this.es);
  this.e0 = e0fn_default(this.es);
  this.e1 = e1fn_default(this.es);
  this.e2 = e2fn_default(this.es);
  this.e3 = e3fn_default(this.es);
  this.sinphi = Math.sin(this.lat1);
  this.cosphi = Math.cos(this.lat1);
  this.ms1 = msfnz_default(this.e, this.sinphi, this.cosphi);
  this.ml1 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat1);
  if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
    this.ns = this.sinphi;
  } else {
    this.sinphi = Math.sin(this.lat2);
    this.cosphi = Math.cos(this.lat2);
    this.ms2 = msfnz_default(this.e, this.sinphi, this.cosphi);
    this.ml2 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat2);
    this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
  }
  this.g = this.ml1 + this.ms1 / this.ns;
  this.ml0 = mlfn_default(this.e0, this.e1, this.e2, this.e3, this.lat0);
  this.rh = this.a * (this.g - this.ml0);
}
function forward23(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var rh1;
  if (this.sphere) {
    rh1 = this.a * (this.g - lat);
  } else {
    var ml = mlfn_default(this.e0, this.e1, this.e2, this.e3, lat);
    rh1 = this.a * (this.g - ml);
  }
  var theta = this.ns * adjust_lon_default(lon - this.long0);
  var x = this.x0 + rh1 * Math.sin(theta);
  var y = this.y0 + this.rh - rh1 * Math.cos(theta);
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse23(p2) {
  p2.x -= this.x0;
  p2.y = this.rh - p2.y + this.y0;
  var con, rh1, lat, lon;
  if (this.ns >= 0) {
    rh1 = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    con = 1;
  } else {
    rh1 = -Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    con = -1;
  }
  var theta = 0;
  if (rh1 !== 0) {
    theta = Math.atan2(con * p2.x, con * p2.y);
  }
  if (this.sphere) {
    lon = adjust_lon_default(this.long0 + theta / this.ns);
    lat = adjust_lat_default(this.g - rh1 / this.a);
    p2.x = lon;
    p2.y = lat;
    return p2;
  } else {
    var ml = this.g - rh1 / this.a;
    lat = imlfn_default(ml, this.e0, this.e1, this.e2, this.e3);
    lon = adjust_lon_default(this.long0 + theta / this.ns);
    p2.x = lon;
    p2.y = lat;
    return p2;
  }
}
var names25 = ["Equidistant_Conic", "eqdc"];
var eqdc_default = {
  init: init24,
  forward: forward23,
  inverse: inverse23,
  names: names25
};

// node_modules/proj4/lib/projections/vandg.js
function init25() {
  this.R = this.a;
}
function forward24(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var dlon = adjust_lon_default(lon - this.long0);
  var x, y;
  if (Math.abs(lat) <= EPSLN) {
    x = this.x0 + this.R * dlon;
    y = this.y0;
  }
  var theta = asinz_default(2 * Math.abs(lat / Math.PI));
  if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
    x = this.x0;
    if (lat >= 0) {
      y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
    } else {
      y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
    }
  }
  var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
  var asq = al * al;
  var sinth = Math.sin(theta);
  var costh = Math.cos(theta);
  var g2 = costh / (sinth + costh - 1);
  var gsq = g2 * g2;
  var m2 = g2 * (2 / sinth - 1);
  var msq = m2 * m2;
  var con = Math.PI * this.R * (al * (g2 - msq) + Math.sqrt(asq * (g2 - msq) * (g2 - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
  if (dlon < 0) {
    con = -con;
  }
  x = this.x0 + con;
  var q2 = asq + g2;
  con = Math.PI * this.R * (m2 * q2 - al * Math.sqrt((msq + asq) * (asq + 1) - q2 * q2)) / (msq + asq);
  if (lat >= 0) {
    y = this.y0 + con;
  } else {
    y = this.y0 - con;
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse24(p2) {
  var lon, lat;
  var xx, yy, xys, c1, c2, c3;
  var a1;
  var m1;
  var con;
  var th1;
  var d2;
  p2.x -= this.x0;
  p2.y -= this.y0;
  con = Math.PI * this.R;
  xx = p2.x / con;
  yy = p2.y / con;
  xys = xx * xx + yy * yy;
  c1 = -Math.abs(yy) * (1 + xys);
  c2 = c1 - 2 * yy * yy + xx * xx;
  c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
  d2 = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
  a1 = (c1 - c2 * c2 / 3 / c3) / c3;
  m1 = 2 * Math.sqrt(-a1 / 3);
  con = 3 * d2 / a1 / m1;
  if (Math.abs(con) > 1) {
    if (con >= 0) {
      con = 1;
    } else {
      con = -1;
    }
  }
  th1 = Math.acos(con) / 3;
  if (p2.y >= 0) {
    lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  } else {
    lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
  }
  if (Math.abs(xx) < EPSLN) {
    lon = this.long0;
  } else {
    lon = adjust_lon_default(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
  }
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names26 = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
var vandg_default = {
  init: init25,
  forward: forward24,
  inverse: inverse24,
  names: names26
};

// node_modules/proj4/lib/projections/aeqd.js
function init26() {
  this.sin_p12 = Math.sin(this.lat0);
  this.cos_p12 = Math.cos(this.lat0);
}
function forward25(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var sinphi = Math.sin(p2.y);
  var cosphi = Math.cos(p2.y);
  var dlon = adjust_lon_default(lon - this.long0);
  var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H2, GH, Hs, c2, kp, cos_c, s, s2, s3, s4, s5;
  if (this.sphere) {
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      p2.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
      p2.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
      return p2;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      p2.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
      p2.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
      return p2;
    } else {
      cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
      c2 = Math.acos(cos_c);
      kp = c2 ? c2 / Math.sin(c2) : 1;
      p2.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
      p2.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
      return p2;
    }
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p2.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
      p2.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
      return p2;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      Ml = this.a * mlfn_default(e0, e1, e2, e3, lat);
      p2.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
      p2.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
      return p2;
    } else {
      tanphi = sinphi / cosphi;
      Nl1 = gN_default(this.a, this.e, this.sin_p12);
      Nl = gN_default(this.a, this.e, sinphi);
      psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
      Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
      if (Az === 0) {
        s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      } else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
        s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
      } else {
        s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
      }
      G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
      H2 = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
      GH = G * H2;
      Hs = H2 * H2;
      s2 = s * s;
      s3 = s2 * s;
      s4 = s3 * s;
      s5 = s4 * s;
      c2 = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
      p2.x = this.x0 + c2 * Math.sin(Az);
      p2.y = this.y0 + c2 * Math.cos(Az);
      return p2;
    }
  }
}
function inverse25(p2) {
  p2.x -= this.x0;
  p2.y -= this.y0;
  var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M3, N1, psi, Az, cosAz, tmp, A5, B2, D2, Ee, F, sinpsi;
  if (this.sphere) {
    rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
    if (rh > 2 * HALF_PI * this.a) {
      return;
    }
    z = rh / this.a;
    sinz = Math.sin(z);
    cosz = Math.cos(z);
    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
    } else {
      lat = asinz_default(cosz * this.sin_p12 + p2.y * sinz * this.cos_p12 / rh);
      con = Math.abs(this.lat0) - HALF_PI;
      if (Math.abs(con) <= EPSLN) {
        if (this.lat0 >= 0) {
          lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, -p2.y));
        } else {
          lon = adjust_lon_default(this.long0 - Math.atan2(-p2.x, p2.y));
        }
      } else {
        lon = adjust_lon_default(this.long0 + Math.atan2(p2.x * sinz, rh * this.cos_p12 * cosz - p2.y * this.sin_p12 * sinz));
      }
    }
    p2.x = lon;
    p2.y = lat;
    return p2;
  } else {
    e0 = e0fn_default(this.es);
    e1 = e1fn_default(this.es);
    e2 = e2fn_default(this.es);
    e3 = e3fn_default(this.es);
    if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
      M3 = Mlp - rh;
      lat = imlfn_default(M3 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, -1 * p2.y));
      p2.x = lon;
      p2.y = lat;
      return p2;
    } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
      Mlp = this.a * mlfn_default(e0, e1, e2, e3, HALF_PI);
      rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
      M3 = rh - Mlp;
      lat = imlfn_default(M3 / this.a, e0, e1, e2, e3);
      lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, p2.y));
      p2.x = lon;
      p2.y = lat;
      return p2;
    } else {
      rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
      Az = Math.atan2(p2.x, p2.y);
      N1 = gN_default(this.a, this.e, this.sin_p12);
      cosAz = Math.cos(Az);
      tmp = this.e * this.cos_p12 * cosAz;
      A5 = -tmp * tmp / (1 - this.es);
      B2 = 3 * this.es * (1 - A5) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
      D2 = rh / N1;
      Ee = D2 - A5 * (1 + A5) * Math.pow(D2, 3) / 6 - B2 * (1 + 3 * A5) * Math.pow(D2, 4) / 24;
      F = 1 - A5 * Ee * Ee / 2 - D2 * Ee * Ee * Ee / 6;
      psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
      lon = adjust_lon_default(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
      sinpsi = Math.sin(psi);
      lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
      p2.x = lon;
      p2.y = lat;
      return p2;
    }
  }
}
var names27 = ["Azimuthal_Equidistant", "aeqd"];
var aeqd_default = {
  init: init26,
  forward: forward25,
  inverse: inverse25,
  names: names27
};

// node_modules/proj4/lib/projections/ortho.js
function init27() {
  this.sin_p14 = Math.sin(this.lat0);
  this.cos_p14 = Math.cos(this.lat0);
}
function forward26(p2) {
  var sinphi, cosphi;
  var dlon;
  var coslon;
  var ksp;
  var g2, x, y;
  var lon = p2.x;
  var lat = p2.y;
  dlon = adjust_lon_default(lon - this.long0);
  sinphi = Math.sin(lat);
  cosphi = Math.cos(lat);
  coslon = Math.cos(dlon);
  g2 = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
  ksp = 1;
  if (g2 > 0 || Math.abs(g2) <= EPSLN) {
    x = this.a * ksp * cosphi * Math.sin(dlon);
    y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
  }
  p2.x = x;
  p2.y = y;
  return p2;
}
function inverse26(p2) {
  var rh;
  var z;
  var sinz, cosz;
  var con;
  var lon, lat;
  p2.x -= this.x0;
  p2.y -= this.y0;
  rh = Math.sqrt(p2.x * p2.x + p2.y * p2.y);
  z = asinz_default(rh / this.a);
  sinz = Math.sin(z);
  cosz = Math.cos(z);
  lon = this.long0;
  if (Math.abs(rh) <= EPSLN) {
    lat = this.lat0;
    p2.x = lon;
    p2.y = lat;
    return p2;
  }
  lat = asinz_default(cosz * this.sin_p14 + p2.y * sinz * this.cos_p14 / rh);
  con = Math.abs(this.lat0) - HALF_PI;
  if (Math.abs(con) <= EPSLN) {
    if (this.lat0 >= 0) {
      lon = adjust_lon_default(this.long0 + Math.atan2(p2.x, -p2.y));
    } else {
      lon = adjust_lon_default(this.long0 - Math.atan2(-p2.x, p2.y));
    }
    p2.x = lon;
    p2.y = lat;
    return p2;
  }
  lon = adjust_lon_default(this.long0 + Math.atan2(p2.x * sinz, rh * this.cos_p14 * cosz - p2.y * this.sin_p14 * sinz));
  p2.x = lon;
  p2.y = lat;
  return p2;
}
var names28 = ["ortho"];
var ortho_default = {
  init: init27,
  forward: forward26,
  inverse: inverse26,
  names: names28
};

// node_modules/proj4/lib/projections/qsc.js
var FACE_ENUM = {
  FRONT: 1,
  RIGHT: 2,
  BACK: 3,
  LEFT: 4,
  TOP: 5,
  BOTTOM: 6
};
var AREA_ENUM = {
  AREA_0: 1,
  AREA_1: 2,
  AREA_2: 3,
  AREA_3: 4
};
function init28() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.lat0 = this.lat0 || 0;
  this.long0 = this.long0 || 0;
  this.lat_ts = this.lat_ts || 0;
  this.title = this.title || "Quadrilateralized Spherical Cube";
  if (this.lat0 >= HALF_PI - FORTPI / 2) {
    this.face = FACE_ENUM.TOP;
  } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
    this.face = FACE_ENUM.BOTTOM;
  } else if (Math.abs(this.long0) <= FORTPI) {
    this.face = FACE_ENUM.FRONT;
  } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
    this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
  } else {
    this.face = FACE_ENUM.BACK;
  }
  if (this.es !== 0) {
    this.one_minus_f = 1 - (this.a - this.b) / this.a;
    this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
  }
}
function forward27(p2) {
  var xy = { x: 0, y: 0 };
  var lat, lon;
  var theta, phi;
  var t, mu;
  var area = { value: 0 };
  p2.x -= this.long0;
  if (this.es !== 0) {
    lat = Math.atan(this.one_minus_f_squared * Math.tan(p2.y));
  } else {
    lat = p2.y;
  }
  lon = p2.x;
  if (this.face === FACE_ENUM.TOP) {
    phi = HALF_PI - lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = lon - HALF_PI;
    } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_1;
      theta = lon > 0 ? lon - SPI : lon + SPI;
    } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
      area.value = AREA_ENUM.AREA_2;
      theta = lon + HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = HALF_PI + lat;
    if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_0;
      theta = -lon + HALF_PI;
    } else if (lon < FORTPI && lon >= -FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta = -lon;
    } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = -lon - HALF_PI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta = lon > 0 ? -lon + SPI : -lon - SPI;
    }
  } else {
    var q2, r, s;
    var sinlat, coslat;
    var sinlon, coslon;
    if (this.face === FACE_ENUM.RIGHT) {
      lon = qsc_shift_lon_origin(lon, +HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lon = qsc_shift_lon_origin(lon, +SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lon = qsc_shift_lon_origin(lon, -HALF_PI);
    }
    sinlat = Math.sin(lat);
    coslat = Math.cos(lat);
    sinlon = Math.sin(lon);
    coslon = Math.cos(lon);
    q2 = coslat * coslon;
    r = coslat * sinlon;
    s = sinlat;
    if (this.face === FACE_ENUM.FRONT) {
      phi = Math.acos(q2);
      theta = qsc_fwd_equat_face_theta(phi, s, r, area);
    } else if (this.face === FACE_ENUM.RIGHT) {
      phi = Math.acos(r);
      theta = qsc_fwd_equat_face_theta(phi, s, -q2, area);
    } else if (this.face === FACE_ENUM.BACK) {
      phi = Math.acos(-q2);
      theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
    } else if (this.face === FACE_ENUM.LEFT) {
      phi = Math.acos(-r);
      theta = qsc_fwd_equat_face_theta(phi, s, q2, area);
    } else {
      phi = theta = 0;
      area.value = AREA_ENUM.AREA_0;
    }
  }
  mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
  t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
  if (area.value === AREA_ENUM.AREA_1) {
    mu += HALF_PI;
  } else if (area.value === AREA_ENUM.AREA_2) {
    mu += SPI;
  } else if (area.value === AREA_ENUM.AREA_3) {
    mu += 1.5 * SPI;
  }
  xy.x = t * Math.cos(mu);
  xy.y = t * Math.sin(mu);
  xy.x = xy.x * this.a + this.x0;
  xy.y = xy.y * this.a + this.y0;
  p2.x = xy.x;
  p2.y = xy.y;
  return p2;
}
function inverse27(p2) {
  var lp = { lam: 0, phi: 0 };
  var mu, nu, cosmu, tannu;
  var tantheta, theta, cosphi, phi;
  var t;
  var area = { value: 0 };
  p2.x = (p2.x - this.x0) / this.a;
  p2.y = (p2.y - this.y0) / this.a;
  nu = Math.atan(Math.sqrt(p2.x * p2.x + p2.y * p2.y));
  mu = Math.atan2(p2.y, p2.x);
  if (p2.x >= 0 && p2.x >= Math.abs(p2.y)) {
    area.value = AREA_ENUM.AREA_0;
  } else if (p2.y >= 0 && p2.y >= Math.abs(p2.x)) {
    area.value = AREA_ENUM.AREA_1;
    mu -= HALF_PI;
  } else if (p2.x < 0 && -p2.x >= Math.abs(p2.y)) {
    area.value = AREA_ENUM.AREA_2;
    mu = mu < 0 ? mu + SPI : mu - SPI;
  } else {
    area.value = AREA_ENUM.AREA_3;
    mu += HALF_PI;
  }
  t = SPI / 12 * Math.tan(mu);
  tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
  theta = Math.atan(tantheta);
  cosmu = Math.cos(mu);
  tannu = Math.tan(nu);
  cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
  if (cosphi < -1) {
    cosphi = -1;
  } else if (cosphi > 1) {
    cosphi = 1;
  }
  if (this.face === FACE_ENUM.TOP) {
    phi = Math.acos(cosphi);
    lp.phi = HALF_PI - phi;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = theta < 0 ? theta + SPI : theta - SPI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = theta - HALF_PI;
    } else {
      lp.lam = theta;
    }
  } else if (this.face === FACE_ENUM.BOTTOM) {
    phi = Math.acos(cosphi);
    lp.phi = phi - HALF_PI;
    if (area.value === AREA_ENUM.AREA_0) {
      lp.lam = -theta + HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_1) {
      lp.lam = -theta;
    } else if (area.value === AREA_ENUM.AREA_2) {
      lp.lam = -theta - HALF_PI;
    } else {
      lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
    }
  } else {
    var q2, r, s;
    q2 = cosphi;
    t = q2 * q2;
    if (t >= 1) {
      s = 0;
    } else {
      s = Math.sqrt(1 - t) * Math.sin(theta);
    }
    t += s * s;
    if (t >= 1) {
      r = 0;
    } else {
      r = Math.sqrt(1 - t);
    }
    if (area.value === AREA_ENUM.AREA_1) {
      t = r;
      r = -s;
      s = t;
    } else if (area.value === AREA_ENUM.AREA_2) {
      r = -r;
      s = -s;
    } else if (area.value === AREA_ENUM.AREA_3) {
      t = r;
      r = s;
      s = -t;
    }
    if (this.face === FACE_ENUM.RIGHT) {
      t = q2;
      q2 = -r;
      r = t;
    } else if (this.face === FACE_ENUM.BACK) {
      q2 = -q2;
      r = -r;
    } else if (this.face === FACE_ENUM.LEFT) {
      t = q2;
      q2 = r;
      r = -t;
    }
    lp.phi = Math.acos(-s) - HALF_PI;
    lp.lam = Math.atan2(r, q2);
    if (this.face === FACE_ENUM.RIGHT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
    } else if (this.face === FACE_ENUM.BACK) {
      lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
    } else if (this.face === FACE_ENUM.LEFT) {
      lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
    }
  }
  if (this.es !== 0) {
    var invert_sign;
    var tanphi, xa;
    invert_sign = lp.phi < 0 ? 1 : 0;
    tanphi = Math.tan(lp.phi);
    xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
    lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
    if (invert_sign) {
      lp.phi = -lp.phi;
    }
  }
  lp.lam += this.long0;
  p2.x = lp.lam;
  p2.y = lp.phi;
  return p2;
}
function qsc_fwd_equat_face_theta(phi, y, x, area) {
  var theta;
  if (phi < EPSLN) {
    area.value = AREA_ENUM.AREA_0;
    theta = 0;
  } else {
    theta = Math.atan2(y, x);
    if (Math.abs(theta) <= FORTPI) {
      area.value = AREA_ENUM.AREA_0;
    } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
      area.value = AREA_ENUM.AREA_1;
      theta -= HALF_PI;
    } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
      area.value = AREA_ENUM.AREA_2;
      theta = theta >= 0 ? theta - SPI : theta + SPI;
    } else {
      area.value = AREA_ENUM.AREA_3;
      theta += HALF_PI;
    }
  }
  return theta;
}
function qsc_shift_lon_origin(lon, offset) {
  var slon = lon + offset;
  if (slon < -SPI) {
    slon += TWO_PI;
  } else if (slon > +SPI) {
    slon -= TWO_PI;
  }
  return slon;
}
var names29 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
var qsc_default = {
  init: init28,
  forward: forward27,
  inverse: inverse27,
  names: names29
};

// node_modules/proj4/lib/projections/robin.js
var COEFS_X = [
  [1, 22199e-21, -715515e-10, 31103e-10],
  [0.9986, -482243e-9, -24897e-9, -13309e-10],
  [0.9954, -83103e-8, -448605e-10, -986701e-12],
  [0.99, -135364e-8, -59661e-9, 36777e-10],
  [0.9822, -167442e-8, -449547e-11, -572411e-11],
  [0.973, -214868e-8, -903571e-10, 18736e-12],
  [0.96, -305085e-8, -900761e-10, 164917e-11],
  [0.9427, -382792e-8, -653386e-10, -26154e-10],
  [0.9216, -467746e-8, -10457e-8, 481243e-11],
  [0.8962, -536223e-8, -323831e-10, -543432e-11],
  [0.8679, -609363e-8, -113898e-9, 332484e-11],
  [0.835, -698325e-8, -640253e-10, 934959e-12],
  [0.7986, -755338e-8, -500009e-10, 935324e-12],
  [0.7597, -798324e-8, -35971e-9, -227626e-11],
  [0.7186, -851367e-8, -701149e-10, -86303e-10],
  [0.6732, -986209e-8, -199569e-9, 191974e-10],
  [0.6213, -0.010418, 883923e-10, 624051e-11],
  [0.5722, -906601e-8, 182e-6, 624051e-11],
  [0.5322, -677797e-8, 275608e-9, 624051e-11]
];
var COEFS_Y = [
  [-520417e-23, 0.0124, 121431e-23, -845284e-16],
  [0.062, 0.0124, -126793e-14, 422642e-15],
  [0.124, 0.0124, 507171e-14, -160604e-14],
  [0.186, 0.0123999, -190189e-13, 600152e-14],
  [0.248, 0.0124002, 710039e-13, -224e-10],
  [0.31, 0.0123992, -264997e-12, 835986e-13],
  [0.372, 0.0124029, 988983e-12, -311994e-12],
  [0.434, 0.0123893, -369093e-11, -435621e-12],
  [0.4958, 0.0123198, -102252e-10, -345523e-12],
  [0.5571, 0.0121916, -154081e-10, -582288e-12],
  [0.6176, 0.0119938, -241424e-10, -525327e-12],
  [0.6769, 0.011713, -320223e-10, -516405e-12],
  [0.7346, 0.0113541, -397684e-10, -609052e-12],
  [0.7903, 0.0109107, -489042e-10, -104739e-11],
  [0.8435, 0.0103431, -64615e-9, -140374e-14],
  [0.8936, 969686e-8, -64636e-9, -8547e-9],
  [0.9394, 840947e-8, -192841e-9, -42106e-10],
  [0.9761, 616527e-8, -256e-6, -42106e-10],
  [1, 328947e-8, -319159e-9, -42106e-10]
];
var FXC = 0.8487;
var FYC = 1.3523;
var C1 = R2D / 5;
var RC1 = 1 / C1;
var NODES = 18;
var poly3_val = function(coefs, x) {
  return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
};
var poly3_der = function(coefs, x) {
  return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
};
function newton_rapshon(f_df, start2, max_err, iters) {
  var x = start2;
  for (; iters; --iters) {
    var upd = f_df(x);
    x -= upd;
    if (Math.abs(upd) < max_err) {
      break;
    }
  }
  return x;
}
function init29() {
  this.x0 = this.x0 || 0;
  this.y0 = this.y0 || 0;
  this.long0 = this.long0 || 0;
  this.es = 0;
  this.title = this.title || "Robinson";
}
function forward28(ll) {
  var lon = adjust_lon_default(ll.x - this.long0);
  var dphi = Math.abs(ll.y);
  var i = Math.floor(dphi * C1);
  if (i < 0) {
    i = 0;
  } else if (i >= NODES) {
    i = NODES - 1;
  }
  dphi = R2D * (dphi - RC1 * i);
  var xy = {
    x: poly3_val(COEFS_X[i], dphi) * lon,
    y: poly3_val(COEFS_Y[i], dphi)
  };
  if (ll.y < 0) {
    xy.y = -xy.y;
  }
  xy.x = xy.x * this.a * FXC + this.x0;
  xy.y = xy.y * this.a * FYC + this.y0;
  return xy;
}
function inverse28(xy) {
  var ll = {
    x: (xy.x - this.x0) / (this.a * FXC),
    y: Math.abs(xy.y - this.y0) / (this.a * FYC)
  };
  if (ll.y >= 1) {
    ll.x /= COEFS_X[NODES][0];
    ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
  } else {
    var i = Math.floor(ll.y * NODES);
    if (i < 0) {
      i = 0;
    } else if (i >= NODES) {
      i = NODES - 1;
    }
    for (; ; ) {
      if (COEFS_Y[i][0] > ll.y) {
        --i;
      } else if (COEFS_Y[i + 1][0] <= ll.y) {
        ++i;
      } else {
        break;
      }
    }
    var coefs = COEFS_Y[i];
    var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
    t = newton_rapshon(function(x) {
      return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
    }, t, EPSLN, 100);
    ll.x /= poly3_val(COEFS_X[i], t);
    ll.y = (5 * i + t) * D2R;
    if (xy.y < 0) {
      ll.y = -ll.y;
    }
  }
  ll.x = adjust_lon_default(ll.x + this.long0);
  return ll;
}
var names30 = ["Robinson", "robin"];
var robin_default = {
  init: init29,
  forward: forward28,
  inverse: inverse28,
  names: names30
};

// node_modules/proj4/lib/projections/geocent.js
function init30() {
  this.name = "geocent";
}
function forward29(p2) {
  var point = geodeticToGeocentric(p2, this.es, this.a);
  return point;
}
function inverse29(p2) {
  var point = geocentricToGeodetic(p2, this.es, this.a, this.b);
  return point;
}
var names31 = ["Geocentric", "geocentric", "geocent", "Geocent"];
var geocent_default = {
  init: init30,
  forward: forward29,
  inverse: inverse29,
  names: names31
};

// node_modules/proj4/lib/projections/tpers.js
var mode = {
  N_POLE: 0,
  S_POLE: 1,
  EQUIT: 2,
  OBLIQ: 3
};
var params = {
  h: { def: 1e5, num: true },
  // default is Karman line, no default in PROJ.7
  azi: { def: 0, num: true, degrees: true },
  // default is North
  tilt: { def: 0, num: true, degrees: true },
  // default is Nadir
  long0: { def: 0, num: true },
  // default is Greenwich, conversion to rad is automatic
  lat0: { def: 0, num: true }
  // default is Equator, conversion to rad is automatic
};
function init31() {
  Object.keys(params).forEach(function(p2) {
    if (typeof this[p2] === "undefined") {
      this[p2] = params[p2].def;
    } else if (params[p2].num && isNaN(this[p2])) {
      throw new Error("Invalid parameter value, must be numeric " + p2 + " = " + this[p2]);
    } else if (params[p2].num) {
      this[p2] = parseFloat(this[p2]);
    }
    if (params[p2].degrees) {
      this[p2] = this[p2] * D2R;
    }
  }.bind(this));
  if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
    this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
  } else if (Math.abs(this.lat0) < EPSLN) {
    this.mode = mode.EQUIT;
  } else {
    this.mode = mode.OBLIQ;
    this.sinph0 = Math.sin(this.lat0);
    this.cosph0 = Math.cos(this.lat0);
  }
  this.pn1 = this.h / this.a;
  if (this.pn1 <= 0 || this.pn1 > 1e10) {
    throw new Error("Invalid height");
  }
  this.p = 1 + this.pn1;
  this.rp = 1 / this.p;
  this.h1 = 1 / this.pn1;
  this.pfact = (this.p + 1) * this.h1;
  this.es = 0;
  var omega = this.tilt;
  var gamma = this.azi;
  this.cg = Math.cos(gamma);
  this.sg = Math.sin(gamma);
  this.cw = Math.cos(omega);
  this.sw = Math.sin(omega);
}
function forward30(p2) {
  p2.x -= this.long0;
  var sinphi = Math.sin(p2.y);
  var cosphi = Math.cos(p2.y);
  var coslam = Math.cos(p2.x);
  var x, y;
  switch (this.mode) {
    case mode.OBLIQ:
      y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y = cosphi * coslam;
      break;
    case mode.S_POLE:
      y = -sinphi;
      break;
    case mode.N_POLE:
      y = sinphi;
      break;
  }
  y = this.pn1 / (this.p - y);
  x = y * cosphi * Math.sin(p2.x);
  switch (this.mode) {
    case mode.OBLIQ:
      y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      break;
    case mode.EQUIT:
      y *= sinphi;
      break;
    case mode.N_POLE:
      y *= -(cosphi * coslam);
      break;
    case mode.S_POLE:
      y *= cosphi * coslam;
      break;
  }
  var yt, ba;
  yt = y * this.cg + x * this.sg;
  ba = 1 / (yt * this.sw * this.h1 + this.cw);
  x = (x * this.cg - y * this.sg) * this.cw * ba;
  y = yt * ba;
  p2.x = x * this.a;
  p2.y = y * this.a;
  return p2;
}
function inverse30(p2) {
  p2.x /= this.a;
  p2.y /= this.a;
  var r = { x: p2.x, y: p2.y };
  var bm, bq, yt;
  yt = 1 / (this.pn1 - p2.y * this.sw);
  bm = this.pn1 * p2.x * yt;
  bq = this.pn1 * p2.y * this.cw * yt;
  p2.x = bm * this.cg + bq * this.sg;
  p2.y = bq * this.cg - bm * this.sg;
  var rh = hypot_default(p2.x, p2.y);
  if (Math.abs(rh) < EPSLN) {
    r.x = 0;
    r.y = p2.y;
  } else {
    var cosz, sinz;
    sinz = 1 - rh * rh * this.pfact;
    sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
    cosz = Math.sqrt(1 - sinz * sinz);
    switch (this.mode) {
      case mode.OBLIQ:
        r.y = Math.asin(cosz * this.sinph0 + p2.y * sinz * this.cosph0 / rh);
        p2.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
        p2.x *= sinz * this.cosph0;
        break;
      case mode.EQUIT:
        r.y = Math.asin(p2.y * sinz / rh);
        p2.y = cosz * rh;
        p2.x *= sinz;
        break;
      case mode.N_POLE:
        r.y = Math.asin(cosz);
        p2.y = -p2.y;
        break;
      case mode.S_POLE:
        r.y = -Math.asin(cosz);
        break;
    }
    r.x = Math.atan2(p2.x, p2.y);
  }
  p2.x = r.x + this.long0;
  p2.y = r.y;
  return p2;
}
var names32 = ["Tilted_Perspective", "tpers"];
var tpers_default = {
  init: init31,
  forward: forward30,
  inverse: inverse30,
  names: names32
};

// node_modules/proj4/lib/projections/geos.js
function init32() {
  this.flip_axis = this.sweep === "x" ? 1 : 0;
  this.h = Number(this.h);
  this.radius_g_1 = this.h / this.a;
  if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
    throw new Error();
  }
  this.radius_g = 1 + this.radius_g_1;
  this.C = this.radius_g * this.radius_g - 1;
  if (this.es !== 0) {
    var one_es = 1 - this.es;
    var rone_es = 1 / one_es;
    this.radius_p = Math.sqrt(one_es);
    this.radius_p2 = one_es;
    this.radius_p_inv2 = rone_es;
    this.shape = "ellipse";
  } else {
    this.radius_p = 1;
    this.radius_p2 = 1;
    this.radius_p_inv2 = 1;
    this.shape = "sphere";
  }
  if (!this.title) {
    this.title = "Geostationary Satellite View";
  }
}
function forward31(p2) {
  var lon = p2.x;
  var lat = p2.y;
  var tmp, v_x, v_y, v_z;
  lon = lon - this.long0;
  if (this.shape === "ellipse") {
    lat = Math.atan(this.radius_p2 * Math.tan(lat));
    var r = this.radius_p / hypot_default(this.radius_p * Math.cos(lat), Math.sin(lat));
    v_x = r * Math.cos(lon) * Math.cos(lat);
    v_y = r * Math.sin(lon) * Math.cos(lat);
    v_z = r * Math.sin(lat);
    if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
      p2.x = Number.NaN;
      p2.y = Number.NaN;
      return p2;
    }
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p2.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p2.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p2.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p2.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  } else if (this.shape === "sphere") {
    tmp = Math.cos(lat);
    v_x = Math.cos(lon) * tmp;
    v_y = Math.sin(lon) * tmp;
    v_z = Math.sin(lat);
    tmp = this.radius_g - v_x;
    if (this.flip_axis) {
      p2.x = this.radius_g_1 * Math.atan(v_y / hypot_default(v_z, tmp));
      p2.y = this.radius_g_1 * Math.atan(v_z / tmp);
    } else {
      p2.x = this.radius_g_1 * Math.atan(v_y / tmp);
      p2.y = this.radius_g_1 * Math.atan(v_z / hypot_default(v_y, tmp));
    }
  }
  p2.x = p2.x * this.a;
  p2.y = p2.y * this.a;
  return p2;
}
function inverse31(p2) {
  var v_x = -1;
  var v_y = 0;
  var v_z = 0;
  var a2, b2, det, k2;
  p2.x = p2.x / this.a;
  p2.y = p2.y / this.a;
  if (this.shape === "ellipse") {
    if (this.flip_axis) {
      v_z = Math.tan(p2.y / this.radius_g_1);
      v_y = Math.tan(p2.x / this.radius_g_1) * hypot_default(1, v_z);
    } else {
      v_y = Math.tan(p2.x / this.radius_g_1);
      v_z = Math.tan(p2.y / this.radius_g_1) * hypot_default(1, v_y);
    }
    var v_zp = v_z / this.radius_p;
    a2 = v_y * v_y + v_zp * v_zp + v_x * v_x;
    b2 = 2 * this.radius_g * v_x;
    det = b2 * b2 - 4 * a2 * this.C;
    if (det < 0) {
      p2.x = Number.NaN;
      p2.y = Number.NaN;
      return p2;
    }
    k2 = (-b2 - Math.sqrt(det)) / (2 * a2);
    v_x = this.radius_g + k2 * v_x;
    v_y *= k2;
    v_z *= k2;
    p2.x = Math.atan2(v_y, v_x);
    p2.y = Math.atan(v_z * Math.cos(p2.x) / v_x);
    p2.y = Math.atan(this.radius_p_inv2 * Math.tan(p2.y));
  } else if (this.shape === "sphere") {
    if (this.flip_axis) {
      v_z = Math.tan(p2.y / this.radius_g_1);
      v_y = Math.tan(p2.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
    } else {
      v_y = Math.tan(p2.x / this.radius_g_1);
      v_z = Math.tan(p2.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
    }
    a2 = v_y * v_y + v_z * v_z + v_x * v_x;
    b2 = 2 * this.radius_g * v_x;
    det = b2 * b2 - 4 * a2 * this.C;
    if (det < 0) {
      p2.x = Number.NaN;
      p2.y = Number.NaN;
      return p2;
    }
    k2 = (-b2 - Math.sqrt(det)) / (2 * a2);
    v_x = this.radius_g + k2 * v_x;
    v_y *= k2;
    v_z *= k2;
    p2.x = Math.atan2(v_y, v_x);
    p2.y = Math.atan(v_z * Math.cos(p2.x) / v_x);
  }
  p2.x = p2.x + this.long0;
  return p2;
}
var names33 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
var geos_default = {
  init: init32,
  forward: forward31,
  inverse: inverse31,
  names: names33
};

// node_modules/proj4/lib/projections/eqearth.js
var A1 = 1.340264;
var A2 = -0.081106;
var A3 = 893e-6;
var A4 = 3796e-6;
var M = Math.sqrt(3) / 2;
function init33() {
  this.es = 0;
  this.long0 = this.long0 !== void 0 ? this.long0 : 0;
}
function forward32(p2) {
  var lam = adjust_lon_default(p2.x - this.long0);
  var phi = p2.y;
  var paramLat = Math.asin(M * Math.sin(phi)), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p2.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
  p2.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
  p2.x = this.a * p2.x + this.x0;
  p2.y = this.a * p2.y + this.y0;
  return p2;
}
function inverse32(p2) {
  p2.x = (p2.x - this.x0) / this.a;
  p2.y = (p2.y - this.y0) / this.a;
  var EPS = 1e-9, NITER = 12, paramLat = p2.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i;
  for (i = 0; i < NITER; ++i) {
    paramLatSq = paramLat * paramLat;
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p2.y;
    fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
    paramLat -= dlat = fy / fpy;
    if (Math.abs(dlat) < EPS) {
      break;
    }
  }
  paramLatSq = paramLat * paramLat;
  paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
  p2.x = M * p2.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
  p2.y = Math.asin(Math.sin(paramLat) / M);
  p2.x = adjust_lon_default(p2.x + this.long0);
  return p2;
}
var names34 = ["eqearth", "Equal Earth", "Equal_Earth"];
var eqearth_default = {
  init: init33,
  forward: forward32,
  inverse: inverse32,
  names: names34
};

// node_modules/proj4/lib/projections/bonne.js
var EPS10 = 1e-10;
function init34() {
  var c2;
  this.phi1 = this.lat1;
  if (Math.abs(this.phi1) < EPS10) {
    throw new Error();
  }
  if (this.es) {
    this.en = pj_enfn_default(this.es);
    this.m1 = pj_mlfn_default(
      this.phi1,
      this.am1 = Math.sin(this.phi1),
      c2 = Math.cos(this.phi1),
      this.en
    );
    this.am1 = c2 / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
    this.inverse = e_inv;
    this.forward = e_fwd;
  } else {
    if (Math.abs(this.phi1) + EPS10 >= HALF_PI) {
      this.cphi1 = 0;
    } else {
      this.cphi1 = 1 / Math.tan(this.phi1);
    }
    this.inverse = s_inv;
    this.forward = s_fwd;
  }
}
function e_fwd(p2) {
  var lam = adjust_lon_default(p2.x - (this.long0 || 0));
  var phi = p2.y;
  var rh, E, c2;
  rh = this.am1 + this.m1 - pj_mlfn_default(phi, E = Math.sin(phi), c2 = Math.cos(phi), this.en);
  E = c2 * lam / (rh * Math.sqrt(1 - this.es * E * E));
  p2.x = rh * Math.sin(E);
  p2.y = this.am1 - rh * Math.cos(E);
  p2.x = this.a * p2.x + (this.x0 || 0);
  p2.y = this.a * p2.y + (this.y0 || 0);
  return p2;
}
function e_inv(p2) {
  p2.x = (p2.x - (this.x0 || 0)) / this.a;
  p2.y = (p2.y - (this.y0 || 0)) / this.a;
  var s, rh, lam, phi;
  rh = hypot_default(p2.x, p2.y = this.am1 - p2.y);
  phi = pj_inv_mlfn_default(this.am1 + this.m1 - rh, this.es, this.en);
  if ((s = Math.abs(phi)) < HALF_PI) {
    s = Math.sin(phi);
    lam = rh * Math.atan2(p2.x, p2.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
  } else if (Math.abs(s - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    throw new Error();
  }
  p2.x = adjust_lon_default(lam + (this.long0 || 0));
  p2.y = adjust_lat_default(phi);
  return p2;
}
function s_fwd(p2) {
  var lam = adjust_lon_default(p2.x - (this.long0 || 0));
  var phi = p2.y;
  var E, rh;
  rh = this.cphi1 + this.phi1 - phi;
  if (Math.abs(rh) > EPS10) {
    p2.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
    p2.y = this.cphi1 - rh * Math.cos(E);
  } else {
    p2.x = p2.y = 0;
  }
  p2.x = this.a * p2.x + (this.x0 || 0);
  p2.y = this.a * p2.y + (this.y0 || 0);
  return p2;
}
function s_inv(p2) {
  p2.x = (p2.x - (this.x0 || 0)) / this.a;
  p2.y = (p2.y - (this.y0 || 0)) / this.a;
  var lam, phi;
  var rh = hypot_default(p2.x, p2.y = this.cphi1 - p2.y);
  phi = this.cphi1 + this.phi1 - rh;
  if (Math.abs(phi) > HALF_PI) {
    throw new Error();
  }
  if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) {
    lam = 0;
  } else {
    lam = rh * Math.atan2(p2.x, p2.y) / Math.cos(phi);
  }
  p2.x = adjust_lon_default(lam + (this.long0 || 0));
  p2.y = adjust_lat_default(phi);
  return p2;
}
var names35 = ["bonne", "Bonne (Werner lat_1=90)"];
var bonne_default = {
  init: init34,
  names: names35
};

// node_modules/proj4/projs.js
function projs_default(proj42) {
  proj42.Proj.projections.add(tmerc_default);
  proj42.Proj.projections.add(etmerc_default);
  proj42.Proj.projections.add(utm_default);
  proj42.Proj.projections.add(sterea_default);
  proj42.Proj.projections.add(stere_default);
  proj42.Proj.projections.add(somerc_default);
  proj42.Proj.projections.add(omerc_default);
  proj42.Proj.projections.add(lcc_default);
  proj42.Proj.projections.add(krovak_default);
  proj42.Proj.projections.add(cass_default);
  proj42.Proj.projections.add(laea_default);
  proj42.Proj.projections.add(aea_default);
  proj42.Proj.projections.add(gnom_default);
  proj42.Proj.projections.add(cea_default);
  proj42.Proj.projections.add(eqc_default);
  proj42.Proj.projections.add(poly_default);
  proj42.Proj.projections.add(nzmg_default);
  proj42.Proj.projections.add(mill_default);
  proj42.Proj.projections.add(sinu_default);
  proj42.Proj.projections.add(moll_default);
  proj42.Proj.projections.add(eqdc_default);
  proj42.Proj.projections.add(vandg_default);
  proj42.Proj.projections.add(aeqd_default);
  proj42.Proj.projections.add(ortho_default);
  proj42.Proj.projections.add(qsc_default);
  proj42.Proj.projections.add(robin_default);
  proj42.Proj.projections.add(geocent_default);
  proj42.Proj.projections.add(tpers_default);
  proj42.Proj.projections.add(geos_default);
  proj42.Proj.projections.add(eqearth_default);
  proj42.Proj.projections.add(bonne_default);
}

// node_modules/proj4/lib/index.js
core_default.defaultDatum = "WGS84";
core_default.Proj = Proj_default;
core_default.WGS84 = new core_default.Proj("WGS84");
core_default.Point = Point_default;
core_default.toPoint = toPoint_default;
core_default.defs = defs_default;
core_default.nadgrid = nadgrid;
core_default.transform = transform;
core_default.mgrs = mgrs_default;
core_default.version = "__VERSION__";
projs_default(core_default);
var lib_default = core_default;

// node_modules/@dataforsyningen/saul/modules/saul-projection.js
function epsg25832proj(proj4object) {
  proj4object.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  return proj4object;
}
function createTranslator(projection1 = "WGS84", projection2 = "EPSG:25832") {
  if (!lib_default.defs["EPSG:25832"]) {
    epsg25832proj(lib_default);
  }
  return lib_default(projection1, projection2);
}

// node_modules/@dataforsyningen/gsearch-ui/public/search.js
var a = `<svg class="ds-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--ds-icon-color, black)" stroke-linejoin="round" stroke-linecap="round" stroke-width="var(--ds-icon-stroke, 1)">
    <path d="M2 2L14.5 14.5M14.5 14.5L27 27M14.5 14.5L2 27M14.5 14.5L27 2"/>
  </g>
</svg>`;
var l = class extends HTMLElement {
  input_element;
  clear_button;
  default_placeholder_text = "S\xF8g...";
  styles = `
    g-search-input {
      position: relative;
    }
    g-search-input > input[type=search].hide-icon {
      background-image: none;
    }
    .gs-input-button {
      display: none;
      position: absolute;
      right: 0;
      height: 100%;
      padding-top: 0;
      padding-bottom: 0;
    }
    button.gs-input-button > svg:first-child {
      margin-right: -0.5rem;
    }
  `;
  static get observedAttributes() {
    return ["data-placeholder"];
  }
  set searchString(e) {
    this.input_element.value = e;
  }
  constructor() {
    super(), this.createDOM();
  }
  createDOM() {
    let e = document.createElement("style");
    this.append(e), e.textContent = this.styles, this.input_element = document.createElement("input"), this.input_element.type = "search", this.input_element.className = "gs-input", this.input_element.placeholder = this.dataset.placeholder || this.default_placeholder_text, this.append(this.input_element), this.clear_button = document.createElement("button"), this.clear_button.className = "quiet gs-input-button", this.clear_button.innerHTML = a, this.append(this.clear_button);
  }
  connectedCallback() {
    this.input_element.addEventListener("input", (e) => {
      e.target.value === "" ? (this.input_element.classList.remove("hide-icon"), this.clear_button.style.display = "none") : (this.input_element.classList.add("hide-icon"), this.clear_button.style.display = "inline-flex"), this.dispatchEvent(new CustomEvent("input-change", { detail: e.target.value, bubbles: true, composed: true }));
    }), this.clear_button.addEventListener("click", () => {
      this.input_element.value = "", this.input_element.dispatchEvent(new Event("input")), this.dispatchEvent(new CustomEvent("gsearch:clear", { bubbles: true, composed: true }));
    });
  }
  attributeChangedCallback(e, s, t) {
    s !== t && e === "data-placeholder" && t && (this.input_element.placeholder = t);
  }
};
var L = `<svg class="ds-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--ds-icon-color, black)" stroke-linejoin="round" stroke-linecap="round" stroke-width="var(--ds-icon-stroke, 1)">
    <path d="M1.5 14.5H27.5M1.5 14.5V10M1.5 14.5V19M27.5 14.5V10M27.5 14.5V19"/>
  </g>
</svg>`;
var v = `<svg class="ds-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--ds-icon-color, black)" stroke-linejoin="round" stroke-linecap="round" stroke-width="var(--ds-icon-stroke, 1)">
    <circle cx="14.5" cy="14.5" r="9"/>
    <path d="m 14.5,28.5 v -5"/>
    <path d="m 23.5,14.5 h 5"/>
    <path d="m 14.5,0.5 v 5"/>
    <path d="m 0.5,14.5 h 5"/>
  </g>
</svg>`;
var w = `<svg class="ds-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--ds-icon-color, black)" stroke-linejoin="round" stroke-linecap="round" stroke-width="var(--ds-icon-stroke, 1)">
    <path d="M14.5 27.5C21.68 27.5 27.5 21.68 27.5 14.5C27.5 7.32 21.68 1.5 14.5 1.5C7.32 1.5 1.5 7.32 1.5 14.5C1.5 21.68 7.32 27.5 14.5 27.5Z"/>
  </g>
</svg>`;
var o = `<svg class="ds-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="var(--ds-icon-color, black)" stroke-width="var(--ds-icon-stroke, 1)">
    <path d="M25.5 17L3.5 3.5L8.5 25.5L25.5 17Z" stroke-dasharray="1 1"/>
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="M2.5 2.5H4.5V4.5H2.5V2.5Z" />
      <path d="M24.5 16H26.5V18H24.5V16Z"/>
      <path d="M7.5 24.5H9.5V26.5H7.5V24.5Z"/>
    </g>
  </g>
</svg>`;
var c = a;
var d = [{ resource: "navngivenvej", title: "Navngivenvej", icon: L }, { resource: "husnummer", title: "Husnummer", icon: v }, { resource: "adresse", title: "Adresse", icon: v }, { resource: "stednavn", title: "Stednavn", icon: w }, { resource: "kommune", title: "Kommune", icon: o }, { resource: "region", title: "Region", icon: o }, { resource: "retskreds", title: "Retskreds", icon: o }, { resource: "postnummer", title: "Postnummer", icon: o }, { resource: "opstillingskreds", title: "Opstillingskreds", icon: o }, { resource: "sogn", title: "Sogn", icon: o }, { resource: "politikreds", title: "Politikreds", icon: o }, { resource: "matrikel", title: "Matrikel", icon: o }, { resource: "matrikel_udgaaet", title: "Matrikel udg\xE5et", icon: o }];
var u = class extends HTMLElement {
  data = {};
  styles = `
    g-search-result-box > svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.25rem;
    }
    g-search-result-box > p {
      display: inline-block;
    }
  `;
  set result(e) {
    this.data = e;
    let s = e.visningstekst;
    this.updateResult(s);
  }
  constructor() {
    super();
  }
  updateResult(e) {
    let s = d.find((i) => i.resource === this.data.type), t = `
      <style>${this.styles}</style>
      ${s.icon ? s.icon : c}
      <p class="gs-title-text">${e}</p>
    `;
    this.innerHTML = t;
  }
};
var h = class extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = '<p class="gs-title-text">Der er ingen resultater, der matchede din s\xF8gning.</p>';
  }
};
function D(r) {
  return r.geometri || r.adgangspunkt_geometri || r.vejpunkt_geometri;
}
function M2(r) {
  let e = r;
  return e.label = r.visningstekst, e.geometry = D(r), e;
}
customElements.get("g-search-result-box") || customElements.define("g-search-result-box", u);
customElements.get("g-search-no-result-box") || customElements.define("g-search-no-result-box", h);
var m = class extends HTMLElement {
  list_element;
  set results(e) {
    this.updateResults(e);
  }
  constructor() {
    super();
  }
  createDOM() {
    this.list_element = document.createElement("ul"), this.list_element.className = "gs-result-list", this.append(this.list_element);
  }
  connectedCallback() {
    this.createDOM();
  }
  updateResults(e) {
    if (this.list_element.innerHTML = "", e[0]) e.forEach((t) => {
      let i = document.createElement("li");
      i.className = "gs-result-item";
      let n = document.createElement("g-search-result-box");
      n.result = t, i.append(n), i.addEventListener("click", () => {
        this.onClick(t);
      }), this.list_element.append(i);
    }), this.list_element.querySelector("li").classList.add("active");
    else {
      let s = document.createElement("li");
      s.className = "gs-no-result-item";
      let t = document.createElement("g-search-no-result-box");
      this.list_element.append(s), s.append(t);
    }
  }
  onClick(e) {
    e.type === "navngivenvej" && this.dispatchEvent(new CustomEvent("search-road", { detail: e, bubbles: true, composed: true })), this.dispatchEvent(new CustomEvent("gsearch:select", { detail: M2(e), bubbles: true, composed: true }));
  }
  clear() {
    this.list_element.innerHTML = "";
  }
};
var p = class extends HTMLElement {
  container;
  styles = `
    .gs-button {
      height: auto;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  `;
  template = `
    <style>
      ${this.styles}
    </style>
  `;
  static get observedAttributes() {
    return ["data-resource", "data-enabled", "data-title", "data-icon"];
  }
  constructor() {
    super();
  }
  createDOM() {
    this.container = document.createElement("button"), this.container.className = "gs-button " + (this.dataset.enabled ? "" : "secondary"), this.container.innerHTML = this.template, this.container.insertAdjacentHTML("afterbegin", this.dataset.icon ? this.dataset.icon : c), this.container.insertAdjacentHTML("beforeend", this.dataset.title || this.dataset.resource), this.append(this.container);
  }
  connectedCallback() {
    this.createDOM();
  }
  setEnabled(e) {
    e ? this.container.classList.remove("secondary") : this.container.classList.add("secondary");
  }
};
customElements.get("g-search-resource-button") || customElements.define("g-search-resource-button", p);
var g = class extends HTMLElement {
  list_element;
  constructor() {
    super();
  }
  createDOM() {
    this.list_element = document.createElement("article"), this.list_element.className = "gs-resources-list", this.append(this.list_element);
  }
  connectedCallback() {
    this.createDOM();
  }
  updateButtons(e) {
    let s = [];
    e.forEach((t) => {
      let i = document.createElement("g-search-resource-button");
      i.dataset.resource = t.resource, i.dataset.title = t.title, i.dataset.icon = t.icon, i.dataset.enabled = t.enabled, i.addEventListener("click", () => {
        t.enabled = !t.enabled, i.setEnabled(t.enabled);
      }), s.push(i);
    }), this.list_element.innerHTML = "", s.forEach((t) => this.list_element.append(t));
  }
};
var H = "https://api.dataforsyningen.dk/rest/gsearch/v2.0/";
var B = "navngivenvej,husnummer,adresse,stednavn,kommune,region,retskreds,postnummer,opstillingskreds,sogn,politikreds,matrikel,matrikel_udgaaet";
var N;
function b(r) {
  H = r;
}
function q(r, e) {
  if (!r.ok) throw N = r.status, new Error(`HTTP error! ${r.status}`);
  return e ? r.json() : r;
}
function U(r, e = {}, s = true) {
  if (!r) console.error("Could not fetch data. Missing API URL");
  else return fetch(r, { ...e, method: "GET" }).then((t) => q(t, s)).then((t) => t).catch((t) => (console.error(`Fetch error: ${t}`), t));
}
function S(r, e, s, t, i, n) {
  s || (s = B), t || (t = 10), n || (n = 25832);
  let _ = [], C = s.split(","), E = i ? encodeURIComponent(i) : false;
  return C.forEach((x) => {
    let I2 = `${H}${x}?q=${r}&limit=${t}&srid=${n}${E ? `&filter=${E}` : ""}`, T = { headers: { token: e } };
    _.push(U(I2, T).then((f) => (f.length > 0 && f.map((y) => (y.type = x, y)), f)));
  }), Promise.all(_);
}
customElements.get("g-search-input") || customElements.define("g-search-input", l);
customElements.get("g-search-results") || customElements.define("g-search-results", m);
customElements.get("g-search-resources") || customElements.define("g-search-resources", g);
var k = class extends HTMLElement {
  input_container;
  resources = [];
  results_element;
  timerId;
  styles = `
    .gs-input {
      box-sizing: border-box;
    }

    g-search-input {
      display: block;
      height: fit-content;
    }

    g-search-results {
      position: relative; 
      width: 100%; 
      display: block;
    }

    g-search-result-box {
      display: flex;
      align-items: center;
    }

    g-search-resources {
      display: block;
      margin: 0.5rem 0;
    }

    .gs-result-list {
      position: absolute; 
      top: 0; 
      left: 0; 
      right: 0; 
      list-style: none; 
      padding: 0; 
      margin: 0;
      background-color: var(--grey1, #ddd);
    }

    .gs-result-item {
      cursor: pointer;
    }

    .gs-result-item,
    .gs-no-result-item {
      display: block;
    }

    .gs-title-text {
      margin: 0;
    }

    .gs-result-list .active {
      background-color: var(--gs-current, #eee)
    }
    
    .gs-result-item:hover,
    .gs-result-item:focus {
      background-color: var(--gs-highlight, #ddd);
    }

    .gs-result-item,
    .gs-no-result-item {
      padding: 0.5rem 0.25rem;
      background-color: var(--gs-background, #fff);
    }

    .gs-resources-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;
    }

    .hidden {
      display: none;
    }
  `;
  template = `
    <style>
      ${this.styles}
    </style>
    <g-search-input></g-search-input>
    <g-search-resources class="hidden"></g-search-resources>
    <g-search-results></g-search-results>
  `;
  static get observedAttributes() {
    return ["data-placeholder", "data-api", "data-srid", "data-filter", "data-resources", "data-resource-filter-enabled"];
  }
  constructor() {
    super();
  }
  createDOM() {
    let e = document.createElement("div");
    e.className = "gs-wrapper", e.innerHTML = this.template, this.append(e), this.results_element = this.querySelector("g-search-results"), this.resources_element = this.querySelector("g-search-resources"), this.input_container = this.querySelector("g-search-input"), this.input_element = this.input_container.querySelector("input");
  }
  connectedCallback() {
    this.createDOM(), this.dataset.placeholder && (this.input_container.dataset.placeholder = this.dataset.placeholder), this.dataset.api && b(this.dataset.api), this.setResources(this.dataset.resources), this.dataset.resourceFilterEnabled === "true" && this.resources_element?.classList.remove("hidden"), this.addEventListener("input-change", (e) => {
      this.debounce(() => {
        if (!e.detail || !/\S/.test(e.detail)) {
          this.results_element.clear();
          return;
        }
        this.runSearch(e.detail);
      });
    }), this.addEventListener("search-road", (e) => {
      this.input_container.searchString = e.detail.vejnavn, clearTimeout(this.timerId), this.runSearch(e.detail.vejnavn);
    }), this.addEventListener("gsearch:select", (e) => {
      this.input_container.searchString = e.detail.label, this.results_element.clear();
    }), this.addEventListener("blur", () => {
      this.results_element.clear();
    }), this.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Enter":
          this.selectActiveItemHandler();
          break;
        case "Escape":
          this.endSearchHandler();
          break;
        case "ArrowDown":
          this.moveActiveItemHandler("next");
          break;
        case "ArrowUp":
          e.preventDefault(), this.moveActiveItemHandler("previous");
          break;
      }
    });
  }
  attributeChangedCallback(e, s, t) {
    s !== t && (e === "data-placeholder" && t && this.input_container && (this.input_container.dataset.placeholder = t), e === "data-resources" && this.setResources(t), e === "data-resource-filter-enabled" && (t === "true" ? this.resources_element?.classList.remove("hidden") : this.resources_element?.classList.add("hidden")), e === "data-api" && b(t));
  }
  setResources(e) {
    e && (this.resources = e.split(",").map((s) => {
      let t = this.resources.find((n) => n.resource === s), i = d.find((n) => n.resource === s);
      return { resource: s, title: i ? i.title : s, icon: i ? i.icon : "", enabled: t ? t.enabled : true };
    }), this.resources_element?.updateButtons(this.resources));
  }
  runSearch(e) {
    let s = this.resources.filter((t) => t.enabled).map((t) => t.resource).toString();
    s || (s = this.dataset.resources), S(e, this.dataset.token, s, this.dataset.limit, this.dataset.filter, this.dataset.srid).then((t) => {
      this.results_element.results = t.flat();
    });
  }
  debounce(e, s = 500) {
    clearTimeout(this.timerId), this.timerId = setTimeout(e, s);
  }
  setFocusOnElement(e) {
    e.classList.add("active"), this.input_element.value = e.querySelector(".gs-title-text").innerText;
  }
  endSearchHandler() {
    this.input_element.focus(), this.results_element.clear();
  }
  moveActiveItemHandler(e) {
    let s = this.querySelector(".active");
    if (!s) return;
    let t = s[`${e}Sibling`];
    t && (this.setFocusOnElement(t), s.classList.remove("active"));
  }
  selectActiveItemHandler() {
    let e = this.querySelector(".active");
    e && (e.dispatchEvent(new Event("click")), this.endSearchHandler());
  }
};

// src/leaflet.js
var translator = createTranslator("EPSG:25832", "WGS84");
export {
  k as GSearchUI,
  lib_default as proj4,
  translator
};
