import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress'

const ProgressCircular = () => {
  return (
    <div style={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: '#fafafa',
        }}
        size={40}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => theme.palette.primary.main,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
      />
    </div>
  )
}

export default ProgressCircular
