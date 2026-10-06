// Audio de prueba: un catálogo fijo de audio de dominio público del Internet Archive,
// para probar los tipos "music" y "podcast" de Kino (apiVersion 8). No consulta ninguna API:
// todas las respuestas salen de los datos de abajo, siempre iguales.

const IA = "https://archive.org/download/";

function file(identifier, name) {
  return IA + identifier + "/" + encodeURIComponent(name);
}

function cover(identifier) {
  return file(identifier, identifier + "_itemimage.jpg");
}

// Pista: [identificador en archive.org, archivo mp3, título, duración en segundos].
const CATALOG = [
  {
    id: "sousa-marchas-y-piezas",
    kind: "music",
    title: "Marchas y piezas de concierto (1902–1917)",
    artist: "Sousa's Band",
    year: "1902",
    poster: cover("78_el-capitan-march_sousas-band_gbia0479040a"),
    overview: "Grabaciones acústicas en discos de 78 rpm de la banda de John Philip Sousa. Disco 1: marchas. Disco 2: piezas de concierto.",
    genres: ["Marchas", "Banda"],
    discs: [
      [
        ["78_el-capitan-march_sousas-band_gbia0479040a", "El Capitan March - Sousa's Band.mp3", "El Capitan March", 164],
        ["78_imperial-edward-march_sousas-band_gbia0057815a", "Imperial Edward March - Sousa's Band.mp3", "Imperial Edward March", 144],
        ["78_jack-tar-march_sousas-band_gbia0011119a", "Jack Tar March - Sousa's Band.mp3", "Jack Tar March", 173],
        ["78_washington-post-march_sousas-band_gbia0426287a", "Washington Post March - Sousa's Band.mp3", "Washington Post March", 131],
        ["78_us-field-artillery-march_sousas-band-sousa_gbia0307161a", "U.S. Field Artillery March - Sousa's Band.mp3", "U.S. Field Artillery March", 211],
      ],
      [
        ["78_creole-belles_sousas-band_gbia0437697a", "Creole Belles - Sousa's Band.mp3", "Creole Belles", 144],
        ["78_the-warblers_sousas-band_gbia0437698a", "The Warblers - Sousa's Band.mp3", "The Warblers", 168],
        ["78_american-patrol_sousas-band_gbia0368302a", "American Patrol - Sousa's Band.mp3", "American Patrol", 155],
        ["78_in-the-realm-of-the-waltz_sousas-band_gbia0368304a", "In the Realm of the Waltz - Sousa's Band.mp3", "In the Realm of the Waltz", 177],
      ],
    ],
  },
  {
    id: "conway-marchas-de-banda",
    kind: "music",
    title: "Marchas de banda (1919–1920)",
    artist: "Conway's Band",
    year: "1919",
    poster: cover("78_national-emblem_conways-band-e-e-bagley-captain-pat-conway_gbia0453623a"),
    overview: "La banda del capitán Patrick Conway en discos de 78 rpm, con un pasodoble de Ruperto Chapí.",
    genres: ["Marchas", "Banda"],
    discs: [
      [
        ["78_national-emblem_conways-band-e-e-bagley-captain-pat-conway_gbia0453623a", "NATIONAL EMBLEM - CONWAY'S BAND - E. E. Bagley.mp3", "National Emblem", 190],
        ["78_sparklets_conways-band-walter-e-miles_gbia3017992b", "Sparklets - CONWAY'S BAND - Walter E. Miles.mp3", "Sparklets", 230],
        ["78_tenth-regiment-march_conways-band-r-b-hall_gbia0083577a", "Tenth Regiment March - Conway's Band - R. B. Hall.mp3", "Tenth Regiment March", 235],
        ["78_a-bunch-of-roses_conways-band-r-chapi_gbia0113987b", "A Bunch of Roses - Conway's Band - R. Chapi.mp3", "A Bunch of Roses (El ramo de flores)", 235],
      ],
    ],
  },
  {
    id: "ragtime-soldier-man",
    kind: "music",
    title: "Ragtime Soldier Man",
    artist: "Collins & Harlan",
    year: "1914",
    poster: cover("78_ragtime-soldier-man_collins-and-harlan-berlin_gbia3029376b"),
    overview: "Un sencillo de Irving Berlin en un disco de 78 rpm de 1914.",
    genres: ["Ragtime"],
    discs: [
      [
        ["78_ragtime-soldier-man_collins-and-harlan-berlin_gbia3029376b", "RAGTIME SOLDIER MAN - COLLINS AND HARLAN.mp3", "Ragtime Soldier Man", 183],
      ],
    ],
  },
  {
    id: "fabulas-literarias-iriarte",
    kind: "podcast",
    title: "Fábulas literarias",
    artist: "Tomás de Iriarte",
    year: "1782",
    poster: file("fabulasliterarias_1702_librivox", "fabulas_iriarte_1704.jpg"),
    overview: "Audiolibro de LibriVox, leído por voluntarios: las fábulas en verso de Tomás de Iriarte, una por episodio.",
    genres: ["Audiolibro", "Fábulas"],
    discs: [
      [
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_01_iriarte_64kb.mp3", "Fábula 1: El Elefante y otros animales", 197],
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_02_iriarte_64kb.mp3", "Fábula 2: El Gusano de seda y la Araña", 64],
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_03_iriarte_64kb.mp3", "Fábula 3: El Oso, la Mona y el Cerdo", 101],
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_04_iriarte_64kb.mp3", "Fábula 4: La Abeja y los Zánganos", 140],
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_05_iriarte_64kb.mp3", "Fábula 5: Los dos Loros y la Cotorra", 105],
        ["fabulasliterarias_1702_librivox", "fabulasliterarias_06_iriarte_64kb.mp3", "Fábula 6: El Mono y el Titiritero", 178],
      ],
    ],
  },
];

const BY_ID = new Map(CATALOG.map((a) => [a.id, a]));

function minutes(seconds) {
  return Math.max(1, Math.ceil(seconds / 60));
}

function itemOf(album) {
  let total = 0;
  for (const disc of album.discs) for (const t of disc) total += t[3];
  return {
    id: album.id,
    ref: "a:" + album.id,
    title: album.title,
    kind: album.kind,
    artist: album.artist,
    year: album.year,
    poster: album.poster,
    overview: album.overview,
    genres: album.genres,
    runtimeMinutes: minutes(total),
  };
}

// Sin acentos, sin mayúsculas y sin apóstrofos ("Fábulas" = "fabulas", "Sousa's" = "sousas").
const PLAIN = { á: "a", à: "a", ä: "a", â: "a", é: "e", è: "e", ë: "e", ê: "e", í: "i", ì: "i", ï: "i", î: "i",
  ó: "o", ò: "o", ö: "o", ô: "o", ú: "u", ù: "u", ü: "u", û: "u", ñ: "n", ç: "c" };

function fold(text) {
  return String(text).toLowerCase().replace(/['’]/g, "").replace(/[^\u0000-\u007f]/g, (c) => PLAIN[c] ?? c);
}

export async function home() {
  await null;
  return [
    { id: "musica", title: "Música", genre: "musica", items: CATALOG.filter((a) => a.kind === "music").map(itemOf) },
    { id: "podcasts", title: "Podcasts", items: CATALOG.filter((a) => a.kind === "podcast").map(itemOf) },
  ];
}

export async function search(query) {
  await null;
  const words = fold(query && query.q ? query.q : "").split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const found = CATALOG.filter((a) => {
    const text = fold(a.title + " " + a.artist);
    return words.every((w) => text.includes(w));
  });
  const type = query.type;
  if (type === "music" || type === "podcast") found.sort((x, y) => (y.kind === type) - (x.kind === type));
  return found.map(itemOf);
}

function albumOf(ref) {
  const m = /^a:([a-z0-9-]+)$/.exec(String(ref));
  const album = m && BY_ID.get(m[1]);
  if (!album) throw kino.error("not_found", "No conozco este título: " + ref);
  return album;
}

export async function episodes(ref) {
  await null;
  const album = albumOf(ref);
  const list = [];
  album.discs.forEach((disc, d) => {
    disc.forEach((t, i) => {
      list.push({
        season: d + 1,
        number: i + 1,
        ref: "t:" + album.id + ":" + (d + 1) + ":" + (i + 1),
        title: t[2],
        runtimeMinutes: minutes(t[3]),
        still: album.poster,
      });
    });
  });
  return { episodes: list };
}

export async function resolve(ref) {
  await null;
  const text = String(ref);
  let album, disc = 1, number = 1;
  const m = /^t:([a-z0-9-]+):(\d+):(\d+)$/.exec(text);
  if (m) {
    album = BY_ID.get(m[1]);
    disc = Number(m[2]);
    number = Number(m[3]);
  } else {
    album = albumOf(text); // un álbum entero empieza por su primera pista
  }
  const track = album && album.discs[disc - 1] && album.discs[disc - 1][number - 1];
  if (!track) throw kino.error("not_found", "No conozco esta pista: " + text);
  return { url: file(track[0], track[1]), mime: "audio/mpeg" };
}
