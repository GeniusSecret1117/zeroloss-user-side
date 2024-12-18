import { LinearProgress, Box, Typography } from '@mui/material';

// Helper function to calculate password strength
const calculateStrength = (password) => {
  let strength = 0;

  if (password.length > 6) strength += 1; // Add one point if length > 6
  if (password.length > 8) strength += 1; // Add another point if length > 8
  if (/[A-Z]/.test(password)) strength += 1; // Add a point if it has uppercase
  if (/[a-z]/.test(password)) strength += 1; // Add a point if it has lowercase
  if (/[0-9]/.test(password)) strength += 1; // Add a point if it has numbers
  if (/[\W]/.test(password)) strength += 1; // Add a point if it has special chars

  return strength;
};

// Convert strength score to percentage
const getStrengthPercentage = (strength) => (strength / 6) * 100;

const PasswordStrengthBar = ({ password }) => {
  const strength = calculateStrength(password);
  const strengthPercentage = getStrengthPercentage(strength);

  // Map strength score to label
  const getStrengthLabel = () => {
    const labels = ['Weak', 'Weak', 'Okay', 'Good', 'Strong'];
    return labels[Math.min(strength, labels.length - 1)];
  };

  return (
    <Box sx={{ width: '100%', mt: '12px' }}>
      <Typography variant="p" color="textSecondary">
        Password Strength:{' '}
        <span
          className={`${
            getStrengthLabel() === 'Weak'
              ? 'text-red-500'
              : getStrengthLabel() === 'Okay'
              ? 'text-orange-500'
              : getStrengthLabel() === 'Good'
              ? 'text-yellow-500'
              : 'text-green-500'
          }`}
        >
          {getStrengthLabel()}
        </span>
      </Typography>
      <LinearProgress
        variant="determinate"
        value={strengthPercentage}
        sx={{
          height: 10,
          borderRadius: 5,
          mt: 1,
          backgroundColor: strength <= 1 ? '#f44336' : '#eeeeee', // Red for weak
          '& .MuiLinearProgress-bar': {
            backgroundColor:
              strength <= 1
                ? '#ff1744' // Red for weak
                : strength === 2
                ? '#ff9800' // Orange for okay
                : strength === 3
                ? '#ffc107' // Yellow for good
                : '#4caf50', // Green for strong
          },
        }}
      />
    </Box>
  );
};

export default PasswordStrengthBar;
