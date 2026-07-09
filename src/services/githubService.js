import axios from 'axios'

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

githubClient.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function normalizeGitHubError(error) {
  const status = error?.response?.status
  const message = error?.response?.data?.message || error.message

  if (status === 404) return new Error('GitHub user not found. Check the username and try again.')
  if (status === 403)
    return new Error('GitHub API rate limit reached. Add VITE_GITHUB_TOKEN or try again later.')
  return new Error(message || 'GitHub API request failed.')
}

async function request(path, config) {
  try {
    const response = await githubClient.get(path, config)
    return response.data
  } catch (error) {
    throw normalizeGitHubError(error)
  }
}

export function getGitHubProfile(username) {
  return request(`/users/${encodeURIComponent(username)}`)
}

export function getGitHubRepositories(username) {
  return request(`/users/${encodeURIComponent(username)}/repos`, {
    params: { per_page: 100, sort: 'updated', direction: 'desc' },
  })
}

export function getRepositoryLanguages(owner, repo) {
  return request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
}

export function getGitHubPublicEvents(username) {
  return request(`/users/${encodeURIComponent(username)}/events/public`, {
    params: { per_page: 50 },
  })
}

export function searchUserRepositories(username, query) {
  const searchQuery = `${query.trim()} user:${username}`
  return request('/search/repositories', {
    params: { q: searchQuery, per_page: 30, sort: 'updated', order: 'desc' },
  })
}

export default githubClient
