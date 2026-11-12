import type { Topic } from '../../types';

/**
 * Second wave of situations. Kept in its own module so the crisis set stays
 * first in retrieval order and this file can grow without touching it.
 * Every provision referenced here is verified in provisions.ts.
 */
export const MORE_TOPICS: Topic[] = [
  {
    slug: 'hiv-status',
    title: {
      en: 'HIV status and treatment',
      hi: 'एचआईवी स्थिति और इलाज',
      ta: 'HIV நிலைமையும் சிகிச்சையும்',
    },
    summary: {
      en: 'A hospital, clinic or employer cannot use your HIV status to refuse care or work. Who knows your status is your decision, not theirs.',
      hi: 'अस्पताल, क्लिनिक या नियोक्ता आपकी एचआईवी स्थिति के आधार पर इलाज या काम से मना नहीं कर सकते। आपकी स्थिति किसे पता हो, यह आपका फैसला है।',
      ta: 'மருத்துவமனை, கிளினிக் அல்லது முதலாளி உங்கள் HIV நிலைமையின் காரணமாக சிகிச்சையையோ வேலையையோ மறுக்க முடியாது. உங்கள் நிலைமை யாருக்குத் தெரிய வேண்டும் என்பது உங்கள் முடிவு.',
    },
    keywords: [
      'hiv', 'aids', 'positive', 'art', 'antiretroviral', 'viral load', 'cd4',
      'एचआईवी', 'एड्स', 'इलाज से मना', 'एचआईवी पॉजिटिव',
      'எச்ஐவி', 'எய்ட்ஸ்', 'மருந்து மறுப்பு',
    ],
    urgency: 2,
    provisionIds: ['const-21', 'const-14', 'tpa-3'],
    caseIds: [],
    helplineIds: ['legalaid-15100', 'telemanas-14416'],
    unsure: {
      en: [
        'The HIV and AIDS (Prevention and Control) Act, 2017 is not in this corpus yet, so Saathi cites only the general equality and healthcare provisions. A legal aid lawyer can read the specific confidentiality and anti-discrimination sections with you.',
      ],
      hi: [
        'एचआईवी और एड्स (रोकथाम और नियंत्रण) अधिनियम, 2017 अभी इस संग्रह में नहीं है, इसलिए साथी केवल सामान्य समानता और स्वास्थ्य सेवा वाली धाराएं बताता है। गोपनीयता और भेदभाव की विशेष धाराएं विधिक सहायता वकील आपके साथ पढ़ सकते हैं।',
      ],
      ta: [
        'HIV மற்றும் எய்ட்ஸ் (தடுப்பு மற்றும் கட்டுப்பாடு) சட்டம், 2017 இன்னும் இந்தத் தொகுப்பில் இல்லை; எனவே சாதி பொதுவான சமத்துவம், சுகாதாரப் பிரிவுகளை மட்டுமே காட்டுகிறது. ரகசியம், பாகுபாடு பற்றிய குறிப்பிட்ட பிரிவுகளை சட்ட உதவி வழக்கறிஞர் படித்துக் காட்டுவார்.',
      ],
    },
    steps: {
      en: [
        'Ask the hospital to give the reason for refusing care in writing. A spoken refusal leaves you with nothing to show anyone later.',
        'Carry whatever you have — a prescription, a test slip, a discharge note — and call 15100 for the District Legal Services Authority.',
        'For a treatment refusal inside a hospital, complain to the medical superintendent and keep the complaint number.',
      ],
      hi: [
        'अस्पताल से इलाज से मना करने का कारण लिखित में मांगें। मौखिक मना करने पर बाद में दिखाने के लिए कुछ नहीं रहता।',
        'जो भी है — पर्ची, जांच की पर्ची, डिस्चार्ज नोट — साथ रखें और जिला विधिक सेवा प्राधिकरण के लिए 15100 पर कॉल करें।',
        'अस्पताल में इलाज से मना होने पर मेडिकल अधीक्षक को शिकायत दें और शिकायत संख्या संभाल कर रखें।',
      ],
      ta: [
        'சிகிச்சையை மறுத்ததற்கான காரணத்தை எழுத்தில் கேளுங்கள். வாய்மொழி மறுப்பு பின்னர் காட்ட எதுவும் வைத்திருக்காது.',
        'உங்களிடம் இருப்பதை — மருந்துச் சீட்டு, பரிசோதனைச் சீட்டு, டிஸ்சார்ஜ் குறிப்பு — எடுத்துக்கொண்டு 15100 அழைத்து மாவட்ட சட்ட சேவை ஆணையத்தைக் கேளுங்கள்.',
        'மருத்துவமனைக்குள் சிகிச்சை மறுக்கப்பட்டால் மருத்துவக் கண்காணிப்பாளரிடம் புகார் அளித்து புகார் எண்ணை வைத்திருங்கள்.',
      ],
    },
  },
  {
    slug: 'online-abuse',
    title: {
      en: 'Threats and images online',
      hi: 'ऑनलाइन धमकियां और तस्वीरें',
      ta: 'இணையத்தில் அச்சுறுத்தலும் படங்களும்',
    },
    summary: {
      en: 'Threats, morphed pictures, or sexual images shared without consent are offences, not "drama". Save the evidence before you block anyone.',
      hi: 'धमकियां, छेड़छाड़ की गई तस्वीरें, या बिना सहमति के साझा की गई यौन तस्वीरें अपराध हैं, "नाटक" नहीं। किसी को ब्लॉक करने से पहले सबूत सुरक्षित करें।',
      ta: 'அச்சுறுத்தல்கள், மாற்றப்பட்ட படங்கள், சம்மதமின்றி பகிரப்பட்ட பாலியல் படங்கள் குற்றங்கள்; "வம்பு" அல்ல. யாரையும் பிளாக் செய்வதற்கு முன் ஆதாரத்தைச் சேமியுங்கள்.',
    },
    keywords: [
      'online', 'instagram', 'whatsapp', 'facebook', 'telegram', 'screenshot', 'blackmail',
      'sextortion', 'morphed', 'leaked', 'threat', 'cyber', '1930',
      'ऑनलाइन', 'धमकी', 'ब्लैकमेल', 'तस्वीर', 'स्क्रीनशॉट', 'मॉर्फ्ड',
      'இணையம்', 'மிரட்டல்', 'பிளாக்மெயில்', 'படம்', 'ஸ்கிரீன்ஷாட்',
    ],
    urgency: 3,
    provisionIds: ['const-21', 'const-19a', 'tpa-18'],
    caseIds: [],
    helplineIds: ['emergency-112', 'legalaid-15100'],
    unsure: {
      en: [
        'Saathi does not hold the IT Act or the BNS sections on intimate-image abuse, so it will not quote a section number for the offence. The cybercrime portal can register it, and a legal aid lawyer can name the section in the complaint.',
      ],
      hi: [
        'साथी के पास निजी तस्वीरों के दुरुपयोग की आईटी अधिनियम या बीएनएस धाराएं नहीं हैं, इसलिए वह अपराध की धारा संख्या नहीं बताएगा। साइबर क्राइम पोर्टल पर शिकायत दर्ज हो सकती है, और विधिक सहायता वकील शिकायत में धारा लिख सकते हैं।',
      ],
      ta: [
        'தனிப்பட்ட படங்கள் தொடர்பான IT சட்டம் அல்லது BNS பிரிவுகள் சாதியிடம் இல்லை; எனவே குற்றத்திற்கான பிரிவு எண்ணை அது கூறாது. சைபர் குற்ற போர்ட்டலில் புகார் பதிவாகும்; புகாரில் பிரிவை சட்ட உதவி வழக்கறிஞர் குறிப்பார்.',
      ],
    },
    steps: {
      en: [
        'Take screenshots that include the profile name, the URL and the date. Save the original messages; do not delete the chat.',
        'Report it on the platform and at cybercrime.gov.in, or call 1930. Keep the acknowledgement number.',
        'Tell one person you trust before you go offline. Being alone with a threat is what the person threatening you wants.',
      ],
      hi: [
        'स्क्रीनशॉट लें जिसमें प्रोफ़ाइल का नाम, लिंक और तारीख दिखे। मूल संदेश सहेजें; चैट मिटाएं नहीं।',
        'प्लेटफ़ॉर्म पर और cybercrime.gov.in पर शिकायत करें, या 1930 पर कॉल करें। पावती संख्या रखें।',
        'ऑफलाइन जाने से पहले किसी एक भरोसेमंद इंसान को बताएं। धमकी के साथ अकेले रहना वही है जो धमकाने वाला चाहता है।',
      ],
      ta: [
        'சுயவிவரப் பெயர், இணைப்பு, தேதி தெரியும் வகையில் ஸ்கிரீன்ஷாட் எடுங்கள். அசல் செய்திகளைச் சேமியுங்கள்; அரட்டையை அழிக்காதீர்கள்.',
        'தளத்திலும் cybercrime.gov.in இலும் புகார் அளியுங்கள், அல்லது 1930 அழைக்கவும். ஒப்புகை எண்ணை வைத்திருங்கள்.',
        'ஆஃப்லைன் போகும் முன் நம்பகமான ஒருவரிடம் சொல்லுங்கள். மிரட்டலுடன் தனியாக இருப்பதுதான் மிரட்டுபவர் விரும்புவது.',
      ],
    },
  },
  {
    slug: 'outing',
    title: {
      en: 'Someone outed me',
      hi: 'किसी ने मेरी पहचान बता दी',
      ta: 'யாரோ என்னை வெளிப்படுத்திவிட்டார்கள்',
    },
    summary: {
      en: 'Being outed without your consent is a privacy harm. You do not owe anyone your history, and you can ask for it to stop in writing.',
      hi: 'आपकी सहमति के बिना पहचान बता देना निजता का उल्लंघन है। आपको किसी को अपना इतिहास बताने की जरूरत नहीं, और आप लिखित में रुकने के लिए कह सकते हैं।',
      ta: 'உங்கள் சம்மதமின்றி வெளிப்படுத்துவது தனியுரிமை மீறல். உங்கள் வரலாற்றை யாருக்கும் சொல்லக் கடமை இல்லை; எழுத்தில் நிறுத்தச் சொல்லலாம்.',
    },
    keywords: [
      'outed', 'outing', 'told everyone', 'exposed', 'privacy', 'screenshot group',
      'बता दिया', 'सबको पता', 'निजता', 'प्राइवेसी',
      'வெளிப்படுத்தியது', 'எல்லோருக்கும் தெரியும்', 'தனியுரிமை',
    ],
    urgency: 2,
    provisionIds: ['const-21', 'const-14', 'tpa-3'],
    caseIds: [],
    helplineIds: ['legalaid-15100', 'telemanas-14416'],
    unsure: {
      en: [
        'Privacy claims are fact-specific. Saathi can point to the right to privacy and equality, but whether a particular disclosure is actionable is a question for a lawyer.',
      ],
      hi: [
        'निजता के दावे तथ्यों पर निर्भर करते हैं। साथी निजता और समानता का अधिकार बता सकता है, पर किसी विशेष खुलासे पर मुकदमा बनता है या नहीं — यह वकील का प्रश्न है।',
      ],
      ta: [
        'தனியுரிமை கோரிக்கைகள் சூழலைப் பொறுத்தவை. தனியுரிமை, சமத்துவ உரிமையை சாதி காட்ட முடியும்; ஆனால் ஒரு குறிப்பிட்ட வெளிப்படுத்தல் வழக்குக்குரியதா என்பது வழக்கறிஞரின் கேள்வி.',
      ],
    },
    steps: {
      en: [
        'Write down who was told, by whom, and when. Keep the message or the post.',
        'Ask the person, in writing, to stop and to take it down. A written request becomes evidence if they repeat it.',
        'If a school, hostel or employer did it, write to its grievance officer and keep a copy.',
      ],
      hi: [
        'किसे बताया गया, किसने बताया और कब — लिख लें। संदेश या पोस्ट सहेजें।',
        'उस व्यक्ति से लिखित में रुकने और हटाने के लिए कहें। दोहराया गया तो लिखित अनुरोध सबूत बनता है।',
        'अगर स्कूल, हॉस्टल या नियोक्ता ने किया है, तो उसके शिकायत अधिकारी को लिखें और प्रति रखें।',
      ],
      ta: [
        'யாருக்குச் சொன்னார்கள், யார் சொன்னார்கள், எப்போது — எழுதுங்கள். செய்தியையோ பதிவையோ சேமியுங்கள்.',
        'அந்த நபரிடம் எழுத்தில் நிறுத்தவும் நீக்கவும் கேளுங்கள். மீண்டும் செய்தால் அந்தக் கடிதமே ஆதாரம்.',
        'பள்ளி, விடுதி அல்லது முதலாளி செய்திருந்தால் அவர்களின் புகார் அதிகாரிக்கு எழுதி நகல் வைத்திருங்கள்.',
      ],
    },
  },
  {
    slug: 'banking',
    title: {
      en: 'A bank or insurer refused me',
      hi: 'बैंक या बीमा कंपनी ने मना किया',
      ta: 'வங்கியோ காப்பீட்டு நிறுவனமோ மறுத்தது',
    },
    summary: {
      en: 'A bank, insurer or lender refusing service only because you are transgender is discrimination in the supply of goods and services — the same clause that covers shops and landlords.',
      hi: 'केवल ट्रांसजेंडर होने के कारण बैंक, बीमा कंपनी या ऋणदाता का सेवा से मना करना वस्तु और सेवा में भेदभाव है — वही धारा जो दुकान और मकान मालिक पर लागू होती है।',
      ta: 'நீங்கள் திருநங்கை என்பதற்காகவே வங்கி, காப்பீடு அல்லது கடன் நிறுவனம் சேவையை மறுப்பது பொருள், சேவை வழங்கலில் பாகுபாடு — கடைகள், வீட்டு உரிமையாளர்களுக்குப் பொருந்தும் அதே பிரிவு.',
    },
    keywords: [
      'bank', 'account', 'loan', 'insurance', 'policy', 'kyc', 'branch', 'rbi', 'ombudsman',
      'बैंक', 'खाता', 'लोन', 'बीमा', 'शाखा', 'केवाईसी',
      'வங்கி', 'கணக்கு', 'கடன்', 'காப்பீடு', 'கிளை',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'const-14'],
    caseIds: [],
    helplineIds: ['legalaid-15100'],
    unsure: {
      en: [
        'Banking conduct rules sit with the RBI, not in this corpus. The refusal itself is still covered by the anti-discrimination clause cited above.',
      ],
      hi: [
        'बैंकिंग आचरण नियम आरबीआई के पास हैं, इस संग्रह में नहीं। फिर भी मना करना ऊपर बताई भेदभाव-विरोधी धारा के दायरे में आता है।',
      ],
      ta: [
        'வங்கி நடத்தை விதிகள் RBI-யிடம்; இந்தத் தொகுப்பில் இல்லை. இருந்தாலும் மறுப்பு மேலே காட்டிய பாகுபாடு எதிர்ப்புப் பிரிவின் கீழ் வரும்.',
      ],
    },
    steps: {
      en: [
        'Ask the branch for the refusal and the reason in writing, with a complaint number. Do not leave with only a verbal no.',
        'Escalate to the bank\u2019s nodal officer for grievance redressal — every bank must publish one.',
        'If it stands, take it to the RBI Ombudsman (free, online) and tell 15100 so a legal aid lawyer can follow it.',
      ],
      hi: [
        'शाखा से मना करने का कारण लिखित में और शिकायत संख्या मांगें। केवल मौखिक "ना" लेकर न लौटें।',
        'बैंक के शिकायत निवारण नोडल अधिकारी तक बात बढ़ाएं — हर बैंक को एक नाम देना होता है।',
        'फिर भी न हो, तो आरबीआई लोकपाल (मुफ्त, ऑनलाइन) के पास जाएं और 15100 को बताएं ताकि विधिक सहायता वकील आगे देख सके।',
      ],
      ta: [
        'கிளையில் மறுப்புக்கான காரணத்தையும் புகார் எண்ணையும் எழுத்தில் கேளுங்கள். வாய்மொழி "இல்லை"யுடன் திரும்பாதீர்கள்.',
        'வங்கியின் குறைதீர்ப்பு நோடல் அதிகாரி வரை கொண்டு செல்லுங்கள் — ஒவ்வொரு வங்கியும் ஒருவரை நியமிக்க வேண்டும்.',
        'அப்படியும் தீரவில்லை என்றால் RBI லோக்பால் (இலவசம், இணையம்) அணுகி, 15100-க்குத் தெரியப்படுத்துங்கள்.',
      ],
    },
  },
  {
    slug: 'travel-id',
    title: {
      en: 'ID checks while travelling',
      hi: 'यात्रा में पहचान जांच',
      ta: 'பயணத்தில் அடையாளச் சரிபார்ப்பு',
    },
    summary: {
      en: 'A hotel, airline or railway check can ask for ID. It cannot use the check to humiliate you, refuse service, or hold you without a reason.',
      hi: 'होटल, एयरलाइन या रेलवे पहचान मांग सकते हैं। वे इस जांच का इस्तेमाल अपमान, सेवा से मना, या बिना कारण रोकने के लिए नहीं कर सकते।',
      ta: 'ஹோட்டல், விமானம் அல்லது ரயில்வே அடையாளத்தைக் கேட்கலாம். ஆனால் அவமானப்படுத்த, சேவையை மறுக்க, காரணமின்றி தடுத்து வைக்க அதைப் பயன்படுத்த முடியாது.',
    },
    keywords: [
      'train', 'railway', 'station', 'hotel', 'airport', 'check-in', 'id check', 'ticket',
      'ट्रेन', 'रेलवे', 'स्टेशन', 'होटल', 'एयरपोर्ट', 'आईडी',
      'ரயில்', 'நிலையம்', 'ஹோட்டல்', 'விமான நிலையம்', 'அடையாள அட்டை',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'const-21', 'const-14'],
    caseIds: [],
    helplineIds: ['emergency-112', 'legalaid-15100'],
    unsure: {
      en: [
        'Carrier and hotel rules differ by operator, and Saathi does not hold them. What it can say is that the refusal to serve you because you are transgender is covered by the clause cited above.',
      ],
      hi: [
        'वाहक और होटल के नियम अलग-अलग होते हैं और साथी के पास वे नहीं हैं। इतना कह सकता है कि ट्रांसजेंडर होने के कारण सेवा से मना ऊपर बताई धारा में आता है।',
      ],
      ta: [
        'பயண நிறுவனம், ஹோட்டல் விதிகள் வேறுபடும்; சாதியிடம் அவை இல்லை. திருநங்கை என்பதற்காக சேவை மறுப்பது மேலே காட்டிய பிரிவின் கீழ் வரும் என்பதை மட்டும் சொல்ல முடியும்.',
      ],
    },
    steps: {
      en: [
        'Stay where other people are. Step into the booking hall or the platform office rather than a side room.',
        'Ask the officer for their name and post, and note the time. Being asked for it politely changes the exchange.',
        'If you are held or thrown out, call 112 there and then, and 15100 afterwards to put it on record.',
      ],
      hi: [
        'जहां लोग हैं वहीं रहें। किसी अलग कमरे के बजाय बुकिंग हॉल या प्लेटफ़ॉर्म कार्यालय में जाएं।',
        'अधिकारी से नाम और पद पूछें, समय लिखें। शालीनता से यह पूछना बातचीत का रुख बदल देता है।',
        'रोका या निकाला गया तो वहीं 112 पर कॉल करें, और बाद में 15100 पर रिकॉर्ड के लिए।',
      ],
      ta: [
        'மக்கள் இருக்கும் இடத்திலேயே இருங்கள். தனி அறைக்குப் போகாமல் முன்பதிவு மண்டபம் அல்லது நடைமேடை அலுவலகத்துக்குச் செல்லுங்கள்.',
        'அதிகாரியின் பெயரையும் பதவியையும் கேட்டு நேரத்தைக் குறியுங்கள். பணிவாகக் கேட்பது உரையாடலின் போக்கை மாற்றும்.',
        'தடுத்து வைத்தாலோ வெளியேற்றினாலோ அங்கேயே 112 அழைத்து, பின்னர் 15100-ல் பதிவு செய்யுங்கள்.',
      ],
    },
  },
  {
    slug: 'detention',
    title: {
      en: 'Held by police or in a shelter',
      hi: 'पुलिस या आश्रय गृह में रोका गया',
      ta: 'காவலிலோ இல்லத்திலோ தடுத்து வைக்கப்பட்டது',
    },
    summary: {
      en: 'If you are held, you must be told why, allowed a lawyer, and brought before a magistrate. A shelter cannot keep you without an order.',
      hi: 'रोके जाने पर आपको कारण बताया जाना, वकील मिलना और मजिस्ट्रेट के सामने पेश किया जाना चाहिए। आश्रय गृह बिना आदेश आपको नहीं रोक सकता।',
      ta: 'தடுத்து வைத்தால் காரணம் சொல்ல வேண்டும், வழக்கறிஞர் அனுமதிக்க வேண்டும், நீதிபதி முன் கொண்டு வர வேண்டும். உத்தரவு இல்லாமல் இல்லம் தடுத்து வைக்க முடியாது.',
    },
    keywords: [
      'police', 'custody', 'lockup', 'thana', 'detained', 'arrest', 'station', 'shelter', ' remand',
      'पुलिस', 'हिरासत', 'थाना', 'गिरफ्तार', 'आश्रय', 'हिरासत में',
      'காவல்', 'காவல் நிலையம்', 'கைது', 'தங்குமிடம்',
    ],
    urgency: 3,
    provisionIds: ['const-32', 'const-21', 'const-39a', 'tpa-3'],
    caseIds: [],
    helplineIds: ['emergency-112', 'legalaid-15100'],
    unsure: {
      en: [
        'Saathi does not hold the criminal procedure code, so it will not quote the arrest sections. It can tell you the constitutional guarantees that apply and who to call.',
      ],
      hi: [
        'साथी के पास आपराधिक प्रक्रिया संहिता नहीं है, इसलिए वह गिरफ्तारी की धाराएं नहीं बताएगा। वह संवैधानिक गारंटी और किसे कॉल करना है, बता सकता है।',
      ],
      ta: [
        'குற்றவியல் நடைமுறைச் சட்டம் சாதியிடம் இல்லை; எனவே கைது பிரிவுகளை அது கூறாது. பொருந்தும் அரசியலமைப்பு உத்தரவாதங்களையும் யாரை அழைக்க வேண்டும் என்பதையும் சொல்லும்.',
      ],
    },
    steps: {
      en: [
        'Ask, once, for the grounds of the detention and the officer\u2019s name and number. Say clearly that you want it recorded.',
        'Call 15100 and say the words "I am in custody". Free legal aid is a constitutional entitlement, not a favour.',
        'Ask that a person of your choice be informed, and that any medical need be noted in the register.',
      ],
      hi: [
        'एक बार हिरासत का कारण और अधिकारी का नाम-नंबर पूछें। स्पष्ट कहें कि आप यह दर्ज कराना चाहते हैं।',
        '"मैं हिरासत में हूं" कहते हुए 15100 पर कॉल करें। मुफ्त विधिक सहायता संवैधानिक अधिकार है, कोई एहसान नहीं।',
        'अपनी पसंद के किसी व्यक्ति को सूचित करने और कोई चिकित्सकीय जरूरत रजिस्टर में दर्ज करने के लिए कहें।',
      ],
      ta: [
        'ஒருமுறை தடுத்து வைப்பதற்கான காரணத்தையும் அதிகாரியின் பெயர், எண்ணையும் கேளுங்கள். அதைப் பதிவு செய்ய விரும்புவதாகத் தெளிவாகச் சொல்லுங்கள்.',
        '"நான் காவலில் இருக்கிறேன்" என்று சொல்லி 15100 அழைக்கவும். இலவச சட்ட உதவி அரசியலமைப்பு உரிமை; உபகாரம் அல்ல.',
        'நீங்கள் தேர்ந்தெடுக்கும் ஒருவருக்குத் தெரிவிக்கவும், மருத்துவத் தேவை இருந்தால் பதிவேட்டில் குறிக்கவும் கேளுங்கள்.',
      ],
    },
  },
  {
    slug: 'adoption',
    title: {
      en: 'Adopting or raising a child',
      hi: 'बच्चा गोद लेना या पालना',
      ta: 'குழந்தையைத் தத்தெடுப்பது',
    },
    summary: {
      en: 'The transgender law does not bar you from caring for a child, and a child cannot be taken from you only because of your gender identity.',
      hi: 'ट्रांसजेंडर कानून बच्चे की देखभाल से आपको नहीं रोकता, और केवल लैंगिक पहचान के कारण बच्चा आपसे नहीं छीना जा सकता।',
      ta: 'திருநங்கைச் சட்டம் குழந்தையைப் பராமரிக்கத் தடையில்லை; உங்கள் பாலின அடையாளத்தின் காரணமாக மட்டும் குழந்தையைப் பிரிக்க முடியாது.',
    },
    keywords: [
      'adopt', 'adoption', 'cara', 'guardian', 'custody', 'foster', 'child', 'orphan',
      'गोद', 'गोद लेना', 'संरक्षक', 'अभिभावक', 'बच्चा',
      'தத்தெடு', 'பாதுகாவலர்', 'குழந்தை', 'வளர்ப்பு',
    ],
    urgency: 2,
    provisionIds: ['const-21', 'const-14', 'tpa-3'],
    caseIds: [],
    helplineIds: ['legalaid-15100', 'child-1098'],
    unsure: {
      en: [
        'Adoption and guardianship are governed by the JJ Act, CARA regulations and personal law, none of which are in this corpus. Saathi will not guess a section; a legal aid lawyer must map your route.',
      ],
      hi: [
        'गोद लेना और संरक्षकता जेजे अधिनियम, कारा नियमों और व्यक्तिगत कानून से चलती है, जो इस संग्रह में नहीं हैं। साथी धारा का अनुमान नहीं लगाएगा; रास्ता विधिक सहायता वकील तय करेंगे।',
      ],
      ta: [
        'தத்தெடுப்பும் பாதுகாவலும் JJ சட்டம், CARA விதிகள், தனிச்சட்டங்களால் நடக்கின்றன; அவை இந்தத் தொகுப்பில் இல்லை. சாதி பிரிவை ஊகிக்காது; வழியை சட்ட உதவி வழக்கறிஞர் தீர்மானிப்பார்.',
      ],
    },
    steps: {
      en: [
        'Ask the state adoption agency or CARA which route fits you: adoption, guardianship, or foster care. They are not the same process.',
        'If an agency refuses, ask for the refusal in writing and the rule it relies on. A written refusal is what a lawyer can challenge.',
        'Take the file to 15100 and ask for a legal aid lawyer who has handled a guardianship petition before.',
      ],
      hi: [
        'राज्य दत्तक एजेंसी या कारा से पूछें कि आपके लिए कौन सा रास्ता है: गोद, संरक्षकता या पालक देखभाल। ये एक ही प्रक्रिया नहीं हैं।',
        'एजेंसी मना करे तो लिखित में कारण और जिस नियम पर टिकी है, वह मांगें। लिखित मना ही वकील चुनौती दे सकते हैं।',
        'फाइल 15100 पर ले जाएं और ऐसे विधिक सहायता वकील मांगें जिसने पहले संरक्षकता याचिका देखी हो।',
      ],
      ta: [
        'மாநில தத்தெடுப்பு முகமை அல்லது CARA-விடம் உங்களுக்குப் பொருந்தும் வழி எது எனக் கேளுங்கள்: தத்தெடுப்பு, பாதுகாவல், வளர்ப்பு பராமரிப்பு. இவை ஒரே செயல்முறை அல்ல.',
        'முகமை மறுத்தால் காரணத்தையும் அது சார்ந்த விதியையும் எழுத்தில் கேளுங்கள். எழுத்து மறுப்பைத்தான் வழக்கறிஞர் எதிர்த்து நிற்க முடியும்.',
        'கோப்பை 15100-க்குக் கொண்டு சென்று, பாதுகாவல் மனு கையாண்ட வழக்கறிஞரைக் கேளுங்கள்.',
      ],
    },
  },
  {
    slug: 'public-place',
    title: {
      en: 'Refused at a shop, hotel or bus',
      hi: 'दुकान, होटल या बस में मना किया',
      ta: 'கடை, ஹோட்டல் அல்லது பேருந்தில் மறுப்பு',
    },
    summary: {
      en: 'A service open to the public cannot be refused to you because you are transgender. This covers shops, restaurants, hotels, hospitals and transport.',
      hi: 'जनता के लिए खुली सेवा आपको ट्रांसजेंडर होने के कारण नहीं मना की जा सकती। इसमें दुकान, रेस्तरां, होटल, अस्पताल और परिवहन आते हैं।',
      ta: 'பொதுமக்களுக்கான சேவையை நீங்கள் திருநங்கை என்பதற்காக மறுக்க முடியாது. கடைகள், உணவகங்கள், ஹோட்டல்கள், மருத்துவமனைகள், போக்குவரத்து அனைத்தும் அடங்கும்.',
    },
    keywords: [
      'shop', 'restaurant', 'hotel', 'salon', 'bus', 'auto', 'cab', 'entry', 'service refused',
      'दुकान', 'रेस्तरां', 'होटल', 'सैलून', 'बस', 'सेवा से मना',
      'கடை', 'உணவகம்', 'ஹோட்டல்', 'சலூன்', 'பேருந்து', 'சேவை மறுப்பு',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'tpa-18', 'const-21'],
    caseIds: [],
    helplineIds: ['emergency-112', 'legalaid-15100'],
    unsure: {
      en: [
        'Whether a particular refusal is proved depends on what you can show. Saathi can name the duty; it cannot assess evidence for you.',
      ],
      hi: [
        'कोई विशेष मना साबित होगा या नहीं, यह इस पर है कि आप क्या दिखा सकते हैं। साथी कर्तव्य बता सकता है; सबूत का आकलन आपके लिए नहीं कर सकता।',
      ],
      ta: [
        'ஒரு குறிப்பிட்ட மறுப்பை நிரூபிக்க முடியுமா என்பது நீங்கள் காட்டுவதைப் பொறுத்தது. கடமையை சாதி சொல்லும்; ஆதாரத்தை மதிப்பிடாது.',
      ],
    },
    steps: {
      en: [
        'Ask again, calmly, in front of other customers, and say you are being refused service. Witnesses matter more than anger.',
        'Note the time, the staff name on the badge and the branch. Photograph the board or the counter if it is safe.',
        'If you are pushed, threatened or thrown out, call 112. Otherwise put the complaint in writing and take it to 15100.',
      ],
      hi: [
        'दूसरे ग्राहकों के सामने शांति से फिर पूछें और कहें कि आपको सेवा से मना किया जा रहा है। गवाह गुस्से से ज्यादा काम आते हैं।',
        'समय, बैज पर नाम और शाखा लिखें। सुरक्षित हो तो बोर्ड या काउंटर की तस्वीर लें।',
        'धक्का, धमकी या बाहर निकाला गया तो 112 पर कॉल करें। वरना शिकायत लिखित में 15100 तक ले जाएं।',
      ],
      ta: [
        'மற்ற வாடிக்கையாளர்கள் முன் அமைதியாக மீண்டும் கேட்டு, சேவை மறுக்கப்படுவதாகச் சொல்லுங்கள். சாட்சிகள் கோபத்தை விட பயன்படும்.',
        'நேரம், பேட்ஜில் உள்ள பெயர், கிளையைக் குறியுங்கள். பாதுகாப்பாக இருந்தால் பலகை அல்லது கவுண்டரைப் படம் எடுங்கள்.',
        'தள்ளினாலோ மிரட்டினாலோ வெளியேற்றினாலோ 112 அழைக்கவும். இல்லையெனில் புகாரை எழுத்தில் 15100-க்குக் கொண்டு செல்லுங்கள்.',
      ],
    },
  },
];
