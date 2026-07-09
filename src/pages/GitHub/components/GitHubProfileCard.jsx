import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const numberFormatter = new Intl.NumberFormat('en', { notation: 'compact' })

export function GitHubProfileCard({ isLoading, profile }) {
  if (isLoading) {
    return (
      <Paper sx={{ p: 3, height: '100%', border: 1, borderColor: 'divider' }}>
        <Stack spacing={2}>
          <Skeleton variant="circular" width={86} height={86} />
          <Skeleton height={34} width="64%" />
          <Skeleton />
          <Skeleton width="82%" />
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={88} height={32} />
            <Skeleton variant="rounded" width={88} height={32} />
          </Stack>
        </Stack>
      </Paper>
    )
  }

  if (!profile) return null

  return (
    <Paper sx={{ p: 3, height: '100%', border: 1, borderColor: 'divider' }}>
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={profile.avatar_url} alt={profile.login} sx={{ width: 86, height: 86 }} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 850 }} noWrap>
              {profile.name || profile.login}
            </Typography>
            <Typography color="text.secondary">@{profile.login}</Typography>
            <Chip label={profile.type} size="small" sx={{ mt: 1 }} />
          </Box>
        </Stack>

        <Typography color="text.secondary">{profile.bio || 'No public bio available.'}</Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <Chip label={`${numberFormatter.format(profile.public_repos)} repos`} />
          <Chip label={`${numberFormatter.format(profile.followers)} followers`} />
          <Chip label={`${numberFormatter.format(profile.following)} following`} />
        </Stack>

        <Button
          href={profile.html_url}
          target="_blank"
          rel="noreferrer"
          variant="outlined"
          endIcon={<OpenInNewIcon />}
        >
          Open GitHub profile
        </Button>
      </Stack>
    </Paper>
  )
}

export default GitHubProfileCard
