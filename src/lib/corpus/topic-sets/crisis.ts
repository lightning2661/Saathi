import { T } from '../topic-kit';
import type { Topic } from '../../types';

export const CRISIS_TOPICS: Topic[] = [
  T({
    slug: 'thrown-out',
    title: ['Thrown out of home', 'घर से निकाल दिया गया', 'வீட்டை விட்டு வெளியேற்றப்பட்டேன்'],
    summary: [
      'Your family made you leave, or told you not to come back, because you are transgender or queer.',
      'ट्रांसजेंडर या क्वियर होने की वजह से परिवार ने घर से निकाल दिया या वापस न आने को कहा।',
      'டிரான்ஸ் அல்லது குயர் என்பதால் குடும்பம் வீட்டை விட்டு வெளியேற்றியது அல்லது திரும்ப வேண்டாம் என்றது.',
    ],
    keywords: [
      'thrown out', 'kicked out', 'threw me out', 'no home', 'nowhere to go', 'family rejected', 'disowned',
      'ghar se nikal', 'nikal diya', 'घर से निकाल', 'बेघर', 'परिवार ने ठुकरा',
      'veetai vittu', 'வீட்டை விட்டு', 'வெளியேற்ற',
    ],
    urgency: 3,
    provisionIds: ['tpa-12', 'tpa-18', 'tpa-8', 'tpa-3', 'const-21'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['child-1098', 'women-181', 'legalaid-15100', 'emergency-112'],
    unsure: [
      [
        'Section 12 gives a right to live in the family home, but a court order takes months. Get shelter first, litigate second.',
        'A family may argue the house is not theirs to share. Only a lawyer with the facts can say how strong the claim is.',
      ],
      [
        'धारा 12 घर में रहने का अधिकार देती है, पर अदालत का आदेश महीनों लेता है। पहले आश्रय, फिर मुकदमा।',
        'परिवार कह सकता है कि घर उनका निजी है। दावा कितना मजबूत है, यह वकील ही बता सकता है।',
      ],
      [
        'பிரிவு 12 குடும்ப வீட்டில் வசிக்கும் உரிமை தருகிறது, ஆனால் உத்தரவு மாதங்கள் எடுக்கும். முதலில் தங்குமிடம், பிறகு வழக்கு.',
        'வீடு எங்களுடையது அல்ல என்று குடும்பம் வாதிடலாம். வழக்கின் வலிமையை வழக்கறிஞரே சொல்ல முடியும்.',
      ],
    ],
    steps: [
      [
        'If you have nowhere to sleep tonight, call 1098 under 18, or 181 for a shelter referral. Do not spend the night alone at a station.',
        'Write the date, who told you to leave, and what they said. A screenshot or voice note is enough.',
        'Call 15100, ask for the District Legal Services Authority, and say you need help under section 12 of the Transgender Persons Act.',
        'Ask the legal aid lawyer to send a written notice, or to apply under section 12(3) for rehabilitation if going back is unsafe.',
      ],
      [
        'आज रात सोने की जगह नहीं है तो 18 से कम उम्र में 1098, आश्रय के लिए 181 पर कॉल करें। स्टेशन पर अकेले रात न बिताएं।',
        'तारीख, किसने निकाला और क्या कहा — लिख लें। स्क्रीनशॉट या वॉइस नोट काफी है।',
        '15100 पर कॉल करें, जिला विधिक सेवा प्राधिकरण से बात करें, ट्रांसजेंडर अधिनियम की धारा 12 के तहत मदद मांगें।',
        'वकील से कहें कि लिखित नोटिस भेजें, या वापस जाना असुरक्षित हो तो धारा 12(3) के तहत पुनर्वास की अर्जी दें।',
      ],
      [
        'இன்று இரவு தங்க இடம் இல்லை எனில், 18 வயதுக்குக் குறைவு எனில் 1098, தங்குமிடத்துக்கு 181 அழைக்கவும். நிலையத்தில் தனியாக இரவைக் கழிக்க வேண்டாம்.',
        'தேதி, யார் வெளியேற்றியது, என்ன சொன்னார்கள் என்பதை எழுதுங்கள். ஸ்கிரீன்ஷாட் அல்லது குரல் பதிவு போதும்.',
        '15100 அழைத்து மாவட்ட சட்ட சேவை ஆணையத்தைக் கேளுங்கள்; டிரான்ஸ் சட்டம் பிரிவு 12 கீழ் உதவி வேண்டும் என்று சொல்லுங்கள்.',
        'திரும்பிச் செல்வது பாதுகாப்பற்றது எனில், எழுத்துப்பூர்வ அறிவிப்பு அனுப்பவோ பிரிவு 12(3) கீழ் மறுவாழ்வு விண்ணப்பிக்கவோ வழக்கறிஞரிடம் கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'minor-alone',
    title: ['Under 18 and alone', '18 से कम उम्र और अकेले', '18 வயதுக்குக் குறைவு, தனியாக'],
    summary: [
      'You are a minor, away from family, with no safe adult to go to.',
      'आप नाबालिग हैं, परिवार से दूर हैं और कोई सुरक्षित बड़ा साथ नहीं है।',
      'நீங்கள் மைனர், குடும்பத்தை விட்டு விலகி, பாதுகாப்பான பெரியவர் யாரும் இல்லை.',
    ],
    keywords: [
      'minor', 'under 18', 'sixteen', 'seventeen', 'fifteen', 'class 10', 'class 9', 'runaway', 'student',
      'nabaalig', 'नाबालिग', 'सोलह', 'सत्रह', 'किशोर', 'घर छोड़',
      'பதினாறு', 'பதினேழு', 'சிறார்', 'ஓடி வந்த',
    ],
    urgency: 3,
    provisionIds: ['tpa-12', 'tpa-18', 'tpa-5', 'tpa-8', 'const-21'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['child-1098', 'railway-139', 'emergency-112', 'legalaid-15100'],
    unsure: [
      [
        'Child protection can involve the Child Welfare Committee, and that is not always what a teenager wants. Ask 1098 what happens next before you give details.',
        'Being transgender is not a ground to separate a child from family, but the 2026 amendment narrowed the statutory definition and a committee may apply it differently.',
      ],
      [
        'बाल संरक्षण में बाल कल्याण समिति शामिल हो सकती है, जो हर किशोर को पसंद नहीं आता। विवरण देने से पहले 1098 से पूछें आगे क्या होगा।',
        'ट्रांसजेंडर होना बच्चे को परिवार से अलग करने का आधार नहीं है, पर 2026 संशोधन ने परिभाषा सीमित की है।',
      ],
      [
        'குழந்தை பாதுகாப்பில் குழந்தை நலக் குழு ஈடுபடலாம்; அது எல்லா இளையருக்கும் விருப்பமாக இருக்காது. விவரம் சொல்லும் முன் 1098-இடம் கேளுங்கள்.',
        'டிரான்ஸ் என்பது குழந்தையைப் பிரிக்கும் காரணம் அல்ல; ஆனால் 2026 திருத்தம் வரையறையைக் குறுக்கியுள்ளது.',
      ],
    ],
    steps: [
      [
        'Call 1098 now. Free, 24 hours, works from any phone without credit.',
        'At a station, go to the station master’s office or an RPF post and ask them to call 1098 with you.',
        'Stay where it is lit and crowded. Do not accept a room, a job or a ticket from a stranger offering to “take care of you”.',
        'Ask the counsellor for a Child Welfare Committee hearing and a shelter place the same day.',
      ],
      [
        'अभी 1098 पर कॉल करें। मुफ्त, 24 घंटे, बिना बैलेंस किसी भी फोन से।',
        'स्टेशन पर हैं तो स्टेशन मास्टर के दफ्तर या RPF चौकी जाएं और साथ में 1098 पर कॉल करने को कहें।',
        'रोशनी और भीड़ वाली जगह रहें। “देखभाल” का वादा करने वाले अजनबी का कमरा, नौकरी या टिकट न लें।',
        'काउंसलर से उसी दिन बाल कल्याण समिति की सुनवाई और आश्रय मांगें।',
      ],
      [
        'இப்போதே 1098 அழைக்கவும். இலவசம், 24 மணி நேரம், பேலன்ஸ் இல்லாத எந்த ஃபோனிலும்.',
        'நிலையத்தில் இருந்தால் நிலைய மேலாளர் அலுவலகம் அல்லது RPF பதிவிடம் சென்று உங்களுடன் 1098 அழைக்கச் சொல்லுங்கள்.',
        'வெளிச்சமும் கூட்டமும் உள்ள இடத்தில் இருங்கள். “பார்த்துக்கொள்கிறேன்” எனும் அந்நியரின் அறை, வேலை, டிக்கெட்டை ஏற்க வேண்டாம்.',
        'ஆலோசகரிடம் அதே நாளில் குழந்தை நலக் குழு விசாரணையும் தங்குமிடமும் கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'forced-begging',
    title: ['Forced to beg or work without pay', 'भीख मांगने या बिना वेतन काम पर मजबूर', 'பிச்சை எடுக்கவோ ஊதியமின்றி வேலை செய்யவோ கட்டாயம்'],
    summary: [
      'Someone controls you, takes your money, and makes you beg, solicit or work without pay.',
      'कोई आप पर नियंत्रण रखता है, पैसा लेता है और भीख मांगने या बिना वेतन काम करने पर मजबूर करता है।',
      'யாரோ உங்களைக் கட்டுப்படுத்தி, பணத்தை எடுத்து, பிச்சை எடுக்கவோ ஊதியமின்றி வேலை செய்யவோ கட்டாயப்படுத்துகிறார்.',
    ],
    keywords: [
      'begging', 'forced to beg', 'bonded', 'bonded labour', 'trafficking', 'trafficked', 'keeps my money', 'guru',
      'my earnings', 'servitude', 'soliciting', 'forced labour',
      'bhikh', 'भीख', 'जबरन काम', 'बंधुआ', 'कमाई छीन', 'गुरु',
      'பிச்சை', 'கட்டாய வேலை', 'பணம் பறிமுதல்',
    ],
    urgency: 3,
    provisionIds: ['tpa-18', 'const-23', 'tpa-2k', 'tpa-8'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['child-1098', 'emergency-112', 'legalaid-15100'],
    unsure: [
      [
        'The 2026 amendment created a specific offence for forcing someone to present as transgender and then use them for begging. The facts decide which clause applies, so report the whole pattern, not one incident.',
        'If you are an adult and were not forced into the identity, clause (g) may not fit. Section 18(a) on bonded labour and Article 23 can still apply.',
      ],
      [
        '2026 संशोधन ने किसी को ट्रांसजेंडर के रूप में पेश होने पर मजबूर कर भीख में लगाने को विशेष अपराध बनाया है। तथ्य तय करते हैं कौन-सा खंड लागू होगा, इसलिए पूरा पैटर्न बताएं।',
        'वयस्क हैं और पहचान के लिए मजबूर नहीं किए गए, तो खंड (g) लागू नहीं हो सकता। बंधुआ श्रम पर धारा 18(a) और अनुच्छेद 23 फिर भी लागू हैं।',
      ],
      [
        '2026 திருத்தம், ஒருவரை டிரான்ஸாக நடிக்க வைத்து பிச்சைக்கு பயன்படுத்துவதை தனி குற்றமாக்கியுள்ளது. எந்தப் பிரிவு பொருந்தும் என்பதை உண்மைகள் தீர்மானிக்கும்; முழு விவரத்தையும் சொல்லுங்கள்.',
        'நீங்கள் பெரியவர், பிள்ளைத்தனமான கட்டாயம் இல்லை எனில் (g) பொருந்தாமல் போகலாம். பிரிவு 18(a) மற்றும் சட்டப்பிரிவு 23 பொருந்தும்.',
      ],
    ],
    steps: [
      [
        'If you are in danger right now, call 112. If you are under 18, call 1098 — forced begging of a child is treated far more seriously after the 2026 amendment.',
        'Keep one record of what you earn and what is taken. A notebook, a photo of a payment, or a message is evidence.',
        'Go to the nearest police station with a written complaint that names the person and describes the pattern: control, money taken, forced begging. Ask for the FIR copy and the crime number.',
        'If police refuse, call 15100 and ask legal aid to file a complaint before the Magistrate, or write to the National Council for Transgender Persons under section 17(d).',
      ],
      [
        'अभी खतरे में हैं तो 112 पर कॉल करें। 18 से कम उम्र में 1098 — 2026 संशोधन के बाद बच्चे से जबरन भीख मांगना अधिक गंभीर अपराध है।',
        'कमाई और छीने गए पैसे का एक रिकॉर्ड रखें। कॉपी, भुगतान की फोटो या संदेश सबूत है।',
        'नज़दीकी थाने में लिखित शिकायत दें जिसमें व्यक्ति का नाम और पैटर्न हो: नियंत्रण, पैसा छीनना, जबरन भीख। FIR की कॉपी और क्राइम नंबर मांगें।',
        'पुलिस मना करे तो 15100 पर कॉल करें और मजिस्ट्रेट के सामने शिकायत दर्ज कराएं, या धारा 17(d) के तहत राष्ट्रीय परिषद को लिखें।',
      ],
      [
        'இப்போது ஆபத்தில் இருந்தால் 112 அழைக்கவும். 18 வயதுக்குக் குறைவு எனில் 1098 — 2026 திருத்தத்துக்குப் பின் குழந்தையைப் பிச்சைக்கு வற்புறுத்துவது மிகக் கடுமையான குற்றம்.',
        'வருமானம், பறிமுதல் செய்யப்பட்ட பணம் பற்றிய ஒரு பதிவு வையுங்கள். நோட்டு, பணம் செலுத்திய புகைப்படம், செய்தி — ஆதாரம்.',
        'அருகிலுள்ள காவல் நிலையத்தில் எழுத்துப்பூர்வ புகார் அளியுங்கள்: நபர் பெயர், கட்டுப்பாடு, பணம் பறிமுதல், கட்டாய பிச்சை. FIR நகல், குற்ற எண் கேளுங்கள்.',
        'காவல் மறுத்தால் 15100 அழைத்து மாஜிஸ்திரேட் முன் புகார் அளிக்கவோ, பிரிவு 17(d) கீழ் தேசிய கவுன்சிலுக்கு எழுதவோ கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'violence',
    title: ['Physically or sexually hurt', 'शारीरिक या यौन हिंसा', 'உடல் அல்லது பாலியல் வன்முறை'],
    summary: [
      'Someone has hurt you, hit you, touched you without consent, or threatened you.',
      'किसी ने मारा, चोट पहुंचाई, बिना सहमति छुआ या धमकाया।',
      'யாரோ தாக்கினார், அடித்தார், சம்மதமின்றி தொட்டார் அல்லது மிரட்டினார்.',
    ],
    keywords: [
      'hit me', 'beat me', 'assault', 'rape', 'molest', 'sexual', 'hurt me', 'attack', 'threat',
      'grievous hurt', 'acid', 'burn', 'stripped', 'blackmail', 'sextortion',
      'maara', 'मारा', 'चोट', 'बलात्कार', 'छेड़छाड़', 'धमकी', 'जला',
      'அடித்தான்', 'தாக்குதல்', 'பாலியல்', 'மிரட்டல்',
    ],
    urgency: 3,
    provisionIds: ['tpa-18', 'const-21', 'const-14'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['emergency-112', 'women-181', 'legalaid-15100'],
    unsure: [
      [
        'Serious assault and rape are prosecuted under the general criminal law; the sections depend on exactly what happened. A legal aid lawyer should choose them, not this app.',
        'Injuries fade. A medical examination and a written record made early are worth more than a description given later.',
      ],
      [
        'गंभीर हमला और बलात्कार सामान्य आपराधिक कानून के तहत चलते हैं; धाराएं इस पर निर्भर हैं कि ठीक क्या हुआ। धारा चुनना वकील का काम है, ऐप का नहीं।',
        'चोटें मिट जाती हैं। जल्दी कराया मेडिकल परीक्षण और लिखित रिकॉर्ड बाद में दिए विवरण से अधिक मूल्यवान है।',
      ],
      [
        'கடுமையான தாக்குதல், பாலியல் வன்கொடுமை பொதுவான குற்றவியல் சட்டத்தின் கீழ் விசாரிக்கப்படும்; பிரிவுகள் நடந்ததைப் பொறுத்தது. பிரிவை வழக்கறிஞரே தேர்வு செய்ய வேண்டும்.',
        'காயங்கள் மங்கும். விரைவில் செய்யும் மருத்துவப் பரிசோதனையும் எழுத்துப்பூர்வ பதிவும் பின்னர் சொல்வதை விட மதிப்புமிக்கது.',
      ],
    ],
    steps: [
      [
        'Call 112 now if the person is still there or you are injured. Ask for a police vehicle and an ambulance together.',
        'Go to a government hospital within 24 hours for a medical examination. Ask for the wound certificate and a copy of the medico-legal report.',
        'File an FIR. You can file it at any police station regardless of where it happened; ask for the FIR copy and crime number before leaving.',
        'Call 15100 for a free lawyer, and ask about victim compensation under the state victim compensation scheme.',
      ],
      [
        'अगर व्यक्ति अभी आसपास है या चोट है तो 112 पर कॉल करें। पुलिस गाड़ी और एम्बुलेंस दोनों मांगें।',
        '24 घंटे में सरकारी अस्पताल जाएं, मेडिकल जांच कराएं। घाव प्रमाणपत्र और मेडिको-लीगल रिपोर्ट की कॉपी मांगें।',
        'FIR दर्ज करें। घटना कहीं भी हुई हो, किसी भी थाने में दर्ज हो सकती है; जाने से पहले FIR कॉपी और क्राइम नंबर लें।',
        '15100 पर मुफ्त वकील मांगें, और राज्य पीड़ित मुआवजा योजना के बारे में पूछें।',
      ],
      [
        'நபர் அருகில் இருந்தால் அல்லது காயம் இருந்தால் இப்போதே 112 அழைக்கவும். காவல் வாகனமும் ஆம்புலன்ஸும் கேளுங்கள்.',
        '24 மணி நேரத்தில் அரசு மருத்துவமனையில் பரிசோதனை செய்யுங்கள். காயச் சான்று, மருத்துவ-சட்ட அறிக்கை நகல் கேளுங்கள்.',
        'FIR பதிவு செய்யுங்கள். சம்பவம் எங்கு நடந்தாலும் எந்தக் காவல் நிலையத்திலும் பதிவு செய்யலாம்; நகலும் குற்ற எண்ணும் வாங்குங்கள்.',
        '15100 அழைத்து இலவச வழக்கறிஞர் கேளுங்கள்; மாநில பாதிக்கப்பட்டோர் இழப்பீட்டுத் திட்டம் பற்றிக் கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'mental-health',
    title: ['Distress, or thoughts of ending your life', 'मानसिक संकट या जीवन खत्म करने के विचार', 'மன அழுத்தம் அல்லது வாழ்க்கையை முடித்துக்கொள்ளும் எண்ணம்'],
    summary: [
      'You are exhausted, hopeless, self-harming, or thinking about suicide.',
      'आप थके हुए, निराश, खुद को नुकसान पहुंचा रहे हैं या आत्महत्या के बारे में सोच रहे हैं।',
      'நீங்கள் சோர்ந்து, நம்பிக்கையிழந்து, உங்களைக் காயப்படுத்திக்கொண்டு அல்லது தற்கொலை பற்றி யோசிக்கிறீர்கள்.',
    ],
    keywords: [
      'suicide', 'kill myself', 'end my life', 'self harm', 'cutting', 'depressed', 'depression', 'hopeless',
      'anxiety', 'panic', 'therapy', 'conversion therapy', 'cannot go on', 'tired of living',
      'aatmahatya', 'आत्महत्या', 'खुद को मार', 'डिप्रेशन', 'निराशा', 'अवसाद',
      'தற்கொலை', 'என்னை கொல்ல', 'மனச்சோர்வு', 'நம்பிக்கை இல்லை',
    ],
    urgency: 3,
    provisionIds: ['const-21', 'tpa-18', 'tpa-3'],
    caseIds: ['puttaswamy-2017', 'nalsa-2014'],
    helplineIds: ['telemanas-14416', 'emergency-112'],
    unsure: [
      [
        'Saathi is not a crisis service and cannot keep you safe by itself. Please keep one person or one number with you while you read this.',
        '“Conversion therapy” has been called professional misconduct by the Madras High Court, but enforcement is uneven. A lawyer or the State Medical Council can act on a specific instance.',
      ],
      [
        'साथी संकट सेवा नहीं है और अकेले आपकी सुरक्षा नहीं कर सकता। यह पढ़ते समय किसी एक व्यक्ति या नंबर को साथ रखें।',
        'मद्रास उच्च न्यायालय ने “कन्वर्ज़न थेरेपी” को व्यावसायिक कदाचार कहा है, पर लागू करना असमान है। वकील या राज्य मेडिकल काउंसिल किसी ठोस मामले पर कार्रवाई कर सकते हैं।',
      ],
      [
        'சாதி ஒரு நெருக்கடி சேவை அல்ல; உங்களைத் தனியாகப் பாதுகாக்க முடியாது. இதைப் படிக்கும் போது ஒரு நபரையோ எண்ணையோ உங்களுடன் வைத்திருங்கள்.',
        '“மாற்று சிகிச்சை” தொழில் தவறு என்று சென்னை உயர் நீதிமன்றம் கூறியுள்ளது; அமலாக்கம் சீரற்றது. வழக்கறிஞரோ மாநில மருத்துவக் கவுன்சிலோ நடவடிக்கை எடுக்கலாம்.',
      ],
    ],
    steps: [
      [
        'Call 14416 (Tele-MANAS) now. Free, 24 hours, in your language. If you have a plan and the means, call 112 or go to the nearest government hospital emergency.',
        'Tell one person near you. You do not have to explain everything — “I am not safe alone tonight” is enough.',
        'Remove or hand over what you would use to hurt yourself, for tonight only.',
        'When you can, call 15100. Discrimination and family pressure are legal problems too, and a lawyer can take them off you.',
      ],
      [
        'अभी 14416 (टेली-मानस) पर कॉल करें। मुफ्त, 24 घंटे, आपकी भाषा में। योजना और साधन है तो 112 पर कॉल करें या नज़दीकी सरकारी अस्पताल की इमरजेंसी जाएं।',
        'पास के एक व्यक्ति को बताएं। सब समझाना ज़रूरी नहीं — “मैं आज रात अकेले सुरक्षित नहीं हूं” काफी है।',
        'आज रात के लिए जो चीज़ आपको नुकसान पहुंचा सकती है, वह किसी को दे दें।',
        'जब संभव हो 15100 पर कॉल करें। भेदभाव और परिवार का दबाव भी कानूनी मुद्दे हैं, वकील उन्हें संभाल सकता है।',
      ],
      [
        'இப்போதே 14416 (டெலி-மானஸ்) அழைக்கவும். இலவசம், 24 மணி நேரம், உங்கள் மொழியில். திட்டமும் வழியும் இருந்தால் 112 அழைக்கவும் அல்லது அரசு மருத்துவமனை அவசர பிரிவுக்குச் செல்லுங்கள்.',
        'அருகில் உள்ள ஒருவரிடம் சொல்லுங்கள். எல்லாவற்றையும் விளக்க வேண்டாம் — “இன்று இரவு தனியாக நான் பாதுகாப்பாக இல்லை” போதும்.',
        'இன்று இரவுக்கு உங்களைக் காயப்படுத்தப் பயன்படுத்தும் பொருளை வேறு ஒருவரிடம் கொடுங்கள்.',
        'முடிந்ததும் 15100 அழைக்கவும். பாகுபாடும் குடும்ப அழுத்தமும் சட்டப் பிரச்சினைகள்; வழக்கறிஞர் அவற்றைக் கையாள்வார்.',
      ],
    ],
  }),
];
