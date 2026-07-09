import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CallSplitIcon from '@mui/icons-material/CallSplit'
import StarIcon from '@mui/icons-material/Star'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact' })
const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function RepositorySkeleton() {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper sx={{ p: 2.5, border: 1, borderColor: 'divider' }}>
        <Skeleton height={28} width="70%" />
        <Skeleton />
        <Skeleton width="82%" />
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Skeleton variant="rounded" width={70} height={26} />
          <Skeleton variant="rounded" width={70} height={26} />
        </Stack>
      </Paper>
    </Grid>
  )
}

export function RepositoryList({ isLoading, isSearching, repositories }) {
  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, border: 1, borderColor: 'divider' }}>
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{ justifyContent: 'space-between' }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 850 }}>
              Repositories
            </Typography>
            <Typography color="text.secondary">
              {isSearching
                ? 'Results from GitHub repository search'
                : 'Recently updated public repositories'}
            </Typography>
          </Box>
          <Chip label={`${repositories.length} shown`} />
        </Stack>

        <Grid container spacing={2}>
          {isLoading
            ? [0, 1, 2, 3].map((item) => <RepositorySkeleton key={item} />)
            : repositories.slice(0, 12).map((repo) => (
                <Grid key={repo.id} size={{ xs: 12, md: 6 }}>
                  <Paper
                    sx={{
                      p: 2.5,
                      height: '100%',
                      border: 1,
                      borderColor: 'divider',
                      bgcolor: 'background.default',
                    }}
                  >
                    <Stack spacing={1.5} sx={{ height: '100%' }}>
                      <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          underline="hover"
                          sx={{ fontWeight: 850 }}
                        >
                          {repo.full_name || `${repo.owner?.login}/${repo.name}`}
                        </Link>
                        <OpenInNewIcon fontSize="small" color="disabled" />
                      </Stack>
                      <Typography color="text.secondary" sx={{ flexGrow: 1 }}>
                        {repo.description || 'No repository description available.'}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        {repo.language && (
                          <Chip
                            label={repo.language}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        )}
                        <Chip
                          icon={<StarIcon />}
                          label={compactNumber.format(repo.stargazers_count || 0)}
                          size="small"
                        />
                        <Chip
                          icon={<CallSplitIcon />}
                          label={compactNumber.format(repo.forks_count || 0)}
                          size="small"
                        />
                        {repo.updated_at && (
                          <Chip
                            label={`Updated ${dateFormatter.format(new Date(repo.updated_at))}`}
                            size="small"
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </Stack>
    </Paper>
  )
}

export default RepositoryList
