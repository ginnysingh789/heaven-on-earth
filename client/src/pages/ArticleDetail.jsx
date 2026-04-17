import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { DetailPageSkeleton } from '../components/Skeleton';

const fallbackArticles = {
  'khatamband-wooden-ceiling': {
    title: "The Lost Art of Khatamband — Kashmir's Wooden Ceiling Craft",
    category: 'heritage', coverImage: '/heritage/craftman-1.jpg', readTime: 8, likes: 24, views: 312,
    author: { name: 'Kashmir Offbeat' }, tags: ['Heritage', 'Woodwork', 'Crafts'],
    content: `Khatamband is one of Kashmir's most exquisite and endangered art forms — a centuries-old woodworking technique where intricate geometric patterns are assembled entirely without nails or adhesives.

Walk into any heritage home in downtown Srinagar, glance upward, and you'll find ceilings that tell stories. Hundreds of tiny wooden pieces — walnut, deodar, and pine — are cut, shaped, and interlocked into mesmerizing patterns that rival the finest Islamic geometry.

The craft dates back to the 14th century, when Persian and Central Asian influences merged with local Kashmiri woodworking traditions. Master craftsmen, known as "Khatamband Saaz," would spend months creating a single ceiling panel, each piece fitting together like an elaborate jigsaw puzzle.

Today, fewer than a dozen master Khatamband artisans remain in the valley. The craft faces extinction as younger generations pursue other livelihoods. Yet in the houseboats of Dal Lake, the shrines of the old city, and a handful of restoration projects, Khatamband continues to whisper its geometric poetry to those who look up.

The patterns are not merely decorative — they carry symbolic meaning. Star patterns represent divine light, hexagons symbolize harmony, and the endless interlocking pieces reflect the Sufi concept of unity in diversity. Each ceiling is both a mathematical marvel and a spiritual statement.`,
  },
  'sufi-shrines-valley': {
    title: "Sufi Shrines of the Valley: A Spiritual Map",
    category: 'heritage', coverImage: '/heritage/walk-2.jpg', readTime: 12, likes: 41, views: 578,
    author: { name: 'Kashmir Offbeat' }, tags: ['Sufism', 'Spirituality', 'Heritage'],
    content: `Kashmir's spiritual landscape is dotted with hundreds of Sufi shrines, each carrying centuries of devotion, music, and a unique syncretic culture that defines the valley's soul.

The story of Sufism in Kashmir begins in the 14th century with Mir Sayyid Ali Hamadani, a Persian scholar who arrived in the valley with 700 followers. His shrine at Khanqah-e-Moula in Srinagar remains one of the most revered sites in Kashmir, its wooden architecture reflecting the seamless blend of Persian and Kashmiri aesthetics.

Hazratbal, perched on the western shore of Dal Lake, houses what is believed to be a relic of Prophet Muhammad. Every Friday, thousands gather here — the white marble mosque reflected in the still waters of the lake creates one of Kashmir's most iconic images.

Charar-i-Sharif, in Budgam district, is the shrine of Sheikh Noor-ud-Din Noorani (Nund Rishi), Kashmir's patron saint. His teachings of compassion, vegetarianism, and harmony with nature resonate deeply with Kashmiri identity. The shrine, rebuilt after a devastating fire in 1995, stands as a symbol of resilience.

What makes Kashmir's Sufi tradition unique is its deeply local character. Kashmiri Sufism absorbed elements of the region's Buddhist and Hindu past, creating a spiritual tradition that transcends religious boundaries. The shrines are visited by people of all faiths — a living testament to Kashmir's syncretic heritage.`,
  },
  'pashmina-changthang': {
    title: "Pashmina: From Changthang Plateau to the World",
    category: 'heritage', coverImage: '/heritage/craftman-3.jpg', readTime: 10, likes: 36, views: 445,
    author: { name: 'Kashmir Offbeat' }, tags: ['Pashmina', 'Textiles', 'Artisans'],
    content: `The journey of a Pashmina shawl begins at 14,000 feet on the Changthang Plateau of Ladakh, where the Changthangi goat produces the finest cashmere fiber in the world.

Every spring, nomadic Changpa herders gently comb the undercoat of their goats — each animal yields only about 80-170 grams of raw pashm per year. This precious fiber, measuring just 12-16 microns in diameter (six times finer than human hair), is what gives Pashmina its legendary softness and warmth.

The raw fiber travels hundreds of kilometers to the workshops of Srinagar, where it undergoes a transformation that can take months. First, it is cleaned and sorted by hand — a task traditionally done by women. Then comes spinning, also done by hand on a traditional wheel called a "yinder." A single shawl requires the spinning of thread so fine it could pass through a ring.

The weaving itself is an act of meditation. Master weavers work on handlooms, creating fabric so lightweight that an entire shawl can pass through a finger ring — the origin of the term "ring shawl." The most prized Pashminas are Kani shawls, where the pattern is woven directly into the fabric using small wooden bobbins called "kanis." A single Kani shawl can take two to three years to complete.

Despite its UNESCO recognition and global fame, the Pashmina industry faces serious challenges. Machine-made imitations flood the market, and fewer young artisans are learning the craft. But in the backstreets of Srinagar's old city, the click of handlooms continues — each shawl a testament to human patience and artistic devotion.`,
  },
  'zain-ul-abidin-golden-age': {
    title: "The Reign of Zain-ul-Abidin: Kashmir's Golden Age",
    category: 'history', coverImage: '/heritage/monument-2.jpg', readTime: 15, likes: 29, views: 387,
    author: { name: 'Kashmir Offbeat' }, tags: ['History', 'Medieval Kashmir', 'Budshah'],
    content: `Sultan Zain-ul-Abidin, lovingly known as "Budshah" (the Great King), ruled Kashmir from 1420 to 1470 CE. His fifty-year reign is universally regarded as the golden age of Kashmiri civilization.

Budshah ascended to the throne at a time when Kashmir was recovering from the intolerant reign of Sultan Sikandar. His first act was one of reconciliation — he invited back the Hindu pandits who had fled persecution, restored their temples, and abolished the jizya tax. This act of religious tolerance, centuries ahead of its time, earned him the eternal gratitude of all Kashmiri communities.

Under Budshah, Kashmir became a thriving center of arts, literature, and scholarship. He invited craftsmen from Samarkand and Persia, who brought with them the arts of papier-mâché, carpet weaving, and shawl making — crafts that define Kashmiri identity to this day. He also commissioned the translation of the Mahabharata and Rajatarangini into Persian, bridging Kashmir's Hindu past with its Islamic present.

His engineering achievements were equally remarkable. He built canals, bridges, and an artificial island in Wular Lake (Zaina Lanka) that still bears his name. He established a postal system, hospitals, and a network of rest houses for travelers — infrastructure that was remarkably modern for the 15th century.

Perhaps Budshah's greatest legacy is the idea of "Kashmiriyat" — a composite culture of tolerance and co-existence. Five centuries after his death, Kashmiris of all faiths still invoke his name as a symbol of what their civilization can be at its finest.`,
  },
  'martand-sun-temple': {
    title: "Martand Sun Temple: A Monument Across Time",
    category: 'history', coverImage: '/heritage/monument-4.jpg', readTime: 9, likes: 33, views: 456,
    author: { name: 'Kashmir Offbeat' }, tags: ['Archaeology', 'Temples', 'Ancient Kashmir'],
    content: `Perched on a plateau above the village of Mattan in Anantnag, the ruins of the Martand Sun Temple are one of the most awe-inspiring sights in Kashmir — and one of India's greatest archaeological treasures.

Built in the 8th century by King Lalitaditya Muktapida of the Karkota dynasty, the temple was dedicated to Surya, the sun god. At its peak, it was the largest temple complex in Kashmir, with a central shrine surrounded by 84 smaller shrines in a colonnaded courtyard measuring 220 by 142 feet.

The architecture is a stunning fusion of Gandhara, Gupta, and Greek-Roman styles — reflecting Kashmir's position at the crossroads of civilizations. The columns bear a striking resemblance to Greek temple architecture, while the trefoil arches are uniquely Kashmiri. The precise orientation of the temple ensures that sunlight floods the inner sanctum at specific times of day — a feat of astronomical engineering.

Lalitaditya was Kashmir's most expansionist ruler, with an empire stretching from Bengal to Central Asia. The Martand temple was his crowning architectural achievement — a statement of power, devotion, and artistic ambition.

The temple was partially destroyed during the reign of Sultan Sikandar in the early 15th century, but even in ruins, it retains a haunting magnificence. Standing among the fallen columns at sunset, with the Pir Panjal range glowing in the distance, you feel the weight of three thousand years of Kashmiri history beneath your feet.`,
  },
  'silk-route-kashmir': {
    title: "The Silk Route Through Kashmir",
    category: 'history', coverImage: '/heritage/monument-5.jpg', readTime: 11, likes: 22, views: 298,
    author: { name: 'Kashmir Offbeat' }, tags: ['Silk Route', 'Trade', 'Ancient History'],
    content: `For over a millennium, Kashmir sat at one of the most strategic crossroads on the ancient Silk Route — the network of trade paths that connected China to the Mediterranean.

The route through Kashmir followed the Jhelum Valley, crossing the Pir Panjal range via the Banihal Pass, then descending into the Kashmir Valley before ascending again through the Zoji La pass toward Central Asia. Merchants carried silk, spices, precious stones, and ideas across these treacherous mountain passes, transforming Kashmir into a cosmopolitan hub of commerce and culture.

Buddhist monks from Gandhara and China traveled through Kashmir, establishing monasteries and translating scriptures. The famous Chinese pilgrim Xuanzang visited Kashmir in the 7th century and described it as a center of Buddhist learning with over 5,000 monks in residence. The great scholar Kumarajiva, who translated Buddhist texts into Chinese, was of Kashmiri descent.

The Silk Route also brought Islam to Kashmir. In the 14th century, Sufi missionaries from Persia and Central Asia traveled through these same passes, carrying a mystical form of Islam that would define Kashmiri spirituality for centuries.

Today, remnants of the Silk Route can still be found — in the old caravanserais along the Jhelum, in the Buddhist ruins of Harwan, and in the DNA of Kashmir's people, which carries traces of Greek, Persian, Tibetan, and Central Asian ancestry. The Silk Route may be history, but its legacy lives on in every thread of Kashmiri culture.`,
  },
  'lal-ded-kashmiri-consciousness': {
    title: "Lal Ded: The Voice That Shaped Kashmiri Consciousness",
    category: 'literature', coverImage: '/heritage/walk-3.jpg', readTime: 14, likes: 52, views: 634,
    author: { name: 'Kashmir Offbeat' }, tags: ['Literature', 'Poetry', 'Mysticism'],
    content: `Lalleshwari — known as Lal Ded, Lalla, or Lal Arifa — is the most important literary figure in Kashmiri history. A 14th-century mystic poet, her verses (vakhs) form the foundation of Kashmiri literary consciousness.

Born around 1320 CE into a Brahmin family, Lal Ded was married young and, by all accounts, suffered greatly in her marital home. She left her household at the age of 26 to become a wandering ascetic, composing vakhs that blended Shaivite philosophy with a radical, personal spirituality.

Her poetry was revolutionary in multiple ways. She composed in Kashmiri, not Sanskrit — making her one of the first poets to elevate the spoken language of Kashmir to literary status. Her themes were universal: the search for the divine within oneself, the rejection of empty ritual, and the equality of all human beings.

"I, Lalla, searched and searched for myself / With strength I crossed the mighty river / I found the secret and separated the wheat from the chaff / And it was in myself all along."

What makes Lal Ded unique is that she is claimed by both Hindus and Muslims in Kashmir. Hindus see her as a Shaivite saint; Muslims revere her as Lal Arifa, a Sufi mystic. This dual identity reflects Kashmir's syncretic tradition — and it begins with her. She is, in many ways, the embodiment of Kashmiriyat.

Seven centuries after her death, Lal Ded's vakhs are still quoted in Kashmiri homes. Her voice — fierce, tender, searching — remains the deepest expression of what it means to be Kashmiri.`,
  },
  'agha-shahid-ali': {
    title: "Agha Shahid Ali and the Country Without a Post Office",
    category: 'literature', coverImage: '/heritage/art-2.jpg', readTime: 10, likes: 47, views: 589,
    author: { name: 'Kashmir Offbeat' }, tags: ['Poetry', 'Diaspora', 'Modern Literature'],
    content: `Agha Shahid Ali (1949–2001) was the poet who brought Kashmir's beauty and pain to the English-speaking world. Born in New Delhi and raised in Srinagar, he spent most of his adult life in the United States, but Kashmir never left his poetry.

His masterwork, "The Country Without a Post Office" (1997), is a collection of ghazals and elegies that mourns the violence in Kashmir while celebrating its timeless beauty. The title poem imagines a Kashmir where communication has broken down — where letters can no longer be sent, where the living cannot reach the dead.

"They make a desolation and call it peace / When you leave, even the water leaves."

Shahid (his pen name, meaning "witness" in Arabic) was a master of form. He championed the ghazal in English, insisting on its traditional rules of couplets, refrain, and signature — bringing a rigorous Eastern form into the heart of American poetry. His ghazals are technically brilliant and emotionally devastating.

Beyond Kashmir, Shahid wrote about exile, memory, and the impossibility of return — themes that resonate with displaced people everywhere. His poem "Postcard from Kashmir" contains one of the most quoted lines in diasporic literature: "Kashmir shrinks into my mailbox, my home a four-by-six-inch Himalaya."

He died of brain cancer in 2001, at the age of 52. But his poetry endures as the most powerful literary bridge between Kashmir and the world — a testament to what art can do in the face of loss.`,
  },
  'kashmiri-short-story': {
    title: "The Kashmiri Short Story Tradition",
    category: 'literature', coverImage: '/heritage/art-3.jpg', readTime: 8, likes: 18, views: 234,
    author: { name: 'Kashmir Offbeat' }, tags: ['Literature', 'Short Fiction', 'Kashmiri Language'],
    content: `Kashmir's short story tradition is one of the richest in South Asian literature — intimate, unflinching, and deeply rooted in the rhythms of valley life.

The modern Kashmiri short story begins with Akhtar Mohiuddin (1928–2001), often called the "Manto of Kashmir." Like his Urdu counterpart, Mohiuddin wrote about the downtrodden with devastating clarity. His stories — set in the cramped lanes of downtown Srinagar, among boatmen, weavers, and the urban poor — revealed a Kashmir far removed from tourist brochures.

His contemporary Hriday Kaul Bharati brought a different sensibility — lyrical, philosophical, and deeply connected to Kashmir's Hindu traditions. His stories explored the inner lives of Kashmiri Pandits with a psychological depth that was ahead of its time.

The political turmoil of the 1990s transformed Kashmiri fiction. Writers like Siddiq Wahid, Basharat Peer, and Mirza Waheed began writing in English, bringing Kashmir's stories to a global audience. Peer's memoir "Curfewed Night" and Waheed's novel "The Collaborator" became defining works of conflict literature.

Today, a new generation writes across languages — Kashmiri, Urdu, Hindi, and English — exploring themes of memory, displacement, and identity. The Kashmiri short story remains what it has always been: a window into the soul of the valley, told one intimate narrative at a time.`,
  },
  'habba-khatoon-nightingale': {
    title: "Habba Khatoon: The Nightingale of Kashmir",
    category: 'poetry', coverImage: '/heritage/walk-4.jpg', readTime: 7, likes: 38, views: 412,
    author: { name: 'Kashmir Offbeat' }, tags: ['Poetry', 'Folk Music', 'Women Poets'],
    content: `Habba Khatoon, the "Nightingale of Kashmir," is the valley's most beloved folk poet. Her songs of love, longing, and loss — composed in the 16th century — are still sung in Kashmiri homes today.

Born Zoon in a peasant family in the village of Chandahar, she was married young to a man she did not love. Her beauty and her voice, however, caught the attention of Yusuf Shah Chak, the last independent king of Kashmir. He married her and gave her the name Habba Khatoon.

Their love story is the stuff of legend — but it ended in tragedy. When the Mughal emperor Akbar invaded Kashmir in 1586, Yusuf Shah was captured and exiled to Bihar, where he died in captivity. Habba Khatoon spent the rest of her life wandering the hills around her village, singing songs of separation that became the foundation of Kashmiri folk music.

Her songs are raw and deeply personal — a woman singing openly about desire, abandonment, and grief in a conservative society. "I am restless, anxious, waiting / Why has my love not returned?" This directness was revolutionary for its time and gives her poetry an immediacy that transcends centuries.

In Gurez Valley, a mountain peak is named after her — Habba Khatoon Peak. On clear evenings, locals say you can still hear her voice carried on the wind, singing for a king who never came home.`,
  },
  'mahjoor-wordsworth-kashmir': {
    title: "Mahjoor: The Wordsworth of Kashmir",
    category: 'poetry', coverImage: '/heritage/art-4.jpg', readTime: 9, likes: 27, views: 345,
    author: { name: 'Kashmir Offbeat' }, tags: ['Poetry', 'Nature', 'Kashmiri Literature'],
    content: `Peerzada Ghulam Ahmad Mahjoor (1885–1952) is Kashmir's national poet — the writer who gave the valley its voice in the modern age.

Called the "Wordsworth of Kashmir" for his deep communion with nature, Mahjoor transformed Kashmiri poetry from a court tradition into a people's art. He wrote about saffron fields, chinar trees, spring blossoms, and the changing seasons with a lyricism that captured the essence of Kashmiri life.

His most famous poem, "Walo Ho Baagwano, Nowbahar Aay" (Come, O gardeners, spring has arrived!), is considered Kashmir's unofficial anthem. Written as a call for cultural renewal, it uses the metaphor of spring to urge Kashmiris toward education, unity, and progress. The poem is taught in schools and sung at gatherings across the valley.

Mahjoor's genius lay in his ability to be both deeply traditional and radically modern. He drew on classical Persian and Kashmiri poetic forms while addressing contemporary concerns — women's education, social reform, and national identity. He was among the first to write patriotic poetry in Kashmiri, giving the language a dignity it had been denied under Persian-speaking courts.

He died in relative poverty in 1952, but Kashmir has never forgotten him. His home in Mitrigam has been converted into a memorial, and every year on his death anniversary, poets and admirers gather to recite his verses — a tradition that speaks to the enduring power of his words.`,
  },
  'contemporary-kashmiri-poetry': {
    title: "Contemporary Kashmiri Poetry: New Voices",
    category: 'poetry', coverImage: '/heritage/art-5.jpg', readTime: 6, likes: 15, views: 198,
    author: { name: 'Kashmir Offbeat' }, tags: ['Poetry', 'Modern', 'New Writers'],
    content: `A new generation of Kashmiri poets is writing across languages and borders — exploring identity, conflict, belonging, and beauty through verse that bridges tradition and modernity.

In Kashmiri language poetry, writers like Naseem Shafaie and Nighat Sahiba have pushed the boundaries of form and content. Shafaie's verse grapples with the violence of the 1990s while reaching for moments of tenderness and hope. Sahiba writes from a distinctly feminine perspective, challenging the male-dominated literary establishment.

In English, poets like Rumuz and Uzma Falak weave together personal memory and political reality. Their work appears in international journals and anthologies, bringing Kashmiri perspectives to a global readership. Social media has become a crucial platform — Instagram poets writing in Kashmiri, Urdu, and English reach audiences their predecessors could never have imagined.

What unites these diverse voices is a refusal to let Kashmir be defined by a single narrative. Their poetry insists on complexity — a Kashmir that is simultaneously beautiful and wounded, ancient and modern, rooted and displaced.

The tradition that began with Lal Ded and Habba Khatoon continues to evolve. In coffee shops in Srinagar, in university workshops in Delhi, and in diaspora readings from Brooklyn to Berlin, Kashmiri poetry is alive, urgent, and more diverse than ever.`,
  },
  'gurez-valley-week': {
    title: "A Week in the Gurez Valley: Beyond the Line of Control",
    category: 'travel-stories', coverImage: '/nature/eco-trail.jpg', readTime: 12, likes: 44, views: 523,
    author: { name: 'Kashmir Offbeat' }, tags: ['Travel', 'Gurez', 'Off the Beaten Path'],
    content: `Gurez Valley is Kashmir's best-kept secret — a high-altitude paradise where the Kishanganga River carves through mountains, Dard Shin villages cling to hillsides, and the shadow of the Line of Control adds an edge of forbidden beauty.

The journey itself is an adventure. From Srinagar, you drive north through Bandipora, climbing past Wular Lake and through the Razdan Pass at 11,672 feet. In winter, this pass is buried under snow, cutting Gurez off from the world for six months. But in summer, you emerge into a valley so green, so untouched, it feels like stepping into a painting.

Dawar, the valley's main town, is a cluster of wooden houses along the river. The Dard Shin people — believed to be descendants of Alexander's army — have their own language, architecture, and customs. Their homes, with elaborately carved wooden facades, are unlike anything else in Kashmir.

The highlight of any Gurez trip is the view of Habba Khatoon Peak — a perfectly symmetrical mountain named after Kashmir's legendary poetess. At sunset, when the peak turns gold and then pink, you understand why locals believe the mountain is enchanted.

There are no luxury hotels here, no tourist infrastructure. You stay in homestays, eat rogan josh cooked over a wood fire, and fall asleep to the sound of the Kishanganga. It's the Kashmir that existed before tourism — raw, generous, and achingly beautiful.`,
  },
  'srinagar-old-city-dawn': {
    title: "Walking Through Srinagar's Old City at Dawn",
    category: 'travel-stories', coverImage: '/heritage/downtown-1.jpg', readTime: 8, likes: 31, views: 398,
    author: { name: 'Kashmir Offbeat' }, tags: ['Travel', 'Srinagar', 'Culture'],
    content: `The best time to see the real Srinagar is at dawn — before the tourists wake, before the traffic begins, when the old city belongs to its people.

Start at the Jhelum embankment near Habba Kadal, the oldest bridge in the city. At 5:30 AM, the river is mirror-still, reflecting the crooked wooden houses that lean over its banks. A lone shikara glides past, loaded with vegetables for the floating market.

Turn into the narrow lanes of Nawakadal. Here, the architecture tells three hundred years of stories — houses with notch-window facades, carved walnut doors, and brick walls smoothed by centuries of hands. Bakers are already at work, pulling out fresh tsot (Kashmiri bread) and lavasa from tandoor ovens that have been burning since before dawn.

The smell of noon chai — pink salt tea with cream — drifts from open doorways. Old men sit on stoops, wrapped in pherans, exchanging morning greetings in rapid Kashmiri. A copper craftsman hammers a samovar into shape, the ring of metal echoing through the lane.

At Khanqah-e-Moula, the 14th-century mosque built by Sultan Sikandar, the morning prayer has just ended. Pigeons wheel above the courtyard. The wooden pillars, carved in a style that blends Persian and Kashmiri aesthetics, glow in the early light.

This is the Srinagar that doesn't make it into travel brochures — older, quieter, and infinitely more beautiful than any garden or boulevard. It's a city that reveals itself only to those who rise with the sun.`,
  },
  'frozen-lake-marsar': {
    title: "The Frozen Lake Trek to Marsar",
    category: 'travel-stories', coverImage: '/nature/1-6.jpg', readTime: 10, likes: 26, views: 312,
    author: { name: 'Kashmir Offbeat' }, tags: ['Trekking', 'Winter', 'Adventure'],
    content: `In the heart of the Lidder Valley, at an altitude of 13,450 feet, lies Marsar Lake — a glacial lake that freezes solid in winter, creating one of Kashmir's most surreal landscapes.

The trek begins from Aru, a village that in summer is a busy tourist stop but in winter becomes a snow-bound hamlet of a few dozen families. From here, you climb through pine forests buried in four feet of snow. The silence is absolute — no birds, no wind, just the crunch of your boots and the occasional crack of a frozen branch.

After six hours of climbing, you crest a ridge and see it: Marsar, a sheet of blue-white ice ringed by peaks. The frozen surface is so clear in places that you can see the rocky bottom beneath. In others, the ice has cracked into geometric patterns that look like abstract art.

Camping on the frozen lake is an experience beyond description. At night, the temperature drops to minus twenty. The stars are so bright and so numerous they cast shadows on the snow. Sometimes, the ice shifts beneath your tent with a deep, resonant groan — the lake breathing in its sleep.

Morning brings a sunrise that paints the surrounding peaks in shades of pink and gold. You brew chai on a portable stove, hands wrapped around the cup for warmth, watching the light creep across the frozen surface. In that moment, the cold, the effort, and the six-hour descent ahead don't matter. You've found something that few people ever see — Kashmir in its purest, most elemental form.`,
  },
  'kashmir-beneath-snow': {
    title: "Kashmir: The Story Beneath the Snow",
    category: 'documentaries', coverImage: '/nature/3-6.jpg', readTime: 45, likes: 53, views: 721,
    author: { name: 'Kashmir Offbeat' }, tags: ['Documentary', 'Winter', 'Culture'],
    content: `When the first snow falls on Kashmir in late November, the valley transforms. Tourist brochures show white-capped mountains and frozen lakes, but beneath the snow lies a different story — one of resilience, warmth, and centuries-old winter traditions.

This documentary follows three families through a Kashmiri winter. In Srinagar's old city, a baker fires up his tandoor at 4 AM, the only source of warmth in a neighborhood where temperatures have dropped to minus eight. His tsot and lavasa feed a hundred families. In a houseboat on a frozen Dal Lake, a family of weavers continues their work by the light of a single bulb, their fingers moving over the loom despite the cold.

The kangri — a portable clay firepot carried under the pheran (Kashmiri overcoat) — is the valley's most ingenious invention. Filled with burning charcoal, it provides body heat through the coldest months. The documentary captures the morning ritual of filling the kangri, the way it's passed between family members, and the burns that Kashmiris wear on their skin like badges of survival.

Dal Lake in winter is a world unto itself. The water freezes in patches, creating a landscape of ice floes and open channels. Fishermen in small boats navigate between the ice, casting nets in water so cold it would kill in minutes. Their catch — tiny, silver fish called "farr" — is a winter delicacy.

The film culminates with "Chillai Kalan" — the forty coldest days of the Kashmiri calendar, when the valley is at its most beautiful and most brutal. Through it all, the people of Kashmir endure with a grace that is both humbling and inspiring.`,
  },
  'weavers-of-light-pashmina': {
    title: "Weavers of Light: The Pashmina Story",
    category: 'documentaries', coverImage: '/heritage/craftman-2.jpg', readTime: 38, likes: 42, views: 567,
    author: { name: 'Kashmir Offbeat' }, tags: ['Documentary', 'Pashmina', 'Artisans'],
    content: `"Weavers of Light" follows the complete lifecycle of a Pashmina shawl — from the nomadic herders of the Changthang Plateau to the master weavers of Srinagar's old city — revealing a craft that is as fragile as the fiber it celebrates.

The film opens at 15,000 feet in Ladakh, where Changpa nomads tend their flocks of Changthangi goats. In spring, they gently comb the soft undercoat — each goat yields barely enough fiber for a single shawl. The raw pashm is packed into bundles and carried by horse across mountain passes to Kashmir.

In Srinagar, the fiber passes through dozens of hands. Women clean and sort it by grade — the finest fibers, thinner than a spider's thread, are reserved for the most expensive shawls. Spinners work on traditional wheels, their fingers coaxing thread so fine it's nearly invisible. A master spinner can produce only about 200 meters of thread per day.

The heart of the film is in the weaving workshops of downtown Srinagar. Here, in cramped rooms with low ceilings, master weavers create Kani shawls — the most complex textile art in the world. Using hundreds of small wooden bobbins (kanis), they weave intricate patterns directly into the fabric. A single Kani shawl takes two to three years to complete and involves over a million hand-tied knots.

The documentary doesn't shy away from the crisis facing the industry. Machine-made imitations sell for a fraction of the price. Young weavers are leaving for other work. The film asks: in a world that values speed and cheapness, is there still room for an art that takes years to master and months to produce?`,
  },
  'last-shikara-makers': {
    title: "The Last Shikara Makers of Dal Lake",
    category: 'documentaries', coverImage: '/heritage/downtown-3.jpg', readTime: 32, likes: 35, views: 478,
    author: { name: 'Kashmir Offbeat' }, tags: ['Documentary', 'Shikaras', 'Dal Lake'],
    content: `On the banks of Dal Lake, in a workshop that has been in the same family for four generations, Ghulam Mohammad shapes a plank of deodar wood into the curved prow of a shikara — Kashmir's iconic gondola.

This documentary is a portrait of the craftsmen who build these boats entirely by hand, using techniques passed down through centuries. There are no blueprints, no power tools, no factory lines. Each shikara is built from memory, shaped by eye, and sealed with a mixture of linseed oil and cotton that has kept boats watertight since the Mughal era.

The film follows the construction of a single shikara from start to finish — a process that takes about three weeks. The keel is carved from a single piece of deodar. The ribs are steamed and bent into shape. The planks are fitted together with handmade nails and sealed with oakum. Finally, the boat is painted in the bright colors — red, green, yellow — that make the Dal Lake fleet one of the most photographed sights in India.

But the craft is dying. Where once there were dozens of shikara workshops around Dal Lake, today there are fewer than five. Fiberglass boats are cheaper and faster to produce. Young men prefer construction work or tourism jobs. Ghulam Mohammad's own sons have chosen different careers.

The documentary captures not just a craft but a way of life that is disappearing — the morning rituals of the lake, the language of the boatmen, the knowledge of wood and water that took generations to accumulate. When the last shikara maker sets down his tools, a piece of Kashmir's soul will go with him.`,
  },
};

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    setLoading(true);
    try {
      const data = await api.getArticle(slug);
      if (data) {
        setArticle(data);
      } else {
        setArticle(fallbackArticles[slug] || null);
      }
    } catch (err) {
      console.error(err);
      setArticle(fallbackArticles[slug] || null);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked) return;
    try {
      const result = await api.likeArticle(slug);
      setArticle({ ...article, likes: result.likes });
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <DetailPageSkeleton />;
  if (!article) return <div className="min-h-screen flex items-center justify-center bg-[#f7f9fb]"><span className="text-slate-500 font-light tracking-widest uppercase text-xs">Article not found</span></div>;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 page-enter">
      <main className="pt-10 pb-32 flex flex-col items-center px-6">

        {/* Editorial Header */}
        <div className="w-full max-w-3xl mb-10 text-center">
          <Link to="/articles" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-600 hover:text-slate-700 transition-colors mb-4">
            <span className="material-icons text-sm">arrow_back</span> Back to Articles
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="bg-[#eceef0] text-slate-600 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">
              {article.category?.replace('-', ' ')}
            </span>
            {article.isFeatured && (
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md font-sans text-[10px] uppercase tracking-widest font-bold">
                Featured
              </span>
            )}
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">{article.title}</h2>

          {/* Author + Meta */}
          <div className="flex items-center justify-center gap-4">
            {article.author?.image && (
              <img src={article.author.image} alt={article.author.name} className="w-10 h-10 rounded-full object-cover" />
            )}
            <div className="text-left">
              <p className="font-sans font-bold text-sm text-slate-900">{article.author?.name}</p>
              <div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold">
                <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                {article.readTime && <><span>·</span><span>{article.readTime} min read</span></>}
              </div>
            </div>
            <div className="ml-auto flex items-center gap-4">
              {article.views && (
                <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold">
                  <span className="material-icons text-sm">visibility</span>{article.views}
                </span>
              )}
              <button onClick={handleLike} disabled={liked}
                className={`flex items-center gap-1 font-sans text-[10px] uppercase tracking-widest font-bold transition-colors ${liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}>
                <span className="material-icons text-sm">{liked ? 'favorite' : 'favorite_border'}</span>{article.likes}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-4xl mb-12 rounded-xl overflow-hidden shadow-lg relative">
          <img
            src={article.images?.length > 0 ? article.images[currentImageIndex] : article.coverImage}
            alt={article.title}
            className="w-full aspect-[16/7] object-cover"
          />
          {article.images?.length > 1 && (
            <>
              <button onClick={() => setCurrentImageIndex(p => p === 0 ? article.images.length - 1 : p - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                <span className="material-icons">chevron_left</span>
              </button>
              <button onClick={() => setCurrentImageIndex(p => p === article.images.length - 1 ? 0 : p + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-md transition-all">
                <span className="material-icons">chevron_right</span>
              </button>
            </>
          )}
        </div>

        {/* Article Body */}
        <div className="w-full max-w-3xl">
          <div className="font-serif text-lg text-slate-700 leading-relaxed whitespace-pre-wrap mb-16">{article.content}</div>

          {/* Tags */}
          {article.tags?.length > 0 && (
            <div className="mb-12 pb-12 border-b border-slate-200">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-4">Tags</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <span key={i} className="bg-[#eceef0] text-slate-600 px-4 py-2 rounded-md font-sans text-[11px] font-semibold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {article.author?.bio && (
            <div className="mb-12 pb-12 border-b border-slate-200 bg-[#f2f4f6] rounded-xl p-8">
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-6">About the Author</span>
              <div className="flex gap-6">
                {article.author.image && (
                  <img src={article.author.image} alt={article.author.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                )}
                <div>
                  <p className="font-serif text-lg font-bold text-slate-900 mb-2">{article.author.name}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{article.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          {article.relatedArticles?.length > 0 && (
            <div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-slate-600 font-bold block mb-6">Continue Reading</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.relatedArticles.map((related) => (
                  <Link key={related._id} to={`/articles/${related.slug}`}
                    className="group overflow-hidden rounded-xl bg-[#f2f4f6] hover:shadow-md transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <img src={related.coverImage} alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-sm font-bold text-slate-900 mb-1 line-clamp-2 group-hover:underline">{related.title}</h4>
                      <p className="font-sans text-[11px] text-slate-400 line-clamp-2">{related.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
