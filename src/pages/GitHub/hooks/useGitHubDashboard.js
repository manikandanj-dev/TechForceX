import { useMemo } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import {
  getGitHubProfile,
  getGitHubPublicEvents,
  getGitHubRepositories,
  getRepositoryLanguages,
  searchUserRepositories,
} from '@services/githubService'

const MAX_LANGUAGE_REPOS = 20

function summarizeLanguages(languageQueries) {
  const totals = new Map()

  languageQueries.forEach((query) => {
    if (!query.data) return
    Object.entries(query.data).forEach(([language, bytes]) => {
      totals.set(language, (totals.get(language) || 0) + bytes)
    })
  })

  const totalBytes = [...totals.values()].reduce((sum, value) => sum + value, 0)

  return [...totals.entries()]
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: totalBytes ? Math.round((bytes / totalBytes) * 1000) / 10 : 0,
    }))
    .sort((left, right) => right.bytes - left.bytes)
    .slice(0, 8)
}

function summarizeActivity(events = [], repositories = []) {
  const commits = events
    .filter((event) => event.type === 'PushEvent')
    .reduce((total, event) => total + (event.payload?.commits?.length || 0), 0)
  const pullRequests = events.filter((event) => event.type === 'PullRequestEvent').length
  const issues = events.filter((event) => event.type === 'IssuesEvent').length
  const activeDays = new Set(events.map((event) => event.created_at?.slice(0, 10))).size
  const stars = repositories.reduce((total, repo) => total + repo.stargazers_count, 0)

  return [
    { label: 'Public events', value: events.length, helper: 'Last 50 visible events' },
    { label: 'Commits pushed', value: commits, helper: 'From public push events' },
    { label: 'Pull requests', value: pullRequests, helper: 'Recent public activity' },
    { label: 'Issues touched', value: issues, helper: `${activeDays} active days sampled` },
    { label: 'Repo stars', value: stars, helper: 'Across loaded repositories' },
  ]
}

export function useGitHubDashboard(username, repositorySearch) {
  const normalizedUsername = username.trim()
  const normalizedSearch = repositorySearch.trim()

  const profileQuery = useQuery({
    queryKey: ['github', 'profile', normalizedUsername],
    queryFn: () => getGitHubProfile(normalizedUsername),
    enabled: Boolean(normalizedUsername),
    staleTime: 5 * 60 * 1000,
  })

  const repositoriesQuery = useQuery({
    queryKey: ['github', 'repositories', normalizedUsername],
    queryFn: () => getGitHubRepositories(normalizedUsername),
    enabled: Boolean(normalizedUsername),
    staleTime: 5 * 60 * 1000,
  })

  const eventsQuery = useQuery({
    queryKey: ['github', 'events', normalizedUsername],
    queryFn: () => getGitHubPublicEvents(normalizedUsername),
    enabled: Boolean(normalizedUsername),
    staleTime: 2 * 60 * 1000,
  })

  const searchQuery = useQuery({
    queryKey: ['github', 'repository-search', normalizedUsername, normalizedSearch],
    queryFn: () => searchUserRepositories(normalizedUsername, normalizedSearch),
    enabled: Boolean(normalizedUsername) && normalizedSearch.length > 1,
    staleTime: 2 * 60 * 1000,
  })

  const languageTargets = useMemo(
    () => (repositoriesQuery.data || []).filter((repo) => !repo.fork).slice(0, MAX_LANGUAGE_REPOS),
    [repositoriesQuery.data]
  )

  const languageQueries = useQueries({
    queries: languageTargets.map((repo) => ({
      queryKey: ['github', 'languages', repo.owner.login, repo.name],
      queryFn: () => getRepositoryLanguages(repo.owner.login, repo.name),
      enabled: repositoriesQuery.isSuccess,
      staleTime: 10 * 60 * 1000,
    })),
  })

  const languageStats = useMemo(() => summarizeLanguages(languageQueries), [languageQueries])
  const activitySummary = useMemo(
    () => summarizeActivity(eventsQuery.data, repositoriesQuery.data),
    [eventsQuery.data, repositoriesQuery.data]
  )

  const displayedRepositories =
    normalizedSearch.length > 1 ? searchQuery.data?.items || [] : repositoriesQuery.data || []

  return {
    activitySummary,
    displayedRepositories,
    eventsQuery,
    languageQueries,
    languageStats,
    profileQuery,
    repositoriesQuery,
    searchQuery,
  }
}

export default useGitHubDashboard
