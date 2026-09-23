import type { Metadata } from "next";
import Link from "next/link";
import { LESSONS, LITERACY_QUIZ } from "@/lib/learn-content";
import { BADGES } from "@/lib/badges";
import { PageHeader, Section, Card, Badge, DisclaimerBar } from "@/components/ui";
import { Quiz } from "@/components/gamification/Quiz";
import { LearnProgress } from "@/components/learn/LearnProgress";
import { CompleteLessonClient } from "@/components/learn/CompleteLessonClient";
import { ShareCard } from "@/components/gamification/ShareCard";
import { GlossaryTip } from "@/components/glossary/GlossaryTip";

export const metadata: Metadata = {
  title: "Financial literacy lessons",
  description:
    "Interactive lessons on budgeting, debt, compound interest, inflation defense, and risk — with XP ranks and a graduation quiz.",
};

export default function LearnPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 04 · Academy"
        title="Financial literacy that sticks"
        description="Short lessons, practical tips, XP for finishing them, and a 10-question graduation quiz. Brush any term with inline glossary tips."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">Ranks</p>
          <ul className="mt-2 space-y-1">
            {["Lab Rookie", "Money Apprentice", "Analyst", "Money Master", "Legend"].map((r) => (
              <li key={r} className="text-sm text-text-muted">
                · {r}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">Badges you can earn</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {BADGES.map((b) => (
              <span key={b.id} title={b.description} className="rounded border border-border px-2 py-1 text-xs">
                {b.icon} {b.name}
              </span>
            ))}
          </div>
        </Card>
        <LearnProgress />
        <ShareCard />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {LESSONS.filter((l) => l.id !== "designer").map((lesson) => (
          <Card key={lesson.id} hover className="relative scroll-mt-24">
            <div id={lesson.id} className="absolute -top-24" aria-hidden />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-text">{lesson.title}</h2>
                <p className="mt-1 text-sm text-text-muted">{lesson.blurb}</p>
              </div>
              <Badge tone="gold">+{lesson.xp} XP</Badge>
            </div>
            <div className="mt-3 space-y-2">
              {lesson.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-text-muted">
                  {p.includes("inflation") ? (
                    <>
                      {p.split("inflation").map((chunk, j, arr) => (
                        <span key={j}>
                          {chunk}
                          {j < arr.length - 1 ? <GlossaryTip term="inflation">inflation</GlossaryTip> : null}
                        </span>
                      ))}
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {lesson.tips.map((t) => (
                <li key={t} className="rounded-full border border-mint/30 bg-mint/5 px-2.5 py-1 text-[11px] text-mint">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <CompleteLessonClient id={lesson.id} xp={lesson.xp} />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-mint">Graduation quiz</h2>
        <p className="mb-4 text-sm text-text-muted">
          Ten questions. Score 7+ to feel fluent — and unlock the Literacy Graduate badge.
        </p>
        <Quiz quizId="literacy" questions={LITERACY_QUIZ} badgeId="literacy-graduate" xpPerCorrect={12} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/invest" className="btn-primary rounded-lg px-4 py-2 text-sm">
          Next: Investment guide →
        </Link>
        <Link href="/glossary" className="btn-ghost rounded-lg px-4 py-2 text-sm">
          Browse glossary
        </Link>
      </div>

      <div className="mt-8">
        <DisclaimerBar />
      </div>
    </Section>
  );
}
