import type { Essay } from '@/src/types';

export const mockEssays: Essay[] = [
  // United States Essays
  {
    id: 'us-1776-declaration',
    countryId: 'united-states',
    year: 1776,
    title: 'The Declaration of Independence',
    subtitle: 'Birth of a Nation',
    summary:
      'The founding document that declared American independence from Britain and established the principles of liberty and equality.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800',
    contentBlocks: [
      {
        id: 'us-1776-h1',
        type: 'heading',
        content: 'A Revolutionary Document',
        metadata: { level: 2 },
      },
      {
        id: 'us-1776-p1',
        type: 'paragraph',
        content:
          'On July 4, 1776, the Continental Congress adopted the Declaration of Independence, a document that would forever change the course of human history. Drafted primarily by Thomas Jefferson, with contributions from Benjamin Franklin and John Adams, this revolutionary text proclaimed the thirteen American colonies free and independent states.',
      },
      {
        id: 'us-1776-q1',
        type: 'quote',
        content:
          'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.',
        metadata: { author: 'Thomas Jefferson' },
      },
      {
        id: 'us-1776-h2',
        type: 'heading',
        content: 'The Road to Independence',
        metadata: { level: 2 },
      },
      {
        id: 'us-1776-p2',
        type: 'paragraph',
        content:
          'The declaration was the culmination of years of growing tension between the American colonies and Great Britain. The Stamp Act of 1765, the Boston Massacre of 1770, and the Boston Tea Party of 1773 had all contributed to the revolutionary fervor that swept through the colonies.',
      },
      {
        id: 'us-1776-h3',
        type: 'heading',
        content: 'Key Principles',
        metadata: { level: 2 },
      },
      {
        id: 'us-1776-list1',
        type: 'list',
        content: '',
        metadata: {
          listType: 'unordered',
          listItems: [
            'Natural rights of life, liberty, and the pursuit of happiness',
            'Government derives its power from the consent of the governed',
            'The right of the people to alter or abolish unjust government',
            'Equality of all men before the law',
          ],
        },
      },
      {
        id: 'us-1776-p3',
        type: 'paragraph',
        content:
          'The Declaration of Independence remains one of the most influential documents in world history, inspiring democratic movements across the globe and serving as the foundation for the American system of government.',
      },
    ],
    tags: ['independence', 'revolution', 'founding-fathers', 'democracy'],
    era: 'EarlyModern',
    readingTimeMinutes: 8,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'us-1776-continental-army',
    countryId: 'united-states',
    year: 1776,
    title: 'Washington and the Continental Army',
    subtitle: 'The Military Struggle for Independence',
    summary:
      'George Washington led the Continental Army through the darkest days of the Revolutionary War.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800',
    contentBlocks: [
      {
        id: 'us-1776-army-h1',
        type: 'heading',
        content: 'Commander in Chief',
        metadata: { level: 2 },
      },
      {
        id: 'us-1776-army-p1',
        type: 'paragraph',
        content:
          'George Washington was appointed Commander-in-Chief of the Continental Army in June 1775. His leadership would prove instrumental in securing American independence, though the path to victory was long and arduous.',
      },
      {
        id: 'us-1776-army-h2',
        type: 'heading',
        content: 'Crossing the Delaware',
        metadata: { level: 2 },
      },
      {
        id: 'us-1776-army-p2',
        type: 'paragraph',
        content:
          'On Christmas night 1776, Washington led his troops across the icy Delaware River in a surprise attack on Hessian forces at Trenton. This bold maneuver reinvigorated the American cause at its lowest point.',
      },
    ],
    tags: ['military', 'revolution', 'washington', 'leadership'],
    era: 'EarlyModern',
    readingTimeMinutes: 6,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'us-1863-emancipation',
    countryId: 'united-states',
    year: 1863,
    title: 'The Emancipation Proclamation',
    subtitle: 'A New Birth of Freedom',
    summary:
      'President Lincoln declared all slaves in Confederate states to be free, transforming the Civil War into a fight for human freedom.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800',
    contentBlocks: [
      {
        id: 'us-1863-h1',
        type: 'heading',
        content: 'The Proclamation',
        metadata: { level: 2 },
      },
      {
        id: 'us-1863-p1',
        type: 'paragraph',
        content:
          'On January 1, 1863, President Abraham Lincoln issued the Emancipation Proclamation, declaring that all persons held as slaves within the rebellious states are, and henceforward shall be free. This executive order transformed the character of the Civil War.',
      },
      {
        id: 'us-1863-q1',
        type: 'quote',
        content:
          'In giving freedom to the slave, we assure freedom to the free - honorable alike in what we give and what we preserve.',
        metadata: { author: 'Abraham Lincoln' },
      },
      {
        id: 'us-1863-h2',
        type: 'heading',
        content: 'Impact and Legacy',
        metadata: { level: 2 },
      },
      {
        id: 'us-1863-p2',
        type: 'paragraph',
        content:
          'The Emancipation Proclamation enabled African Americans to serve in the Union Army, with nearly 200,000 Black soldiers and sailors fighting for the Union by the end of the war. It also fundamentally redefined the purpose of the conflict.',
      },
    ],
    tags: ['civil-war', 'slavery', 'lincoln', 'freedom'],
    era: 'Modern',
    readingTimeMinutes: 7,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: 'us-1969-moon-landing',
    countryId: 'united-states',
    year: 1969,
    title: 'One Giant Leap: The Moon Landing',
    subtitle: 'Humanitys Greatest Achievement',
    summary:
      'Apollo 11 landed on the Moon, fulfilling President Kennedys vision and marking humanitys first steps on another world.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    contentBlocks: [
      {
        id: 'us-1969-h1',
        type: 'heading',
        content: 'The Eagle Has Landed',
        metadata: { level: 2 },
      },
      {
        id: 'us-1969-p1',
        type: 'paragraph',
        content:
          'On July 20, 1969, astronauts Neil Armstrong and Edwin Buzz Aldrin became the first humans to walk on the Moon. This achievement represented the culmination of the space race and one of humanitys greatest technological accomplishments.',
      },
      {
        id: 'us-1969-q1',
        type: 'quote',
        content: 'Thats one small step for man, one giant leap for mankind.',
        metadata: { author: 'Neil Armstrong' },
      },
    ],
    tags: ['space', 'nasa', 'apollo', 'technology'],
    era: 'Contemporary',
    readingTimeMinutes: 10,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },

  // United Kingdom Essays
  {
    id: 'uk-1215-magna-carta',
    countryId: 'united-kingdom',
    year: 1215,
    title: 'Magna Carta: The Great Charter',
    subtitle: 'Foundation of Constitutional Law',
    summary:
      'King John was forced to sign the Magna Carta, establishing the principle that the king was subject to the law.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    contentBlocks: [
      {
        id: 'uk-1215-h1',
        type: 'heading',
        content: 'The Barons Revolt',
        metadata: { level: 2 },
      },
      {
        id: 'uk-1215-p1',
        type: 'paragraph',
        content:
          'In 1215, a group of rebellious barons forced King John of England to sign the Magna Carta at Runnymede. This revolutionary document established for the first time that the king was not above the law.',
      },
      {
        id: 'uk-1215-h2',
        type: 'heading',
        content: 'Key Provisions',
        metadata: { level: 2 },
      },
      {
        id: 'uk-1215-list1',
        type: 'list',
        content: '',
        metadata: {
          listType: 'unordered',
          listItems: [
            'No free man shall be imprisoned without lawful judgment',
            'Justice shall not be sold, denied, or delayed',
            'The king shall not levy taxes without common consent',
            'The church shall be free from royal interference',
          ],
        },
      },
    ],
    tags: ['law', 'monarchy', 'rights', 'medieval'],
    era: 'Medieval',
    readingTimeMinutes: 9,
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
  {
    id: 'uk-1940-battle-britain',
    countryId: 'united-kingdom',
    year: 1940,
    title: 'The Battle of Britain',
    subtitle: 'Their Finest Hour',
    summary:
      'The Royal Air Force defended Britain against massive German air attacks, preventing a Nazi invasion.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800',
    contentBlocks: [
      {
        id: 'uk-1940-h1',
        type: 'heading',
        content: 'The Battle Begins',
        metadata: { level: 2 },
      },
      {
        id: 'uk-1940-p1',
        type: 'paragraph',
        content:
          'From July to October 1940, the Royal Air Force fought a desperate battle against the German Luftwaffe for control of British airspace. The outcome would determine whether Hitler could launch Operation Sea Lion - the invasion of Britain.',
      },
      {
        id: 'uk-1940-q1',
        type: 'quote',
        content:
          'Never in the field of human conflict was so much owed by so many to so few.',
        metadata: { author: 'Winston Churchill' },
      },
    ],
    tags: ['world-war-2', 'military', 'churchill', 'aviation'],
    era: 'Modern',
    readingTimeMinutes: 8,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },

  // France Essays
  {
    id: 'fr-1789-revolution',
    countryId: 'france',
    year: 1789,
    title: 'The French Revolution',
    subtitle: 'Liberty, Equality, Fraternity',
    summary:
      'The storming of the Bastille marked the beginning of the French Revolution, forever changing European politics.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
    contentBlocks: [
      {
        id: 'fr-1789-h1',
        type: 'heading',
        content: 'The Fall of the Bastille',
        metadata: { level: 2 },
      },
      {
        id: 'fr-1789-p1',
        type: 'paragraph',
        content:
          'On July 14, 1789, Parisian revolutionaries stormed the Bastille fortress, a symbol of royal authority. This dramatic event marked the beginning of the French Revolution and the end of absolute monarchy in France.',
      },
      {
        id: 'fr-1789-h2',
        type: 'heading',
        content: 'Declaration of the Rights of Man',
        metadata: { level: 2 },
      },
      {
        id: 'fr-1789-p2',
        type: 'paragraph',
        content:
          'In August 1789, the National Assembly adopted the Declaration of the Rights of Man and of the Citizen, proclaiming universal principles of liberty, property, security, and resistance to oppression.',
      },
    ],
    tags: ['revolution', 'democracy', 'enlightenment', 'politics'],
    era: 'EarlyModern',
    readingTimeMinutes: 11,
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },

  // Egypt Essays
  {
    id: 'eg-2560-pyramids',
    countryId: 'egypt',
    year: -2560,
    title: 'The Great Pyramid of Giza',
    subtitle: 'Wonder of the Ancient World',
    summary:
      'The construction of the Great Pyramid marked the pinnacle of ancient Egyptian civilization and engineering.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800',
    contentBlocks: [
      {
        id: 'eg-2560-h1',
        type: 'heading',
        content: 'Monument to Eternity',
        metadata: { level: 2 },
      },
      {
        id: 'eg-2560-p1',
        type: 'paragraph',
        content:
          'Built around 2560 BCE as a tomb for Pharaoh Khufu, the Great Pyramid of Giza stands as the oldest and largest of the three pyramids on the Giza plateau. For over 3,800 years, it remained the tallest man-made structure in the world.',
      },
      {
        id: 'eg-2560-h2',
        type: 'heading',
        content: 'Engineering Marvel',
        metadata: { level: 2 },
      },
      {
        id: 'eg-2560-p2',
        type: 'paragraph',
        content:
          'The pyramid originally stood at 481 feet and was constructed using an estimated 2.3 million stone blocks, each weighing an average of 2.5 tons. The precision of its construction continues to astound engineers and archaeologists.',
      },
    ],
    tags: ['ancient', 'architecture', 'pharaoh', 'wonder'],
    era: 'Ancient',
    readingTimeMinutes: 7,
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },

  // Japan Essays
  {
    id: 'jp-1868-meiji',
    countryId: 'japan',
    year: 1868,
    title: 'The Meiji Restoration',
    subtitle: 'Japans Transformation',
    summary:
      'The Meiji Restoration ended centuries of feudal rule and launched Japan into the modern age.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
    contentBlocks: [
      {
        id: 'jp-1868-h1',
        type: 'heading',
        content: 'End of the Shogunate',
        metadata: { level: 2 },
      },
      {
        id: 'jp-1868-p1',
        type: 'paragraph',
        content:
          'In 1868, the Tokugawa shogunate was overthrown and Emperor Meiji was restored to power. This event, known as the Meiji Restoration, marked the beginning of Japans rapid modernization and emergence as a world power.',
      },
      {
        id: 'jp-1868-h2',
        type: 'heading',
        content: 'Rapid Modernization',
        metadata: { level: 2 },
      },
      {
        id: 'jp-1868-p2',
        type: 'paragraph',
        content:
          'The new government implemented sweeping reforms: abolishing the feudal system, establishing a modern military, building railways, and promoting industrialization. Japan transformed from an isolated feudal society to a modern nation-state in just a few decades.',
      },
    ],
    tags: ['modernization', 'emperor', 'reform', 'industry'],
    era: 'Modern',
    readingTimeMinutes: 8,
    createdAt: '2024-01-23T10:00:00Z',
    updatedAt: '2024-01-23T10:00:00Z',
  },

  // China Essays
  {
    id: 'cn-221-qin',
    countryId: 'china',
    year: -221,
    title: 'Qin Shi Huang Unifies China',
    subtitle: 'The First Emperor',
    summary:
      'Qin Shi Huang conquered the warring states and created the first unified Chinese empire.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    contentBlocks: [
      {
        id: 'cn-221-h1',
        type: 'heading',
        content: 'The First Emperor',
        metadata: { level: 2 },
      },
      {
        id: 'cn-221-p1',
        type: 'paragraph',
        content:
          'In 221 BCE, King Zheng of Qin completed his conquest of the warring states and declared himself Qin Shi Huang - the First Emperor. This marked the beginning of imperial China, a political system that would last over two millennia.',
      },
      {
        id: 'cn-221-h2',
        type: 'heading',
        content: 'Standardization and the Great Wall',
        metadata: { level: 2 },
      },
      {
        id: 'cn-221-p2',
        type: 'paragraph',
        content:
          'The First Emperor standardized weights, measures, currency, and even the writing system across his empire. He also connected existing defensive walls into the first version of the Great Wall and commissioned the famous Terracotta Army.',
      },
    ],
    tags: ['empire', 'unification', 'great-wall', 'ancient'],
    era: 'Ancient',
    readingTimeMinutes: 9,
    createdAt: '2024-01-24T10:00:00Z',
    updatedAt: '2024-01-24T10:00:00Z',
  },

  // Italy Essays
  {
    id: 'it-1492-renaissance',
    countryId: 'italy',
    year: 1492,
    title: 'The Italian Renaissance',
    subtitle: 'Rebirth of Art and Learning',
    summary:
      'Florence and other Italian city-states became the center of a cultural revolution that transformed Western civilization.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800',
    contentBlocks: [
      {
        id: 'it-1492-h1',
        type: 'heading',
        content: 'The Cradle of the Renaissance',
        metadata: { level: 2 },
      },
      {
        id: 'it-1492-p1',
        type: 'paragraph',
        content:
          'The Italian Renaissance, centered in Florence under the patronage of the Medici family, represented a profound cultural transformation. Artists like Leonardo da Vinci, Michelangelo, and Raphael created masterpieces that defined Western art.',
      },
      {
        id: 'it-1492-h2',
        type: 'heading',
        content: 'Masters of Art and Science',
        metadata: { level: 2 },
      },
      {
        id: 'it-1492-p2',
        type: 'paragraph',
        content:
          'This period saw an unprecedented flowering of painting, sculpture, architecture, literature, and scientific inquiry. Renaissance humanism celebrated human potential and classical learning, laying the groundwork for the modern world.',
      },
    ],
    tags: ['art', 'culture', 'humanism', 'medici'],
    era: 'EarlyModern',
    readingTimeMinutes: 10,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
  },

  // Germany Essays
  {
    id: 'de-1989-berlin-wall',
    countryId: 'germany',
    year: 1989,
    title: 'The Fall of the Berlin Wall',
    subtitle: 'The End of a Divided Germany',
    summary:
      'The Berlin Wall fell, marking the end of the Cold War division of Germany and Europe.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800',
    contentBlocks: [
      {
        id: 'de-1989-h1',
        type: 'heading',
        content: 'A Wall Comes Down',
        metadata: { level: 2 },
      },
      {
        id: 'de-1989-p1',
        type: 'paragraph',
        content:
          'On November 9, 1989, the East German government announced that citizens could freely cross the border. Thousands of East and West Germans gathered at the wall, and began tearing it down with hammers and pickaxes in scenes of jubilation.',
      },
      {
        id: 'de-1989-q1',
        type: 'quote',
        content: 'Mr. Gorbachev, tear down this wall!',
        metadata: { author: 'Ronald Reagan, 1987' },
      },
    ],
    tags: ['cold-war', 'reunification', 'freedom', 'europe'],
    era: 'Contemporary',
    readingTimeMinutes: 8,
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z',
  },
  {
    id: 'de-1517-reformation',
    countryId: 'germany',
    year: 1517,
    title: 'Martin Luther and the Reformation',
    subtitle: 'The 95 Theses That Changed Christianity',
    summary:
      'Martin Luther posted his 95 Theses, sparking the Protestant Reformation.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=800',
    contentBlocks: [
      {
        id: 'de-1517-h1',
        type: 'heading',
        content: 'Challenge to the Church',
        metadata: { level: 2 },
      },
      {
        id: 'de-1517-p1',
        type: 'paragraph',
        content:
          'On October 31, 1517, Martin Luther, a German monk and professor of theology, posted his 95 Theses on the door of the Castle Church in Wittenberg. This act of protest against the sale of indulgences sparked the Protestant Reformation.',
      },
    ],
    tags: ['religion', 'reformation', 'christianity', 'history'],
    era: 'EarlyModern',
    readingTimeMinutes: 7,
    createdAt: '2024-01-26T10:00:00Z',
    updatedAt: '2024-01-26T10:00:00Z',
  },

  // Spain Essays
  {
    id: 'es-1492-columbus',
    countryId: 'spain',
    year: 1492,
    title: 'Columbus Discovers the Americas',
    subtitle: 'A New World Emerges',
    summary:
      'Christopher Columbus, sailing for Spain, reached the Americas, forever changing world history.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
    contentBlocks: [
      {
        id: 'es-1492-h1',
        type: 'heading',
        content: 'The Voyage West',
        metadata: { level: 2 },
      },
      {
        id: 'es-1492-p1',
        type: 'paragraph',
        content:
          'On October 12, 1492, Christopher Columbus and his crew aboard the Niña, Pinta, and Santa María made landfall in the Bahamas. Funded by Queen Isabella and King Ferdinand of Spain, this voyage opened the door to European exploration and colonization of the Americas.',
      },
    ],
    tags: ['exploration', 'discovery', 'colonialism', 'americas'],
    era: 'EarlyModern',
    readingTimeMinutes: 9,
    createdAt: '2024-01-27T10:00:00Z',
    updatedAt: '2024-01-27T10:00:00Z',
  },
  {
    id: 'es-711-moorish',
    countryId: 'spain',
    year: 711,
    title: 'The Moorish Conquest of Spain',
    subtitle: 'Al-Andalus Begins',
    summary:
      'Muslim forces crossed from North Africa and conquered most of the Iberian Peninsula.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    contentBlocks: [
      {
        id: 'es-711-h1',
        type: 'heading',
        content: 'The Umayyad Expansion',
        metadata: { level: 2 },
      },
      {
        id: 'es-711-p1',
        type: 'paragraph',
        content:
          'In 711 CE, Tariq ibn Ziyad led a Berber-Arab army across the Strait of Gibraltar. Within seven years, Muslim forces had conquered most of the Iberian Peninsula, establishing Al-Andalus, a civilization renowned for its advances in science, art, and architecture.',
      },
    ],
    tags: ['conquest', 'islam', 'medieval', 'culture'],
    era: 'Medieval',
    readingTimeMinutes: 8,
    createdAt: '2024-01-27T10:00:00Z',
    updatedAt: '2024-01-27T10:00:00Z',
  },

  // India Essays
  {
    id: 'in-1947-independence',
    countryId: 'india',
    year: 1947,
    title: 'Indian Independence',
    subtitle: 'The Birth of the Worlds Largest Democracy',
    summary:
      'India gained independence from British rule, becoming a sovereign nation.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800',
    contentBlocks: [
      {
        id: 'in-1947-h1',
        type: 'heading',
        content: 'Freedom at Midnight',
        metadata: { level: 2 },
      },
      {
        id: 'in-1947-p1',
        type: 'paragraph',
        content:
          'At the stroke of midnight on August 15, 1947, India became an independent nation, ending nearly 200 years of British colonial rule. Jawaharlal Nehru became the first Prime Minister, delivering his famous "Tryst with Destiny" speech.',
      },
      {
        id: 'in-1947-q1',
        type: 'quote',
        content:
          'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.',
        metadata: { author: 'Jawaharlal Nehru' },
      },
    ],
    tags: ['independence', 'gandhi', 'democracy', 'partition'],
    era: 'Contemporary',
    readingTimeMinutes: 10,
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z',
  },
  {
    id: 'in-1526-mughal',
    countryId: 'india',
    year: 1526,
    title: 'The Mughal Empire Begins',
    subtitle: 'Babur Conquers Delhi',
    summary:
      'Babur established the Mughal Empire, which would rule India for over three centuries.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    contentBlocks: [
      {
        id: 'in-1526-h1',
        type: 'heading',
        content: 'The First Battle of Panipat',
        metadata: { level: 2 },
      },
      {
        id: 'in-1526-p1',
        type: 'paragraph',
        content:
          'In 1526, Babur, a descendant of both Timur and Genghis Khan, defeated Ibrahim Lodi at the Battle of Panipat. This victory established the Mughal Empire, which would create some of Indias most magnificent architecture, including the Taj Mahal.',
      },
    ],
    tags: ['empire', 'mughal', 'conquest', 'architecture'],
    era: 'EarlyModern',
    readingTimeMinutes: 8,
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z',
  },

  // Canada Essays
  {
    id: 'ca-1867-confederation',
    countryId: 'canada',
    year: 1867,
    title: 'Canadian Confederation',
    subtitle: 'Birth of a Nation',
    summary:
      'The British North America Act united the provinces into the Dominion of Canada.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800',
    contentBlocks: [
      {
        id: 'ca-1867-h1',
        type: 'heading',
        content: 'A New Dominion',
        metadata: { level: 2 },
      },
      {
        id: 'ca-1867-p1',
        type: 'paragraph',
        content:
          'On July 1, 1867, the British North America Act came into effect, uniting Ontario, Quebec, Nova Scotia, and New Brunswick into the Dominion of Canada. Sir John A. Macdonald became the first Prime Minister of the new nation.',
      },
    ],
    tags: ['confederation', 'independence', 'british', 'nation'],
    era: 'Modern',
    readingTimeMinutes: 7,
    createdAt: '2024-01-29T10:00:00Z',
    updatedAt: '2024-01-29T10:00:00Z',
  },

  // Mexico Essays
  {
    id: 'mx-1521-aztec-fall',
    countryId: 'mexico',
    year: 1521,
    title: 'Fall of the Aztec Empire',
    subtitle: 'Conquest of Tenochtitlan',
    summary:
      'Spanish conquistador Hernán Cortés conquered the Aztec capital, ending a great civilization.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=800',
    contentBlocks: [
      {
        id: 'mx-1521-h1',
        type: 'heading',
        content: 'The Siege of Tenochtitlan',
        metadata: { level: 2 },
      },
      {
        id: 'mx-1521-p1',
        type: 'paragraph',
        content:
          'In 1521, after a brutal three-month siege, Hernán Cortés and his indigenous allies captured Tenochtitlan, the magnificent Aztec capital built on an island in Lake Texcoco. Emperor Cuauhtémoc was captured, marking the end of the Aztec Empire.',
      },
    ],
    tags: ['conquest', 'aztec', 'colonialism', 'civilization'],
    era: 'EarlyModern',
    readingTimeMinutes: 9,
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z',
  },
  {
    id: 'mx-1810-independence',
    countryId: 'mexico',
    year: 1810,
    title: 'Mexican War of Independence',
    subtitle: 'El Grito de Dolores',
    summary:
      'Father Miguel Hidalgo rang the church bell, calling for Mexican independence from Spain.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1547995886-6dc09384c6e6?w=800',
    contentBlocks: [
      {
        id: 'mx-1810-h1',
        type: 'heading',
        content: 'The Cry of Dolores',
        metadata: { level: 2 },
      },
      {
        id: 'mx-1810-p1',
        type: 'paragraph',
        content:
          'On September 16, 1810, Father Miguel Hidalgo y Costilla rang the church bell in the town of Dolores and delivered his famous "Grito de Dolores," calling for the end of Spanish rule. This marked the beginning of Mexicos eleven-year struggle for independence.',
      },
    ],
    tags: ['independence', 'revolution', 'hidalgo', 'freedom'],
    era: 'Modern',
    readingTimeMinutes: 8,
    createdAt: '2024-01-30T10:00:00Z',
    updatedAt: '2024-01-30T10:00:00Z',
  },

  // Brazil Essays
  {
    id: 'br-1822-independence',
    countryId: 'brazil',
    year: 1822,
    title: 'Brazilian Independence',
    subtitle: 'The Cry of Ipiranga',
    summary:
      'Prince Pedro declared Brazils independence from Portugal, becoming Emperor Pedro I.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800',
    contentBlocks: [
      {
        id: 'br-1822-h1',
        type: 'heading',
        content: 'Independence or Death',
        metadata: { level: 2 },
      },
      {
        id: 'br-1822-p1',
        type: 'paragraph',
        content:
          'On September 7, 1822, Prince Pedro of Portugal, standing by the Ipiranga River, declared Brazils independence with the famous cry "Independência ou Morte!" He was crowned Emperor Pedro I, making Brazil unique as the only American nation to become an independent empire.',
      },
    ],
    tags: ['independence', 'empire', 'portugal', 'monarchy'],
    era: 'Modern',
    readingTimeMinutes: 7,
    createdAt: '2024-01-31T10:00:00Z',
    updatedAt: '2024-01-31T10:00:00Z',
  },

  // Argentina Essays
  {
    id: 'ar-1816-independence',
    countryId: 'argentina',
    year: 1816,
    title: 'Argentine Declaration of Independence',
    subtitle: 'Birth of a South American Nation',
    summary:
      'The Congress of Tucumán declared Argentinas independence from Spanish rule.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800',
    contentBlocks: [
      {
        id: 'ar-1816-h1',
        type: 'heading',
        content: 'The Congress of Tucumán',
        metadata: { level: 2 },
      },
      {
        id: 'ar-1816-p1',
        type: 'paragraph',
        content:
          'On July 9, 1816, the Congress of Tucumán formally declared independence from Spain. This came after years of revolutionary struggle led by figures like José de San Martín, who would go on to liberate Chile and Peru as well.',
      },
    ],
    tags: ['independence', 'revolution', 'san-martin', 'freedom'],
    era: 'Modern',
    readingTimeMinutes: 7,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  },

  // Peru Essays
  {
    id: 'pe-1438-inca-empire',
    countryId: 'peru',
    year: 1438,
    title: 'Rise of the Inca Empire',
    subtitle: 'Pachacuti Transforms Cusco',
    summary:
      'Pachacuti expanded the Kingdom of Cusco into the vast Inca Empire.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    contentBlocks: [
      {
        id: 'pe-1438-h1',
        type: 'heading',
        content: 'The Earth Shaker',
        metadata: { level: 2 },
      },
      {
        id: 'pe-1438-p1',
        type: 'paragraph',
        content:
          'In 1438, Pachacuti ("Earth Shaker") became the ninth Sapa Inca and transformed the small Kingdom of Cusco into Tawantinsuyu, the Inca Empire. He rebuilt Cusco and commissioned Machu Picchu, creating one of the largest empires in pre-Columbian America.',
      },
    ],
    tags: ['inca', 'empire', 'machu-picchu', 'ancient'],
    era: 'Medieval',
    readingTimeMinutes: 8,
    createdAt: '2024-02-02T10:00:00Z',
    updatedAt: '2024-02-02T10:00:00Z',
  },

  // Australia Essays
  {
    id: 'au-1901-federation',
    countryId: 'australia',
    year: 1901,
    title: 'Australian Federation',
    subtitle: 'Six Colonies Become One Nation',
    summary:
      'The six Australian colonies federated to form the Commonwealth of Australia.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800',
    contentBlocks: [
      {
        id: 'au-1901-h1',
        type: 'heading',
        content: 'Birth of a Commonwealth',
        metadata: { level: 2 },
      },
      {
        id: 'au-1901-p1',
        type: 'paragraph',
        content:
          'On January 1, 1901, the six Australian colonies—New South Wales, Victoria, Queensland, South Australia, Western Australia, and Tasmania—federated to become the Commonwealth of Australia. Edmund Barton became the first Prime Minister.',
      },
    ],
    tags: ['federation', 'independence', 'democracy', 'commonwealth'],
    era: 'Modern',
    readingTimeMinutes: 7,
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z',
  },
  {
    id: 'au-50000-indigenous',
    countryId: 'australia',
    year: -50000,
    title: 'First Peoples of Australia',
    subtitle: 'The Worlds Oldest Continuous Culture',
    summary:
      'Aboriginal Australians arrived on the continent, establishing the worlds oldest continuous culture.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?w=800',
    contentBlocks: [
      {
        id: 'au-50000-h1',
        type: 'heading',
        content: 'Ancient Arrival',
        metadata: { level: 2 },
      },
      {
        id: 'au-50000-p1',
        type: 'paragraph',
        content:
          'Archaeological evidence suggests that Aboriginal Australians arrived on the continent at least 50,000 years ago, during a period when lower sea levels connected Australia to New Guinea. They developed rich cultural traditions, sophisticated land management practices, and the worlds oldest continuous artistic traditions.',
      },
    ],
    tags: ['indigenous', 'ancient', 'culture', 'first-nations'],
    era: 'Ancient',
    readingTimeMinutes: 8,
    createdAt: '2024-02-03T10:00:00Z',
    updatedAt: '2024-02-03T10:00:00Z',
  },

  // Turkey Essays
  {
    id: 'tr-1453-constantinople',
    countryId: 'turkey',
    year: 1453,
    title: 'Fall of Constantinople',
    subtitle: 'End of the Byzantine Empire',
    summary:
      'Ottoman Sultan Mehmed II conquered Constantinople, ending the Byzantine Empire.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
    contentBlocks: [
      {
        id: 'tr-1453-h1',
        type: 'heading',
        content: 'The Siege',
        metadata: { level: 2 },
      },
      {
        id: 'tr-1453-p1',
        type: 'paragraph',
        content:
          'On May 29, 1453, after a 53-day siege, Ottoman Sultan Mehmed II conquered Constantinople, ending the 1,100-year Byzantine Empire. The city was renamed Istanbul and became the capital of the Ottoman Empire, which would dominate the region for centuries.',
      },
    ],
    tags: ['ottoman', 'byzantine', 'conquest', 'empire'],
    era: 'Medieval',
    readingTimeMinutes: 9,
    createdAt: '2024-02-04T10:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z',
  },
  {
    id: 'tr-1923-republic',
    countryId: 'turkey',
    year: 1923,
    title: 'Birth of the Turkish Republic',
    subtitle: 'Atatürk Creates Modern Turkey',
    summary:
      'Mustafa Kemal Atatürk proclaimed the Republic of Turkey, transforming the former Ottoman lands.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    contentBlocks: [
      {
        id: 'tr-1923-h1',
        type: 'heading',
        content: 'Father of the Turks',
        metadata: { level: 2 },
      },
      {
        id: 'tr-1923-p1',
        type: 'paragraph',
        content:
          'On October 29, 1923, Mustafa Kemal proclaimed the Republic of Turkey from the ruins of the Ottoman Empire. As its first president, Atatürk implemented sweeping reforms: adopting Western law codes, replacing Arabic script with Latin, and granting women the right to vote.',
      },
    ],
    tags: ['republic', 'ataturk', 'modernization', 'reform'],
    era: 'Modern',
    readingTimeMinutes: 8,
    createdAt: '2024-02-04T10:00:00Z',
    updatedAt: '2024-02-04T10:00:00Z',
  },

  // South Africa Essays
  {
    id: 'za-1994-apartheid-end',
    countryId: 'south-africa',
    year: 1994,
    title: 'End of Apartheid',
    subtitle: 'Nelson Mandela Becomes President',
    summary:
      'South Africa held its first democratic elections, ending apartheid and electing Nelson Mandela.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800',
    contentBlocks: [
      {
        id: 'za-1994-h1',
        type: 'heading',
        content: 'A New Dawn',
        metadata: { level: 2 },
      },
      {
        id: 'za-1994-p1',
        type: 'paragraph',
        content:
          'On April 27, 1994, South Africa held its first fully democratic elections, with citizens of all races voting together. Nelson Mandela, who had spent 27 years in prison for his anti-apartheid activism, was elected president, marking the peaceful end of the apartheid system.',
      },
      {
        id: 'za-1994-q1',
        type: 'quote',
        content:
          'For to be free is not merely to cast off ones chains, but to live in a way that respects and enhances the freedom of others.',
        metadata: { author: 'Nelson Mandela' },
      },
    ],
    tags: ['apartheid', 'mandela', 'democracy', 'freedom'],
    era: 'Contemporary',
    readingTimeMinutes: 9,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-02-05T10:00:00Z',
  },

  // Nigeria Essays
  {
    id: 'ng-1960-independence',
    countryId: 'nigeria',
    year: 1960,
    title: 'Nigerian Independence',
    subtitle: 'Giant of Africa Emerges',
    summary:
      'Nigeria gained independence from Britain, becoming Africas most populous nation.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=800',
    contentBlocks: [
      {
        id: 'ng-1960-h1',
        type: 'heading',
        content: 'A New Nation',
        metadata: { level: 2 },
      },
      {
        id: 'ng-1960-p1',
        type: 'paragraph',
        content:
          'On October 1, 1960, Nigeria gained independence from Britain after decades of colonial rule. Nnamdi Azikiwe became the first president of Africas most populous nation, which would become known as the "Giant of Africa" due to its large population and oil wealth.',
      },
    ],
    tags: ['independence', 'africa', 'colonialism', 'democracy'],
    era: 'Contemporary',
    readingTimeMinutes: 7,
    createdAt: '2024-02-06T10:00:00Z',
    updatedAt: '2024-02-06T10:00:00Z',
  },
  {
    id: 'ng-1100-benin-kingdom',
    countryId: 'nigeria',
    year: 1100,
    title: 'The Kingdom of Benin',
    subtitle: 'A Great African Civilization',
    summary:
      'The Kingdom of Benin flourished in West Africa, renowned for its bronze sculptures and sophisticated government.',
    coverImageUrl:
      'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800',
    contentBlocks: [
      {
        id: 'ng-1100-h1',
        type: 'heading',
        content: 'The Benin Empire',
        metadata: { level: 2 },
      },
      {
        id: 'ng-1100-p1',
        type: 'paragraph',
        content:
          'The Kingdom of Benin, in present-day southern Nigeria, emerged around 1100 CE and became one of Africas most sophisticated civilizations. Its artisans created the famous Benin Bronzes, and its capital featured wide streets and a palace complex that amazed European visitors.',
      },
    ],
    tags: ['benin', 'bronze', 'africa', 'civilization'],
    era: 'Medieval',
    readingTimeMinutes: 8,
    createdAt: '2024-02-06T10:00:00Z',
    updatedAt: '2024-02-06T10:00:00Z',
  },
];

// Helper function to get essays by country
export function getEssaysByCountry(countryId: string): Essay[] {
  return mockEssays.filter((essay) => essay.countryId === countryId);
}

// Helper function to get essays by year
export function getEssaysByYear(countryId: string, year: number): Essay[] {
  return mockEssays.filter(
    (essay) => essay.countryId === countryId && essay.year === year,
  );
}

// Helper function to get a single essay
export function getEssayById(essayId: string): Essay | undefined {
  return mockEssays.find((essay) => essay.id === essayId);
}

// Helper function to get unique years for a country
export function getYearsForCountry(countryId: string): number[] {
  const years = mockEssays
    .filter((essay) => essay.countryId === countryId)
    .map((essay) => essay.year);
  return [...new Set(years)].sort((a, b) => a - b);
}
