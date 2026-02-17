"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Filter, Grid3X3, List, SortAsc } from "lucide-react";
import { MatchCard } from "@/components/portal/match-card";
import { EmptyState } from "@/components/portal/empty-state";
import { matches } from "@/lib/mock-data";

type FilterStatus = "all" | "new" | "viewed" | "interested";
type SortOption = "compatibility" | "recent" | "age";

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("compatibility");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter matches
  let filteredMatches = matches.filter((match) => {
    if (filterStatus !== "all" && match.status !== filterStatus) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        match.profile.name.toLowerCase().includes(query) ||
        match.profile.location.toLowerCase().includes(query) ||
        match.profile.occupation.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Sort matches
  filteredMatches = filteredMatches.sort((a, b) => {
    switch (sortBy) {
      case "compatibility":
        return b.compatibilityScore - a.compatibilityScore;
      case "recent":
        return new Date(b.matchedAt).getTime() - new Date(a.matchedAt).getTime();
      case "age":
        return a.profile.age - b.profile.age;
      default:
        return 0;
    }
  });

  const statusCounts = {
    all: matches.length,
    new: matches.filter((m) => m.status === "new").length,
    viewed: matches.filter((m) => m.status === "viewed").length,
    interested: matches.filter((m) => m.status === "interested").length,
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#2D1318] mb-2">My Matches</h1>
        <p className="text-[#6B5B5E]">
          Your curated matches, handpicked by our matchmaker based on your preferences.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#FECDD3]/50 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B5B5E]" />
            <input
              type="text"
              placeholder="Search by name, location, or occupation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3C4A8] text-sm
                         focus:outline-none focus:border-[#7B1E3A] focus:ring-2 focus:ring-[#7B1E3A]/10"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {(["all", "new", "viewed", "interested"] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  filterStatus === status
                    ? "bg-[#7B1E3A] text-white"
                    : "bg-[#F5E0E8] text-[#6B5B5E] hover:bg-[#FECDD3]"
                )}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1.5 text-xs opacity-75">({statusCounts[status]})</span>
              </button>
            ))}
          </div>

          {/* Sort & View */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 rounded-lg border border-[#E3C4A8] text-sm bg-white
                         focus:outline-none focus:border-[#7B1E3A]"
            >
              <option value="compatibility">Best Match</option>
              <option value="recent">Most Recent</option>
              <option value="age">Age</option>
            </select>

            <div className="flex rounded-lg border border-[#E3C4A8] overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid" ? "bg-[#7B1E3A] text-white" : "bg-white text-[#6B5B5E] hover:bg-[#F5E0E8]"
                )}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list" ? "bg-[#7B1E3A] text-white" : "bg-white text-[#6B5B5E] hover:bg-[#F5E0E8]"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {filteredMatches.length === 0 ? (
        <EmptyState
          type={searchQuery ? "search" : "matches"}
          title={searchQuery ? "No matches found" : undefined}
          description={
            searchQuery
              ? `No matches found for "${searchQuery}". Try adjusting your search.`
              : undefined
          }
        />
      ) : (
        <>
          {/* Results count */}
          <p className="text-sm text-[#6B5B5E] mb-4">
            Showing {filteredMatches.length} {filteredMatches.length === 1 ? "match" : "matches"}
          </p>

          {/* Matches Grid */}
          <div
            className={cn(
              "grid gap-6",
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}
          >
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
