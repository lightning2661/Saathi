import type { Provision } from '../types';

const TPA =
  'https://indiacode.gov.in/server/api/core/bitstreams/b2db0007-e5b6-4650-bd83-eb1bc43a01d8/content';
const GAZETTE_2026 = 'https://egazette.gov.in/WriteReadData/2026/271438.pdf';
const COMMENCEMENT = 'https://egazette.gov.in/WriteReadData/2026/272895.pdf';
const CONSTITUTION = 'https://legislative.gov.in/constitution-of-india/';

const v = (p: Omit<Provision, 'status' | 'humanReviewed' | 'verifiedOn'> & { verifiedOn?: string }): Provision => ({
  ...p,
  status: 'verified',
  // Seeded from the official consolidated text; partner sign-off is tracked separately.
  humanReviewed: false,
  verifiedOn: p.verifiedOn ?? '2026-06-04',
});

export const PROVISIONS: Provision[] = [
  v({
    id: 'tpa-2k',
    actId: 'tpa-2019',
    section: '2(k)',
    heading: 'Definition of “transgender person”',
    body:
      '“transgender person” means— (i) a person having such socio-cultural identities as kinner, hijra, aravani and jogta, or eunuch, or a person with intersex variations specified below or a person who, at birth, has a congenital variation in one or more of the following sex characteristics as compared to male or female development:— (a) primary sexual characteristics; (b) external genitalia; (c) chromosomal patterns; (d) gonadal development; (e) endogenous hormone production or response, or such other medical conditions; or (ii) any person or child who has been, by force, allurement, inducement, deceit or undue influence, either with or without consent, compelled to assume, adopt, or outwardly present a transgender identity, by mutilation, emasculation, castration, amputation, or any surgical, chemical, or hormonal procedure or otherwise: Provided that it shall not include, nor shall ever have been so included, persons with different sexual orientations and self-perceived sexual identities.',
    summary:
      'Since 25 May 2026 this definition is a closed list: hijra/kinner/aravani/jogta/eunuch, specified intersex variations, and people compelled into a transgender identity. Self-perceived identity and sexual orientation are expressly excluded.',
    tags: ['definition', 'identity', 'amendment 2026', 'orientation', 'intersex'],
    sourceUrl: TPA,
    inForceFrom: '2026-05-25',
    amendedBy: 'Act 3 of 2026, s.2',
  }),
  v({
    id: 'tpa-3',
    actId: 'tpa-2019',
    section: '3',
    heading: 'Prohibition against discrimination',
    body:
      'No person or establishment shall discriminate against a transgender person on any of the following grounds, namely:— (a) the denial, or discontinuation of, or unfair treatment in, educational establishments and services thereof; (b) the unfair treatment in, or in relation to, employment or occupation; (c) the denial of, or termination from, employment or occupation; (d) the denial or discontinuation of, or unfair treatment in, healthcare services; (e) the denial or discontinuation of, or unfair treatment with regard to, access to, or provision or enjoyment or use of any goods, accommodation, service, facility, benefit, privilege or opportunity dedicated to the use of the general public or customarily available to the public; (f) the denial or discontinuation of, or unfair treatment with regard to the right of movement; (g) the denial or discontinuation of, or unfair treatment with regard to the right to reside, purchase, rent, or otherwise occupy any property; (h) the denial or discontinuation of, or unfair treatment in, the opportunity to stand for or hold public or private office; and (i) the denial of access to, removal from, or unfair treatment in, Government or private establishment in whose care or custody a transgender person may be.',
    summary:
      'A school, employer, hospital, landlord, shop, transport provider or public office cannot refuse service, end employment, block movement or block renting because someone is transgender. Clause (g) covers housing and property directly.',
    tags: ['discrimination', 'education', 'employment', 'healthcare', 'housing', 'rent', 'services', 'movement'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-4',
    actId: 'tpa-2019',
    section: '4',
    heading: 'Recognition of identity of transgender person',
    body:
      'A transgender person shall have a right to be recognised as such, in accordance with the provisions of this Act. [Sub-section (2), which required the State to provide for recognition of identity, was omitted by Act 3 of 2026, s.3.]',
    summary:
      'The right to be recognised as transgender survives the 2026 amendment, but it now runs through the certificate process in sections 5 and 6 rather than self-declaration.',
    tags: ['identity', 'recognition', 'certificate'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
    amendedBy: 'Act 3 of 2026, s.3',
  }),
  v({
    id: 'tpa-5',
    actId: 'tpa-2019',
    section: '5',
    heading: 'Application for certificate of identity',
    body:
      'A transgender person may make an application to the District Magistrate for issuing a certificate of identity as a transgender person, in such form and manner, and accompanied with such documents, as may be prescribed: Provided that in the case of a minor child, such application shall be made by a parent or guardian of such child.',
    summary:
      'Apply to the District Magistrate for a transgender identity certificate. A minor cannot apply alone — a parent or guardian applies. If no adult will apply for you, that refusal is itself the problem to raise with a legal aid lawyer.',
    tags: ['identity', 'certificate', 'district magistrate', 'minor', 'guardian'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-6',
    actId: 'tpa-2019',
    section: '6',
    heading: 'Issue of certificate of identity',
    body:
      '(1) The District Magistrate, after examining the recommendation of the authority and, if he considers either necessary or desirable, after taking the assistance of other medical experts shall issue to the applicant under section 5, a certificate of identity as transgender person after following such procedure and in such form and manner, within such time, as may be prescribed indicating the gender of such person as transgender. (2) The gender of transgender person shall be recorded in all official documents in accordance with certificate issued under sub-section (1). (3) A certificate issued to a person under sub-section (1) shall confer rights and be a proof of recognition of his identity as a transgender person. (4) The person who has been issued a certificate of identity under sub-section (1) and is so declared as a transgender person within the definition under this Act shall be entitled to change the first name in the birth certificate and all other official documents relating to the identity of such person.',
    summary:
      'The District Magistrate issues the certificate after the medical board’s recommendation. All official documents must then record the gender on the certificate, and the certificate holder may change their first name on the birth certificate and other identity documents.',
    tags: ['identity', 'certificate', 'medical board', 'name change', 'documents', 'amendment 2026'],
    sourceUrl: TPA,
    inForceFrom: '2026-05-25',
    amendedBy: 'Act 3 of 2026, s.4',
  }),
  v({
    id: 'tpa-7',
    actId: 'tpa-2019',
    section: '7',
    heading: 'Change in gender',
    body:
      '(1) After the issue of a certificate under sub-section (1) of section 6, if a transgender person undergoes surgery to change gender either as a male or female, such person shall make an application, along with a certificate issued to that effect by the Medical Superintendent or Chief Medical Officer of the medical institution in which that person has undergone surgery, to the District Magistrate for revised certificate, in such form and manner as may be prescribed. (1A) The medical institution in which the person who has undergone surgery to change gender, either as male or female, shall furnish the details of such person to the concerned District Magistrate and the authority in such form and manner as may be prescribed. (2) A person referred to in sub-section (1) shall also make an application to the District Magistrate who shall, on receipt of an application along with the certificate issued by the Medical Superintendent or Chief Medical Officer, and on being satisfied with the correctness of such certificate, issue a certificate indicating change in gender in such form and manner and within such time, as may be prescribed.',
    summary:
      'After surgery, an application to the District Magistrate is now mandatory (“shall”, not “may”), with a certificate from the hospital. The hospital must itself report the surgery to the District Magistrate and the medical board.',
    tags: ['identity', 'surgery', 'gender change', 'certificate', 'medical institution', 'amendment 2026'],
    sourceUrl: TPA,
    inForceFrom: '2026-05-25',
    amendedBy: 'Act 3 of 2026, s.5',
  }),
  v({
    id: 'tpa-8',
    actId: 'tpa-2019',
    section: '8',
    heading: 'Obligation of appropriate Government',
    body:
      '(1) The appropriate Government shall take steps to secure full and effective participation of transgender persons and their inclusion in society. (2) The appropriate Government shall take such welfare measures as may be prescribed to protect the rights and interests of transgender persons, and facilitate their access to welfare schemes framed by that Government. (3) The appropriate Government shall formulate welfare schemes and programmes which are transgender sensitive, non-stigmatising and non-discriminatory. (4) The appropriate Government shall take steps for the rescue, protection and rehabilitation of transgender persons to address the needs of such persons.',
    summary:
      'The Union or State government must run welfare schemes and must act on rescue, protection and rehabilitation. This is the hook for shelter, Garima Greh and SMILE scheme support.',
    tags: ['welfare', 'shelter', 'rehabilitation', 'schemes', 'rescue'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-9',
    actId: 'tpa-2019',
    section: '9',
    heading: 'Non-discrimination in employment',
    body:
      'No establishment shall discriminate against any transgender person in any matter relating to employment including, but not limited to, recruitment, promotion and other related issues.',
    summary:
      'Any employer — private or public — cannot refuse to hire, refuse promotion or treat someone worse because they are transgender.',
    tags: ['employment', 'job', 'recruitment', 'promotion', 'workplace'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-11',
    actId: 'tpa-2019',
    section: '11',
    heading: 'Grievance redressal mechanism',
    body:
      'Every establishment shall designate a person to be a complaint officer to deal with the complaints relating to violation of the provisions of this Act.',
    summary:
      'Every workplace and institution must name a complaint officer. Asking in writing for the complaint officer’s name is the first paper trail.',
    tags: ['complaint officer', 'grievance', 'workplace', 'institution', 'procedure'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-12',
    actId: 'tpa-2019',
    section: '12',
    heading: 'Right of residence',
    body:
      '(1) No child shall be separated from parents or immediate family on the ground of being a transgender, except on an order of a competent court, in the interest of such child. (2) Every transgender person shall have— (a) a right to reside in the household where parent or immediate family members reside; (b) a right not to be excluded from such household or any part thereof; and (c) a right to enjoy and use the facilities of such household in a non-discriminatory manner. (3) Where any parent or a member of his immediate family is unable to take care of a transgender, the competent court shall by an order direct such person to be placed in rehabilitation centre.',
    summary:
      'A child cannot be thrown out of the family home for being transgender — only a court order in the child’s interest can separate them. Every transgender person has a right to live in the family household and to use its facilities without discrimination.',
    tags: ['family', 'home', 'eviction', 'child', 'residence', 'shelter', 'rehabilitation'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-13',
    actId: 'tpa-2019',
    section: '13',
    heading: 'Inclusive education',
    body:
      'Every educational institution funded or recognised by the appropriate Government shall provide inclusive education and opportunities for sports, recreation and leisure activities to transgender persons without discrimination on an equal basis with others.',
    summary:
      'Government-funded or recognised schools and colleges must admit and keep transgender students, and give equal access to sports and activities.',
    tags: ['school', 'college', 'education', 'admission', 'expulsion', 'bullying'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-15',
    actId: 'tpa-2019',
    section: '15',
    heading: 'Healthcare facilities',
    body:
      'The appropriate Government shall take the following measures in relation to transgender persons, namely:— (b) to provide for medical care facility including sex reassignment surgery and hormonal therapy; (c) before and after sex reassignment surgery and hormonal therapy counselling; (f) to facilitate access to transgender persons in hospitals and other healthcare institutions and centres; (g) provision for coverage of medical expenses by a comprehensive insurance scheme for Sex Reassignment Surgery, hormonal therapy, laser therapy or any other health issues of transgender persons.',
    summary:
      'Government must provide medical care including surgery and hormone therapy, counselling before and after, hospital access, and insurance cover for these costs. A hospital refusing emergency or routine care is discriminating under section 3(d).',
    tags: ['health', 'hospital', 'surgery', 'hormones', 'insurance', 'treatment', 'denial'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-17',
    actId: 'tpa-2019',
    section: '17',
    heading: 'Functions of the National Council',
    body:
      'The National Council shall perform the following functions, namely:— (a) to advise the Central Government on the formulation of policies, programmes, legislation and projects with respect to transgender persons; (b) to monitor and evaluate the impact of policies and programmes designed for achieving equality and full participation of transgender persons; (c) to review and coordinate the activities of all the departments of Government and other Governmental and non-Governmental Organisations which are dealing with matters relating to transgender persons; (d) to redress the grievances of transgender persons; and (e) to perform such other functions as may be prescribed by the Central Government.',
    summary:
      'The National Council for Transgender Persons has a statutory duty to redress grievances, and can be approached when a State government or institution refuses to act.',
    tags: ['national council', 'grievance', 'escalation', 'policy'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-18',
    actId: 'tpa-2019',
    section: '18',
    heading: 'Offences and penalties',
    body:
      'Whoever,— (a) compels or entices a transgender person to indulge in the act of forced or bonded labour other than any compulsory service for public purposes imposed by Government, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years and with fine; (b) denies a transgender person the right of passage to a public place or obstructs such person from using or having access to a public place to which other members have access to or a right to use, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years and with fine; (c) forces or causes a transgender person to leave household, village or other place of residence, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years and with fine; (d) harms or injures or endangers the life, safety, health or well-being, whether mental or physical, of a transgender person or tends to do acts including causing physical abuse, sexual abuse, verbal and emotional abuse and economic abuse, shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to two years and with fine; (e) kidnaps or abducts any adult person and causes grievous hurt … with the intent of, or in the course of, compelling such person to assume, adopt, or outwardly present a transgender identity against the will or consent of such person … shall be punishable with rigorous imprisonment for a term which shall not be less than ten years but which may extend to imprisonment for life, and shall also be liable to fine which shall not be less than two lakh rupees; (f) kidnaps or abducts any child and causes grievous hurt … shall be punishable with rigorous imprisonment for life, and shall also be liable to fine which shall not be less than five lakh rupees; (g) by force, threat, coercion, allurement, deception, inducement, or undue influence— (i) compels any person … to dress, present, or conduct themselves outwardly as a transgender person against the will of such person; and (ii) employs, uses, or causes such person to engage in begging, solicitation, servitude, or any other form of forced or bonded labour while so presenting, shall be punishable with rigorous imprisonment for a term which shall not be less than five years but which may extend to ten years, and shall also be liable to fine which shall not be less than one lakh rupees; and (h) … compels any child … to dress, present, or conduct themselves outwardly as a transgender person; and employs, uses, or causes such child to engage in begging, solicitation, servitude, or any other form of forced or bonded labour while so presenting, shall be punishable with rigorous imprisonment for a term which shall not be less than ten years but which may extend to fourteen years, and shall also be liable to fine which shall not be less than three lakh rupees.',
    summary:
      'Forcing someone out of their home, blocking them from a public place, forcing begging or bonded labour, or hurting them because they are transgender are criminal offences. Forcing an adult into a transgender identity with grievous hurt carries 10 years to life; the same against a child carries life imprisonment.',
    tags: ['offence', 'crime', 'forced labour', 'begging', 'violence', 'abuse', 'eviction', 'police', 'fir'],
    sourceUrl: TPA,
    inForceFrom: '2026-05-25',
    amendedBy: 'Act 3 of 2026, s.7',
  }),
  v({
    id: 'tpa-amd-2026-s1',
    actId: 'tpa-amd-2026',
    section: 's.1(2) with S.O. 2620(E)',
    heading: 'Commencement of the 2026 amendment',
    body:
      '1. (1) This Act may be called the Transgender Persons (Protection of Rights) Amendment Act, 2026. (2) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint. [S.O. 2620(E), dated 22 May 2026: the Central Government hereby appoints the 25th day of May, 2026 as the date on which the provisions of the said Act shall come into force.]',
    summary:
      'The 2026 amendment is in force from 25 May 2026. Any older guide, poster or certificate form that predates this is out of date.',
    tags: ['amendment 2026', 'commencement', 'notification', 'in force'],
    sourceUrl: COMMENCEMENT,
    verifiedOn: '2026-05-27',
    inForceFrom: '2026-05-25',
  }),
  v({
    id: 'const-14',
    actId: 'constitution',
    section: 'Article 14',
    heading: 'Equality before law',
    body:
      'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    summary:
      'Every person, including every transgender person, is equal before the law. A rule applied to exclude them is unconstitutional.',
    tags: ['equality', 'constitution', 'fundamental rights'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-15',
    actId: 'constitution',
    section: 'Article 15',
    heading: 'Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth',
    body:
      '(1) The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.',
    summary:
      'The State cannot discriminate on the ground of sex, which the Supreme Court has read to include gender identity. This binds government bodies, not private shops.',
    tags: ['equality', 'discrimination', 'sex', 'constitution'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-21',
    actId: 'constitution',
    section: 'Article 21',
    heading: 'Protection of life and personal liberty',
    body:
      'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    summary:
      'Dignity, bodily autonomy, privacy and shelter are part of the right to life. The Supreme Court has used Article 21 to protect gender identity and privacy.',
    tags: ['dignity', 'liberty', 'privacy', 'constitution', 'shelter'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-23',
    actId: 'constitution',
    section: 'Article 23',
    heading: 'Prohibition of traffic in human beings and forced labour',
    body:
      '(1) Traffic in human beings and begar and other similar forms of forced labour are prohibited and any contravention of this provision shall be an offence punishable in accordance with law.',
    summary:
      'Forced begging under someone else’s control is forced labour, and is separately unconstitutional, not only a statutory offence.',
    tags: ['trafficking', 'forced labour', 'begging', 'constitution'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-39a',
    actId: 'constitution',
    section: 'Article 39A',
    heading: 'Equal justice and free legal aid',
    body:
      'The State shall secure that the operation of the legal system promotes justice, on a basis of equal opportunity, and shall, in particular, provide free legal aid, by suitable legislation or schemes or in any other way, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.',
    summary:
      'Free legal aid is a constitutional promise. NALSA (15100) is how you claim it; you do not need money to file.',
    tags: ['legal aid', 'free lawyer', 'nalsa', 'constitution', 'court'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'tpa-10',
    actId: 'tpa-2019',
    section: '10',
    heading: 'Obligations of establishments',
    body:
      'Every establishment shall ensure compliance with the provisions of this Act and provide such facilities to transgender persons as may be prescribed.',
    summary:
      'Every workplace and institution must actively comply with the Act and provide the facilities the rules require, not merely avoid saying no.',
    tags: ['workplace', 'facilities', 'compliance', 'institution', 'school'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'tpa-14',
    actId: 'tpa-2019',
    section: '14',
    heading: 'Vocational training and self-employment',
    body:
      'The appropriate Government shall formulate welfare schemes and programmes to facilitate and support livelihood for transgender persons including their vocational training and self-employment.',
    summary:
      'Government must fund livelihood schemes, vocational training and self-employment support. This is the hook for skilling, loan and enterprise schemes.',
    tags: ['livelihood', 'training', 'self-employment', 'schemes', 'work'],
    sourceUrl: TPA,
    inForceFrom: '2020-01-10',
  }),
  v({
    id: 'const-16',
    actId: 'constitution',
    section: 'Article 16',
    heading: 'Equality of opportunity in public employment',
    body:
      '(1) There shall be equality of opportunity for all citizens in matters relating to employment or appointment to any office under the State. (2) No citizen shall, on grounds only of religion, race, caste, sex, descent, place of birth, residence or any of them, be ineligible for, or discriminated against in respect of, any employment or office under the State.',
    summary:
      'Government employment must be open on equal terms; exclusion on the ground of sex, which includes gender identity, is unconstitutional. This binds the State, not private employers.',
    tags: ['government job', 'public employment', 'equality', 'state', 'constitution'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-19a',
    actId: 'constitution',
    section: 'Article 19(1)(a)',
    heading: 'Freedom of speech and expression',
    body:
      '(1) All citizens shall have the right— (a) to freedom of speech and expression.',
    summary:
      'Expressing who you are, including your gender identity, is protected expression against State restriction. It does not by itself bind a private employer or platform.',
    tags: ['expression', 'speech', 'identity', 'protest', 'constitution'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
  v({
    id: 'const-32',
    actId: 'constitution',
    section: 'Article 32',
    heading: 'Remedies for enforcement of fundamental rights',
    body:
      '(1) The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. (2) The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari, whichever may be appropriate, for the enforcement of any of the rights conferred by this Part.',
    summary:
      'If a fundamental right is breached, the Supreme Court can be moved directly, including by a habeas corpus petition if someone is held unlawfully. Free legal aid can draft it.',
    tags: ['writ', 'habeas corpus', 'supreme court', 'detention', 'remedy'],
    sourceUrl: CONSTITUTION,
    verifiedOn: '2026-11-11',
  }),
];
