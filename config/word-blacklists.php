<?php

// Keywords blacklist for "php-spam-filter"
// Any regular expression syntax can be used here
// 	(without the delimiters)
// All keywords are case-insensitive.
// Lines starting with '#' or '//' are ignored.
return [
    'blacklist-gambling' => [
        'english' => [
            '(fun|free|online|en ligne|gold|gratuits?|mobile|samsung|casinos?|slots?|paypal)\s*(gambling|texas|casino|black\s?jack|poker|roulette|slots|keno)',
            '(blackjack|roulette|casino|poker|slot( machine)?) (bonus|online|en ligne|virtuel|betting)',
            '(video|penny|machine) slots',
            'slots? (games|card|for fun|machine|online)',
            '(vegas|lake|island|nouveau|swiss|bovada|betway|batway|ladbrokes|europa|royale|monte carlo|valley|emerald queen|park) (casino|poker)',
            '32\s*red',
            'pokerstars',
            'william hill',
            'ladbrokes',
            '888\s?(poker|casino|game|sport|ladies)',
            'topaze?',
            'casino (travel|europ|game|bonus)',
            'spin palace',
            'tropezia',
            'euroking',
            'casino crown',
            'pokies',
            '(chat|live|online|russian)\s?roulette',
            '(Xhamster|spicy)\s?roulette',
        ],
        'non-english' => [
            'machine a sous',
            'speelautom(aten|aat)',
            'spielautom(aten|aat)',
            'fruitautom(aten|aat)',
            'casino (en ligne|en linea|gratuit)',
            '(spela|svenska|spiel in|spiele?) casino',
            'spielen? kostenlos?',
            '(casino|kostenlos?) spielen?',
        ],
    ],
    'blacklist-hosting' => [
        'english' => [
            'just host',
            'host review',
            'vpn download',
            'XRumer',
            'host\s?monster',
            'blue\s?host',
        ],
        'non-english' => [],
    ],
    'blacklist-injection' => [
        'english' => [
            '\$RandomStr',
            'cl_prem:',
            '%url%',
            '%BLOGTITLE%',
        ],
        'non-english' => [],
    ],
    'blacklist-medication' => [
        'english' => [
            'viagra',
            'cialis',
            'propecia',
            'zoloft',
            'clomid',
            'ambien',
            'kamagra',
            'accutane',
            'sildenafil',
            'doxorubicin',
            'levitra',
            'strattera',
            'zithromax',
            'topamax',
            'priligy',
            'vivaxa',
            'vimax',
            'triactol',
            'fioricet',
            'deltasone', 'menozac', 'profollica', 'Metronidazole', 'retin a', 'lasix', 'tadalafil', 'valium', 'vigrx', 'Capsiplex', 'zantac', 'stendra', 'extenze', 'semenax', 'vardenafil', 'imitrex', 'Nizoral', 'Natox', 'vimax', 'flagyl', 'Garcinia\s?cambogia', 'Zeta\s?clear', 'acne treatment', 'volume\s?pills', 'SizeGenetics', 'eye secrets', 'tramadol', 'imitrex', 'amoxil', 'zovirax', 'proactol', 'pro\s*solution', 'dapoxetine', 'vigorelle', 'cytotec', 'Meratol', 'raspberry ketone', 'modafinil', 'penis enlargement', 'enlargement pills', 'breast actives', 'male extra', 'male edge', 'GenF20', 'human growth hormone', 'Nuratrim', 'Phen\s?375', 'volume pills', 'anti\s?aging', 'hair loss', 'Har\s?Vokse', 'Clear Skin Max', 'hide\s*my\s*ass', 'Garcinia', 'cambogia', 'Ativan', 'Champix', 'klonopin', 'Amlodipine', 'xanax', 'breast enhancement', 'Levofloxaxin', 'ciprofloxacin', 'Synthroid', 'Reductil', 'Venapro', 'orlistat', 'nolvadex', 'clonazepam', 'prozac', 'weight\s?loss', 'Meridia', 'oxycodone', 'ClearPores', 'JesExtender', 'penis\s?health', 'diet\s?(patch|review)', '(menu|zone|acai|mango|atkins)\s?diet', 'Provigil', 'MaleEdge', 'HerSolution', 'Provestra', 'Lunesta', 'Proextender', 'Provacyl', 'ProShapeRX', 'Norvasc', 'Kollagen\s?Intensiv', 'dermaperfect', 'VP-?RX', 'Zyrtec', 'Sudafed', 'Maxoderm', 'Finasteride', 'Seroquel', 'rhinoplasty', 'liposuction', 'breastreduction', 'hairremoval', 'breastlift', 'Nexus Pheromones', 'Rejuvenex', 'Man XXX', 'dermapure', 'Eye cream', 'Revitol', 'Volumizer', 'Poraso', 'Phenergan', 'Butalbital', 'Cococleanse', 'Proactiv', 'Acai', 'Enhance XL', 'Ilosone', 'Acne treatment', 'DermaVeratrol', 'Albenza', 'Asacol', 'Bath Mate', 'Penis pump', 'Finpecia', 'Virility (Max|pills)', 'Alprazolam', 'Xanex',
            'Tinnitus Control',
            'online pharmacy',
            'pharmacima.us',
            // I'm guessing these are considered "organic medication"
            'green coffee (bean )?extract',
            // I got tired of making these elaborate "catches" for the HGH spam, so I just blocked the use of the word HGH et al at all!
            // (hgh|hcg|tmj) (recipes|vitamins|drops|diet|ingredients|suppliments|supplements|gold|platinum|hormone|calculator|weight|studies|legal)
            // (best|natural) (hgc|hgh)
            // The \W flag is to make sure these three letter combinations aren't inside of another word.
            // For instance, without the flag, "HGH" would be matched in a "harmless" word such as "witcHGHost"
            '\Whgh',
            '\Whcg',
            '\Wtmj',
        ],
        'non-english' => [],
    ],
    'blacklist-merchandise' => [
        'english' => [
            'replica (Rolex|watch)', 'Louis\s?Vuitton', 'Ralph\s?Lauren', '(celine|chanel)\s?(hand)?\s?bag', 'Jeremiah wann', 'louboutin', 'kobe bryant', 'Air Max', 'Air Jordan', 'Nike Huarache', 'jimmy choo', 'jordan shoes', 'dre beats', 'beats by dre', 'coach (factory )?outlet', 'nike\s*(store|shop|gs|shox)', 'FitFlops', 'ugg\s*(sale|boots)', 'isabel marant', 'moncler outlet', 'vivienne westwood', 'gucci', 'abercrombie\s*(france|canada)', '(eternity|diamond)\s?(ring|earring)', '(sex|masturbation) toys', 'cigarette (drops|discounter)', '(cheap|discount|electronic)\s?cigarette', 'esmokes', 'teeth\s?whitening', 'longchamp', 'Wayne\s?Rooney', 'Michael\s?Kors', 'onlinebags', 'sunglasses', 'Hermes Bags', 'Prada handbag', 'cheap toner', 'colored contacts', '(wedding|engagement) rings?', 'insanity workout', 'ray ban', 'led (lamps|lighting|light bulbs)', 'toms shoes', 'cheap hats', 'Nike\s?Free', 'male models', 'dancing\s?bear', 'hidden cam', 'Green Smoke',
            '(official|cheap|authentic|custom|wholesale|autographed|elite|womens|signed)\s?(jersey|store|shop)',
            '(bears|patriots|seahawks|packers|ravens)\s*(store|online|jersey|official)',
            // (Cup|Finals|NHL|NFL|NCAA|MLB|NBA|Basketball)\s?(jersey|shirt)
            // (Finals|NCAA)-jersey
            // There has got to be a better way to account for all these names rather than just banning the keyword "jersey"
            // (Toews|Bruins|Lucic|Savard|Leddy|Magnuson|Hall|Griswold|Leonard|Spurs|Jackson|Tebow|Mcgrady|Green|Spiller|Ware|Dorsett)\s?jersey
            // (Austin|Boychuk|Thornton|Crawford|Hjalmarsson|Mikita|Matthews|Nelson|Rodgers|Dobson|Drew|Blackmon|Howard|Cole|Kane)\s?jersey
            // (Horton|Riggins|Paul|Hayes|Moore|Alzado|Battier|Hardaway|Seabrook|Carcillo|Keith|Dalton|Esiason|Ellis|James|Andersen)\s?jersey
            // (Bosh|Haslem|Wade|Chalmers|Chiefs|Dawson|McFadden|Tatum|Otto|Hampton|White|Ditka|Forte|Atwer|Sharpe|Bailey|Youngblood)\s?jersey
            // (Celek|White|McCoy|Young|Morris|Celek|Bednarik|McDonald|Murray|Turner|Sanders|Ponder|Allen|Carter|Welker|Miller|Bradshaw)\s?jersey
            // (Polamalu|Woodson|Belfour|Hull|Larmer)\s?jersey
            // (Cowboys|Escobar|Newhouse|Saints|Vaccaro|Manuel|Bills|Dolphins|Johnson|Eagles|Bengals|Hunt|Eiftert|Cardinals|Mathieu|Texans|Hopkins)\s?jersey
            // SCREW THIS! No one is allowed to say "jersey!!"
            'jersey',
            'The Business Advantage', 'Gold Review', 'First Choice Capital Resources', 'Installment Loan', 'Loan Review', 'groceryforless',
            // This is a "catch all" for all this crap
            'wholesale',
            // The \W flag is to make sure these three letter combinations aren't inside of another word.
            // For instance, without the flag, "HGH" would be matched in a "harmless" word such as "witcHGHost"
            '\Wwix'],
        'non-english' => ['elektronik\s?sigara', 'porno loubnane', 'abercrombie en ligne', 'banc\s?de\s?swiss'],
    ],
    'blacklist-services' => [
        'english' => ['cash\s*loan', 'car\s*loan', 'cars? for sale', '7 Seater Car', 'credit repair', 'pay\s?day loan', '365DayLoan', 'home (phone|broadband)', 'no win no fee', 'horse racing', '(currency|money)\s*transfer', 'alternatefuel', 'online dating', 'reverse phone lookup', 'cash advance', 'online divorce', 'divorce on\s*line', 'ppi claims', 'hotels cheap', '(london|usa) (hotels?|spas?)', 'electricity prices', 'lottery results', 'GScraper', 'buy (youtube|twitter)', '(online|interracial|free) dating', 'market lodge', 'Make Me a Millionaire', 'Car rental', 'Cheap flights', 'XLgirls', 'home\s?security', '(criminal|defense|family) lawyer', '(car|life|building)\s*insurance', '(accident|injury|compensation) claims?', '(plumbers?|lawyers?|locksmiths?|storage|repairs?|pest control|electricians?|accountants?|solicitors?) (in)?\s?(north|east|south|west)?\s?(london|vancouver|ottowa|toronto|Mississauga|sydney|Melbourne)', '(debt|financial) (consolidation|relief|advice|management|counselling)', 'personal injury solicitor', 'credit\s?services', 'cash\s?review'],
        'non-english' => [],
    ],
    'blacklist-software' => [
        'english' => ['Performer5', 'book of ra (deluxe )? online', 'iPhone porn', 'eMule', 'product key', 'cdkey', 'key sale', 'upgrade key', '(wow|archeage|runscape|diablo\s?3?|firefall)\s?gold', 'dc universe online cash', '(diablo 3|d3|guild wars 2|gw2) guide', '(diablo 3|d3|guild wars 2|gw2) power leveling', 'downloadoemsoftware.co.uk', 'buycheapoemsoftware.com', 'buyoem.co.uk', 'cyber-systems.org'],
        'non-english' => [],
    ],
    'blacklist-trading' => [
        'english' => [
            'Ias 39', 'Plus500', 'Banc\s?De\s?Binary', 'Traderush', 'Avafx', 'Trade Plus', 'Etoro', 'Anyoption',
            'Optionbit', 'Optionfair', 'iOption', 'Onetwotrade', 'Binary options?', 'Options Binaires', '24option', 'Stockpair',
            // I got tired of it all, so I just blocked any mention of "forex"
            // mini forex
            // forex (course|trading)
            'forex',
        ],
        'non-english' => [],
    ],
    'blacklist-urls' => [
        'english' => [
            'theychanel.com', 'everychanel.com', 'get-massive-autopilot-traffic.com', 'skyrocket-seo-traffic.com', 'free-casino-bonus.com', 'womensclothescheap.com', 'familiekock.nl',
            'kreatorzyimprezek.pl', 'livingwithrheumatoidarthritis.org', 'commentjob.ru', 'eekshop.com', 'icamtech.com', 'isglasses.com', 'firefallstore.com', 'gmbal.com',
            // Any URL that contains these words is evil!
            'louisvuitton',
            'paydayloan',
            'monclerpascher',
        ],
        'non-english' => [],
    ],
    'blacklist-misc' => [
        'english' => [
            // Lots of spam
            // https?:\/\/[^\/]+\.pl
            'https?:\/\/[^\/]+\.pl\/\S+,s,\d{2,8}\/',
            'https?:\/\/[^\/]+\.pl\/\S*\?p=\d{2,8}',
            // More spam
            '<a href="[^"]*">Slots<\/a>',
            '<a href="[^"]*">Casino<\/a>',
            '<a href="[^"]*">HGH<\/a>',
        ],
        'non-english' => [],
    ],
];
