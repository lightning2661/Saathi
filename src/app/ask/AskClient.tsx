'use client';

import { useState } from 'react';
import { AnswerView } from '@/components/AnswerView';
import type { Answer, Lang } from '@/lib/types';

const EXAMPLES: { lang: Lang; label: string; text: string }[] = [
  {
    lang: 'en',
    label: 'Thrown out at 16',
    text: 'My family threw me out because I am trans. I am 16 and I am sitting at a railway station with no money.',
  },
  {
    lang: 'en',
    label: 'Landlord refused',
    text: 'A landlord in Pune refused to rent me a room after he found out I am transgender. He said it would upset other tenants.',
  },
  {
    lang: 'en',
    label: 'Fired from work',
    text: 'I was fired the week my manager found out I am transgender. They called it a performance issue but nothing was ever written down before.',
  },
  {
    lang: 'en',
    label: 'Police station',
    text: 'I went to report a threat and the officer at the station laughed and told me to come back with my parents.',
  },
  {
    lang: 'en',
    label: 'Pictures shared',
    text: 'Someone I met online is threatening to send my private pictures to my family unless I pay him.',
  },
  {
    lang: 'hi',
    label: 'नौकरी से निकाला',
    text: 'मैं ट्रांसजेंडर हूं। कंपनी ने मुझे बिना कारण नौकरी से निकाल दिया और वेतन भी नहीं दिया।',
  },
  {
    lang: 'ta',
    label: 'பிச்சைக்குக் கட்டாயம்',
    text: 'என்னை ஒருவர் பணத்தை எடுத்துக்கொண்டு பிச்சை எடுக்கக் கட்டாயப்படுத்துகிறார். நான் வெளியேற முடியவில்லை.',
  },
];

const T = {
  placeholder: {
    en: 'Describe what is happening, in your own words. English, हिंदी or தமிழ். Age, place and who is involved help, but give only what you want to.',
    hi: 'जो हुआ है वह अपने शब्दों में लिखें। अंग्रेज़ी, हिंदी या तमिल। उम्र, जगह और कौन शामिल है — यह मदद करता है, पर जितना कहना चाहें उतना ही लिखें।',
    ta: 'நடப்பதை உங்கள் சொற்களில் எழுதுங்கள். ஆங்கிலம், हिंदी அல்லது தமிழ். வயது, இடம், யார் ஈடுபட்டுள்ளனர் என்பது உதவும்; ஆனால் விருப்பமானதை மட்டும் சொல்லுங்கள்.',
  },
  send: { en: 'Get my answer', hi: 'उत्तर पाएं', ta: 'பதில் பெறுங்கள்' },
  working: { en: 'Reading your situation…', hi: 'आपकी स्थिति पढ़ रहे हैं…', ta: 'உங்கள் நிலையைப் படிக்கிறது…' },
  consent: {
    en: 'Let a language model help write the answer. Your text leaves this device for that, with phone numbers, emails and ID numbers masked. Leave unchecked to stay fully offline.',
    hi: 'भाषा मॉडल को उत्तर लिखने दें। इसके लिए आपका पाठ डिवाइस से बाहर जाएगा, फोन नंबर, ईमेल और आईडी नंबर छिपाकर। पूरी तरह ऑफलाइन रहने के लिए अनचेक छोड़ें।',
    ta: 'பதிலை எழுத மொழி மாதிரியை அனுமதிக்கவும். அதற்காக உங்கள் உரை சாதனத்தை விட்டு வெளியேறும்; தொலைபேசி எண், மின்னஞ்சல், அடையாள எண்கள் மறைக்கப்படும். முழுமையாக ஆஃப்லைனில் இருக்க காலியாக விடுங்கள்.',
  },
  error: {
    en: 'Something went wrong. If you are in danger, call 112 now. Otherwise try again.',
    hi: 'कुछ गलत हुआ। खतरे में हैं तो अभी 112 पर कॉल करें। वरना फिर कोशिश करें।',
    ta: 'ஏதோ தவறு நடந்தது. ஆபத்தில் இருந்தால் இப்போதே 112 அழைக்கவும். இல்லையெனில் மீண்டும் முயலுங்கள்.',
  },
  empty: {
    en: 'Write a sentence or two first.',
    hi: 'पहले एक-दो वाक्य लिखें।',
    ta: 'முதலில் ஒன்றிரண்டு வாக்கியங்கள் எழுதுங்கள்.',
  },
  noModel: {
    en: 'No language model is configured on this instance, so Saathi composes the answer from the corpus alone. Nothing you type leaves this server.',
    hi: 'इस सर्वर पर कोई भाषा मॉडल सेट नहीं है, इसलिए साथी उत्तर केवल संग्रह से बनाता है। आपका लिखा कुछ भी बाहर नहीं जाता।',
    ta: 'இந்த சேவையகத்தில் மொழி மாதிரி அமைக்கப்படவில்லை; எனவே சாதி தொகுப்பிலிருந்து மட்டுமே பதிலை உருவாக்கும். நீங்கள் எழுதுவது வெளியே செல்லாது.',
  },
} as const;

const pick = (m: Record<Lang, string>, lang: Lang) => m[lang];

export function AskClient({ modelAvailable }: { modelAvailable: boolean }) {
  const [text, setText] = useState('');
  const [lang, setLang] = useState<Lang>('en');
  const [useModel, setUseModel] = useState(modelAvailable);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rated, setRated] = useState<string | null>(null);

  async function submit() {
    if (text.trim().length < 3) {
      setError(pick(T.empty, lang));
      return;
    }
    setBusy(true);
    setError(null);
    setRated(null);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, lang, useModel }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setAnswer((await res.json()) as Answer);
    } catch {
      setError(pick(T.error, lang));
    } finally {
      setBusy(false);
    }
  }

  async function rate(rating: string) {
    setRated(rating);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          rating,
          topic: answer?.noticed.length ? undefined : 'none',
          lang,
          flags: answer?.flags.map((f) => f.code) ?? [],
        }),
      });
    } catch {
      /* a failed rating must not disturb the person reading the answer */
    }
  }

  return (
    <div>
      <div className="ask-form">
        <label className="sr-only" htmlFor="situation">
          Describe your situation
        </label>
        <textarea
          id="situation"
          value={text}
          maxLength={2000}
          placeholder={pick(T.placeholder, lang)}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit();
          }}
        />

        <div className="ask-actions">
          <div className="lang-picker" role="radiogroup" aria-label="Answer language">
            {(['en', 'hi', 'ta'] as Lang[]).map((code) => (
              <label key={code}>
                <input
                  type="radio"
                  name="lang"
                  value={code}
                  checked={lang === code}
                  onChange={() => setLang(code)}
                />
                <span>{code === 'en' ? 'English' : code === 'hi' ? 'हिंदी' : 'தமிழ்'}</span>
              </label>
            ))}
          </div>
          <button className="btn btn--primary" onClick={submit} disabled={busy}>
            {busy ? pick(T.working, lang) : pick(T.send, lang)}
          </button>
        </div>

        <label className="consent">
          <input
            type="checkbox"
            checked={useModel}
            disabled={!modelAvailable}
            onChange={(e) => setUseModel(e.target.checked)}
          />
          <span>
            {modelAvailable
              ? pick(T.consent, lang)
              : pick(T.noModel, lang)}
          </span>
        </label>
      </div>

      <div className="chips">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            className="chip"
            onClick={() => {
              setText(ex.text);
              setLang(ex.lang);
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="notice" style={{ marginTop: '1rem', borderColor: 'var(--danger)' }}>
          {error}
        </p>
      )}

      {answer && <AnswerView answer={answer} onRate={rate} rated={rated} />}
    </div>
  );
}
