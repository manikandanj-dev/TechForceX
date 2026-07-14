import { useCallback, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { AnimatePresence, motion } from 'framer-motion'
import { alpha } from '@mui/material/styles'
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion'

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -60 : 60 }),
}

/**
 * Full-screen animated image gallery/lightbox. Supports keyboard arrow
 * navigation, a close button, and a thumbnail strip. Each slide fades in
 * once loaded (with a skeleton placeholder) so slow network images never
 * pop in abruptly.
 */
export function ImageGallery({ open, images, initialIndex = 0, title, onClose }) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(1)
  const [loadedIndexes, setLoadedIndexes] = useState(() => new Set())
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleEnter = () => {
    setIndex(initialIndex)
    setDirection(1)
  }

  const goTo = useCallback(
    (nextIndex) => {
      setDirection(nextIndex > index ? 1 : -1)
      setIndex((nextIndex + images.length) % images.length)
    },
    [index, images.length]
  )

  const handlePrev = useCallback(() => goTo(index - 1), [goTo, index])
  const handleNext = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (!open) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') handlePrev()
      if (event.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handlePrev, handleNext])

  const handleImageLoad = (loadedIndex) => {
    setLoadedIndexes((prev) => new Set(prev).add(loadedIndex))
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      aria-label={title ? `${title} image gallery` : 'Image gallery'}
      slotProps={{
        paper: {
          sx: {
            bgcolor: '#0b1120',
            borderRadius: '24px',
            overflow: 'hidden',
          },
        },
        transition: { onEnter: handleEnter },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={onClose}
          aria-label="Close gallery"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            color: '#fff',
            bgcolor: alpha('#fff', 0.1),
            '&:hover': { bgcolor: alpha('#fff', 0.2) },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {title && (
          <Typography
            variant="subtitle1"
            sx={{
              position: 'absolute',
              top: 16,
              left: 20,
              zIndex: 2,
              color: '#fff',
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>
        )}

        <Box sx={{ position: 'relative', width: '100%', pt: '62.5%', overflow: 'hidden' }}>
          {!loadedIndexes.has(index) && (
            <Skeleton
              variant="rectangular"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          )}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.img
              key={index}
              src={images[index]}
              alt={title ? `${title} screenshot ${index + 1}` : `Screenshot ${index + 1}`}
              custom={direction}
              variants={prefersReducedMotion ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onLoad={() => handleImageLoad(index)}
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                aria-label="Previous image"
                sx={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#fff',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                }}
              >
                <ArrowBackIosNewRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleNext}
                aria-label="Next image"
                sx={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#fff',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                }}
              >
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>

        {images.length > 1 && (
          <Box sx={{ display: 'flex', gap: 1, p: 2, overflowX: 'auto' }}>
            {images.map((image, thumbIndex) => (
              <Box
                key={image}
                component="button"
                type="button"
                onClick={() => goTo(thumbIndex)}
                aria-label={`Go to image ${thumbIndex + 1}`}
                aria-current={thumbIndex === index}
                sx={{
                  flexShrink: 0,
                  width: 72,
                  height: 48,
                  p: 0,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: thumbIndex === index ? 'primary.main' : 'transparent',
                  cursor: 'pointer',
                  opacity: thumbIndex === index ? 1 : 0.6,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease',
                  '&:hover': { opacity: 1 },
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Dialog>
  )
}

export default ImageGallery
