const templates = {
  who: [
    topic => `Who is ${topic}?`,
    topic => `Name ${topic}.`,
    topic => `Identify ${topic} in the Ramayana.`,
    topic => `According to the epic, who is ${topic}?`,
    topic => `In Valmiki's Ramayana, who is ${topic}?`
  ],
  what: [
    topic => `What is ${topic}?`,
    topic => `In the Ramayana, what is ${topic}?`,
    topic => `Identify ${topic}.`,
    topic => `According to the epic, what is ${topic}?`,
    topic => `Tell the answer for ${topic}.`
  ],
  where: [
    topic => `Where is ${topic}?`,
    topic => `In the Ramayana, where is ${topic}?`,
    topic => `Identify the location of ${topic}.`,
    topic => `According to the epic, where is ${topic}?`,
    topic => `Name the place where ${topic}.`
  ],
  howMany: [
    topic => `How many ${topic}?`,
    topic => `According to the Ramayana, how many ${topic}?`,
    topic => `State the number of ${topic}.`,
    topic => `What is the count of ${topic}?`,
    topic => `Give the total of ${topic}.`
  ]
};

const baseFacts = [
  { topic: "the father of Lord Rama", type: "who", answer: "Dasharatha", distractors: ["Janaka", "Vishwamitra", "Dushyanta"] },
  { topic: "the mother of Lord Rama", type: "who", answer: "Kausalya", distractors: ["Kaikeyi", "Sumitra", "Sunaina"] },
  { topic: "the stepmother who demanded Rama's exile", type: "who", answer: "Kaikeyi", distractors: ["Kausalya", "Sumitra", "Mandodari"] },
  { topic: "the wife of Lord Rama", type: "who", answer: "Sita", distractors: ["Draupadi", "Radha", "Rukmini"] },
  { topic: "the brother who accompanied Rama into exile", type: "who", answer: "Lakshmana", distractors: ["Bharata", "Shatrughna", "Angada"] },
  { topic: "the brother who ruled with Rama's sandals on the throne", type: "who", answer: "Bharata", distractors: ["Lakshmana", "Shatrughna", "Sugriva"] },
  { topic: "the twin brother of Lakshmana", type: "who", answer: "Shatrughna", distractors: ["Bharata", "Angada", "Vibhishana"] },
  { topic: "the mother of Lakshmana and Shatrughna", type: "who", answer: "Sumitra", distractors: ["Kausalya", "Kaikeyi", "Anjana"] },
  { topic: "the mother of Bharata", type: "who", answer: "Kaikeyi", distractors: ["Kausalya", "Sumitra", "Tara"] },
  { topic: "the wife of Lakshmana", type: "who", answer: "Urmila", distractors: ["Mandavi", "Shrutakirti", "Tara"] },
  { topic: "the wife of Bharata", type: "who", answer: "Mandavi", distractors: ["Urmila", "Shrutakirti", "Anasuya"] },
  { topic: "the wife of Shatrughna", type: "who", answer: "Shrutakirti", distractors: ["Mandavi", "Urmila", "Tara"] },
  { topic: "the father of Sita", type: "who", answer: "Janaka", distractors: ["Dasharatha", "Vishrava", "Guha"] },
  { topic: "the mother of Sita", type: "who", answer: "Sunaina", distractors: ["Kausalya", "Sumitra", "Mandodari"] },
  { topic: "the sage who took Rama to protect his sacrifice", type: "who", answer: "Vishwamitra", distractors: ["Vasishta", "Gautama", "Agastya"] },
  { topic: "the royal guru of the princes of Ayodhya", type: "who", answer: "Vasishta", distractors: ["Vishwamitra", "Bharadwaja", "Agastya"] },
  { topic: "the devotee who offered tasted berries to Rama", type: "who", answer: "Shabari", distractors: ["Anasuya", "Trijata", "Tara"] },
  { topic: "the vulture who tried to save Sita", type: "who", answer: "Jatayu", distractors: ["Sampati", "Garuda", "Aruna"] },
  { topic: "the elder vulture who informed the Vanaras about Sita", type: "who", answer: "Sampati", distractors: ["Jatayu", "Garuda", "Tarkshya"] },
  { topic: "the righteous brother of Ravana who joined Rama", type: "who", answer: "Vibhishana", distractors: ["Kumbhakarna", "Kubera", "Shurpanakha"] },
  { topic: "the giant brother of Ravana known for deep sleep", type: "who", answer: "Kumbhakarna", distractors: ["Vibhishana", "Indrajit", "Ghatotkacha"] },
  { topic: "the king of Lanka", type: "who", answer: "Ravana", distractors: ["Bali", "Kubera", "Indrajit"] },
  { topic: "the queen of Lanka", type: "who", answer: "Mandodari", distractors: ["Kaikeyi", "Tara", "Trijata"] },
  { topic: "the eldest son of Ravana", type: "who", answer: "Indrajit", distractors: ["Akshayakumara", "Kumbhakarna", "Shuka"] },
  { topic: "the other name of Indrajit", type: "what", answer: "Meghanada", distractors: ["Angada", "Akshaya", "Subahu"] },
  { topic: "the wife of Indrajit", type: "who", answer: "Sulochana", distractors: ["Mandodari", "Tara", "Trijata"] },
  { topic: "the devoted servant and messenger of Rama", type: "who", answer: "Hanuman", distractors: ["Angada", "Sugriva", "Nala"] },
  { topic: "the monkey king who allied with Rama", type: "who", answer: "Sugriva", distractors: ["Vali", "Angada", "Jambavan"] },
  { topic: "the elder brother of Sugriva", type: "who", answer: "Vali", distractors: ["Hanuman", "Nala", "Nila"] },
  { topic: "the son of Vali", type: "who", answer: "Angada", distractors: ["Hanuman", "Sugriva", "Ghatotkacha"] },
  { topic: "the wife of Vali", type: "who", answer: "Tara", distractors: ["Mandodari", "Sulochana", "Urmila"] },
  { topic: "the engineer who led construction of the stone bridge", type: "who", answer: "Nala", distractors: ["Nila", "Jambavan", "Angada"] },
  { topic: "the commander who helped place floating stones", type: "who", answer: "Nila", distractors: ["Nala", "Hanuman", "Sugriva"] },
  { topic: "the Nishad chieftain who ferried Rama across the Ganga", type: "who", answer: "Guha", distractors: ["Ganga", "Lakshmana", "Bharata"] },
  { topic: "the woman freed from a stone curse by Rama's touch", type: "who", answer: "Ahalya", distractors: ["Shabari", "Trijata", "Tataka"] },
  { topic: "the sage who cursed Ahalya", type: "who", answer: "Gautama", distractors: ["Vishwamitra", "Agastya", "Vasishta"] },
  { topic: "the sage who taught Rama the Aditya Hridayam hymn", type: "who", answer: "Agastya", distractors: ["Valmiki", "Gautama", "Bharadwaja"] },
  { topic: "the sage at Prayag whose hermitage Rama visited", type: "who", answer: "Bharadwaja", distractors: ["Agastya", "Vasishta", "Valmiki"] },
  { topic: "the demon who posed as the golden deer", type: "who", answer: "Maricha", distractors: ["Subahu", "Akampana", "Indrajit"] },
  { topic: "the demon killed by Rama alongside Maricha", type: "who", answer: "Subahu", distractors: ["Khara", "Dushana", "Trijata"] },
  { topic: "the first demoness slain by Rama", type: "who", answer: "Tataka", distractors: ["Shurpanakha", "Trijata", "Hidimba"] },
  { topic: "the sister of Ravana whose nose was cut", type: "who", answer: "Shurpanakha", distractors: ["Mandodari", "Tataka", "Sulochana"] },
  { topic: "the Rakshasi who consoled Sita in Ashoka Vatika", type: "who", answer: "Trijata", distractors: ["Shurpanakha", "Mandodari", "Tataka"] },
  { topic: "Ashoka Vatika located", type: "where", answer: "Inside the city of Lanka", distractors: ["In Mithila", "At Kishkindha", "Near Chitrakoot"] },
  { topic: "the name of Rama's personal bow", type: "what", answer: "Kodanda", distractors: ["Gandiva", "Pinaka", "Sharanga"] },
  { topic: "the bow of Shiva broken by Rama at the swayamvara", type: "what", answer: "Pinaka", distractors: ["Kodanda", "Gandiva", "Saranga"] },
  { topic: "the bridge built to reach Lanka", type: "what", answer: "Rama Setu", distractors: ["Lakshmana Setu", "Hanuman Setu", "Kishkindha Path"] },
  { topic: "the duration of Rama's exile in years", type: "howMany", answer: "14", distractors: ["12", "16", "10"] },
  { topic: "the number of kandas in Valmiki's Ramayana", type: "howMany", answer: "7", distractors: ["6", "5", "8"] },
  { topic: "the author of the Sanskrit Ramayana", type: "who", answer: "Valmiki", distractors: ["Vyasa", "Tulsidas", "Kamban"] },
  { topic: "the author of the Tamil Kamba Ramayanam", type: "who", answer: "Kamban", distractors: ["Valmiki", "Tulsidas", "Kalidasa"] },
  { topic: "the author of the Hindi Ramcharitmanas", type: "who", answer: "Tulsidas", distractors: ["Valmiki", "Kamban", "Vyasa"] },
  { topic: "the festival celebrating Rama's return to Ayodhya", type: "what", answer: "Diwali", distractors: ["Holi", "Navaratri", "Pongal"] },
  { topic: "the avatar number of Vishnu as Rama", type: "what", answer: "Seventh", distractors: ["Eighth", "Ninth", "Tenth"] },
  { topic: "the city where Rama was born", type: "where", answer: "Ayodhya", distractors: ["Mithila", "Kashi", "Hastinapura"] },
  { topic: "the river flowing by Ayodhya", type: "what", answer: "Sarayu", distractors: ["Ganga", "Yamuna", "Godavari"] },
  { topic: "the kingdom of King Janaka", type: "where", answer: "Mithila", distractors: ["Ayodhya", "Lanka", "Kishkindha"] },
  { topic: "the monkey kingdom allied to Rama", type: "where", answer: "Kishkindha", distractors: ["Ayodhya", "Mithila", "Lanka"] },
  { topic: "the mountain where Sugriva took refuge from Vali", type: "where", answer: "Rishyamukha", distractors: ["Dronagiri", "Kailasa", "Chitrakoot"] },
  { topic: "the forest region where Rama spent early exile", type: "where", answer: "Chitrakoot", distractors: ["Panchavati", "Dandaka", "Naimisha"] },
  { topic: "the lake near which Shabari met Rama", type: "where", answer: "Pampa", distractors: ["Manasarovar", "Pushkar", "Bindusaras"] },
  { topic: "the river near Chitrakoot", type: "what", answer: "Mandakini", distractors: ["Godavari", "Narmada", "Kaveri"] },
  { topic: "the sea god whom Rama prayed to before building the bridge", type: "who", answer: "Varuna", distractors: ["Indra", "Agni", "Vayu"] },
  { topic: "the hymn recited to energize Rama before battle with Ravana", type: "what", answer: "Aditya Hridayam", distractors: ["Rudra Stotra", "Vishnu Sahasranama", "Ganesha Atharvashirsha"] },
  { topic: "the herb brought to revive Lakshmana", type: "what", answer: "Sanjeevani", distractors: ["Tulsi", "Soma", "Amrita"] },
  { topic: "the mountain carried by Hanuman for the healing herbs", type: "what", answer: "Dronagiri", distractors: ["Kailasa", "Vindhya", "Mandara"] },
  { topic: "the arrow with which Rama finally slew Ravana", type: "what", answer: "Brahmastra", distractors: ["Pashupatastra", "Agneyastra", "Narayanastra"] },
  { topic: "the weapon Lakshmana used to kill Indrajit", type: "what", answer: "Brahmastra", distractors: ["Shakti", "Agneyastra", "Nagastra"] },
  { topic: "the person who placed Rama's sandals on the throne", type: "who", answer: "Bharata", distractors: ["Lakshmana", "Hanuman", "Vibhishana"] },
  { topic: "the goddess incarnated as Sita", type: "who", answer: "Lakshmi", distractors: ["Parvati", "Saraswati", "Durga"] },
  { topic: "the number of sons King Dasharatha had", type: "howMany", answer: "4", distractors: ["3", "5", "6"] },
  { topic: "the devotee who warned Sugriva about Vali's curse on Rishyamukha", type: "who", answer: "Matanga", distractors: ["Agastya", "Valmiki", "Gautama"] },
  { topic: "the brother of Ravana who was lord of wealth", type: "who", answer: "Kubera", distractors: ["Vishrava", "Indrajit", "Khara"] },
  { topic: "the father of Ravana", type: "who", answer: "Vishrava", distractors: ["Pulastya", "Vasishtha", "Jamadagni"] },
  { topic: "the architect who originally built golden Lanka", type: "who", answer: "Vishwakarma", distractors: ["Mayasura", "Tvashta", "Nala"] },
  { topic: "the demoness who guarded Sita's grove kindly", type: "who", answer: "Trijata", distractors: ["Shurpanakha", "Tataka", "Sulochana"] },
  { topic: "the monkey who first leapt across the ocean to Lanka", type: "who", answer: "Hanuman", distractors: ["Angada", "Jambavan", "Nala"] },
  { topic: "the bearer of Rama's ring to Sita", type: "who", answer: "Hanuman", distractors: ["Sugriva", "Angada", "Jambavan"] },
  { topic: "the ruler reinstated over Kishkindha after Vali's death", type: "who", answer: "Sugriva", distractors: ["Angada", "Hanuman", "Nala"] },
  { topic: "the devotee who narrated the Ramayana to Rama", type: "who", answer: "Lava and Kusha", distractors: ["Valmiki", "Narada", "Bharata"] },
  { topic: "the festival name for Rama's coronation ceremony", type: "what", answer: "Pattabhisheka", distractors: ["Upanayana", "Yajna", "Swayamvara"] },
  { topic: "the queen who insisted on her two boons", type: "who", answer: "Kaikeyi", distractors: ["Kausalya", "Sumitra", "Mandodari"] },
  { topic: "the boon that sent Rama to the forest", type: "what", answer: "Exile for fourteen years", distractors: ["Kingdom of Mithila", "Marriage to Sita", "Killing of Ravana"] },
  { topic: "the ornament Rama gave Sita as identification for Hanuman", type: "what", answer: "His signet ring", distractors: ["His bow", "His quiver", "His sandals"] },
  { topic: "the jewel Sita gave Hanuman as proof", type: "what", answer: "Chudamani", distractors: ["Necklace", "Armlet", "Anklet"] },
  { topic: "the lake where Rama and Sita stayed in Panchavati", type: "where", answer: "Godavari banks", distractors: ["Sarayu banks", "Narmada banks", "Yamuna banks"] },
  { topic: "the demon killed by Lakshmana that held Sita captive in forest", type: "who", answer: "Kabandha", distractors: ["Khara", "Dushana", "Trijata"] },
  { topic: "the Rakshasa leader slain by Rama in Dandaka", type: "who", answer: "Khara", distractors: ["Maricha", "Subahu", "Akampana"] },
  { topic: "the capital where Bharata stayed during Rama's exile", type: "where", answer: "Nandigrama", distractors: ["Ayodhya", "Kishkindha", "Lanka"] },
  { topic: "the loyal commander of Sugriva who searched the southern direction", type: "who", answer: "Angada", distractors: ["Hanuman", "Nala", "Jambavan"] },
  { topic: "the eldest vanara who guided the search party", type: "who", answer: "Jambavan", distractors: ["Hanuman", "Sugriva", "Angada"] },
  { topic: "the weapon Rama used to kill Vali", type: "what", answer: "An arrow from Kodanda", distractors: ["A spear", "A mace", "A sword"] },
  { topic: "the sage whose hermitage sheltered Sita during exile from Ayodhya", type: "who", answer: "Valmiki", distractors: ["Agastya", "Bharadwaja", "Vasishta"] },
  { topic: "the place where Sita gave birth to Lava and Kusha", type: "where", answer: "Valmiki's ashram", distractors: ["Ayodhya palace", "Mithila", "Chitrakoot"] }
];

const rotateOptions = (options, shiftBy) => {
  const shift = shiftBy % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
};

export const quizData = baseFacts.flatMap(fact => {
  const templateList = templates[fact.type] || templates.what;
  const options = [fact.answer, ...fact.distractors];
  return templateList.map((build, index) => ({
    question: build(fact.topic),
    options: rotateOptions(options, index),
    answer: fact.answer
  }));
});
