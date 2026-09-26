import React, { useState } from 'react';
import { GITHUB_REPOSITORIES, PERSONAL_INFO, PROJECTS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { GithubIcon } from './Icons';
import { 
  GitBranch, 
  Copy, 
  Check, 
  ArrowUpRight, 
  FileCode,
  FolderGit2
} from 'lucide-react';

export const CodeCraftsmanship: React.FC = () => {
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState(0);
  const [copiedClone, setCopiedClone] = useState<string | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Real code snippets from data
  const snippets = [
    {
      title: "satquery_pipeline.py",
      lang: "Python",
      subtitle: "Multispectral NDVI & Cloud Mask Vector Math",
      rationale: "Vectorized array calculations using NumPy. Avoids heavy GIS dependencies by calculating normalized spectral indices directly in memory with IEEE-754 NaN handling.",
      code: PROJECTS.find(p => p.id === 'satqueryai')?.caseStudy.codeSnippet?.code || ""
    },
    {
      title: "ring_buffer.c",
      lang: "C (Systems)",
      subtitle: "Lock-Free Circular Ring Buffer & Bitwise Masking",
      rationale: "Power-of-two buffer capacity replaces expensive modulo divisions with single-cycle bitwise AND masking. Guarantees predictable zero-allocation throughput for continuous telemetry streams.",
      code: `// Lock-free circular FIFO ring buffer with power-of-two bitwise indexing in C
#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#define BUFFER_CAPACITY 1024 // Power of 2 enables single-cycle bitwise masking

typedef struct {
    uint8_t buffer[BUFFER_CAPACITY];
    size_t head;
    size_t tail;
} RingBuffer;

bool rb_push(RingBuffer *rb, uint8_t byte) {
    size_t next_head = (rb->head + 1) & (BUFFER_CAPACITY - 1);
    if (next_head == rb->tail) return false; // Buffer overflow guard
    
    rb->buffer[rb->head] = byte;
    rb->head = next_head;
    return true;
}

bool rb_pop(RingBuffer *rb, uint8_t *out_byte) {
    if (rb->head == rb->tail) return false; // Buffer empty
    
    *out_byte = rb->buffer[rb->tail];
    rb->tail = (rb->tail + 1) & (BUFFER_CAPACITY - 1);
    return true;
}`
    },
    {
      title: "study_analytics.js",
      lang: "MongoDB / Node",
      subtitle: "Time-Series Workload Aggregation Pipeline",
      rationale: "Multi-stage $match, $group, $project pipeline executed on database engine to compute student retention velocity without client-side CPU overhead.",
      code: `// MongoDB Aggregation Pipeline: Calculate subject mastery & spaced review intervals
const calculateRetentionVelocity = async (userId) => {
  return await db.collection("study_sessions").aggregate([
    {
      $match: {
        userId: new ObjectId(userId),
        completedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    },
    {
      $group: {
        _id: "$subjectId",
        totalMinutes: { $sum: "$durationMinutes" },
        sessionsCount: { $sum: 1 },
        avgRecallScore: { $avg: "$recallScore" },
        lastReviewed: { $max: "$completedAt" }
      }
    },
    {
      $project: {
        subjectId: "$_id",
        totalMinutes: 1,
        retentionIndex: {
          $multiply: [
            "$avgRecallScore",
            { $ln: { $add: ["$sessionsCount", 1] } }
          ]
        },
        recommendedNextReview: {
          $add: [
            "$lastReviewed",
            { $multiply: ["$avgRecallScore", 86400000 * 3] } // Spaced intervals
          ]
        }
      }
    },
    { $sort: { recommendedNextReview: 1 } }
  ]).toArray();
};`
    }
  ];

  const handleCopyClone = (repoName: string) => {
    const cmd = `git clone https://github.com/${PERSONAL_INFO.githubUsername}/${repoName}.git`;
    navigator.clipboard.writeText(cmd);
    setCopiedClone(repoName);
    soundFx.playClick(850, 0.03);
    setTimeout(() => setCopiedClone(null), 2000);
  };

  const handleCopyCurrentSnippet = () => {
    navigator.clipboard.writeText(snippets[selectedSnippetIdx].code);
    setCopiedSnippet(true);
    soundFx.playClick(850, 0.03);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section id="code" className="py-20 sm:py-24 border-b border-dark-border light:border-light-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-dark-border light:border-light-border">
          <div>
            <div className="font-mono text-xs text-accent uppercase tracking-widest font-semibold flex items-center gap-2">
              <FolderGit2 size={14} />
              <span>05 // CODE CRAFTSMANSHIP & REPOSITORIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-text light:text-light-text tracking-tight mt-2">
              Software That Actually Compiles & Runs
            </h2>
          </div>

          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 border border-dark-border light:border-light-border bg-dark-card light:bg-light-card hover:border-accent font-mono text-xs text-dark-text light:text-light-text transition-colors"
          >
            <GithubIcon size={13} />
            <span>@{PERSONAL_INFO.githubUsername}</span>
            <ArrowUpRight size={13} className="text-accent" />
          </a>
        </div>

        {/* Repositories & Terminal Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Selected Repositories List */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="flex items-center justify-between text-xs text-dark-dim light:text-light-dim pb-2 border-b border-dark-border light:border-light-border">
              <span>ACTIVE REPOSITORY MANIFEST</span>
              <span>GITHUB_SYNC</span>
            </div>

            <div className="space-y-3">
              {GITHUB_REPOSITORIES.map((repo) => {
                const isCopied = copiedClone === repo.name;
                return (
                  <div
                    key={repo.name}
                    className="p-4 border border-dark-border light:border-light-border bg-dark-card light:bg-light-card hover:border-accent/50 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch size={13} className="text-accent" />
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-sm text-dark-text light:text-light-text hover:text-accent transition-colors flex items-center gap-1"
                        >
                          <span>{repo.name}</span>
                          <ArrowUpRight size={11} className="opacity-60" />
                        </a>
                      </div>

                      <span className="text-[10px] px-2 py-0.2 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border text-dark-muted light:text-light-muted">
                        {repo.language}
                      </span>
                    </div>

                    <p className="text-xs text-dark-muted light:text-light-muted font-sans leading-relaxed">
                      {repo.description}
                    </p>

                    {/* Quick Clone Snippet */}
                    <div className="flex items-center justify-between pt-2 border-t border-dark-border/40 light:border-light-border/40 text-[10px]">
                      <code className="text-dark-dim light:text-light-dim truncate max-w-[240px]">
                        git clone .../{repo.name}.git
                      </code>

                      <button
                        onClick={() => handleCopyClone(repo.name)}
                        className="flex items-center gap-1 text-accent hover:underline font-semibold"
                        title="Copy Git Clone Command"
                      >
                        {isCopied ? <Check size={11} className="text-[#FF6A00]" /> : <Copy size={11} />}
                        <span>{isCopied ? 'COPIED' : 'CLONE'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Source Code Inspector */}
          <div className="lg:col-span-7 border border-dark-border light:border-light-border bg-dark-surface light:bg-light-elevated font-mono">
            {/* Inspector Tab Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-dark-border light:border-light-border bg-dark-card light:bg-light-card px-3 py-2 text-xs">
              <div className="flex items-center gap-1">
                {snippets.map((snip, idx) => (
                  <button
                    key={snip.title}
                    onClick={() => {
                      setSelectedSnippetIdx(idx);
                      soundFx.playClick(600, 0.03);
                    }}
                    className={`px-3 py-1.5 text-xs transition-colors flex items-center gap-1.5 ${
                      selectedSnippetIdx === idx
                        ? 'bg-dark-surface light:bg-light-elevated border-b-2 border-accent text-dark-text light:text-light-text font-bold'
                        : 'text-dark-muted light:text-light-muted hover:text-dark-text'
                    }`}
                  >
                    <FileCode size={12} className={selectedSnippetIdx === idx ? 'text-accent' : 'opacity-40'} />
                    <span>{snip.title}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyCurrentSnippet}
                className="flex items-center gap-1 px-2.5 py-1 border border-dark-border light:border-light-border hover:border-accent text-dark-muted light:text-light-muted hover:text-dark-text text-[11px] transition-colors"
              >
                {copiedSnippet ? <Check size={12} className="text-[#FF6A00]" /> : <Copy size={12} />}
                <span>{copiedSnippet ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Architecture Context Banner */}
            <div className="p-3 bg-dark-bg/60 light:bg-light-card/60 border-b border-dark-border light:border-light-border text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] text-accent font-semibold">
                <span>{snippets[selectedSnippetIdx].subtitle.toUpperCase()}</span>
                <span>LANG: {snippets[selectedSnippetIdx].lang}</span>
              </div>
              <p className="text-[11px] text-dark-muted light:text-light-muted font-sans leading-relaxed">
                {snippets[selectedSnippetIdx].rationale}
              </p>
            </div>

            {/* Code Content with Line Numbers */}
            <div className="p-4 overflow-x-auto text-[11.5px] leading-relaxed max-h-[380px] overflow-y-auto">
              <pre className="text-dark-text light:text-light-text font-mono">
                {snippets[selectedSnippetIdx].code.split('\n').map((line, lIdx) => (
                  <div key={lIdx} className="table-row">
                    <span className="table-cell pr-4 text-dark-dim light:text-light-dim select-none text-right w-8 text-[10px]">
                      {lIdx + 1}
                    </span>
                    <span className="table-cell whitespace-pre">
                      {line}
                    </span>
                  </div>
                ))}
              </pre>
            </div>

            {/* Footer telemetry */}
            <div className="px-4 py-2 border-t border-dark-border light:border-light-border bg-dark-card light:bg-light-card flex items-center justify-between text-[10px] text-dark-dim light:text-light-dim">
              <span>ZERO_EXTERNAL_DEPENDENCY // VERIFIED</span>
              <span>SYNTAX: NATIVE_{snippets[selectedSnippetIdx].lang.toUpperCase().replace(/\s+/g, '_')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
