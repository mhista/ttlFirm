# Homepage hero — shorten the copy in Sanity

The hero copy lives in the Sanity **Homepage** document, not in the code, so the site cannot
override it. It has to be changed there.

What is live now:

> **Trusted New Jersey Law firm delivering our absolute best for your legal outcome.**
>
> We are a dedicated law firm in New Jersey committed to providing exceptional legal representation
> rooted in compassion, diligence, and integrity. Our expertise lies in personal injury law, where
> we relentlessly pursue justice and fair compensation for individuals who have suffered harm due to
> the negligence of others. Beyond personal injury, our firm offers comprehensive legal services in
> immigration law, workers' compensation, municipal court matters, and a broad spectrum of
> additional practice areas.

Two problems with it:

1. **It still names immigration and municipal court.** Those were taken off every other surface of
   the site. This is the last place a visitor still sees them.
2. **It is about seventy words.** Over moving footage, on a phone, that is read by almost nobody —
   and it pushes the buttons below the fold.

Below is the same copy, in her words, cut down. Nothing has been reworded for the sake of it: the
heading keeps *"delivering our absolute best for your legal outcome"* and the description keeps
*compassion, diligence and integrity* and *fair compensation … negligence of others*.

## Where

Sanity Studio → **Homepage** → **Hero** → then **Publish**.

## What to paste

**Eyebrow**

```
New Jersey
```

**Heading**

```
Delivering our absolute best for your legal outcome.
```

*"Trusted New Jersey Law firm" comes off the front because the eyebrow directly above it already
says New Jersey, and because a heading that starts with a claim about the firm is weaker than one
that starts with what the client gets.*

**Description**

```
A dedicated New Jersey firm, built on compassion, diligence and integrity — relentlessly pursuing fair compensation for people harmed by someone else's negligence.
```

*Seventy words down to twenty-four. Everything cut is either said better by the sections below —
which exist for exactly this — or names a practice area the firm no longer runs.*

**Bullets** (three, short)

```
Free consultation, no obligation
No fee unless we recover for you
Former insurance defense attorney
```

**Button text**

```
Get Your Free Case Review
```

## About the SEO

Dropping "personal injury and workers' compensation lawyer" out of the H1 costs nothing that
matters. Those terms are still carried by:

- the page `<title>` — *New Jersey Personal Injury & Workers' Compensation Lawyer | The Turuchi Law Firm*
- the meta description
- the H2 on the practice areas section
- the `LegalService` schema in the page's structured data
- every practice area page

Google reads all of those. What the H1 has to do is make a hurt person keep reading.

## If she wants different words

Two rules, and anything else is hers:

- **Heading: eight words or fewer.** At that length it sets in three lines on a phone. Beyond it,
  five lines, and the buttons drop below the fold.
- **Description: two sentences, or one long one.** The detail belongs in the sections underneath.
