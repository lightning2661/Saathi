import { T } from '../topic-kit';
import type { Topic } from '../../types';

export const ACCESS_TOPICS: Topic[] = [
  T({
    slug: 'identity-docs',
    title: ['No ID, or need a transgender certificate', 'पहचान पत्र नहीं, या ट्रांसजेंडर प्रमाणपत्र चाहिए', 'அடையாள ஆவணம் இல்லை, டிரான்ஸ் சான்றிதழ் தேவை'],
    summary: [
      'You have no documents, or you need the transgender identity certificate and a name change.',
      'आपके पास दस्तावेज़ नहीं हैं, या ट्रांसजेंडर पहचान प्रमाणपत्र और नाम बदलना चाहते हैं।',
      'உங்களிடம் ஆவணங்கள் இல்லை, அல்லது டிரான்ஸ் அடையாளச் சான்றிதழும் பெயர் மாற்றமும் தேவை.',
    ],
    keywords: [
      'no id', 'no documents', 'aadhaar', 'aadhar', 'certificate', 'identity card', 'district magistrate', 'dm office',
      'name change', 'birth certificate', 'ration card', 'voter id', 'pan card', 'document', 'identity proof',
      'aadhaar nahi', 'आधार', 'प्रमाणपत्र', 'पहचान पत्र', 'नाम बदल', 'जिलाधिकारी', 'दस्तावेज़',
      'ஆதார்', 'சான்றிதழ்', 'அடையாள அட்டை', 'பெயர் மாற்றம்', 'ஆவணம்', 'மாவட்ட ஆட்சியர்',
    ],
    urgency: 2,
    provisionIds: ['tpa-2k', 'tpa-4', 'tpa-5', 'tpa-6', 'tpa-7', 'tpa-amd-2026-s1'],
    caseIds: ['nalsa-2014', 'puttaswamy-2017'],
    helplineIds: ['legalaid-15100'],
    unsure: [
      [
        'Since 25 May 2026 a medical board must recommend your application before the District Magistrate decides. Self-declaration alone is no longer the process, and the definition itself is narrower.',
        'Whether your identity fits the 2026 categories is a legal question with a real answer, but it depends on your facts. Get a lawyer before filing, and keep a copy of everything you submit.',
      ],
      [
        '25 मई 2026 से जिलाधिकारी के फैसले से पहले मेडिकल बोर्ड की सिफारिश ज़रूरी है। अब केवल स्व-घोषणा पर्याप्त नहीं, और परिभाषा भी सीमित है।',
        'आपकी पहचान 2026 की श्रेणियों में आती है या नहीं, यह कानूनी प्रश्न है और तथ्यों पर निर्भर है। आवेदन से पहले वकील लें, और हर जमा दस्तावेज़ की कॉपी रखें।',
      ],
      [
        '25 மே 2026 முதல் மாவட்ட ஆட்சியர் முடிவுக்கு முன் மருத்துவக் குழு பரிந்துரை கட்டாயம். சுய அறிவிப்பு மட்டும் இனி போதாது; வரையறையும் குறுகியது.',
        'உங்கள் அடையாளம் 2026 வகைகளில் வருமா என்பது சட்டக் கேள்வி; உண்மைகளைப் பொறுத்தது. விண்ணப்பிக்கும் முன் வழக்கறிஞரை அணுகி, சமர்ப்பித்த அனைத்தின் நகலையும் வைத்திருங்கள்.',
      ],
    ],
    steps: [
      [
        'Write a one-page statement of who you are, and collect anything with your name: school record, ration card, voter list entry, hospital slip, even a bank passbook.',
        'Go to the District Magistrate’s office with form and copies, and get a receipt stamp on your copy. The receipt is your proof of date.',
        'Before filing, call 15100 and ask legal aid to check whether your case fits the 2026 definition and to sit with you at the medical board.',
      ],
      [
        'एक पेज का बयान लिखें कि आप कौन हैं, और अपने नाम वाला कोई दस्तावेज़ जुटाएं: स्कूल रिकॉर्ड, राशन कार्ड, मतदाता सूची, अस्पताल पर्ची, बैंक पासबुक।',
        'जिलाधिकारी कार्यालय में फॉर्म और कॉपी लेकर जाएं, अपनी कॉपी पर रसीद की मुहर लगवाएं। रसीद तारीख का सबूत है।',
        'आवेदन से पहले 15100 पर कॉल करें, विधिक सहायता से जांच कराएं कि मामला 2026 परिभाषा में आता है या नहीं, और मेडिकल बोर्ड में साथ चलने को कहें।',
      ],
      [
        'நீங்கள் யார் என்பதை ஒரு பக்கத்தில் எழுதுங்கள்; உங்கள் பெயர் உள்ள ஏதேனும் ஆவணம் சேகரிக்கவும்: பள்ளிப் பதிவு, ரேஷன் கார்டு, வாக்காளர் பட்டியல், மருத்துவமனை சீட்டு, வங்கிப் புத்தகம்.',
        'மாவட்ட ஆட்சியர் அலுவலகத்திற்கு படிவத்துடன் சென்று, உங்கள் நகலில் ரசீது முத்திரை வாங்குங்கள். ரசீதே தேதிக்கான ஆதாரம்.',
        'விண்ணப்பிக்கும் முன் 15100 அழைத்து, 2026 வரையறையில் வழக்கு பொருந்துமா எனப் பார்க்கவும், மருத்துவக் குழுவுக்கு உங்களுடன் வரவும் சட்ட உதவியைக் கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'shelter',
    title: ['I need a safe place to stay', 'मुझे रहने की सुरक्षित जगह चाहिए', 'பாதுகாப்பான தங்குமிடம் தேவை'],
    summary: [
      'You need shelter tonight, or a place to stay while things are sorted out.',
      'आज रात या कुछ समय के लिए आश्रय चाहिए।',
      'இன்று இரவு அல்லது சிறிது காலத்துக்கு தங்குமிடம் தேவை.',
    ],
    keywords: [
      'shelter', 'hostel', 'garima greh', 'smile scheme', 'night', 'homeless', 'place to stay', 'refuge',
      'ashray', 'aashray', 'आश्रय', 'रात', 'छत', 'गरीमा गृह', 'बेघर',
      'தங்குமிடம்', 'இரவு', 'தங்க இடம்', 'வீடு இல்லை',
    ],
    urgency: 3,
    provisionIds: ['tpa-8', 'tpa-12', 'const-21'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['women-181', 'child-1098', 'legalaid-15100'],
    unsure: [
      [
        'Garima Greh shelters are funded under the SMILE scheme, but seats and eligibility differ by district and are not guaranteed.',
        'A shelter may ask for ID. It cannot lawfully refuse you only because you have no documents, but in practice you may need a legal aid letter.',
      ],
      [
        'गरीमा गृह आश्रय SMILE योजना के तहत हैं, पर सीटें और पात्रता जिले के अनुसार बदलती हैं और गारंटी नहीं है।',
        'आश्रय कभी पहचान मांग सकता है। केवल दस्तावेज़ न होने पर मना करना वैध नहीं, पर व्यवहार में विधिक सहायता का पत्र चाहिए हो सकता है।',
      ],
      [
        'கருணை இல்லம் / கரிமா கிரே SMILE திட்டத்தின் கீழ் இயங்குகிறது; இடங்களும் தகுதியும் மாவட்டத்துக்கு மாறுபடும், உத்தரவாதம் இல்லை.',
        'தங்குமிடம் அடையாள ஆவணம் கேட்கலாம். ஆவணம் இல்லாததால் மட்டும் மறுக்க முடியாது; ஆனால் நடைமுறையில் சட்ட உதவி கடிதம் தேவைப்படலாம்.',
      ],
    ],
    steps: [
      [
        'Call 181 for a shelter referral, or 1098 if you are under 18. Say plainly: “I am transgender and I have no safe place tonight.”',
        'Ask for the District Magistrate’s office and the Social Welfare Department. Section 8(4) makes rescue and rehabilitation their duty.',
        'Call 15100 and ask for a letter to the shelter or district office confirming you are entitled to protection.',
      ],
      [
        'आश्रय के लिए 181 पर कॉल करें, 18 से कम उम्र में 1098 पर। सीधे कहें: “मैं ट्रांसजेंडर हूं और आज रात सुरक्षित जगह नहीं है।”',
        'जिलाधिकारी कार्यालय और समाज कल्याण विभाग से मिलें। धारा 8(4) के तहत बचाव और पुनर्वास उनका कर्तव्य है।',
        '15100 पर कॉल करके आश्रय या जिला कार्यालय के लिए पत्र मांगें कि आप संरक्षण के हकदार हैं।',
      ],
      [
        'தங்குமிடத்துக்கு 181 அழைக்கவும்; 18 வயதுக்குக் குறைவு எனில் 1098. தெளிவாகச் சொல்லுங்கள்: “நான் டிரான்ஸ், இன்று இரவு பாதுகாப்பான இடம் இல்லை.”',
        'மாவட்ட ஆட்சியர் அலுவலகம், சமூக நலத்துறையை அணுகுங்கள். பிரிவு 8(4) கீழ் மீட்பும் மறுவாழ்வும் அவர்கள் கடமை.',
        '15100 அழைத்து, நீங்கள் பாதுகாப்புக்கு உரியவர் என்று தங்குமிடம் அல்லது மாவட்ட அலுவலகத்துக்கு கடிதம் கேளுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'housing',
    title: ['Refused a room, or evicted', 'कमरा नहीं मिला या बेदखल किया गया', 'அறை மறுப்பு அல்லது வெளியேற்றம்'],
    summary: [
      'A landlord refused to rent to you, a hostel turned you away, or you were pushed out after they found out.',
      'मकान मालिक ने किराए पर नहीं दिया, हॉस्टल ने मना किया, या पता चलने पर निकाल दिया।',
      'வீட்டு உரிமையாளர் வாடகைக்கு மறுத்தார், விடுதி மறுத்தது, அல்லது தெரிந்த பிறகு வெளியேற்றினர்.',
    ],
    keywords: [
      'rent', 'landlord', 'evicted', 'eviction', 'hostel', 'pg', 'flat', 'room refused', 'house', 'accommodation',
      'makan malik', 'kiraya', 'किराया', 'मकान मालिक', 'बेदखल', 'हॉस्टल', 'कमरा नहीं', 'घर',
      'வாடகை', 'வீட்டு உரிமையாளர்', 'வெளியேற்றம்', 'விடுதி', 'அறை',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'tpa-12', 'tpa-18'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['legalaid-15100', 'women-181'],
    unsure: [
      [
        'Section 3(g) covers refusal to rent or occupy property. Proving why a landlord refused is the hard part; a recorded call or a message helps far more than a verbal refusal.',
        'If you already live there, eviction without a court process is a separate wrong, and section 18(c) makes forcing someone out an offence.',
      ],
      [
        'धारा 3(g) किराए या संपत्ति पर मना करने को कवर करती है। कारण साबित करना कठिन है; रिकॉर्डेड कॉल या संदेश मौखिक मना करने से बेहतर सबूत है।',
        'अगर आप पहले से रह रहे हैं, तो बिना अदालती प्रक्रिया बेदखली अलग गलती है, और धारा 18(c) जबरन निकालने को अपराध बनाती है।',
      ],
      [
        'பிரிவு 3(g) வாடகை மறுப்பை உள்ளடக்கும். காரணத்தை நிரூபிப்பது கடினம்; பதிவான அழைப்போ செய்தியோ வாய்மொழி மறுப்பை விட சிறந்த ஆதாரம்.',
        'நீங்கள் ஏற்கனவே வசித்து வந்தால், நீதிமன்ற நடைமுறையின்றி வெளியேற்றுவது தனி தவறு; பிரிவு 18(c) கட்டாய வெளியேற்றத்தை குற்றமாக்குகிறது.',
      ],
    ],
    steps: [
      [
        'Ask for the refusal in writing, or over message: “Are you saying no because I am transgender?” Keep the reply.',
        'If you are already living there, keep your rent receipts and do not leave voluntarily on the same day. Ask for any eviction in writing.',
        'Send a short written complaint to the landlord and, for a hostel or PG, to the owner and the local municipal grievance cell.',
        'Call 15100 — legal aid can send a notice citing section 3(g) and, if you were forced out, section 18(c).',
      ],
      [
        'मना करने की बात लिखित या संदेश में मांगें: “क्या आप ट्रांसजेंडर होने की वजह से मना कर रहे हैं?” जवाब सहेजें।',
        'अगर पहले से रह रहे हैं, किराया रसीदें रखें और उसी दिन खुद खाली न करें। बेदखली लिखित में मांगें।',
        'मकान मालिक को छोटी लिखित शिकायत भेजें, और हॉस्टल/PG के लिए मालिक तथा नगरपालिका शिकायत प्रकोष्ठ को।',
        '15100 पर कॉल करें — विधिक सहायता धारा 3(g) का नोटिस भेज सकती है, और जबरन निकाला गया हो तो धारा 18(c) का।',
      ],
      [
        'மறுப்பை எழுத்தில் அல்லது செய்தியில் கேளுங்கள்: “நான் டிரான்ஸ் என்பதால்தான் மறுக்கிறீர்களா?” பதிலை வைத்திருங்கள்.',
        'ஏற்கனவே வசித்து வந்தால் வாடகை ரசீதுகளை வைத்திருங்கள்; அதே நாளில் தாமாக காலி செய்ய வேண்டாம். வெளியேற்றத்தை எழுத்தில் கேளுங்கள்.',
        'வீட்டு உரிமையாளருக்கும், விடுதி/PG எனில் உரிமையாளருக்கும் நகராட்சி புகார் பிரிவுக்கும் குறுகிய எழுத்துப் புகார் அனுப்புங்கள்.',
        '15100 அழைக்கவும் — பிரிவு 3(g) அறிவிப்பு அனுப்பலாம்; கட்டாயமாக வெளியேற்றப்பட்டால் பிரிவு 18(c) ம் சேர்க்கலாம்.',
      ],
    ],
  }),
  T({
    slug: 'healthcare',
    title: ['Denied treatment, or pushed into “conversion”', 'इलाज से मना, या “कन्वर्ज़न” के लिए मजबूर', 'சிகிச்சை மறுப்பு அல்லது “மாற்று சிகிச்சை”'],
    summary: [
      'A hospital or doctor refused care, or someone is pressuring you into treatment to change who you are.',
      'अस्पताल या डॉक्टर ने इलाज से मना किया, या कोई आपकी पहचान बदलने का “इलाज” थोप रहा है।',
      'மருத்துவமனையோ மருத்துவரோ சிகிச்சை மறுத்தார், அல்லது உங்கள் அடையாளத்தை மாற்ற “சிகிச்சை” திணிக்கப்படுகிறது.',
    ],
    keywords: [
      'hospital', 'doctor', 'refused treatment', 'denied treatment', 'conversion therapy', 'conversion', 'cure',
      'hormone', 'hrt', 'surgery', 'sex reassignment', 'srs', 'insurance', 'medical', 'clinic', 'nurse',
      'aspataal', 'डॉक्टर', 'इलाज से मना', 'अस्पताल', 'हार्मोन', 'ऑपरेशन', 'कन्वर्ज़न', 'बीमा',
      'மருத்துவமனை', 'மருத்துவர்', 'சிகிச்சை மறுப்பு', 'ஹார்மோன்', 'அறுவை', 'மாற்று சிகிச்சை', 'காப்பீடு',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'tpa-15', 'tpa-18'],
    caseIds: ['sushma-2021', 'puttaswamy-2017'],
    helplineIds: ['telemanas-14416', 'legalaid-15100', 'emergency-112'],
    unsure: [
      [
        'The Madras High Court called conversion therapy professional misconduct and directed action against it, but that is a High Court direction, not a nationwide statute.',
        'Section 15 binds the government to provide care; it does not by itself create a private right to sue every doctor. Section 3(d) covers denial of healthcare services, which is the stronger route.',
      ],
      [
        'मद्रास उच्च न्यायालय ने कन्वर्ज़न थेरेपी को व्यावसायिक कदाचार कहा और कार्रवाई का निर्देश दिया, पर यह देशव्यापी कानून नहीं है।',
        'धारा 15 सरकार को इलाज देना अनिवार्य करती है, हर डॉक्टर पर मुकदमे का निजी अधिकार नहीं देती। धारा 3(d) इलाज से मना करने को कवर करती है, जो मजबूत रास्ता है।',
      ],
      [
        'மாற்று சிகிச்சையை தொழில் தவறு என்று சென்னை உயர் நீதிமன்றம் கூறி நடவடிக்கைக்கு உத்தரவிட்டது; ஆனால் அது நாடு தழுவிய சட்டம் அல்ல.',
        'பிரிவு 15 அரசுக்கு சிகிச்சை அளிக்கும் கடமையை விதிக்கிறது; ஒவ்வொரு மருத்துவர் மீதும் தனி வழக்குரிமை தரவில்லை. சிகிச்சை மறுப்புக்கு பிரிவு 3(d) வலுவான வழி.',
      ],
    ],
    steps: [
      [
        'In an emergency, go to the nearest government hospital. Emergency care cannot wait for paperwork; refusal at that moment is a section 3(d) violation.',
        'Ask for the doctor’s name and the reason for refusal in writing, or record it if you can do so safely.',
        'Complain to the hospital’s medical superintendent, then to the State Medical Council. Keep the complaint number.',
        'If anyone offers “treatment” to change your orientation or identity, call 15100 and report it — in Tamil Nadu the Madras High Court guidelines apply directly.',
      ],
      [
        'आपात स्थिति में नज़दीकी सरकारी अस्पताल जाएं। इमरजेंसी इलाज कागज़ का इंतज़ार नहीं करता; उस समय मना करना धारा 3(d) का उल्लंघन है।',
        'डॉक्टर का नाम और मना करने का कारण लिखित में मांगें, या सुरक्षित हो तो रिकॉर्ड करें।',
        'अस्पताल के मेडिकल अधीक्षक, फिर राज्य मेडिकल काउंसिल में शिकायत करें। शिकायत संख्या रखें।',
        'कोई ओरिएंटेशन या पहचान बदलने का “इलाज” दे तो 15100 पर बताएं — तमिलनाडु में मद्रास उच्च न्यायालय के दिशानिर्देश सीधे लागू हैं।',
      ],
      [
        'அவசர நிலையில் அருகிலுள்ள அரசு மருத்துவமனைக்குச் செல்லுங்கள். அவசர சிகிச்சை ஆவணங்களுக்காகக் காத்திருக்காது; அந்நேரத்தில் மறுப்பது பிரிவு 3(d) மீறல்.',
        'மருத்துவர் பெயரையும் மறுப்புக்கான காரணத்தையும் எழுத்தில் கேளுங்கள்; பாதுகாப்பாக இருந்தால் பதிவு செய்யுங்கள்.',
        'மருத்துவமனை முதன்மை மருத்துவ அதிகாரி, பின்னர் மாநில மருத்துவக் கவுன்சிலில் புகார் அளியுங்கள். புகார் எண்ணை வைத்திருங்கள்.',
        'யாரேனும் உங்கள் நோக்கு அல்லது அடையாளத்தை மாற்ற “சிகிச்சை” வழங்கினால் 15100 அழைத்து தெரிவியுங்கள் — தமிழ்நாட்டில் உயர் நீதிமன்ற வழிகாட்டுதல்கள் நேரடியாகப் பொருந்தும்.',
      ],
    ],
  }),
];
