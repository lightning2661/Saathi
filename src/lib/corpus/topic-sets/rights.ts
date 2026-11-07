import { T } from '../topic-kit';
import type { Topic } from '../../types';

export const RIGHTS_TOPICS: Topic[] = [
  T({
    slug: 'school',
    title: ['Bullied or expelled at school or college', 'स्कूल या कॉलेज में परेशान या निकाला गया', 'பள்ளி அல்லது கல்லூரியில் துன்புறுத்தல், வெளியேற்றம்'],
    summary: [
      'Classmates or teachers harass you, or the institution wants you out because you are transgender or queer.',
      'सहपाठी या शिक्षक परेशान करते हैं, या संस्थान ट्रांसजेंडर/क्वियर होने की वजह से निकालना चाहता है।',
      'வகுப்புத் தோழர்களோ ஆசிரியர்களோ துன்புறுத்துகிறார்கள், அல்லது டிரான்ஸ்/குயர் என்பதால் நிறுவனம் வெளியேற்ற விரும்புகிறது.',
    ],
    keywords: [
      'school', 'college', 'classmate', 'teacher', 'bully', 'bullying', 'expelled', 'suspended', 'rusticated',
      'hostel', 'principal', 'admission refused', 'uniform', 'toilet', 'washroom', 'ragging',
      'school', 'teacher', 'स्कूल', 'कॉलेज', 'शिक्षक', 'परेशान', 'निकाला', 'प्रिंसिपल', 'दाखिला नहीं', 'शौचालय',
      'பள்ளி', 'கல்லூரி', 'ஆசிரியர்', 'துன்புறுத்தல்', 'வெளியேற்றம்', 'முதல்வர்', 'சேர்க்கை மறுப்பு', 'கழிவறை',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'tpa-13', 'tpa-11', 'tpa-10', 'const-16', 'const-15'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['child-1098', 'legalaid-15100'],
    unsure: [
      [
        'Sections 3(a) and 13 bind institutions that are funded or recognised by government. A fully private, unaffiliated institution is a weaker case under this Act, though other routes may apply.',
        'Teachers and classmates harassing a student is also a child protection issue if you are under 18. Reporting to 1098 can move faster than a legal notice.',
      ],
      [
        'धारा 3(a) और 13 सरकार से वित्तपोषित या मान्यता प्राप्त संस्थानों पर लागू हैं। पूरी तरह निजी, अस्वीकृत संस्थान पर यह अधिनियम कमजोर है, हालांकि अन्य रास्ते हो सकते हैं।',
        'शिक्षक और सहपाठी परेशान करें और आप 18 से कम हों, तो यह बाल संरक्षण का मुद्दा भी है। 1098 पर रिपोर्ट कानूनी नोटिस से तेज चल सकती है।',
      ],
      [
        'பிரிவு 3(a), 13 அரசு நிதி அல்லது அங்கீகாரம் பெற்ற நிறுவனங்களுக்குப் பொருந்தும். முழு தனியார் நிறுவனத்தில் இந்தச் சட்டம் பலவீனம்; வேறு வழிகள் இருக்கலாம்.',
        'ஆசிரியர், மாணவர்கள் துன்புறுத்தல் 18 வயதுக்குக் குறைவு எனில் குழந்தை பாதுகாப்பு பிரச்சினையும் ஆகும். 1098 புகார் சட்ட அறிவிப்பை விட வேகமாக நகரலாம்.',
      ],
    ],
    steps: [
      [
        'Write down each incident with date, who, and what was said. Send it to the principal by email or registered post, not only in person.',
        'Ask in writing which complaint officer the institution has named under section 11, and give them the same written complaint.',
        'If you are under 18, call 1098 and ask for the District Child Protection Unit to visit the school.',
        'If admission or a transfer certificate is refused, call 15100 and ask legal aid to write to the District Education Officer.',
      ],
      [
        'हर घटना की तारीख, कौन और क्या कहा — लिखें। प्रिंसिपल को ईमेल या रजिस्टर्ड डाक से भेजें, केवल मौखिक नहीं।',
        'लिखित में पूछें कि संस्थान ने धारा 11 के तहत किसे शिकायत अधिकारी बनाया है, और उन्हें वही शिकायत दें।',
        '18 से कम उम्र में 1098 पर कॉल करें और जिला बाल संरक्षण इकाई से स्कूल जाने को कहें।',
        'दाखिला या टीसी से मना किया जाए तो 15100 पर कॉल करें, विधिक सहायता से जिला शिक्षा अधिकारी को पत्र लिखवाएं।',
      ],
      [
        'ஒவ்வொரு சம்பவத்தையும் தேதி, யார், என்ன சொன்னார்கள் என்று எழுதுங்கள். முதல்வருக்கு மின்னஞ்சல் அல்லது பதிவு அஞ்சலில் அனுப்புங்கள்; நேரில் மட்டும் வேண்டாம்.',
        'பிரிவு 11 கீழ் நிறுவனம் யாரை புகார் அதிகாரியாக நியமித்துள்ளது என்று எழுத்தில் கேட்டு, அதே புகாரை அவருக்கும் கொடுங்கள்.',
        '18 வயதுக்குக் குறைவு எனில் 1098 அழைத்து, மாவட்ட குழந்தை பாதுகாப்பு பிரிவு பள்ளிக்கு வரக் கேளுங்கள்.',
        'சேர்க்கை அல்லது TC மறுத்தால் 15100 அழைத்து, மாவட்ட கல்வி அதிகாரிக்கு கடிதம் அனுப்பச் சொல்லுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'workplace',
    title: ['Fired or harassed at work', 'नौकरी से निकाला या काम पर परेशान किया गया', 'வேலையிலிருந்து நீக்கம் அல்லது துன்புறுத்தல்'],
    summary: [
      'You were not hired, were dismissed, or are being harassed because you are transgender or queer.',
      'ट्रांसजेंडर/क्वियर होने की वजह से नौकरी नहीं मिली, निकाल दिया गया या परेशान किया जा रहा है।',
      'டிரான்ஸ்/குயர் என்பதால் வேலை மறுப்பு, பணி நீக்கம் அல்லது துன்புறுத்தல்.',
    ],
    keywords: [
      'job', 'fired', 'sacked', 'terminated', 'workplace', 'employer', 'boss', 'hr', 'salary', 'wages',
      'not hired', 'dismissed', 'resigned under pressure', 'sexual harassment', 'colleagues', 'contract',
      'naukri', 'नौकरी', 'निकाला', 'बॉस', 'वेतन', 'काम', 'परेशान', 'ठेका',
      'வேலை', 'பணி நீக்கம்', 'சம்பளம்', 'முதலாளி', 'துன்புறுத்தல்', 'ஒப்பந்தம்',
    ],
    urgency: 2,
    provisionIds: ['tpa-3', 'tpa-9', 'tpa-11', 'tpa-10', 'tpa-14', 'const-16', 'tpa-18'],
    caseIds: ['nalsa-2014'],
    helplineIds: ['legalaid-15100'],
    unsure: [
      [
        'Section 9 covers recruitment, promotion and all employment matters for every establishment. What it does not do is give you your job back automatically; reinstatement needs a tribunal or court.',
        'If you were engaged informally with no contract, proving the employment is the first problem. Payments, messages and a witness are the usual proof.',
      ],
      [
        'धारा 9 हर प्रतिष्ठान में भर्ती, पदोन्नति और रोजगार के सभी मामलों पर लागू है। यह नौकरी अपने आप वापस नहीं देती; बहाली के लिए ट्रिब्यूनल या अदालत चाहिए।',
        'अनौपचारिक काम और कोई अनुबंध न हो तो पहले रोजगार साबित करना है। भुगतान, संदेश और गवाह सामान्य सबूत हैं।',
      ],
      [
        'பிரிவு 9 அனைத்து நிறுவனங்களிலும் சேர்க்கை, பதவி உயர்வு, வேலை விஷயங்களுக்குப் பொருந்தும். வேலையை தானாகத் திருப்பித் தராது; மீட்புக்கு தீர்ப்பாயம் அல்லது நீதிமன்றம் தேவை.',
        'முறையற்ற வேலை, ஒப்பந்தம் இல்லை எனில் முதலில் வேலையை நிரூபிக்க வேண்டும். பணப் பரிமாற்றம், செய்திகள், சாட்சி பொதுவான ஆதாரம்.',
      ],
    ],
    steps: [
      [
        'Collect your appointment letter, payslips, ID card, work emails and messages. Export them somewhere only you can reach.',
        'Send one written message asking for the reason for dismissal, and name the complaint officer under section 11.',
        'If you are still employed, put the harassment on record in writing the same day, to HR and to yourself.',
        'Call 15100. Legal aid can file before the labour court or, for a government employer, escalate to the National Council under section 17(d).',
      ],
      [
        'नियुक्ति पत्र, सैलरी स्लिप, आईडी कार्ड, काम के ईमेल और संदेश जुटाएं। उन्हें ऐसी जगह रखें जहां केवल आप पहुंचें।',
        'एक लिखित संदेश भेजकर निकाले जाने का कारण पूछें, और धारा 11 के तहत शिकायत अधिकारी का नाम मांगें।',
        'अगर अभी काम पर हैं, उसी दिन उत्पीड़न को लिखित में एचआर और अपने पास दर्ज करें।',
        '15100 पर कॉल करें। विधिक सहायता श्रम न्यायालय में जा सकती है, या सरकारी नियोक्ता के लिए धारा 17(d) के तहत परिषद तक।',
      ],
      [
        'நியமனக் கடிதம், சம்பளச் சீட்டு, அடையாள அட்டை, வேலை மின்னஞ்சல், செய்திகளைச் சேகரியுங்கள். உங்களுக்கு மட்டும் அணுகக்கூடிய இடத்தில் வையுங்கள்.',
        'பணி நீக்கத்துக்கான காரணம் கேட்டு ஒரு எழுத்துச் செய்தி அனுப்புங்கள்; பிரிவு 11 கீழ் புகார் அதிகாரி பெயரைக் கேளுங்கள்.',
        'இன்னும் வேலையில் இருந்தால், துன்புறுத்தலை அதே நாளில் HR-க்கும் உங்களுக்கும் எழுத்தில் பதிவு செய்யுங்கள்.',
        '15100 அழைக்கவும். தொழிலாளர் நீதிமன்றத்தில் வழக்கு தொடரலாம்; அரசு வேலை எனில் பிரிவு 17(d) கீழ் கவுன்சிலுக்கு மேல்முறையீடு.',
      ],
    ],
  }),
  T({
    slug: 'police',
    title: ['Police refuse to help, or hold you', 'पुलिस मदद से मना करे या हिरासत में रखे', 'காவல் உதவி மறுப்பு அல்லது தடுத்து வைப்பு'],
    summary: [
      'A police station will not register your complaint, or officers are threatening or detaining you.',
      'थाना शिकायत दर्ज नहीं कर रहा, या अधिकारी धमका रहे हैं या हिरासत में रख रहे हैं।',
      'காவல் நிலையம் புகாரைப் பதிவு செய்யவில்லை, அல்லது காவலர்கள் மிரட்டுகிறார்கள் அல்லது தடுத்து வைக்கிறார்கள்.',
    ],
    keywords: [
      'police', 'fir', 'complaint', 'station', 'thana', 'custody', 'arrest', 'detained', 'bribe', 'extortion',
      'refuse fir', 'not registering', 'constable', 'sho', 'inspector', 'lockup',
      'पुलिस', 'थाना', 'एफआईआर', 'शिकायत', 'हिरासत', 'गिरफ्तार', 'रिश्वत', 'दरोगा',
      'காவல்', 'எஃப்ஐஆர்', 'புகார்', 'நிலையம்', 'காவல் தடுப்பு', 'லஞ்சம்',
    ],
    urgency: 3,
    provisionIds: ['tpa-3', 'tpa-18', 'const-21', 'const-14', 'const-39a', 'const-32'],
    caseIds: ['navtej-2018', 'nalsa-2014'],
    helplineIds: ['legalaid-15100', 'police-100', 'emergency-112'],
    unsure: [
      [
        'Police procedure, bail and custody are governed by the BNSS, not by the Transgender Persons Act. Saathi will not quote those sections without verification; a legal aid lawyer should handle anything involving arrest.',
        'Consensual same-sex conduct is not an offence after Navtej Johar, but police sometimes still threaten it. Do not argue alone at a station at night; call 15100.',
      ],
      [
        'पुलिस प्रक्रिया, जमानत और हिरासत BNSS से चलती है, ट्रांसजेंडर अधिनियम से नहीं। गिरफ्तारी वाले मामले में साथी बिना सत्यापन धाराएं नहीं बताएगा; विधिक सहायता वकील संभाले।',
        'नवतेज जोहर के बाद सहमति से समलैंगिक संबंध अपराध नहीं है, पर पुलिस अब भी धमकाती है। रात में थाने में अकेले बहस न करें; 15100 पर कॉल करें।',
      ],
      [
        'காவல் நடைமுறை, ஜாமீன், காவல் தடுப்பு BNSS சட்டத்தின் கீழ் வரும், டிரான்ஸ் சட்டத்தின் கீழ் அல்ல. கைது தொடர்பான விஷயங்களை சட்ட உதவி வழக்கறிஞரே கையாள வேண்டும்.',
        'நவ்தேஜ் ஜோஹர் பிறகு சம்மதத்துடன் நடக்கும் உறவு குற்றம் அல்ல; ஆனாலும் காவலர் மிரட்டலாம். இரவில் நிலையத்தில் தனியாக வாதிட வேண்டாம்; 15100 அழைக்கவும்.',
      ],
    ],
    steps: [
      [
        'If you are being held, say clearly: “I want to call a lawyer.” Call 15100 or 112 from your own phone if you have it.',
        'Ask for the FIR copy and the crime number. If they refuse to register, ask for the reason in writing — a refusal in writing is itself evidence.',
        'Send the same complaint to the Superintendent of Police by registered post or email, and keep the receipt.',
        'Call 15100 and ask legal aid to file a complaint before the Magistrate for registration of the FIR.',
      ],
      [
        'हिरासत में हैं तो साफ कहें: “मुझे वकील से बात करनी है।” अपना फोन है तो 15100 या 112 पर कॉल करें।',
        'FIR कॉपी और क्राइम नंबर मांगें। दर्ज करने से मना करें तो कारण लिखित में मांगें — लिखित इनकार अपने आप में सबूत है।',
        'वही शिकायत पुलिस अधीक्षक को रजिस्टर्ड डाक या ईमेल से भेजें, रसीद रखें।',
        '15100 पर कॉल करें और विधिक सहायता से मजिस्ट्रेट के सामने FIR दर्ज कराने की शिकायत दें।',
      ],
      [
        'தடுத்து வைக்கப்பட்டால் தெளிவாகச் சொல்லுங்கள்: “வழக்கறிஞரை அழைக்க வேண்டும்.” ஃபோன் இருந்தால் 15100 அல்லது 112 அழைக்கவும்.',
        'FIR நகல், குற்ற எண் கேளுங்கள். பதிவு செய்ய மறுத்தால் காரணத்தை எழுத்தில் கேளுங்கள் — எழுத்து மறுப்பே ஆதாரம்.',
        'அதே புகாரை காவல் கண்காணிப்பாளருக்கு பதிவு அஞ்சல் அல்லது மின்னஞ்சலில் அனுப்பி ரசீதை வைத்திருங்கள்.',
        '15100 அழைத்து, மாஜிஸ்திரேட் முன் FIR பதிவுக்கான புகாரை அளிக்கச் சொல்லுங்கள்.',
      ],
    ],
  }),
  T({
    slug: 'couple',
    title: ['We are a couple and family is pressuring us', 'हम जोड़ी हैं और परिवार दबाव डाल रहा है', 'நாங்கள் ஜோடி; குடும்பம் அழுத்தம் கொடுக்கிறது'],
    summary: [
      'You and your partner are being separated, threatened, or told you cannot live together.',
      'आप और साथी को अलग किया जा रहा है, धमकाया जा रहा है, या साथ रहने से मना किया जा रहा है।',
      'உங்களையும் கூட்டாளியையும் பிரிக்கிறார்கள், மிரட்டுகிறார்கள், சேர்ந்து வாழ முடியாது என்கிறார்கள்.',
    ],
    keywords: [
      'girlfriend', 'boyfriend', 'partner', 'same sex', 'lesbian', 'gay', 'couple', 'live in', 'marriage',
      'parents forcing', 'separate us', 'police complaint against us', 'elope', 'love marriage', 'queer relationship',
      'साथी', 'जोड़ी', 'शादी', 'प्रेमी', 'प्रेमिका', 'माता-पिता', 'अलग करना', 'लिव-इन',
      'காதலி', 'காதலன்', 'துணை', 'திருமணம்', 'பெற்றோர்', 'பிரிக்க', 'சேர்ந்து வாழ',
    ],
    urgency: 3,
    provisionIds: ['const-21', 'const-15', 'tpa-3', 'tpa-18'],
    caseIds: ['supriyo-2023', 'sushma-2021', 'navtej-2018', 'puttaswamy-2017'],
    helplineIds: ['legalaid-15100', 'emergency-112', 'telemanas-14416'],
    unsure: [
      [
        'Marriage between two people of the same sex is not recognised in India after Supriyo. Saathi will not pretend there is a route to register one.',
        'An adult couple living together is lawful, and police cannot “return” an adult to their parents against their will — but proving you are both adults is the practical first step.',
      ],
      [
        'सुप्रियो के बाद भारत में समलैंगिक विवाह मान्यता प्राप्त नहीं है। साथी यह दिखावा नहीं करेगा कि पंजीकरण का कोई रास्ता है।',
        'वयस्क जोड़ी का साथ रहना वैध है, और पुलिस किसी वयस्क को उसकी इच्छा के विरुद्ध माता-पिता को “सौंप” नहीं सकती — पर दोनों के वयस्क होने का सबूत पहला व्यावहारिक कदम है।',
      ],
      [
        'சுப்ரியோ பிறகு இந்தியாவில் ஒரே பாலின திருமணம் அங்கீகரிக்கப்படவில்லை. அதற்கான வழி இருப்பதாக இந்த செயலி நடிக்காது.',
        'பெரியவர்கள் சேர்ந்து வாழ்வது சட்டப்படி அனுமதிக்கப்பட்டது; விருப்பமின்றி காவலர் பெரியவரைப் பெற்றோரிடம் ஒப்படைக்க முடியாது — இருவரும் பெரியவர் என்பதை நிரூபிப்பதே முதல் நடைமுறை படி.',
      ],
    ],
    steps: [
      [
        'Keep proof that you are both adults: Aadhaar, birth certificate, voter ID, a college ID with date of birth.',
        'If anyone holds either of you against your will, call 112 and say those words: “I am an adult and I am being held against my will.”',
        'Write to the nearest police station that you are living together of your own choice, and keep a copy. This stops a “missing person” complaint from being used against you.',
        'Call 15100 and ask legal aid to apply for police protection, citing the Madras High Court guidelines where they apply.',
      ],
      [
        'दोनों के वयस्क होने का सबूत रखें: आधार, जन्म प्रमाणपत्र, वोटर आईडी, जन्मतिथि वाला कॉलेज आईडी।',
        'कोई किसी को जबरन रोके तो 112 पर कॉल करें और यही कहें: “मैं वयस्क हूं और मेरी इच्छा के विरुद्ध रोका गया है।”',
        'नज़दीकी थाने को लिखें कि आप अपनी मर्जी से साथ रह रहे हैं, कॉपी रखें। इससे “गुमशुदा” शिकायत का दुरुपयोग रुकता है।',
        '15100 पर कॉल करें और पुलिस सुरक्षा के लिए विधिक सहायता से अर्जी दिलवाएं, जहां लागू हो मद्रास उच्च न्यायालय के दिशानिर्देशों का हवाला दें।',
      ],
      [
        'இருவரும் பெரியவர் என்பதற்கான ஆதாரம் வையுங்கள்: ஆதார், பிறப்புச் சான்று, வாக்காளர் அடையாளம், பிறந்த தேதி உள்ள கல்லூரி அட்டை.',
        'யாரையும் விருப்பமின்றி தடுத்து வைத்தால் 112 அழைத்து இதையே சொல்லுங்கள்: “நான் பெரியவர்; என் விருப்பத்துக்கு எதிராகத் தடுத்து வைக்கப்பட்டுள்ளேன்.”',
        'உங்கள் சொந்த விருப்பத்துடன் சேர்ந்து வாழ்கிறீர்கள் என்று அருகிலுள்ள காவல் நிலையத்துக்கு எழுதி நகல் வையுங்கள். “காணாமல் போனவர்” புகாரைத் தவறாகப் பயன்படுத்துவதை இது தடுக்கும்.',
        '15100 அழைத்து, காவல் பாதுகாப்புக்கு விண்ணப்பிக்கச் சொல்லுங்கள்; பொருந்தும் இடத்தில் உயர் நீதிமன்ற வழிகாட்டுதல்களைக் குறிப்பிடுங்கள்.',
      ],
    ],
  }),
];
