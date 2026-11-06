import type { CaseAuthority } from '../types';

export const CASES: CaseAuthority[] = [
  {
    id: 'nalsa-2014',
    name: 'National Legal Services Authority v. Union of India',
    citation: '(2014) 5 SCC 438',
    court: 'Supreme Court of India',
    year: 2014,
    holding:
      'Recognised transgender persons as a third gender, directed the State to treat them as citizens with full constitutional protection, and read gender identity into Articles 14, 15, 16 and 21.',
    relevance:
      'The starting point for every gender-identity claim. Still governs constitutional interpretation even where the 2026 amendment narrows the statutory definition.',
    sourceUrl: 'https://main.sci.gov.in/supremecourt/2012/35311/35311_2012_Judgement_15-Apr-2014.pdf',
    verifiedOn: '2026-11-11',
  },
  {
    id: 'puttaswamy-2017',
    name: 'Justice K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    court: 'Supreme Court of India',
    year: 2017,
    holding:
      'Privacy is a fundamental right under Article 21, covering informational privacy, bodily integrity and personal autonomy.',
    relevance:
      'Basis for why this app does not upload what you type, and for challenging forced disclosure of gender or medical history.',
    sourceUrl: 'https://main.sci.gov.in/supremecourt/2012/35071/35071_2012_Judgement_24-Aug-2017.pdf',
    verifiedOn: '2026-11-11',
  },
  {
    id: 'navtej-2018',
    name: 'Navtej Singh Johar v. Union of India',
    citation: '(2018) 10 SCC 1',
    court: 'Supreme Court of India',
    year: 2018,
    holding:
      'Read down section 377 IPC; consensual same-sex sexual acts between adults are no longer an offence. Equal citizenship regardless of sexual orientation.',
    relevance:
      'Police cannot use section 377 against consenting adults. The provision was later carried into the BNS, so this holding still matters.',
    sourceUrl: 'https://main.sci.gov.in/supremecourt/2016/14961/14961_2016_Judgement_06-Sep-2018.pdf',
    verifiedOn: '2026-11-11',
  },
  {
    id: 'supriyo-2023',
    name: 'Supriyo v. Union of India',
    citation: '2023 SCC OnLine SC 1348',
    court: 'Supreme Court of India',
    year: 2023,
    holding:
      'Declined to recognise same-sex marriage or civil union, holding that only Parliament can create a marriage status; issued directions against discrimination in services and access.',
    relevance:
      'Explains why Saathi does not present marriage as an available route, and routes couples to cohabitation, safety and discrimination remedies instead.',
    sourceUrl: 'https://main.sci.gov.in/supremecourt/2022/000000/000000_2022_1_1501_48998_Judgement_17-Oct-2023.pdf',
    verifiedOn: '2026-11-11',
  },
  {
    id: 'sushma-2021',
    name: 'S. Sushma v. Commissioner of Police, Chennai',
    citation: 'W.P. No. 7284 of 2021 (Madras High Court)',
    court: 'Madras High Court',
    year: 2021,
    holding:
      'Directed police protection for a same-sex couple, and issued guidelines against harassment of LGBTQIA+ persons and against conversion therapy, calling it professional misconduct.',
    relevance:
      'Direct authority when family or police pressure a couple to separate, or when anyone offers “treatment” to change orientation or identity.',
    sourceUrl: 'https://www.mhc.tn.gov.in/judis/index.php/casestatus/viewpdf/659110',
    verifiedOn: '2026-11-11',
  },
];
