import { useState } from 'react'
import { motion } from 'framer-motion'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { SectionContainer } from '@components/SectionContainer'
import { PageTransition } from '@components/PageTransition'
import { fadeInUp, staggerContainer } from '@animations/variants'
import { ReactionGame } from './ReactionGame'
import { TicTacToe } from './TicTacToe'
import { MemoryGame } from './MemoryGame'

/**
 * Mini Games page hosting a couple of lightweight interactive games.
 */
export function MiniGames() {
  const [tab, setTab] = useState(0)

  return (
    <PageTransition>
      <SectionContainer maxWidth={tab === 2 ? 'md' : 'sm'}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              Mini Games
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Take a short break and play a quick game.
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Tabs value={tab} onChange={(_, value) => setTab(value)} centered sx={{ mb: 4 }}>
              <Tab label="Reaction Test" />
              <Tab label="Tic-Tac-Toe" />
              <Tab label="Memory Match" />
            </Tabs>

            <Box>
              {tab === 0 && <ReactionGame />}
              {tab === 1 && <TicTacToe />}
              {tab === 2 && <MemoryGame />}
            </Box>
          </motion.div>
        </motion.div>
      </SectionContainer>
    </PageTransition>
  )
}

export default MiniGames
