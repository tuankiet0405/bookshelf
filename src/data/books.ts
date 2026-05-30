import type { Book, LibraryBook, Shelf } from "../types";

const palettes = [
  ["#1f5f3b", "#0b1510", "#b9ff66"],
  ["#314d72", "#101827", "#9ec8ff"],
  ["#6c3b2a", "#15100d", "#ffb088"],
  ["#4a376f", "#11101d", "#d9c7ff"],
  ["#735c2f", "#15130b", "#f7d774"],
  ["#285d63", "#0c1718", "#9bf4e8"],
];

function cover(index: number) {
  const [from, to, accent] = palettes[index % palettes.length];
  return { from, to, accent };
}

export const shelves: Shelf[] = [
  { id: "want", name: "Want to Read", description: "Books waiting on the shelf." },
  { id: "reading", name: "Currently Reading", description: "Active reads with live progress." },
  { id: "read", name: "Read", description: "Finished books and notes." },
  { id: "paused", name: "Paused", description: "Books to return to later." },
];

export const books: Book[] = [
  { id: "b01", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", isbn: "9780441478125", genre: "Speculative Fiction", pages: 304, year: 1969, summary: "A diplomatic journey through gender, exile, and political trust on an icy world.", cover: cover(0) },
  { id: "b02", title: "Parable of the Sower", author: "Octavia E. Butler", isbn: "9780446675505", genre: "Speculative Fiction", pages: 345, year: 1993, summary: "A young visionary builds a new belief system amid social collapse.", cover: cover(1) },
  { id: "b03", title: "Annihilation", author: "Jeff VanderMeer", isbn: "9780374104092", genre: "Speculative Fiction", pages: 208, year: 2014, summary: "A biologist enters a transforming zone where memory and ecology mutate.", cover: cover(2) },
  { id: "b04", title: "Station Eleven", author: "Emily St. John Mandel", isbn: "9780385353304", genre: "Speculative Fiction", pages: 336, year: 2014, summary: "Art, memory, and survival connect lives before and after a pandemic.", cover: cover(3) },
  { id: "b05", title: "The Three-Body Problem", author: "Cixin Liu", isbn: "9780765377067", genre: "Speculative Fiction", pages: 400, year: 2008, summary: "First contact unfolds through physics, history, and cosmic strategy.", cover: cover(4) },
  { id: "b06", title: "Klara and the Sun", author: "Kazuo Ishiguro", isbn: "9780593318171", genre: "Speculative Fiction", pages: 320, year: 2021, summary: "An artificial friend observes love, illness, and devotion with quiet precision.", cover: cover(5) },
  { id: "b07", title: "Sea of Tranquility", author: "Emily St. John Mandel", isbn: "9780593321447", genre: "Speculative Fiction", pages: 272, year: 2022, summary: "A time-spanning mystery about art, simulation, and recurrence.", cover: cover(6) },
  { id: "b08", title: "Exhalation", author: "Ted Chiang", isbn: "9781101947883", genre: "Speculative Fiction", pages: 368, year: 2019, summary: "Precise stories about free will, machines, memory, and moral imagination.", cover: cover(7) },
  { id: "b09", title: "The Fifth Season", author: "N. K. Jemisin", isbn: "9780316229296", genre: "Fantasy", pages: 512, year: 2015, summary: "A fractured world and a hunted power collide at the end of an age.", cover: cover(8) },
  { id: "b10", title: "Piranesi", author: "Susanna Clarke", isbn: "9781635575637", genre: "Fantasy", pages: 272, year: 2020, summary: "A man maps an infinite house of tides, statues, and hidden truth.", cover: cover(9) },
  { id: "b11", title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "9780756404741", genre: "Fantasy", pages: 662, year: 2007, summary: "A legendary musician and magician recounts the making of his myth.", cover: cover(10) },
  { id: "b12", title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", isbn: "9780547773742", genre: "Fantasy", pages: 240, year: 1968, summary: "A young mage learns the cost of pride and the power of true names.", cover: cover(11) },
  { id: "b13", title: "The Priory of the Orange Tree", author: "Samantha Shannon", isbn: "9781635570304", genre: "Fantasy", pages: 848, year: 2019, summary: "Queens, dragons, and divided faiths converge in an epic standalone fantasy.", cover: cover(12) },
  { id: "b14", title: "The City We Became", author: "N. K. Jemisin", isbn: "9780316509848", genre: "Fantasy", pages: 448, year: 2020, summary: "New York's boroughs awaken as avatars against an extradimensional threat.", cover: cover(13) },
  { id: "b15", title: "Jonathan Strange & Mr Norrell", author: "Susanna Clarke", isbn: "9780765356154", genre: "Fantasy", pages: 1006, year: 2004, summary: "Two magicians revive English magic with rivalry, scholarship, and faerie danger.", cover: cover(14) },
  { id: "b16", title: "The Goblin Emperor", author: "Katherine Addison", isbn: "9780765326997", genre: "Fantasy", pages: 448, year: 2014, summary: "An unwanted heir navigates courtly intrigue with empathy and restraint.", cover: cover(15) },
  { id: "b17", title: "The Thursday Murder Club", author: "Richard Osman", isbn: "9781984880963", genre: "Mystery", pages: 368, year: 2020, summary: "Four retirees investigate a real murder with wit and unlikely leverage.", cover: cover(16) },
  { id: "b18", title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", isbn: "9780307454546", genre: "Mystery", pages: 672, year: 2005, summary: "A journalist and hacker uncover a family's violent hidden history.", cover: cover(17) },
  { id: "b19", title: "In the Woods", author: "Tana French", isbn: "9780143113492", genre: "Mystery", pages: 464, year: 2007, summary: "A detective confronts a murder tied to his own missing childhood memory.", cover: cover(18) },
  { id: "b20", title: "The No. 1 Ladies' Detective Agency", author: "Alexander McCall Smith", isbn: "9781400034772", genre: "Mystery", pages: 256, year: 1998, summary: "A thoughtful detective solves human mysteries in Botswana with warmth.", cover: cover(19) },
  { id: "b21", title: "The Big Sleep", author: "Raymond Chandler", isbn: "9780394758282", genre: "Mystery", pages: 231, year: 1939, summary: "Philip Marlowe enters a maze of blackmail, wealth, and Los Angeles rot.", cover: cover(20) },
  { id: "b22", title: "Magpie Murders", author: "Anthony Horowitz", isbn: "9780062645227", genre: "Mystery", pages: 496, year: 2016, summary: "A manuscript hides a murder puzzle inside another murder puzzle.", cover: cover(21) },
  { id: "b23", title: "Still Life", author: "Louise Penny", isbn: "9780312541538", genre: "Mystery", pages: 312, year: 2005, summary: "Inspector Gamache investigates a death in a village full of secrets.", cover: cover(22) },
  { id: "b24", title: "The Devotion of Suspect X", author: "Keigo Higashino", isbn: "9781250002693", genre: "Mystery", pages: 320, year: 2005, summary: "A mathematician builds a brilliant alibi out of loyalty and sacrifice.", cover: cover(23) },
  { id: "b25", title: "Atomic Habits", author: "James Clear", isbn: "9780735211292", genre: "Nonfiction", pages: 320, year: 2018, summary: "A practical system for building habits through small compounding changes.", cover: cover(24) },
  { id: "b26", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", isbn: "9781571313560", genre: "Nonfiction", pages: 408, year: 2013, summary: "Botany, Indigenous knowledge, and reciprocity reshape how we see nature.", cover: cover(25) },
  { id: "b27", title: "The Creative Act", author: "Rick Rubin", isbn: "9780593652886", genre: "Nonfiction", pages: 432, year: 2023, summary: "Short reflections on attention, taste, intuition, and creative practice.", cover: cover(26) },
  { id: "b28", title: "Educated", author: "Tara Westover", isbn: "9780399590504", genre: "Nonfiction", pages: 352, year: 2018, summary: "A memoir about family, isolation, education, and self-invention.", cover: cover(27) },
  { id: "b29", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "9780374533557", genre: "Nonfiction", pages: 499, year: 2011, summary: "A landmark tour of judgment, bias, intuition, and decision-making.", cover: cover(28) },
  { id: "b30", title: "How to Do Nothing", author: "Jenny Odell", isbn: "9781612198552", genre: "Nonfiction", pages: 256, year: 2019, summary: "An argument for attention, refusal, ecology, and meaningful presence.", cover: cover(29) },
  { id: "b31", title: "The Art of Gathering", author: "Priya Parker", isbn: "9781594634932", genre: "Nonfiction", pages: 320, year: 2018, summary: "A guide to designing gatherings with purpose, tension, and belonging.", cover: cover(30) },
  { id: "b32", title: "Four Thousand Weeks", author: "Oliver Burkeman", isbn: "9780374159122", genre: "Nonfiction", pages: 288, year: 2021, summary: "A finite-life approach to time, productivity, and choosing what matters.", cover: cover(31) },
  { id: "b33", title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", isbn: "9780593321201", genre: "Literary", pages: 416, year: 2022, summary: "Friendship, ambition, and art unfold through decades of game-making.", cover: cover(32) },
  { id: "b34", title: "Normal People", author: "Sally Rooney", isbn: "9781984822178", genre: "Literary", pages: 273, year: 2018, summary: "Two people move through intimacy, class, and miscommunication over years.", cover: cover(33) },
  { id: "b35", title: "The Vanishing Half", author: "Brit Bennett", isbn: "9780525536291", genre: "Literary", pages: 352, year: 2020, summary: "Twin sisters choose different lives shaped by race, family, and secrecy.", cover: cover(34) },
  { id: "b36", title: "A Gentleman in Moscow", author: "Amor Towles", isbn: "9780143110439", genre: "Literary", pages: 496, year: 2016, summary: "A count under house arrest builds an expansive life inside a hotel.", cover: cover(35) },
  { id: "b37", title: "The Overstory", author: "Richard Powers", isbn: "9780393356687", genre: "Literary", pages: 512, year: 2018, summary: "Human lives branch into a vast novel of trees, activism, and time.", cover: cover(36) },
  { id: "b38", title: "Hamnet", author: "Maggie O'Farrell", isbn: "9780525657606", genre: "Literary", pages: 320, year: 2020, summary: "A luminous reimagining of grief, marriage, and Shakespeare's family.", cover: cover(37) },
  { id: "b39", title: "The Memory Police", author: "Yoko Ogawa", isbn: "9781101870600", genre: "Literary", pages: 288, year: 1994, summary: "Objects vanish from an island as memory and resistance narrow.", cover: cover(38) },
  { id: "b40", title: "Small Things Like These", author: "Claire Keegan", isbn: "9780802158741", genre: "Literary", pages: 128, year: 2021, summary: "A coal merchant faces a moral choice in a small Irish town.", cover: cover(39) },
  { id: "b41", title: "Project Hail Mary", author: "Andy Weir", isbn: "9780593135204", genre: "Speculative Fiction", pages: 496, year: 2021, summary: "A lone astronaut wakes with a scientific mission and an unexpected ally.", cover: cover(40) },
  { id: "b42", title: "Babel", author: "R. F. Kuang", isbn: "9780063021426", genre: "Fantasy", pages: 560, year: 2022, summary: "Translation, empire, and magic collide at an alternate Oxford institute.", cover: cover(41) },
  { id: "b43", title: "The Silent Patient", author: "Alex Michaelides", isbn: "9781250301697", genre: "Mystery", pages: 336, year: 2019, summary: "A therapist investigates why a painter stopped speaking after murder.", cover: cover(42) },
  { id: "b44", title: "Range", author: "David Epstein", isbn: "9780735214484", genre: "Nonfiction", pages: 352, year: 2019, summary: "A case for broad exploration, late specialization, and flexible thinking.", cover: cover(43) },
  { id: "b45", title: "Demon Copperhead", author: "Barbara Kingsolver", isbn: "9780063251922", genre: "Literary", pages: 560, year: 2022, summary: "A modern Appalachian David Copperfield about survival, systems, and voice.", cover: cover(44) },
];

type CoverArchivePick = Omit<Book, "cover" | "coverImageUrl" | "coverSourceUrl" | "coverCredit" | "coverAlt"> & {
  slug: string;
  image: string;
};

function bca(book: CoverArchivePick, index: number): Book {
  return {
    ...book,
    coverImageUrl: `${book.image}?w=900&f=webp`,
    coverSourceUrl: `https://bookcoverarchive.com/book/${book.slug}`,
    coverCredit: "Cover source: Book Cover Archive. Cover copyright belongs to its respective owner.",
    coverAlt: `Cover of ${book.title} from Book Cover Archive`,
    cover: cover(45 + index),
  };
}

export const coverArchivePicks: Book[] = [
  bca({ id: "ca-absolution", title: "Absolution", author: "Jeff VanderMeer", isbn: "BCA-ABSOLUTION", genre: "Speculative Fiction", pages: 464, year: 2023, summary: "A cover-led speculative pick selected for its atmospheric visual system.", slug: "absolution", image: "https://cdn.sanity.io/images/ps8jihhe/production/558d2018ff1f0bc8b83652fa1f9ee2d564e2cc09-1000x1534.jpg" }, 0),
  bca({ id: "ca-tripping-on-utopia", title: "Tripping On Utopia", author: "Benjamin Breen", isbn: "BCA-TRIPPING-UTOPIA", genre: "Nonfiction", pages: 384, year: 2024, summary: "A nonfiction pick with a crisp, gallery-ready cover and research-driven subject matter.", slug: "tripping-on-utopia", image: "https://cdn.sanity.io/images/ps8jihhe/production/35259e6a780c90996aebe106dd622cfd34b036e7-994x1500.webp" }, 1),
  bca({ id: "ca-the-culture", title: "The Culture", author: "Martin Puchner", isbn: "BCA-THE-CULTURE", genre: "Nonfiction", pages: 384, year: 2023, summary: "A crisp nonfiction cover pick that works well inside the Soft Spatial Library gallery.", slug: "the-culture", image: "https://cdn.sanity.io/images/ps8jihhe/production/808ff34f24280ce5889a4c8546cf7c8d1ce748a6-950x1500.jpg" }, 2),
  bca({ id: "ca-laserwriter-ii", title: "LaserWriter II", author: "Tamara Shopsin", isbn: "BCA-LASERWRITER-II", genre: "Literary", pages: 224, year: 2021, summary: "A compact literary pick with a strong graphic cover and fast-read profile.", slug: "laserwriter-ii", image: "https://cdn.sanity.io/images/ps8jihhe/production/662a3e4a13cb6eea1862a0560698ae63cbdc29e0-667x1000.jpg" }, 3),
  bca({ id: "ca-ghost-sequences", title: "The Ghost Sequences", author: "A. C. Wise", isbn: "BCA-GHOST-SEQUENCES", genre: "Speculative Fiction", pages: 320, year: 2021, summary: "A speculative pick with a moody cover suited to the archive wall.", slug: "the-ghost-sequences", image: "https://cdn.sanity.io/images/ps8jihhe/production/52e46d6218b203675edf1beb94070f6bcf938edc-1650x2550.jpg" }, 4),
  bca({ id: "ca-tyll", title: "Tyll", author: "Daniel Kehlmann", isbn: "BCA-TYLL", genre: "Literary", pages: 352, year: 2020, summary: "A literary pick with theatrical cover art and historical texture.", slug: "tyll", image: "https://cdn.sanity.io/images/ps8jihhe/production/6ba04307f774a6e9862adf116d0dd5cdcf926438-1688x2550.jpg" }, 5),
  bca({ id: "ca-dead-astronauts", title: "Dead Astronauts", author: "Jeff VanderMeer", isbn: "BCA-DEAD-ASTRONAUTS", genre: "Speculative Fiction", pages: 336, year: 2019, summary: "A strange ecological speculative pick with a cover suited to spatial shelf display.", slug: "dead-astronauts", image: "https://cdn.sanity.io/images/ps8jihhe/production/265585cbedd88a33c83c203ef7633157fb50a495-1500x2250.jpg" }, 6),
  bca({ id: "ca-psychopath-test", title: "The Psychopath Test", author: "Jon Ronson", isbn: "BCA-PSYCHOPATH-TEST", genre: "Nonfiction", pages: 288, year: 2011, summary: "A smart nonfiction pick with a memorable cover and conversational pace.", slug: "the-psychopath-test", image: "https://cdn.sanity.io/images/ps8jihhe/production/f0f72c244c6579d43c7e9eb76d5e0760d346af19-745x1122.jpg" }, 7),
  bca({ id: "ca-strange-new-things", title: "The Book of Strange New Things", author: "Michel Faber", isbn: "BCA-STRANGE-NEW-THINGS", genre: "Speculative Fiction", pages: 512, year: 2014, summary: "A reflective speculative novel with an elegant cover built for quiet discovery.", slug: "the-book-of-strange-new-things", image: "https://cdn.sanity.io/images/ps8jihhe/production/f3f1c3b575a09e58f8e3381642f5c1840b150c90-900x1362.jpg" }, 8),
  bca({ id: "ca-time-travel-history", title: "Time Travel: A History", author: "James Gleick", isbn: "BCA-TIME-TRAVEL-HISTORY", genre: "Nonfiction", pages: 352, year: 2016, summary: "A science-history pick with cover geometry that suits the gallery shelf.", slug: "time-travel-a-history", image: "https://cdn.sanity.io/images/ps8jihhe/production/897bfd0e810e8c921d3d68b26fc68d2f40bd966a-1045x1291.jpg" }, 9),
  bca({ id: "ca-version-control", title: "Version Control", author: "Dexter Palmer", isbn: "BCA-VERSION-CONTROL", genre: "Speculative Fiction", pages: 512, year: 2016, summary: "A time-bending novel selected for a clean cover archive visual moment.", slug: "version-control", image: "https://cdn.sanity.io/images/ps8jihhe/production/426a01e8fc60674705271f04faba388292cab55e-1682x2560.jpg" }, 10),
  bca({ id: "ca-birds-of-america", title: "Birds of America", author: "Lorrie Moore", isbn: "BCA-BIRDS-AMERICA", genre: "Literary", pages: 304, year: 1998, summary: "A literary story collection with a restrained cover that balances the shelf.", slug: "birds-of-america-stories", image: "https://cdn.sanity.io/images/ps8jihhe/production/b2466edab57d1f688dfc38eaa8c870181cc2173e-350x521.jpg" }, 11),
  bca({ id: "ca-witches-of-america", title: "Witches of America", author: "Alex Mar", isbn: "BCA-WITCHES-AMERICA", genre: "Nonfiction", pages: 288, year: 2015, summary: "A nonfiction pick with occult texture and a strong display cover.", slug: "witches-of-america", image: "https://cdn.sanity.io/images/ps8jihhe/production/9f78b3d912c524908174b189acdedf605e13bd1e-1314x1944.jpg" }, 12),
  bca({ id: "ca-visible-man", title: "The Visible Man", author: "Chuck Klosterman", isbn: "BCA-VISIBLE-MAN", genre: "Literary", pages: 256, year: 2011, summary: "A compact novel with an unnerving cover and fast shelf readability.", slug: "the-visible-man-a-novel", image: "https://cdn.sanity.io/images/ps8jihhe/production/d80583c48da3d899f358a3b8e5608d05e2f84ecf-657x1010.jpg" }, 13),
  bca({ id: "ca-macbeth", title: "Macbeth", author: "William Shakespeare", isbn: "BCA-MACBETH", genre: "Literary", pages: 160, year: 1606, summary: "A classic drama pick with a bold cover for the archive display wall.", slug: "macbeth", image: "https://cdn.sanity.io/images/ps8jihhe/production/80894d2aaf5f019b061977d9b6407dc154714032-1000x1531.jpg" }, 14),
  bca({ id: "ca-sellout", title: "The Sellout", author: "Paul Beatty", isbn: "BCA-SELLOUT", genre: "Literary", pages: 304, year: 2015, summary: "A sharp literary pick with a direct cover presence and strong voice.", slug: "the-sellout", image: "https://cdn.sanity.io/images/ps8jihhe/production/e873cde69b52a09682426c7db4235837caf04bed-499x750.png" }, 15),
  bca({ id: "ca-mr-penumbra", title: "Mr. Penumbra's 24-Hour Bookstore", author: "Robin Sloan", isbn: "BCA-MR-PENUMBRA", genre: "Literary", pages: 288, year: 2012, summary: "A bookstore mystery pick that naturally belongs in a reading tracker demo.", slug: "mr-penumbras-24-hour-bookstore-a-novel", image: "https://cdn.sanity.io/images/ps8jihhe/production/8dd705ab1c0b859852fe23da520458ecad0d4af4-1400x2100.jpg" }, 16),
  bca({ id: "ca-area-x", title: "Area X", author: "Jeff VanderMeer", isbn: "BCA-AREA-X", genre: "Speculative Fiction", pages: 608, year: 2014, summary: "A collected speculative pick with a cover that anchors the 3D shelf.", slug: "area-x", image: "https://cdn.sanity.io/images/ps8jihhe/production/61e347594e6ee2ed613027b213a0d2be9eace3e3-1400x1862.jpg" }, 17),
  bca({ id: "ca-utopia-rules", title: "The Utopia of Rules", author: "David Graeber", isbn: "BCA-UTOPIA-RULES", genre: "Nonfiction", pages: 272, year: 2015, summary: "A nonfiction pick with a structured cover and systems-minded theme.", slug: "the-utopia-of-rules", image: "https://cdn.sanity.io/images/ps8jihhe/production/b0ad5d4c36f84757cfbe4073e595534d8563ab3e-986x1500.jpg" }, 18),
  bca({ id: "ca-pale-king", title: "The Pale King", author: "David Foster Wallace", isbn: "BCA-PALE-KING", genre: "Literary", pages: 560, year: 2011, summary: "A literary archive pick with a quiet, pale cover language.", slug: "the_pale_king", image: "https://cdn.sanity.io/images/ps8jihhe/production/71d928332159064e0c5d70ed3715fd2d5c82eb6a-1080x1600.jpg" }, 19),
  bca({ id: "ca-milk", title: "Milk", author: "Darcey Steinke", isbn: "BCA-MILK", genre: "Literary", pages: 240, year: 2019, summary: "A compact literary pick with cover simplicity that suits the softer theme.", slug: "milk", image: "https://cdn.sanity.io/images/ps8jihhe/production/8a53003f5e0fd90de62e507cab490bcd3e7d535c-780x1051.jpg" }, 20),
  bca({ id: "ca-no-longer-human", title: "No Longer Human", author: "Osamu Dazai", isbn: "BCA-NO-LONGER-HUMAN", genre: "Literary", pages: 177, year: 1948, summary: "A short literary classic with a stark cover that balances the soft interface.", slug: "no_longer_human", image: "https://cdn.sanity.io/images/ps8jihhe/production/7af73c83dded73f99a3252c8330c792c53f06ec6-304x500.jpg" }, 21),
  bca({ id: "ca-how-to-live", title: "How to Live", author: "Sarah Bakewell", isbn: "BCA-HOW-TO-LIVE", genre: "Nonfiction", pages: 400, year: 2010, summary: "A reflective nonfiction pick with a cover that reads like a catalog label.", slug: "how_to_live_or_a_life_of_montaigne_in_one_question_and_twenty_attempts_at_an_answer", image: "https://cdn.sanity.io/images/ps8jihhe/production/bab34e62bafebe3371211e26c96b4db0ea3e611d-334x500.jpg" }, 22),
  bca({ id: "ca-stolen-world", title: "Stolen World", author: "Jennie Erin Smith", isbn: "BCA-STOLEN-WORLD", genre: "Nonfiction", pages: 336, year: 2011, summary: "A nonfiction pick with natural-history intrigue and a strong vertical cover.", slug: "stolen_world", image: "https://cdn.sanity.io/images/ps8jihhe/production/e3fce2a84fa55a134eb2617efa60798552462f31-662x1000.jpg" }, 23),
];

export const guestLibrary: LibraryBook[] = coverArchivePicks.slice(0, 16).map((book, index) => {
  const shelf = index < 7 ? "read" : index < 12 ? "reading" : index < 21 ? "want" : "paused";
  const finishedMonth = index % 8;
  return {
    ...book,
    shelf,
    currentPage: shelf === "read" ? book.pages : shelf === "reading" ? Math.round(book.pages * (0.18 + (index % 5) * 0.14)) : 0,
    rating: shelf === "read" ? 3 + (index % 3) : undefined,
    notes:
      shelf === "read"
        ? "A memorable thread for this year's archive. Revisit the passages about attention and change."
        : "",
    startedAt: shelf === "reading" ? `2026-0${(index % 5) + 1}-12` : undefined,
    finishedAt: shelf === "read" ? `2026-${String(finishedMonth + 1).padStart(2, "0")}-${String(8 + index).padStart(2, "0")}` : undefined,
  };
});
