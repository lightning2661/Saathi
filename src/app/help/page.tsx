import type { Metadata } from 'next';
import { listHelplines } from '@/lib/data';

export const metadata: Metadata = {
  title: 'If you want to help',
  description:
    'What to actually do when a transgender person is in front of you and needs help — on a train, in a classroom, at work, or at your door.',
};

export const dynamic = 'force-dynamic';

const ROLES = [
  {
    who: 'A passenger, on a train or platform',
    do: [
      'Ask once, quietly, whether they want help. Do not ask why they are there.',
      'Offer a concrete thing: a bottle of water, a charged phone, a seat inside the waiting room, the fare to a shelter.',
      'Call 1098 with them if they are under 18, or 139 for railway security. Stay until someone arrives.',
      'Give the number 15100 and write it down. Free legal aid is real and most people have never heard of it.',
    ],
    dont: [
      'Do not hand over money to an adult who is standing next to them and taking it.',
      'Do not photograph them, post about them, or ask for their story as payment.',
      'Do not offer your own room.',
    ],
  },
  {
    who: 'A teacher or school administrator',
    do: [
      'Use the name and pronoun the student gives you. Correct other staff once, privately.',
      'Put the bullying on record in writing the day it happens. Section 13 requires inclusive education in government-funded or recognised institutions.',
      'Name a complaint officer under section 11 and tell the student who that is.',
      'Call 1098 if the student is unsafe at home, and 15100 if admission or a transfer certificate is being blocked.',
    ],
    dont: [
      'Do not call the family first when the family is the danger.',
      'Do not move the student out of school “for their safety”.',
      'Do not ask for a medical certificate to use a name.',
    ],
  },
  {
    who: 'An employer or colleague',
    do: [
      'Section 9 applies to every establishment: hiring, promotion and treatment at work.',
      'Check that the complaint officer required by section 11 actually exists and is reachable.',
      'Fix the practical things quietly: records, washroom access, uniform, payroll name.',
      'If someone is dismissed, put the reason in writing. A written reason is what a tribunal reads.',
    ],
    dont: [
      'Do not out a colleague to the team to “explain” them.',
      'Do not hold a sensitivity session instead of stopping the harassment.',
      'Do not accept a resignation given the same day as a threat.',
    ],
  },
  {
    who: 'A doctor, nurse or hospital administrator',
    do: [
      'Treat. Section 3(d) prohibits denial or unfair treatment in healthcare, and emergency care cannot wait for documents.',
      'Record the name the patient uses, and keep gender history confidential under Article 21 privacy.',
      'Follow sections 15(b) to 15(g) on hormone therapy, surgery, counselling and insurance cover.',
      'Refuse to participate in conversion practices — the Madras High Court called them professional misconduct.',
    ],
    dont: [
      'Do not demand a family member’s consent from an adult patient.',
      'Do not disclose HIV status or gender history to relatives.',
      'Do not send someone away for a “psychiatric opinion” before routine care.',
    ],
  },
  {
    who: 'A landlord or hostel warden',
    do: [
      'Section 3(g) covers denying or treating someone unfairly in renting or occupying property.',
      'Ask for the same documents you ask anyone else for, and nothing more.',
      'Put any refusal in writing so it can be tested. Most refusals are withdrawn when written.',
    ],
    dont: [
      'Do not evict without a court process; section 18(c) makes forcing someone out an offence.',
      'Do not charge a higher deposit for the same room.',
    ],
  },
  {
    who: 'A parent or relative',
    do: [
      'Section 12(1): a child cannot be separated from family only for being transgender, and only a court can order it in the child’s interest.',
      'If you cannot keep them at home, call 1098 or 181 and hand over to a shelter. That is legal and survivable; a platform is not.',
      'Go with them to the District Magistrate for the identity certificate. Since 25 May 2026 a minor’s application needs a parent or guardian.',
    ],
    dont: [
      'Do not confiscate documents or a phone.',
      'Do not take them to a “cure” programme.',
      'Do not promise a home you will withdraw in a week.',
    ],
  },
];

export default async function HelpPage() {
  const helplines = await listHelplines('en');
  const top = helplines.slice(0, 4);

  return (
    <div className="shell">
      <header className="page-head">
        <div className="kicker">For the people standing nearby</div>
        <h1>You saw something. Here is what to actually do.</h1>
        <p>
          A passenger gives ₹20 and wants to do more. A teacher watches a student disappear. An
          employer hears a joke and says nothing. This page is for that moment — the one where
          goodwill has nowhere to go.
        </p>
        <div className="btn-row" style={{ marginTop: '1.2rem' }}>
          {top.map((h) => (
            <a className="btn btn--sm" href={`tel:${h.number}`} key={h.id}>
              {h.number} · {h.name.split('—')[0].trim()}
            </a>
          ))}
        </div>
      </header>

      <div className="panel" style={{ marginBottom: '2.5rem' }}>
        <div className="section-label">One sentence that works</div>
        <p className="quote-block" style={{ marginTop: '0.6rem' }}>
          “I am not going to ask you anything you do not want to answer. Do you want me to call
          someone with you, or would you rather have the number?”
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--ink-3)', marginTop: '0.9rem', marginBottom: 0 }}>
          Consent to help is the whole method. A person who has been controlled all day does not need
          another person deciding for them.
        </p>
      </div>

      <div className="stack" style={{ paddingBottom: '3rem' }}>
        {ROLES.map((role) => (
          <section key={role.who} className="panel panel--quiet">
            <h2 style={{ fontSize: '1.25rem' }}>{role.who}</h2>
            <div className="two-col" style={{ marginTop: '0.8rem' }}>
              <div>
                <div className="section-label" style={{ color: 'var(--teal)' }}>
                  Do this
                </div>
                <ul style={{ fontSize: '0.93rem' }}>
                  {role.do.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="section-label" style={{ color: 'var(--danger)' }}>
                  Not this
                </div>
                <ul style={{ fontSize: '0.93rem' }}>
                  {role.dont.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="notice" style={{ marginBottom: '3rem' }}>
        <strong>If you want to fund or staff this work:</strong> shelters under the SMILE scheme,
        District Legal Services Authority panels and NALSA legal aid clinics all take volunteers and
        referrals. Saathi does not collect donations; it sends people to organisations that already
        exist and are accountable.
      </div>
    </div>
  );
}
