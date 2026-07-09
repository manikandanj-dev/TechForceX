import { useState } from 'react'
import { motion } from 'framer-motion'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { ContributionSummary } from './components/ContributionSummary'
import { GitHubProfileCard } from './components/GitHubProfileCard'
import { LanguageStats } from './components/LanguageStats'
import { RepositoryList } from './components/RepositoryList'
import { useGitHubDashboard } from './hooks/useGitHubDashboard'

export default function GitHubPage() {
  const [draftUsername, setDraftUsername] = useState('octocat')
  const [username, setUsername] = useState('octocat')
  const [repositorySearch, setRepositorySearch] = useState('')
  const {
    activitySummary,
    displayedRepositories,
    eventsQuery,
    languageQueries,
    languageStats,
    profileQuery,
    repositoriesQuery,
    searchQuery,
  } = useGitHubDashboard(username, repositorySearch)

  const pageError =
    profileQuery.error || repositoriesQuery.error || eventsQuery.error || searchQuery.error
  const isInitialLoading = profileQuery.isLoading || repositoriesQuery.isLoading
  const isLanguageLoading = languageQueries.some((query) => query.isLoading)
  const isSearching = repositorySearch.trim().length > 1

  const handleUsernameSubmit = (event) => {
    event.preventDefault()
    const nextUsername = draftUsername.trim()
    if (!nextUsername) return
    setUsername(nextUsername)
    setRepositorySearch('')
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      sx={{
        minHeight: '100%',
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        background:
          'radial-gradient(circle at 12% 12%, rgba(15, 159, 143, 0.13), transparent 28%), radial-gradient(circle at 88% 4%, rgba(61, 126, 255, 0.12), transparent 24%)',
      }}
    >
      <Stack spacing={3} sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Paper sx={{ p: { xs: 2.5, md: 3.5 }, border: 1, borderColor: 'divider' }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2.5}
            sx={{ justifyContent: 'space-between' }}
          >
            <Stack spacing={1} sx={{ maxWidth: 760 }}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center' }}>
                <GitHubIcon color="primary" />
                <Typography color="primary.main" sx={{ fontWeight: 850 }}>
                  GitHub REST API dashboard
                </Typography>
              </Stack>
              <Typography variant="h3" sx={{ fontWeight: 900 }}>
                Explore public developer activity
              </Typography>
              <Typography color="text.secondary">
                Profile data, repositories, language breakdowns, public activity, and repository
                search with React Query caching.
              </Typography>
            </Stack>

            <Box component="form" onSubmit={handleUsernameSubmit} sx={{ minWidth: { md: 360 } }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                <TextField
                  value={draftUsername}
                  label="GitHub username"
                  onChange={(event) => setDraftUsername(event.target.value)}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonSearchIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button type="submit" variant="contained">
                  Load
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        {pageError && <Alert severity="error">{pageError.message}</Alert>}

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <GitHubProfileCard isLoading={profileQuery.isLoading} profile={profileQuery.data} />
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <LanguageStats
              isLoading={repositoriesQuery.isLoading || isLanguageLoading}
              languages={languageStats}
            />
          </Grid>
        </Grid>

        <ContributionSummary
          isLoading={eventsQuery.isLoading || repositoriesQuery.isLoading}
          summary={activitySummary}
        />

        <Paper sx={{ p: { xs: 2, md: 3 }, border: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            value={repositorySearch}
            label="Search repositories"
            placeholder="Try react, animation, api..."
            onChange={(event) => setRepositorySearch(event.target.value)}
            helperText="Searches this user's public repositories through the GitHub REST search endpoint."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <ManageSearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Paper>

        <RepositoryList
          isLoading={isInitialLoading || (isSearching && searchQuery.isLoading)}
          isSearching={isSearching}
          repositories={displayedRepositories}
        />
      </Stack>
    </Box>
  )
}
